/**
 * js/vexflow_renderer.js
 * Renderer per esercizi musicali usando VexFlow.
 * **VERSIONE FINALE: Calcola startTick per ogni nota e restituisce posizioni verticali dei sistemi.**
 *
 * Piano Future
 * Copyright (c) 2025 Lorenzetti Giuseppe
 *
 * Questo codice sorgente è rilasciato sotto la licenza MIT.
 * Vedi il file LICENSE nel repository GitHub per i dettagli completi.
 * https://github.com/thc792/piano-tutor-extraime/blob/main/LICENSE
 */

const { Factory, Stave, StaveNote, Formatter, Voice, Beam, Accidental, StaveConnector, TickContext, Fraction, Note } = Vex.Flow;

// --- Costanti ---
const MEASURES_PER_LINE = 4; // Quante battute per riga (puoi aggiustare)
const SYSTEM_SPACING = 280; // Spazio verticale tra i sistemi (grand staff)
const SINGLE_STAVE_SYSTEM_SPACING = 150; // Spazio verticale (single staff)
const STAVE_START_X = 15; // Margine sinistro
const STAVE_START_Y_GRAND = 40; // Y del primo pentagramma treble (grand staff)
const STAVE_START_Y_SINGLE = 60; // Y del primo pentagramma (single staff)
const STAVE_VERTICAL_DISTANCE = 100; // Distanza tra treble e bass nel grand staff
const SCROLL_OFFSET_Y = 20; // Offset verticale per lo scrolling per centrare meglio il sistema

// --- Funzioni Helper ---
function durationToTicks(durationString) {
    const BEAT_TICKS = Vex.Flow.RESOLUTION / 4;
    let ticks = 0;
    const baseDuration = durationString.replace(/[.d]/g, ''); // Rimuove sia . che d per il calcolo base

    switch (baseDuration) {
        case 'w': ticks = 4 * BEAT_TICKS; break;
        case 'h': ticks = 2 * BEAT_TICKS; break;
        case 'q': ticks = BEAT_TICKS; break;
        case '8': ticks = BEAT_TICKS / 2; break;
        case '16': ticks = BEAT_TICKS / 4; break;
        case '32': ticks = BEAT_TICKS / 8; break;
        default:
            console.warn(`Durata non riconosciuta: ${durationString}. Usando semiminima (q).`);
            ticks = BEAT_TICKS; // Fallback a semiminima
            break;
    }

    if (durationString.includes('.')) {
        let numDots = (durationString.match(/\./g) || []).length;
        let dotValue = ticks;
        for (let i = 0; i < numDots; i++) {
            dotValue /= 2;
            ticks += dotValue;
        }
    } else if (durationString.endsWith('d') && !durationString.includes('.')) {
         // La 'd' alla fine è un'alternativa per il punto, aggiunge metà del valore base
         // Assicurati che non ci siano punti E 'd' contemporaneamente nel formato atteso
         if (!durationString.includes('.')) {
             ticks = ticks * 1.5;
         } else {
             console.warn(`Formato durata misto punto/d non supportato: ${durationString}. Ignorando 'd'.`);
         }
    }
    return ticks;
}

function getTicksPerMeasure(timeSignature) {
    try {
        if (!timeSignature) return Vex.Flow.RESOLUTION; // Default 4/4
        const parts = timeSignature.split('/');
        if (parts.length !== 2) {
             console.warn("Formato indicazione tempo non valido:", timeSignature, "Fallback a 4/4.");
             return Vex.Flow.RESOLUTION;
        }
        const beats = parseInt(parts[0]);
        const beatValue = parseInt(parts[1]);
        if (isNaN(beats) || isNaN(beatValue) || beatValue === 0 || !Number.isInteger(beats) || !Number.isInteger(beatValue)) {
             console.warn("Valori indicazione tempo non validi:", timeSignature, "Fallback a 4/4.");
             return Vex.Flow.RESOLUTION;
        }
        // VexFlow.RESOLUTION è per una semibreve (whole note)
        // Ticks per battuta = (RESOLUTION / valore_battuta) * numero_battute
        return (Vex.Flow.RESOLUTION / beatValue) * beats;
    } catch (e) {
        console.error("Errore durante il parsing dell'indicazione tempo:", timeSignature, e);
        return Vex.Flow.RESOLUTION; // Fallback a 4/4
    }
}

/**
 * Calcola e aggiunge la proprietà `startTick` a ogni oggetto nota/pausa nell'array.
 * @param {Array<Object>} notesArray - Array di oggetti nota/pausa.
 * @param {number} ticksPerMeasure - Ticks per battuta.
 * @returns {Array<Object>} L'array modificato con `startTick` aggiunto.
 */
function calculateNoteTicks(notesArray, ticksPerMeasure) {
    if (!notesArray || !Array.isArray(notesArray)) return [];

    let currentTick = 0;
    let currentMeasureTick = 0; // Ticks all'interno della battuta corrente
    let currentMeasure = 0;

    return notesArray.map(note => {
        if (!note || typeof note !== 'object' || typeof note.duration !== 'string') {
            console.warn("Oggetto nota/pausa non valido trovato durante il calcolo dei ticks:", note);
            return null; // Salta oggetti non validi
        }

        const noteTicks = durationToTicks(note.duration);
        if (isNaN(noteTicks) || noteTicks <= 0) {
             console.warn(`Durata non valida o zero per la nota: ${note.duration}. Ticks calcolati: ${noteTicks}. Salto la nota.`);
             return null; // Salta note con ticks non validi
        }

        // Se la nota corrente supera la fine della battuta corrente, avanza alla battuta successiva
        // Questo è un controllo semplificato; una gestione più robusta richiederebbe l'inserimento automatico di pause
        // per riempire le battute incomplete, ma per esercizi strutturati battuta per battuta, questo è sufficiente.
        while (currentMeasureTick + noteTicks > ticksPerMeasure) {
             // console.warn(`Nota (${note.duration}, ${noteTicks} ticks) supera la fine della battuta ${currentMeasure}. Avanzo alla prossima battuta.`);
             currentMeasure++;
             currentMeasureTick = 0; // Ricomincia il conteggio dei ticks per la nuova battuta
             currentTick = currentMeasure * ticksPerMeasure; // Aggiorna il tick totale all'inizio della nuova battuta
        }


        const noteWithTick = { ...note, startTick: currentTick };

        // Aggiorna i ticks per la prossima nota
        currentTick += noteTicks;
        currentMeasureTick += noteTicks;

        // Se la nota corrente finisce esattamente alla fine della battuta, avanza alla battuta successiva
        if (currentMeasureTick === ticksPerMeasure) {
            currentMeasure++;
            currentMeasureTick = 0;
        }

        return noteWithTick;
    }).filter(note => note !== null); // Rimuove eventuali note nulle saltate
}


/**
 * Segmenta un array di note (già processate con startTick) in segmenti per riga.
 * @param {Array<Object>} notesArray - Array di oggetti nota/pausa con `startTick`.
 * @param {number} ticksPerMeasure - Ticks per battuta.
 * @param {number} measuresPerLine - Battute per riga.
 * @returns {Array<Array<Object>>} Array di array, dove ogni array interno è una riga.
 */
function segmentNotesByMeasure(notes, ticksPerMeasure, measuresPerLine) {
    if (!notes || !Array.isArray(notes) || notes.length === 0) return [];
    const segments = [];
    let currentSegment = [];
    let currentTickCount = 0; // Ticks accumulati nel segmento corrente
    const ticksPerLine = ticksPerMeasure * measuresPerLine;

    // Le note dovrebbero già avere startTick e durata valida da calculateNoteTicks
    const validNotes = notes.filter(note => note && typeof note.duration === 'string' && typeof note.startTick === 'number');

    validNotes.forEach(note => {
        const noteTicks = durationToTicks(note.duration);
         if (isNaN(noteTicks) || noteTicks <= 0) {
             console.warn("Nota con ticks non validi trovata durante la segmentazione, salto:", note);
             return;
         }

        // Calcola il tick di fine della nota corrente
        const noteEndTick = note.startTick + noteTicks;

        // Determina la fine della riga corrente basata sullo startTick della prima nota del segmento
        // e i ticks totali per riga.
        const segmentStartTick = currentSegment.length > 0 ? currentSegment[0].startTick : note.startTick;
        const currentLineEndTick = segmentStartTick + ticksPerLine;


        // Se la nota corrente inizia esattamente all'inizio di una nuova riga (o è la prima nota in assoluto)
        // O se la nota corrente supera la fine della riga corrente E il segmento non è vuoto
        // O se la nota stessa è più lunga di una riga intera (e il segmento è vuoto)
        if ( (currentSegment.length === 0 && note.startTick % ticksPerLine === 0) || // Inizia esattamente all'inizio di una riga vuota
             (currentSegment.length > 0 && note.startTick >= currentLineEndTick) || // Inizia dopo la fine della riga corrente
             (currentSegment.length === 0 && noteTicks > ticksPerLine) // Nota singola più lunga di una riga
           )
        {
             // Se il segmento corrente non è vuoto, chiudilo e aggiungilo ai segmenti
             if (currentSegment.length > 0) {
                segments.push(currentSegment);
             }
             // Inizia un nuovo segmento con la nota corrente
            currentSegment = [note];
            currentTickCount = noteTicks; // Il tick count del segmento riparte dal valore della prima nota

             // Se la nota è più lunga di una riga, mettila sul suo segmento e inizia un nuovo segmento vuoto
             if (noteTicks > ticksPerLine) {
                 console.warn(`Nota con durata ${note.duration} (${noteTicks} ticks) supera i ticks per riga (${ticksPerLine}). Posizionata sulla sua riga.`);
                 segments.push(currentSegment);
                 currentSegment = [];
                 currentTickCount = 0;
             }

        } else {
            // La nota rientra nella riga corrente
            currentSegment.push(note);
            currentTickCount += noteTicks; // Aggiorna il tick count del segmento (non strettamente necessario per la logica di segmentazione basata su startTick, ma utile per debug)
        }

        // Se la fine della nota corrente coincide esattamente con la fine di una riga, chiudi il segmento
        // Questo gestisce il caso in cui l'ultima nota di una riga riempie esattamente lo spazio.
        // Usa una piccola tolleranza per floating point issues se necessario, ma con ticks interi non dovrebbe servire.
        const currentSegmentStartTick = currentSegment.length > 0 ? currentSegment[0].startTick : 0; // Safety check
        if (currentSegment.length > 0 && noteEndTick === currentSegmentStartTick + ticksPerLine) {
             segments.push(currentSegment);
             currentSegment = [];
             currentTickCount = 0;
        }

    });

    // Aggiungi l'ultimo segmento se non è vuoto
    if (currentSegment.length > 0) {
        segments.push(currentSegment);
    }

    // Debugging: Controlla che i segmenti coprano tutti i ticks
    // console.log("Segmenti generati:", segments);
    // segments.forEach((seg, index) => {
    //     const segStart = seg[0].startTick;
    //     const segEnd = seg[seg.length - 1].startTick + durationToTicks(seg[seg.length - 1].duration);
    //     console.log(`  Segment ${index}: Start=${segStart}, End=${segEnd}, Notes=${seg.length}`);
    // });


    return segments;
}


function createStyledStaveNotes(noteDataArray, clefType, defaultFill = '#333', defaultStroke = '#333') {
    if (!noteDataArray || !Array.isArray(noteDataArray)) return [];

    return noteDataArray.map((noteData) => {
        // Assicurati che l'oggetto nota sia valido e abbia le proprietà necessarie
        if (!noteData || typeof noteData !== 'object' || !noteData.keys || !Array.isArray(noteData.keys) || noteData.keys.length === 0 || typeof noteData.duration !== 'string' || typeof noteData.startTick === 'undefined') {
             console.warn("Oggetto nota dati non valido o incompleto per VexFlow:", noteData);
             return null;
        }

        const isRest = noteData.keys[0].toLowerCase() === 'r' || noteData.keys[0].toLowerCase().startsWith('r/');
        const baseDuration = noteData.duration.replace(/[.d]/g, '');

        const noteConfig = {
            keys: isRest ? ["b/4"] : noteData.keys, // Le pause usano una chiave fittizia per il posizionamento
            duration: baseDuration,
            clef: clefType,
            type: isRest ? 'r' : undefined
        };

        let staveNote;
        try {
            staveNote = new StaveNote(noteConfig);
        } catch (e) {
            console.error("Errore nella creazione di StaveNote con config:", noteConfig, "Dati originali:", noteData, "Errore:", e);
            return null;
        }

        if (!isRest) {
            noteData.keys.forEach((key, keyIndex) => {
                const keyParts = key.split('/');
                if (keyParts.length < 2) return;
                const pitchName = keyParts[0];

                let accidentalSymbol = null;

                // Logica per determinare il simbolo dell'alterazione da VexFlow key string
                if (pitchName.length > 1) {
                    if (pitchName.endsWith("##")) {
                        accidentalSymbol = "##";
                    } else if (pitchName.endsWith("bb")) {
                        if (pitchName === "bb") { // Si bemolle
                            accidentalSymbol = "b";
                        } else { // Altri doppi bemolli (es. ebb)
                            accidentalSymbol = "bb";
                        }
                    } else if (pitchName.endsWith("#")) {
                        accidentalSymbol = "#";
                    } else if (pitchName.endsWith("b")) {
                        // Cattura cb, db, eb, fb, gb, ab. Non b (Si naturale).
                        accidentalSymbol = "b";
                    }
                }

                if (accidentalSymbol) {
                    try {
                        staveNote.addModifier(new Accidental(accidentalSymbol), keyIndex);
                    } catch (e) {
                        console.error("Errore nell'aggiunta dell'alterazione:", accidentalSymbol, "alla nota:", staveNote, "Errore:", e);
                    }
                }
            });

            // Aggiungi i punti di valore
            if (noteData.duration.includes('.')) {
                let numDots = (noteData.duration.match(/\./g) || []).length;
                for (let i = 0; i < numDots; i++) {
                     try { staveNote.addDotToAll(); } catch(e) { console.error("Errore nell'aggiunta del punto:", e, "Nota:", staveNote); }
                }
            } else if (noteData.duration.endsWith('d') && !noteData.duration.includes('.')) {
                 // Gestisce 'd' solo se non ci sono punti (per evitare ambiguità)
                 try { staveNote.addDotToAll(); } catch(e) { console.error("Errore nell'aggiunta del punto per 'd':", e, "Nota:", staveNote); }
            }
        }

        // Applica lo stile in base allo stato
        let fillStyle = defaultFill;
        let strokeStyle = defaultStroke;
        if (!isRest && noteData.status) {
            switch (noteData.status) {
                case 'correct': fillStyle = '#28a745'; strokeStyle = '#1c7430'; break; // Verde
                case 'incorrect': fillStyle = 'rgba(220, 53, 69, 0.4)'; strokeStyle = '#a71d2a'; break; // Rosso (semi-trasparente per non coprire)
                case 'expected': fillStyle = 'rgba(0, 123, 255, 0.3)'; strokeStyle = 'rgba(0, 123, 255, 0.5)'; break; // Blu (semi-trasparente)
                case 'pending': fillStyle = defaultFill; strokeStyle = defaultStroke; break; // Nero/Grigio di default
                default: break;
            }
        }
         try { staveNote.setStyle({ fillStyle: fillStyle, strokeStyle: strokeStyle }); } catch (e) { console.error("Errore nell'impostazione dello stile:", e, "Nota:", staveNote);}

        return staveNote;

    }).filter(note => note !== null); // Rimuove eventuali note nulle create da dati non validi
}


// --- Funzione Principale Esportata ---
/**
 * Renderizza l'esercizio musicale e restituisce informazioni utili per la logica dell'applicazione.
 * @param {string} elementId - ID dell'elemento DIV dove renderizzare.
 * @param {object} exercise - L'oggetto esercizio con i dati delle note.
 * @returns {{systemPositions: Array<{tick: number, y: number}>, totalTicks: number, processedNotes: {treble: Array<Object>, bass: Array<Object>, single: Array<Object>}}}
 *          Un oggetto contenente le posizioni verticali dei sistemi, il totale dei ticks dell'esercizio,
 *          e gli array di note processati con i `startTick`.
 */
export function renderExercise(elementId, exercise) {
    const scoreDiv = document.getElementById(elementId);
    if (!scoreDiv) { console.error(`Elemento "${elementId}" non trovato per il rendering.`); return { systemPositions: [], totalTicks: 0, processedNotes: {} }; }
    scoreDiv.innerHTML = ''; // Pulisce il contenuto precedente

     if (!exercise || typeof exercise !== 'object') {
        console.error("Oggetto esercizio non valido o mancante fornito a renderExercise.");
        scoreDiv.innerHTML = "<p style='color: red;'>Dati esercizio non validi per la visualizzazione.</p>";
        return { systemPositions: [], totalTicks: 0, processedNotes: {} };
     }

    const useGrandStaff = exercise.staveLayout === 'grand' || (exercise.notesTreble && exercise.notesBass);
    // Aggiungi un po' di spazio extra alla larghezza del renderer per evitare tagli
    const rendererWidth = scoreDiv.clientWidth > 0 ? scoreDiv.clientWidth - 20 : 780; // Riduci il margine a 20px
    const ticksPerMeasure = getTicksPerMeasure(exercise.timeSignature || "4/4");

    // --- Calcola i ticks per tutte le note PRIMA della segmentazione ---
    const processedNotesTreble = calculateNoteTicks(exercise.notesTreble, ticksPerMeasure);
    const processedNotesBass = calculateNoteTicks(exercise.notesBass, ticksPerMeasure);
    const processedNotesSingle = !useGrandStaff ? calculateNoteTicks(exercise.notes, ticksPerMeasure) : [];

    // Determina il totale dei ticks dell'esercizio (il tick finale + durata dell'ultima nota)
    // Trova l'ultimo tick tra tutti i pentagrammi
    let lastTick = 0;
    const allProcessedNotes = [...processedNotesTreble, ...processedNotesBass, ...processedNotesSingle];
    allProcessedNotes.forEach(note => {
        if (note && typeof note.startTick === 'number' && typeof note.duration === 'string') {
            const noteTicks = durationToTicks(note.duration);
            if (!isNaN(noteTicks)) {
                 lastTick = Math.max(lastTick, note.startTick + noteTicks);
            }
        }
    });
    const totalTicks = lastTick; // Il totale dei ticks è il tick finale raggiunto

    // --- Segmenta le note processate per riga ---
    const trebleSegments = segmentNotesByMeasure(processedNotesTreble, ticksPerMeasure, MEASURES_PER_LINE);
    const bassSegments = segmentNotesByMeasure(processedNotesBass, ticksPerMeasure, MEASURES_PER_LINE);
    const singleStaveSegments = segmentNotesByMeasure(processedNotesSingle, ticksPerMeasure, MEASURES_PER_LINE);


    const numSystems = useGrandStaff
        ? Math.max(trebleSegments.length, bassSegments.length)
        : singleStaveSegments.length;

     if (numSystems === 0) {
        const hadInputNotes = (exercise.notesTreble && exercise.notesTreble.length > 0) ||
                              (exercise.notesBass && exercise.notesBass.length > 0) ||
                              (exercise.notes && exercise.notes.length > 0);
         if (hadInputNotes) {
             console.warn("Nessuna nota valida trovata per il rendering dopo il calcolo dei ticks/segmentazione.");
             scoreDiv.innerHTML = "<p>Le note dell'esercizio non sono valide per la visualizzazione.</p>";
         } else {
             console.log("Nessuna nota fornita per l'esercizio.");
             scoreDiv.innerHTML = "<p>Nessuna nota da visualizzare per questo esercizio.</p>";
         }
         return { systemPositions: [], totalTicks: totalTicks, processedNotes: { treble: processedNotesTreble, bass: processedNotesBass, single: processedNotesSingle } };
     }

    const estimatedSystemHeight = useGrandStaff ? SYSTEM_SPACING : SINGLE_STAVE_SYSTEM_SPACING;
    const startYOffset = useGrandStaff ? STAVE_START_Y_GRAND + STAVE_VERTICAL_DISTANCE : STAVE_START_Y_SINGLE;
    // Aggiungi spazio extra in fondo per l'ultimo sistema
    const totalHeight = Math.max(startYOffset + (numSystems * estimatedSystemHeight) + 100, 300); // Aumentato il padding finale

    const factory = new Factory({ renderer: { elementId: elementId, width: rendererWidth + 40, height: totalHeight } }); // Aumenta la larghezza del canvas
    const context = factory.getContext();
    context.setFont('Arial', 10);
    context.clear();

    const systemPositions = []; // Array per memorizzare le posizioni verticali dei sistemi

    try {
        for (let i = 0; i < numSystems; i++) {
            const staveWidth = rendererWidth;
            let staveTreble = null, staveBass = null;
            let notesVexTreble = []; let notesVexBass = [];
            const voicesToFormat = []; let voiceTreble = null; let voiceBass = null;
            const isFirstSystem = (i === 0);

            const systemY_Treble = (useGrandStaff ? STAVE_START_Y_GRAND : STAVE_START_Y_SINGLE) + (i * (useGrandStaff ? SYSTEM_SPACING : SINGLE_STAVE_SYSTEM_SPACING));
            const systemY_Bass = STAVE_START_Y_GRAND + STAVE_VERTICAL_DISTANCE + (i * SYSTEM_SPACING);

             if (useGrandStaff) {
                staveTreble = new Stave(STAVE_START_X, systemY_Treble, staveWidth);
                staveBass = new Stave(STAVE_START_X, systemY_Bass, staveWidth);

                if (isFirstSystem) {
                    staveTreble.addClef('treble').addTimeSignature(exercise.timeSignature || "4/4");
                    staveBass.addClef('bass').addTimeSignature(exercise.timeSignature || "4/4");
                    if (exercise.keySignature) {
                        staveTreble.addKeySignature(exercise.keySignature);
                        staveBass.addKeySignature(exercise.keySignature);
                    }
                    new Vex.Flow.StaveConnector(staveTreble, staveBass).setType(Vex.Flow.StaveConnector.type.BRACE).setContext(context).draw();
                    new Vex.Flow.StaveConnector(staveTreble, staveBass).setType(Vex.Flow.StaveConnector.type.SINGLE_LEFT).setContext(context).draw();
                } else {
                    staveTreble.addClef('treble');
                    staveBass.addClef('bass');
                    new Vex.Flow.StaveConnector(staveTreble, staveBass).setType(Vex.Flow.StaveConnector.type.SINGLE_LEFT).setContext(context).draw();
                }
                 staveTreble.setContext(context).draw();
                 staveBass.setContext(context).draw();

            } else { // Single Staff
                const clef = exercise.clef || 'treble';
                staveTreble = new Stave(STAVE_START_X, systemY_Treble, staveWidth); // Usiamo staveTreble anche per single staff
                if (isFirstSystem) {
                    staveTreble.addClef(clef).addTimeSignature(exercise.timeSignature || "4/4");
                    if (exercise.keySignature) staveTreble.addKeySignature(exercise.keySignature);
                } else {
                    staveTreble.addClef(clef);
                }
                staveTreble.setContext(context).draw();
                // Connettore singolo a sinistra per un solo pentagramma
                new Vex.Flow.StaveConnector(staveTreble, null).setType(Vex.Flow.StaveConnector.type.SINGLE_LEFT).setContext(context).draw();
                 if (clef === 'bass') staveBass = staveTreble; // Se è basso, usa lo stesso riferimento
            }

            // Calcola il tick iniziale di questo sistema
            let systemStartTick = Infinity;
            if (useGrandStaff) {
                 if (trebleSegments[i] && trebleSegments[i].length > 0) systemStartTick = Math.min(systemStartTick, trebleSegments[i][0].startTick);
                 if (bassSegments[i] && bassSegments[i].length > 0) systemStartTick = Math.min(systemStartTick, bassSegments[i][0].startTick);
            } else {
                 if (singleStaveSegments[i] && singleStaveSegments[i].length > 0) systemStartTick = singleStaveSegments[i][0].startTick;
            }
            // Aggiungi la posizione del sistema all'array (usa la Y del pentagramma superiore)
            if (systemStartTick !== Infinity) {
                 systemPositions.push({ tick: systemStartTick, y: staveTreble.getYForTopText() - SCROLL_OFFSET_Y });
            }


            const numBeatsForVoice = ticksPerMeasure * MEASURES_PER_LINE / (Vex.Flow.RESOLUTION / 4); // Beats totali per riga

            if (useGrandStaff) {
                if (trebleSegments[i] && trebleSegments[i].length > 0) {
                    notesVexTreble = createStyledStaveNotes(trebleSegments[i], 'treble');
                    if (notesVexTreble.length > 0) {
                         try { voiceTreble = new Voice({ num_beats: numBeatsForVoice, beat_value: 4 }).setMode(Vex.Flow.Voice.Mode.SOFT).addTickables(notesVexTreble); voicesToFormat.push(voiceTreble); } catch (e) { console.error("Errore nella creazione della voce treble:", e, notesVexTreble); }
                    }
                }
                if (bassSegments[i] && bassSegments[i].length > 0) {
                    notesVexBass = createStyledStaveNotes(bassSegments[i], 'bass');
                     if (notesVexBass.length > 0) {
                         try { voiceBass = new Voice({ num_beats: numBeatsForVoice, beat_value: 4 }).setMode(Vex.Flow.Voice.Mode.SOFT).addTickables(notesVexBass); voicesToFormat.push(voiceBass); } catch (e) { console.error("Errore nella creazione della voce bass:", e, notesVexBass); }
                     }
                }
            } else { // Single Staff
                const clefType = exercise.clef || 'treble';
                if (singleStaveSegments[i] && singleStaveSegments[i].length > 0) {
                    const styledNotes = createStyledStaveNotes(singleStaveSegments[i], clefType);
                     if (styledNotes.length > 0) {
                         try {
                             const singleVoice = new Voice({ num_beats: numBeatsForVoice, beat_value: 4 }).setMode(Vex.Flow.Voice.Mode.SOFT).addTickables(styledNotes);
                             voicesToFormat.push(singleVoice);
                             if (clefType === 'bass') {
                                 notesVexBass = styledNotes; voiceBass = singleVoice; // Usa bass per coerenza interna se clef è bass
                             } else {
                                 notesVexTreble = styledNotes; voiceTreble = singleVoice; // Usa treble per coerenza interna se clef è treble
                             }
                         } catch (e) { console.error("Errore nella creazione della voce single stave:", e, styledNotes); }
                    }
                }
            }

             if (voicesToFormat.length > 0) {
                const formatter = new Formatter();
                // Calcola la larghezza richiesta per formattare le voci
                const requiredWidth = formatter.preCalculateMinTotalWidth(voicesToFormat);
                // Usa la larghezza della stave, ma assicurati che sia sufficiente per il contenuto
                const formatWidth = Math.max(staveWidth - 40, requiredWidth + 20); // Lascia un po' di margine

                 try {
                     // Formatta le voci
                     formatter.format(voicesToFormat, formatWidth > 0 ? formatWidth : undefined, { align_rests: true, context: context });
                 } catch (e) {
                     console.warn(`Errore Formatter sistema ${i+1} (larghezza: ${formatWidth}):`, e, "Voci:", voicesToFormat);
                     // Tentativo di fallback senza larghezza specifica
                     try {
                          console.log("Ritento la formattazione senza larghezza specifica...");
                          formatter.format(voicesToFormat, undefined, { align_rests: true, context: context });
                     } catch (e2) {
                          console.error(`Formatter di fallback fallito sistema ${i+1}:`, e2, "Voci:", voicesToFormat);
                          continue; // Salta il disegno di questo sistema se la formattazione fallisce
                     }
                 }

                 try {
                    // Disegna le voci e i beams
                    voicesToFormat.forEach(voice => {
                        // Determina su quale pentagramma disegnare la voce
                        const targetStave = (voice === voiceBass && staveBass) ? staveBass : staveTreble;
                         if (targetStave) {
                             voice.draw(context, targetStave);
                             // Genera e disegna i beams per le note connesse
                             Vex.Flow.Beam.generateBeams(voice.getTickables()).forEach(beam => beam.setContext(context).draw());
                         } else {
                             console.warn("Pentagramma target mancante per la voce, salto il disegno. Voce:", voice);
                         }
                     });
                 } catch (drawError) {
                     console.error(`Errore nel disegno di voci o beams per il sistema ${i+1}:`, drawError);
                 }
            } else {
                 console.log(`Sistema ${i+1}: Nessuna voce valida da formattare o disegnare.`);
             }
        }
    } catch (error) {
        console.error("Errore generale durante il rendering VexFlow:", error);
        scoreDiv.innerHTML = `<p style="color: red;">Errore VexFlow: ${error.message}</p><pre>${error.stack}</pre>`;
         // Restituisci i dati processati anche in caso di errore di rendering
        return { systemPositions: systemPositions, totalTicks: totalTicks, processedNotes: { treble: processedNotesTreble, bass: processedNotesBass, single: processedNotesSingle } };
    }

    // Restituisci le note processate (con startTick e stato) e le posizioni dei sistemi
    return {
        systemPositions: systemPositions,
        totalTicks: totalTicks,
        processedNotes: {
            treble: processedNotesTreble,
            bass: processedNotesBass,
            single: processedNotesSingle
        }
    };
}