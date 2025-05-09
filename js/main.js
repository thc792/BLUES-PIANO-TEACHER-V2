/**
 * main.js - Logica principale e gestione eventi Piano Future.
 *
 * Piano Future
 * Copyright (c) 2025 Lorenzetti Giuseppe
 *
 * Questo codice sorgente è rilasciato sotto la licenza MIT.
 * Vedi il file LICENSE nel repository GitHub per i dettagli completi.
 * https://github.com/thc792/piano-tutor-extraime/blob/main/LICENSE
 */

/**
 * js/main.js
 * **VERSIONE MODIFICATA: Avanzamento basato sui ticks e gestione note contemporanee.**
 * Implementa l'avanzamento passo-passo basato sulla posizione temporale (ticks)
 * e richiede il completamento di tutte le note/accordi attesi a un dato tick
 * prima di avanzare. Gestisce lo scrolling dello spartito.
 */

import { renderExercise } from './vexflow_renderer.js';
import { initializeMIDI } from './midi_handler.js';

// --- Costanti e Riferimenti DOM ---
const categorySelect = document.getElementById('category-select');
const exerciseSelect = document.getElementById('exercise-select');
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const scoreDiv = document.getElementById('score'); // Riferimento diretto al div score
const midiStatusSpan = document.getElementById('midi-status');
const successRateSpan = document.getElementById('success-rate');
const expectedNoteSpan = document.getElementById('expected-note');
const playedNoteSpan = document.getElementById('played-note');

// === Array per categorie con avanzamento ordinato ===
// Le categorie qui elencate avanzeranno sequenzialmente tra i loro esercizi.
// Le altre categorie avanzeranno in modo random (diverso dal precedente).
const ORDERED_CATEGORIES = ['charper_1']; // Aggiungi qui altre chiavi se necessario

// --- Stato Applicazione ---
let allExercises = {}; // Contiene i dati originali degli esercizi caricati
let currentExerciseDefinition = null; // La definizione dell'esercizio selezionato
let currentExerciseData = null; // Copia deep dei dati dell'esercizio con stato (pending, correct, etc.) e startTick
let isPlaying = false;
let midiReady = false;
let exerciseCompletionTimeout = null; // Timeout per l'avanzamento automatico al prossimo esercizio

// --- Stato Avanzamento Esercizio ---
let currentTick = 0; // La posizione temporale corrente nell'esercizio (in ticks VexFlow)
let totalTicks = 0; // Il totale dei ticks dell'esercizio
let currentRepetition = 1;
let targetRepetitions = 1;
let systemYPositions = []; // Array di { tick: startTick, y: yPos } per lo scrolling

// --- Funzioni Inizializzazione e Caricamento Dati ---

/**
 * Carica i dati degli esercizi dalla variabile globale `window.exerciseData`.
 * Esegue una validazione preliminare e popola il selettore delle categorie.
 */
function loadExerciseData() {
    if (window.exerciseData) {
        allExercises = window.exerciseData;
        console.log("Dati degli esercizi caricati.");
        // La validazione più approfondita (inclusi i dati MIDI) avverrà in `selectExercise`
        // dopo che l'utente ha scelto un esercizio.
    } else {
        console.error("Errore critico nel caricamento dei dati: window.exerciseData non è stato trovato.");
        alert("Errore nel caricamento degli esercizi. Controlla la console per i dettagli.");
    }
    populateCategorySelect();
}

/**
 * Popola il selettore delle categorie basandosi sulle chiavi presenti in `allExercises`.
 */
function populateCategorySelect() {
    const categories = Object.keys(allExercises);
    categorySelect.innerHTML = '<option value="">-- Seleziona Categoria --</option>';
    categories.forEach(catKey => {
        // Aggiungi la categoria solo se contiene un array non vuoto di esercizi
        if (Array.isArray(allExercises[catKey]) && allExercises[catKey].length > 0) {
            const option = document.createElement('option');
            option.value = catKey;
            // Formattazione del nome per la visualizzazione (opzionale)
            option.textContent = catKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            categorySelect.appendChild(option);
        } else {
            console.warn(`Categoria "${catKey}" ignorata perché vuota o non è un array.`);
        }
    });
}

/**
 * Popola il selettore degli esercizi per la categoria selezionata.
 * @param {string} categoryKey - La chiave della categoria selezionata.
 */
function populateExerciseSelect(categoryKey) {
    exerciseSelect.innerHTML = '<option value="">-- Seleziona Esercizio --</option>';
    exerciseSelect.disabled = true; // Disabilita di default

    if (categoryKey && allExercises[categoryKey] && Array.isArray(allExercises[categoryKey])) {
        const exercises = allExercises[categoryKey];
        let hasValidExercises = false;
        exercises.forEach(ex => {
            // Aggiungi solo esercizi che hanno un ID valido
            if (ex && ex.id) {
                const option = document.createElement('option');
                option.value = ex.id;
                option.textContent = ex.name || ex.id; // Usa il nome se esiste, altrimenti l'ID
                exerciseSelect.appendChild(option);
                hasValidExercises = true;
            } else {
                console.warn("Trovato un esercizio senza ID nella categoria:", categoryKey);
            }
        });

        if (hasValidExercises) {
            exerciseSelect.disabled = false; // Abilita solo se ci sono esercizi validi
        } else {
            exerciseSelect.innerHTML = '<option value="">-- Nessun esercizio valido --</option>';
        }
    } else if (categoryKey) {
        console.warn(`Categoria "${categoryKey}" selezionata non valida o non contiene un array.`);
        exerciseSelect.innerHTML = '<option value="">-- Errore Categoria --</option>';
    } else {
         // Caso in cui viene deselezionata la categoria ("-- Seleziona Categoria --")
         exerciseSelect.innerHTML = '<option value="">-- Seleziona Categoria --</option>';
    }

    // Resetta sempre lo stato UI e il visualizzatore quando cambia la categoria o non ci sono esercizi
    resetUIState();
    scoreDiv.innerHTML = '<p>Seleziona un esercizio per iniziare.</p>';
    startButton.disabled = true;
    currentExerciseData = null; // Assicura che nessun esercizio sia considerato attivo
    currentExerciseDefinition = null;
    totalTicks = 0; // Resetta i ticks totali
    systemYPositions = []; // Resetta le posizioni dei sistemi
}

/**
 * Seleziona un esercizio, carica i suoi dati, li valida, calcola i ticks
 * e renderizza lo spartito.
 * @param {string} exerciseId - L'ID dell'esercizio da selezionare.
 * @param {string} categoryKey - La chiave della categoria dell'esercizio.
 */
function selectExercise(exerciseId, categoryKey) {
    // Validazione input
    if (!exerciseId || !categoryKey || !allExercises[categoryKey] || !Array.isArray(allExercises[categoryKey])) {
        console.warn("Tentativo di selezionare un esercizio con ID o categoria non validi:", exerciseId, categoryKey);
        currentExerciseData = null;
        currentExerciseDefinition = null;
        startButton.disabled = true;
        totalTicks = 0;
        systemYPositions = [];
        scoreDiv.innerHTML = '<p>Selezione non valida o categoria errata.</p>';
        resetUIState();
        return;
    }

    // Trova la definizione dell'esercizio originale
    const definition = allExercises[categoryKey].find(ex => ex && ex.id === exerciseId);

    if (definition) {
        console.log("Esercizio selezionato:", definition.name || definition.id);

        // Crea una copia deep per lo stato di runtime
        currentExerciseData = JSON.parse(JSON.stringify(definition));
        currentExerciseDefinition = definition; // Mantieni un riferimento alla definizione originale

        // Renderizza l'esercizio e ottieni i dati processati e le posizioni dei sistemi
        // Il renderer ora calcola i ticks e aggiunge lo stato iniziale 'pending'/'rest'
        const renderResult = renderExercise(scoreDiv.id, currentExerciseData);

        // Aggiorna i dati dell'esercizio con i ticks calcolati e lo stato iniziale
        // (Il renderer modifica la copia passata, ma riassegniamo per chiarezza)
        currentExerciseData.notesTreble = renderResult.processedNotes.treble;
        currentExerciseData.notesBass = renderResult.processedNotes.bass;
        currentExerciseData.notes = renderResult.processedNotes.single; // Per single stave

        totalTicks = renderResult.totalTicks;
        systemYPositions = renderResult.systemPositions;

        // Verifica se ci sono note suonabili (non pause) con startTick valido
        const hasPlayableNotes = [...currentExerciseData.notesTreble, ...currentExerciseData.notesBass, ...currentExerciseData.notes]
            .some(note => note && typeof note.startTick === 'number' && note.startTick >= 0 &&
                          !(note.keys && note.keys[0]?.toLowerCase().startsWith('r/')));

        // Imposta le ripetizioni
        targetRepetitions = currentExerciseDefinition.repetitions || 1;
        console.log(`Totale ticks esercizio: ${totalTicks}, Ripetizioni target: ${targetRepetitions}`);

        // Abilita il pulsante Start solo se MIDI è pronto E ci sono note suonabili
        startButton.disabled = !midiReady || !hasPlayableNotes;

        // Resetta l'interfaccia utente per il nuovo esercizio
        resetUIState();
        stopButton.disabled = true; // Stop è disabilitato finché non si preme start

        // Aggiorna il messaggio iniziale
        if (!midiReady) {
             updateInfo("Collega un dispositivo MIDI e premi Start.");
        } else if (!hasPlayableNotes) {
             updateInfo("Questo esercizio non ha note da suonare.");
        } else {
             updateInfo("MIDI pronto. Premi Start.");
        }


    } else {
        // Esercizio non trovato (non dovrebbe succedere se populate è corretto)
        console.error(`Errore interno: Esercizio con ID "${exerciseId}" non trovato nella categoria "${categoryKey}" dopo la selezione.`);
        currentExerciseData = null;
        currentExerciseDefinition = null;
        startButton.disabled = true;
        totalTicks = 0;
        systemYPositions = [];
        scoreDiv.innerHTML = `<p>Errore nel caricamento dell'esercizio.</p>`;
        resetUIState();
    }
}

// --- Gestione Stato Esercizio e Avanzamento ---

/**
 * Resetta lo stato di tutte le note nell'esercizio corrente a 'pending' o 'rest'.
 * Viene chiamato all'inizio di ogni ripetizione.
 */
function resetNoteStates() {
    if (!currentExerciseData) return;

    // Resetta lo stato di tutte le note suonabili a 'pending' e le pause a 'rest'
    const resetArray = (notesArray) => {
        if (!notesArray) return;
        notesArray.forEach(noteObj => {
            if (noteObj && typeof noteObj === 'object') {
                if (noteObj.keys && Array.isArray(noteObj.keys) && noteObj.keys[0]?.toLowerCase().startsWith('r/')) {
                    noteObj.status = 'rest';
                } else if (typeof noteObj.midiValue === 'number' || (Array.isArray(noteObj.midiValues) && noteObj.midiValues.length > 0)) {
                    noteObj.status = 'pending';
                    // Resetta l'array delle note corrette per gli accordi
                    if (Array.isArray(noteObj.midiValues)) {
                        noteObj.correctMidiValues = [];
                    }
                } else {
                    // Oggetto non riconosciuto, marca come ignorato
                    noteObj.status = 'ignored';
                }
            }
        });
    };

    resetArray(currentExerciseData.notesTreble);
    resetArray(currentExerciseData.notesBass);
    resetArray(currentExerciseData.notes); // Per single stave
}

/**
 * Trova e marca come 'expected' tutte le note/accordi il cui `startTick`
 * corrisponde al `currentTick` e il cui stato è 'pending'.
 * Aggiorna anche il messaggio UI con le note attese.
 */
function updateExpectedNotes() {
    if (!currentExerciseData) return;

    const notesAtCurrentTick = [];
    const allNotes = [...currentExerciseData.notesTreble, ...currentExerciseData.notesBass, ...currentExerciseData.notes];

    // Trova tutte le note/accordi che iniziano esattamente al currentTick e sono 'pending'
    allNotes.forEach(noteObj => {
        if (noteObj && noteObj.status === 'pending' && noteObj.startTick === currentTick) {
            noteObj.status = 'expected'; // Marca come attesa
            // Per gli accordi, assicurati che correctMidiValues sia vuoto all'inizio del passo
            if (Array.isArray(noteObj.midiValues)) {
                 noteObj.correctMidiValues = [];
            }
            notesAtCurrentTick.push(noteObj);
        }
        // Opzionale: Resetta lo stato 'expected' per note che sono state superate dal currentTick
        // Questo non dovrebbe succedere con la logica attuale, ma è una safety net.
        if (noteObj && noteObj.status === 'expected' && noteObj.startTick < currentTick) {
             noteObj.status = 'pending'; // O 'ignored' a seconda della logica desiderata per note saltate
        }
    });

    // Aggiorna il messaggio UI con le note attese
    if (notesAtCurrentTick.length > 0) {
        const expectedText = notesAtCurrentTick.map(noteObj => {
            if (noteObj.keys && noteObj.keys[0]?.toLowerCase().startsWith('r/')) return "Pausa"; // Non dovrebbe essere 'expected' ma per sicurezza
            if (noteObj.keys) return noteObj.keys.join(', '); // Usa le chiavi VexFlow
            if (Array.isArray(noteObj.midiValues)) return `Accordo (${noteObj.midiValues.join(', ')})`;
            if (typeof noteObj.midiValue === 'number') return `Nota MIDI ${noteObj.midiValue}`;
            return "Nota sconosciuta";
        }).join(' | '); // Separa le note attese con un pipe

        updateInfo(`Atteso: ${expectedText}`);
    } else if (currentTick < totalTicks) {
         // Questo caso si verifica se non ci sono note suonabili al currentTick (es. solo pause)
         // o se c'è un errore nella logica di avanzamento.
         // Se ci sono solo pause al currentTick, l'avanzamento dovrebbe essere automatico.
         // Se non ci sono note *e* non ci sono pause, c'è un problema nei dati o nella logica.
         const notesOrRestsAtCurrentTick = allNotes.filter(noteObj => noteObj && noteObj.startTick === currentTick);
         if (notesOrRestsAtCurrentTick.length > 0 && notesOrRestsAtCurrentTick.every(n => n.keys && n.keys[0]?.toLowerCase().startsWith('r/'))) {
             // Solo pause al currentTick, avanza automaticamente
             console.log(`Solo pause al tick ${currentTick}. Avanzamento automatico.`);
             updateInfo("Pausa...");
             // Breve ritardo prima di avanzare per dare tempo di leggere "Pausa..."
             setTimeout(checkAndAdvanceStep, 500); // Avanza dopo 500ms
         } else {
             console.warn(`Nessuna nota 'pending' o 'rest' trovata al currentTick ${currentTick}. Potenziale errore logico o dati esercizio.`);
             updateInfo("In attesa..."); // Messaggio generico
         }
    } else {
        // currentTick >= totalTicks, l'esercizio è finito o in fase di completamento
        updateInfo("Esercizio completato o in attesa.");
    }
}

/**
 * Controlla se tutte le note/accordi attesi al `currentTick` sono stati completati.
 * Se sì, avanza il `currentTick` al prossimo passo e aggiorna lo stato.
 */
function checkAndAdvanceStep() {
    if (!isPlaying || !currentExerciseData) return;

    const notesAtCurrentTick = [...currentExerciseData.notesTreble, ...currentExerciseData.notesBass, ...currentExerciseData.notes]
        .filter(noteObj => noteObj && noteObj.startTick === currentTick && !(noteObj.keys && noteObj.keys[0]?.toLowerCase().startsWith('r/'))); // Considera solo note suonabili

    // Se non ci sono note suonabili a questo tick (es. solo pause), il passo è considerato completo
    if (notesAtCurrentTick.length === 0) {
         console.log(`Nessuna nota suonabile al tick ${currentTick}. Passo considerato completo.`);
         // Trova il prossimo tick valido
         const allNotesAndRests = [...currentExerciseData.notesTreble, ...currentExerciseData.notesBass, ...currentExerciseData.notes];
         const nextTicks = allNotesAndRests
             .filter(noteObj => noteObj && typeof noteObj.startTick === 'number' && noteObj.startTick > currentTick)
             .map(noteObj => noteObj.startTick);

         const nextTick = Math.min(...nextTicks); // Trova il minimo tra i tick successivi

         if (isFinite(nextTick)) { // Se è stato trovato un tick successivo valido
             currentTick = nextTick;
             console.log(`Avanzamento automatico al prossimo tick: ${currentTick}`);
             // Aggiorna lo stato delle note per il nuovo tick
             updateExpectedNotes();
             // Rerenderizza lo spartito con i nuovi stati
             renderExercise(scoreDiv.id, currentExerciseData);
             // Controlla e gestisci lo scrolling
             scrollToCurrentSystem();
         } else {
             // Nessun tick successivo trovato, l'esercizio è finito
             console.log("Nessun tick successivo trovato. Esercizio completato.");
             handleExerciseCompletion();
         }
         return; // Esci dalla funzione, il passo è stato gestito (avanzato o finito)
    }


    // Controlla se tutte le note/accordi attesi a questo tick sono stati completati
    const allNotesInStepCompleted = notesAtCurrentTick.every(noteObj => {
        if (typeof noteObj.midiValue === 'number') {
            return noteObj.status === 'correct'; // Nota singola
        } else if (Array.isArray(noteObj.midiValues)) {
            // Accordo: tutte le note MIDI dell'accordo devono essere state suonate
            return noteObj.status === 'correct' && noteObj.correctMidiValues && noteObj.correctMidiValues.length >= noteObj.midiValues.length;
        }
        return false; // Oggetto non valido
    });

    if (allNotesInStepCompleted) {
        console.log(`Passo al tick ${currentTick} completato!`);

        // Trova il prossimo tick valido (il minimo startTick > currentTick)
        const allNotesAndRests = [...currentExerciseData.notesTreble, ...currentExerciseData.notesBass, ...currentExerciseData.notes];
         const nextTicks = allNotesAndRests
             .filter(noteObj => noteObj && typeof noteObj.startTick === 'number' && noteObj.startTick > currentTick)
             .map(noteObj => noteObj.startTick);

         const nextTick = Math.min(...nextTicks); // Trova il minimo tra i tick successivi

        if (isFinite(nextTick)) { // Se è stato trovato un tick successivo valido
            currentTick = nextTick;
            console.log(`Avanzamento al prossimo tick: ${currentTick}`);
            // Aggiorna lo stato delle note per il nuovo tick
            updateExpectedNotes();
            // Rerenderizza lo spartito con i nuovi stati
            renderExercise(scoreDiv.id, currentExerciseData);
            // Controlla e gestisci lo scrolling
            scrollToCurrentSystem();
        } else {
            // Nessun tick successivo trovato, l'esercizio è finito
            console.log("Nessun tick successivo trovato. Esercizio completato.");
            handleExerciseCompletion();
        }
    } else {
        // Il passo corrente non è ancora completato, continua ad aspettare input MIDI
        console.log(`Passo al tick ${currentTick} non ancora completato. In attesa...`);
        // Non fare nulla qui, l'input MIDI successivo chiamerà di nuovo handleNoteOn -> checkAndAdvanceStep
    }
}

/**
 * Avvia l'esecuzione dell'esercizio selezionato.
 */
function startExercise() {
    // Verifica le pre-condizioni per l'avvio
    const hasPlayableNotes = [...currentExerciseData.notesTreble, ...currentExerciseData.notesBass, ...currentExerciseData.notes]
            .some(note => note && typeof note.startTick === 'number' && note.startTick >= 0 &&
                          !(note.keys && note.keys[0]?.toLowerCase().startsWith('r/')));

    if (!currentExerciseData || !midiReady || !hasPlayableNotes || isPlaying) {
         console.warn("Impossibile avviare l'esercizio. Controlla stato MIDI, selezione esercizio, presenza note suonabili e se è già in corso.");
         // Fornisci feedback all'utente se necessario
         if (!midiReady) updateInfo("Collega un dispositivo MIDI.");
         else if (!currentExerciseData) updateInfo("Seleziona un esercizio.");
         else if (!hasPlayableNotes) updateInfo("Questo esercizio non ha note da suonare.");
         else if (isPlaying) updateInfo("Esercizio già in corso.");
         return;
    }

    // Pulisci eventuali timeout precedenti per il passaggio automatico
    if (exerciseCompletionTimeout) {
        clearTimeout(exerciseCompletionTimeout);
        exerciseCompletionTimeout = null;
    }

    currentRepetition = 1;       // Inizia dalla prima ripetizione
    currentTick = 0;             // Inizia dall'inizio dell'esercizio
    resetNoteStates();           // Resetta lo stato di tutte le note a 'pending'/'rest'
    console.log("Avvio Esercizio:", currentExerciseDefinition.name || currentExerciseDefinition.id, `- Ripetizione ${currentRepetition}/${targetRepetitions}`);

    isPlaying = true;           // Imposta lo stato globale
    // Aggiorna UI
    startButton.disabled = true;
    stopButton.disabled = false;
    categorySelect.disabled = true;
    exerciseSelect.disabled = true;
    updateSuccessRate();        // Aggiorna la percentuale di successo (inizialmente 0%)
    playedNoteSpan.textContent = '--'; // Pulisci l'ultima nota suonata

    // Marca le prime note/accordi come 'expected' e aggiorna l'UI
    updateExpectedNotes();
    // Renderizza lo stato iniziale (le prime note saranno evidenziate come 'expected')
    renderExercise(scoreDiv.id, currentExerciseData);
    // Assicurati che lo spartito sia all'inizio
    scoreDiv.scrollTop = 0;

    // Il messaggio UI è già stato aggiornato da updateExpectedNotes
    // updateInfo(`Ripetizione ${currentRepetition}/${targetRepetitions}. Suona la prima nota.`);
}

/**
 * Ferma l'esecuzione dell'esercizio.
 */
function stopExercise() {
     if (!isPlaying && stopButton.disabled) return; // Evita azioni multiple se già fermo

     // Pulisci timeout per avanzamento automatico se presente
    if (exerciseCompletionTimeout) {
        clearTimeout(exerciseCompletionTimeout);
        exerciseCompletionTimeout = null;
    }

    console.log("Arresto manuale dell'esercizio.");
    isPlaying = false;

    // Resetta lo stato delle note nell'esercizio corrente (se esiste) e renderizza lo stato 'pulito'
    if (currentExerciseData) {
        resetNoteStates(); // Riporta le note a 'pending'/'rest'
        currentTick = 0; // Resetta il tick corrente
        // Rerenderizza per mostrare lo spartito senza evidenziazioni di stato
        renderExercise(scoreDiv.id, currentExerciseData);
    } else {
        // Se non c'è un esercizio caricato, assicurati che lo score sia vuoto o mostri un messaggio
        scoreDiv.innerHTML = '<p>Nessun esercizio attivo.</p>';
    }

    // Riabilita i controlli
    // Lo start button va riabilitato solo se le condizioni sono soddisfatte
    const hasPlayableNotes = currentExerciseData ? [...currentExerciseData.notesTreble, ...currentExerciseData.notesBass, ...currentExerciseData.notes]
            .some(note => note && typeof note.startTick === 'number' && note.startTick >= 0 &&
                          !(note.keys && note.keys[0]?.toLowerCase().startsWith('r/'))) : false;
    startButton.disabled = !midiReady || !currentExerciseData || !hasPlayableNotes;
    stopButton.disabled = true; // Disabilita stop perché l'esercizio è fermo
    categorySelect.disabled = false;
    exerciseSelect.disabled = false;

    // Resetta i messaggi di stato
    updateInfo("Esercizio interrotto. Pronto per iniziare.");
    // Non resettare la success rate qui, potrebbe essere utile vederla fino al prossimo start
    // successRateSpan.textContent = '-- %';
    playedNoteSpan.textContent = '--';
}

/**
 * Resetta lo stato dell'interfaccia utente a uno stato neutro.
 */
function resetUIState() {
    isPlaying = false; // Assicura che lo stato di gioco sia falso
    currentTick = 0; // Resetta il tick corrente
    currentRepetition = 1; // Resetta la ripetizione
    successRateSpan.textContent = '-- %';
    updateInfo("-- Seleziona o avvia un esercizio --");
    playedNoteSpan.textContent = '--';
    stopButton.disabled = true; // Stop è sempre disabilitato quando non si sta suonando

    // Riabilita i selettori (potrebbero essere stati disabilitati durante l'esecuzione)
    categorySelect.disabled = false;
    // exerciseSelect viene gestito da populateExerciseSelect

    // Pulisci eventuale timeout residuo per l'avanzamento automatico
    if (exerciseCompletionTimeout) {
        clearTimeout(exerciseCompletionTimeout);
        exerciseCompletionTimeout = null;
    }
}

/**
 * Aggiorna la percentuale di successo visualizzata.
 * Calcolata come note corrette totali / note suonabili totali nell'esercizio.
 */
function updateSuccessRate() {
    if (!currentExerciseData) {
         successRateSpan.textContent = '-- %';
         return;
    }

    const allPlayableNotes = [...currentExerciseData.notesTreble, ...currentExerciseData.notesBass, ...currentExerciseData.notes]
        .filter(note => note && typeof note.startTick === 'number' && !(note.keys && note.keys[0]?.toLowerCase().startsWith('r/')));

    let totalPlayableNoteEvents = 0; // Conta le singole note MIDI suonabili (non gli accordi come blocco)
    let correctPlayableNoteEvents = 0;

    allPlayableNotes.forEach(noteObj => {
        if (typeof noteObj.midiValue === 'number') {
            totalPlayableNoteEvents++;
            if (noteObj.status === 'correct') {
                correctPlayableNoteEvents++;
            }
        } else if (Array.isArray(noteObj.midiValues)) {
            totalPlayableNoteEvents += noteObj.midiValues.length;
            if (noteObj.correctMidiValues && Array.isArray(noteObj.correctMidiValues)) {
                 correctPlayableNoteEvents += noteObj.correctMidiValues.length;
            }
        }
    });


     if (totalPlayableNoteEvents === 0) {
         successRateSpan.textContent = 'N/A'; // Non applicabile se non ci sono note da suonare
     } else {
         // Assicura che il conteggio non superi il totale (potrebbe succedere per errori logici)
         const currentCorrect = Math.min(correctPlayableNoteEvents, totalPlayableNoteEvents);
         const percentage = ((currentCorrect / totalPlayableNoteEvents) * 100).toFixed(1);
         successRateSpan.textContent = `${percentage} %`;
     }
}

/**
 * Aggiorna il messaggio informativo principale nell'UI.
 * @param {string} message - Il messaggio da visualizzare.
 */
function updateInfo(message) {
    expectedNoteSpan.textContent = message;
}

/**
 * Scorre l'area dello spartito per mostrare il sistema corrente.
 */
function scrollToCurrentSystem() {
    if (!systemYPositions || systemYPositions.length === 0) return;

    // Trova il sistema che contiene il currentTick
    // Cerca l'ultimo sistema il cui startTick è <= currentTick
    let targetSystemY = 0; // Default: inizio dello spartito
    for (let i = systemYPositions.length - 1; i >= 0; i--) {
        if (currentTick >= systemYPositions[i].tick) {
            targetSystemY = systemYPositions[i].y;
            break;
        }
    }

    // Esegui lo scrolling
    // Usa behavior: 'smooth' per uno scrolling più fluido (potrebbe non essere supportato ovunque)
    scoreDiv.scrollTo({
        top: targetSystemY,
        behavior: 'smooth'
    });
}


// --- Gestione Input MIDI (Modificata per la nuova logica di avanzamento) ---

/**
 * Gestisce l'evento Note On ricevuto dal dispositivo MIDI.
 * @param {string} noteName - Nome della nota (es. "C#4").
 * @param {number} midiNote - Valore MIDI della nota (0-127).
 * @param {number} velocity - Velocità della nota (1-127).
 */
function handleNoteOn(noteName, midiNote, velocity) {
    // Aggiorna la nota suonata nell'UI
    playedNoteSpan.textContent = `${noteName} (MIDI: ${midiNote})`; // Rimosso Vel per brevità
    playedNoteSpan.style.color = ''; // Resetta colore da eventuale errore precedente

    if (!isPlaying || !currentExerciseData) {
         console.log(`Input MIDI ${noteName} (MIDI: ${midiNote}) ignorato: esercizio non in corso.`);
         return; // Ignora input se non si sta suonando
    }

    console.log(`Input MIDI Ricevuto: ${noteName} (MIDI: ${midiNote}) al tick ${currentTick}`);

    const allNotes = [...currentExerciseData.notesTreble, ...currentExerciseData.notesBass, ...currentExerciseData.notes];
    const notesAtCurrentTick = allNotes.filter(noteObj => noteObj && noteObj.startTick === currentTick && noteObj.status === 'expected');

    let noteMatchedInStep = false; // Flag per sapere se la nota suonata corrisponde a QUALCOSA di atteso

    // Itera su tutte le note/accordi attesi al currentTick
    notesAtCurrentTick.forEach(noteObj => {
        // Salta le pause (non dovrebbero essere 'expected' ma per sicurezza)
        if (noteObj.keys && noteObj.keys[0]?.toLowerCase().startsWith('r/')) return;

        // CASO 1: Nota singola attesa
        if (typeof noteObj.midiValue === 'number' && noteObj.midiValue === midiNote) {
            // Trovata corrispondenza per una nota singola attesa
            if (noteObj.status === 'expected') { // Doppia verifica dello stato
                noteObj.status = 'correct'; // Marca come corretta
                noteMatchedInStep = true;
                console.log(`   Corretta! Nota singola ${noteName} (MIDI: ${midiNote}) al tick ${currentTick}.`);
                // Non aggiornare l'info qui, verrà fatto dopo il checkAndAdvanceStep
            } else {
                 console.log(`   Nota singola ${noteName} (MIDI: ${midiNote}) al tick ${currentTick} già marcata come ${noteObj.status}.`);
            }
        }
        // CASO 2: Accordo atteso
        else if (Array.isArray(noteObj.midiValues) && noteObj.midiValues.includes(midiNote)) {
            // Trovata corrispondenza per una nota all'interno di un accordo atteso
            if (noteObj.status === 'expected') { // Doppia verifica dello stato
                // Verifica che questa specifica nota MIDI non sia già stata segnata come corretta per questo accordo
                if (!noteObj.correctMidiValues || !Array.isArray(noteObj.correctMidiValues)) {
                     noteObj.correctMidiValues = []; // Inizializza se mancante (safety check)
                }
                if (!noteObj.correctMidiValues.includes(midiNote)) {
                    noteObj.correctMidiValues.push(midiNote); // Aggiungi la nota MIDI corretta all'accordo
                    noteMatchedInStep = true;
                    console.log(`   Corretta! Nota ${noteName} (MIDI: ${midiNote}) parte di accordo al tick ${currentTick}. Note accordo suonate: ${noteObj.correctMidiValues.length}/${noteObj.midiValues.length}.`);

                    // Se l'accordo è completo, marca l'intero oggetto nota come 'correct'
                    if (noteObj.correctMidiValues.length >= noteObj.midiValues.length) {
                        noteObj.status = 'correct';
                        console.log(`   -> Accordo al tick ${currentTick} completato!`);
                    }
                    // Non aggiornare l'info qui, verrà fatto dopo il checkAndAdvanceStep
                } else {
                    console.log(`   Nota ${noteName} (MIDI: ${midiNote}) già suonata correttamente per l'accordo al tick ${currentTick}.`);
                }
            } else {
                 console.log(`   Nota ${noteName} (MIDI: ${midiNote}) parte di accordo al tick ${currentTick} già marcata come ${noteObj.status}.`);
            }
        }
        // else: la nota suonata non corrisponde a questa specifica nota/accordo atteso, continua il ciclo
    });

    // --- Logica Post-Input ---
    if (noteMatchedInStep) {
        // Se almeno una nota attesa è stata suonata correttamente
        updateSuccessRate(); // Aggiorna la percentuale di successo complessiva
        renderExercise(scoreDiv.id, currentExerciseData); // Ridisegna lo spartito con lo stato aggiornato
        // Controlla se il passo corrente è stato completato e avanza se necessario
        checkAndAdvanceStep();
        // Il messaggio UI viene aggiornato da updateExpectedNotes o checkAndAdvanceStep
    } else {
        // La nota suonata non corrisponde a nessuna nota 'expected' al currentTick
        console.log(`   Nota ${noteName} (MIDI: ${midiNote}) non attesa al tick ${currentTick}.`);
        updateInfo(`Errore: ${noteName} non atteso`);
        playedNoteSpan.style.color = 'red'; // Evidenzia l'errore
        // Il colore rosso rimarrà finché non arriva il prossimo input MIDI
    }
}


// --- Gestione Completamento Esercizio e Avanzamento (MODIFICATA) ---
/**
 * Gestisce il completamento di una ripetizione o dell'intero esercizio.
 */
function handleExerciseCompletion() {
    if (currentRepetition < targetRepetitions) {
        // Ripetizione completata, ma non l'esercizio intero
        console.log(`--- Ripetizione ${currentRepetition} di ${targetRepetitions} completata! ---`);
        currentRepetition++; // Passa alla prossima ripetizione

        console.log(`Avvio preparazione per ripetizione ${currentRepetition}/${targetRepetitions}`);
        updateInfo(`Ottimo! Prepara la Rip. ${currentRepetition}`);
        playedNoteSpan.textContent = "Bene!"; // Messaggio temporaneo

        // Usa setTimeout per dare tempo all'utente di vedere il risultato
        // e prepararsi alla prossima sequenza.
        const delay = 1500; // Delay prima di resettare per la prossima ripetizione (es. 1.5 secondi)
        // Disabilita i controlli durante l'attesa
        startButton.disabled = true;
        stopButton.disabled = true;
        categorySelect.disabled = true;
        exerciseSelect.disabled = true;


        exerciseCompletionTimeout = setTimeout(() => {
            exerciseCompletionTimeout = null; // Pulisce il riferimento al timeout
            if (!isPlaying) {
                 console.log("Esercizio fermato durante il delay di ripetizione.");
                 resetUIState(); // Assicura che l'UI sia nello stato corretto dopo l'interruzione
                 // Riabilita i controlli per la selezione manuale
                 categorySelect.disabled = false;
                 exerciseSelect.disabled = false;
                 // Start button gestito da resetUIState e updateMidiStatus
                 return;
            }
            console.log(`Inizio Ripetizione ${currentRepetition}`);
            currentTick = 0;            // Resetta il tick corrente all'inizio dell'esercizio
            resetNoteStates();          // Resetta stati a 'pending'/'rest'
            updateExpectedNotes();      // Marca le prime note come 'expected' e aggiorna l'info
            renderExercise(scoreDiv.id, currentExerciseData); // Renderizza per la nuova ripetizione
            updateSuccessRate();        // Resetta la % per la nuova ripetizione (mostrerà 0%)
            scrollToCurrentSystem();    // Scorre all'inizio dello spartito

            // Riabilita i controlli (Start rimane disabilitato se MIDI non è pronto o esercizio non avviabile)
            const hasPlayableNotes = currentExerciseData ? [...currentExerciseData.notesTreble, ...currentExerciseData.notesBass, ...currentExerciseData.notes]
                .some(note => note && typeof note.startTick === 'number' && note.startTick >= 0 &&
                              !(note.keys && note.keys[0]?.toLowerCase().startsWith('r/'))) : false;
            startButton.disabled = !midiReady || !currentExerciseData || !hasPlayableNotes;
            stopButton.disabled = false; // Stop è abilitato perché l'esercizio è ripartito
            categorySelect.disabled = true; // Rimangono disabilitati durante l'esecuzione
            exerciseSelect.disabled = true;

        }, delay);

    } else {
        // Tutte le ripetizioni completate, esercizio finito
        console.log("Esercizio (tutte le ripetizioni) completato con successo!");
        isPlaying = false; // Ferma lo stato di gioco
        stopButton.disabled = true; // Disabilita stop
        // startButton rimarrà disabilitato finché non si seleziona/avanza a un nuovo esercizio

        updateInfo("Esercizio Completato!");
        playedNoteSpan.textContent = "Bravo!"; // Messaggio di congratulazioni

        const currentCategoryKey = categorySelect.value;
        const currentExerciseId = currentExerciseDefinition?.id;

        // Verifica che lo stato sia consistente per procedere
        if (!currentCategoryKey || !allExercises[currentCategoryKey] || !currentExerciseId || !Array.isArray(allExercises[currentCategoryKey])) {
            console.error("Stato applicazione non valido per determinare il prossimo esercizio. Categoria o ID esercizio corrente mancanti o non validi.");
            // Riabilita i controlli per selezione manuale
            categorySelect.disabled = false;
            exerciseSelect.disabled = false;
            startButton.disabled = true; // Forza la riselezione o attendi nuovo esercizio
            updateInfo("Errore stato. Seleziona un nuovo esercizio.");
            return;
        }

        const categoryExercises = allExercises[currentCategoryKey];
        let nextExercise = null; // Esercizio successivo da avviare

        // === Logica di Avanzamento: Ordinato vs Random ===
        if (ORDERED_CATEGORIES.includes(currentCategoryKey)) {
            // --- Avanzamento Ordinato ---
            console.log(`Categoria "${currentCategoryKey}" è configurata per avanzamento ordinato. Cerco esercizio successivo.`);
            const currentIndex = categoryExercises.findIndex(ex => ex && ex.id === currentExerciseId);

            if (currentIndex !== -1 && currentIndex < categoryExercises.length - 1) {
                // Trovato esercizio corrente, prendi il prossimo nell'array
                 let nextIndex = currentIndex + 1;
                 // Salta eventuali elementi non validi nell'array degli esercizi
                 while(nextIndex < categoryExercises.length && (!categoryExercises[nextIndex] || !categoryExercises[nextIndex].id)) {
                    console.warn(`Elemento all'indice ${nextIndex} non valido nella categoria ordinata, salto al successivo.`);
                    nextIndex++;
                 }
                 if (nextIndex < categoryExercises.length) {
                    nextExercise = categoryExercises[nextIndex];
                    console.log(`Prossimo esercizio (ordinato): ${nextExercise.name || nextExercise.id} (ID: ${nextExercise.id})`);
                 } else {
                    console.log("Nessun esercizio valido trovato dopo l'indice corrente nella categoria ordinata.");
                    nextExercise = null; // Nessun altro esercizio valido trovato
                 }
            } else if (currentIndex === -1) {
                console.error(`Errore: Impossibile trovare l'indice dell'esercizio corrente (ID: ${currentExerciseId}) nella categoria ordinata.`);
                nextExercise = null; // Non si può determinare il prossimo
            } else {
                // Era l'ultimo esercizio (o l'ultimo valido) della categoria
                console.log("Ultimo esercizio della categoria ordinata completato.");
                nextExercise = null;
            }
        } else {
            // --- Avanzamento Random ---
            console.log(`Categoria "${currentCategoryKey}" non è in ORDERED_CATEGORIES. Cerco esercizio random (diverso dal corrente).`);
            // Filtra per ottenere solo esercizi validi (con ID) diversi da quello appena completato
            const availableExercises = categoryExercises.filter(ex => ex && ex.id && ex.id !== currentExerciseId);

            if (availableExercises.length > 0) {
                const randomIndex = Math.floor(Math.random() * availableExercises.length);
                nextExercise = availableExercises[randomIndex];
                console.log(`Prossimo esercizio (random): ${nextExercise.name || nextExercise.id} (ID: ${nextExercise.id})`);
            } else {
                // Solo 1 esercizio nella categoria o tutti gli altri non sono validi
                console.log("Nessun altro esercizio valido disponibile per la selezione random in questa categoria.");
                nextExercise = null;
            }
        }
        // ============================================

        // --- Avvia il prossimo esercizio o termina ---
        if (nextExercise && nextExercise.id) {
            const delay = 2500; // Pausa prima di iniziare il prossimo (in ms)
            updateInfo(`Prossimo: ${nextExercise.name || nextExercise.id}...`);
            console.log(`Attendo ${delay}ms prima di caricare ${nextExercise.id}`);

            // Disabilita i controlli durante l'attesa
            categorySelect.disabled = true;
            exerciseSelect.disabled = true;
            startButton.disabled = true;
            stopButton.disabled = true; // Assicurati che stop sia disabilitato

            exerciseCompletionTimeout = setTimeout(() => {
                exerciseCompletionTimeout = null; // Pulisce il riferimento al timeout
                 if (!nextExercise || !nextExercise.id) { // Doppio controllo
                     console.error("Timeout scaduto ma nextExercise non è valido.");
                     updateInfo("Errore caricamento prossimo esercizio.");
                     categorySelect.disabled = false; // Riabilita per scelta manuale
                     exerciseSelect.disabled = false;
                     startButton.disabled = !midiReady; // Abilita start se MIDI pronto
                     return;
                 }
                console.log(`Caricamento automatico: ${nextExercise.id}`);
                // Imposta il valore nel select (aggiorna UI)
                exerciseSelect.value = nextExercise.id;
                // Seleziona l'esercizio (carica dati, renderizza, calcola ticks, abilita/disabilita start)
                selectExercise(nextExercise.id, currentCategoryKey);

                // Avvia automaticamente il nuovo esercizio solo se il MIDI è pronto e l'esercizio ha note suonabili
                const hasPlayableNotes = currentExerciseData ? [...currentExerciseData.notesTreble, ...currentExerciseData.notesBass, ...currentExerciseData.notes]
                    .some(note => note && typeof note.startTick === 'number' && note.startTick >= 0 &&
                                  !(note.keys && note.keys[0]?.toLowerCase().startsWith('r/'))) : false;

                if (midiReady && currentExerciseData && hasPlayableNotes) {
                     console.log("Avvio automatico del prossimo esercizio...");
                     // Breve pausa aggiuntiva per permettere il rendering prima dello start effettivo
                     setTimeout(startExercise, 200);
                } else {
                     console.warn("MIDI non pronto o esercizio non avviabile. L'utente dovrà premere Start.");
                     // Assicurati che i controlli siano nello stato corretto
                     categorySelect.disabled = true; // Mantiene bloccato sulla categoria corrente
                     exerciseSelect.disabled = true; // Mantiene bloccato sull'esercizio caricato
                     // Start button è già gestito da selectExercise
                     stopButton.disabled = true; // Stop rimane disabilitato
                     if (!midiReady) updateInfo(`Prossimo: ${nextExercise.name || nextExercise.id}. Collega MIDI.`);
                     else if (!hasPlayableNotes) updateInfo(`Prossimo: ${nextExercise.name || nextExercise.id}. Nessuna nota suonabile.`);
                     else updateInfo(`Prossimo: ${nextExercise.name || nextExercise.id}. Premi Start.`);
                }
            }, delay);

        } else {
            // Nessun altro esercizio disponibile o categoria completata
            console.log("Nessun prossimo esercizio da avviare automaticamente.");
            updateInfo("Categoria Completata! Scegli una nuova categoria o esercizio.");
            playedNoteSpan.textContent = "Ottimo Lavoro!";
            // Riabilita i controlli per permettere all'utente di scegliere cosa fare dopo
            categorySelect.disabled = false;
            exerciseSelect.disabled = false;
            // Start button rimane disabilitato finché non viene selezionato un nuovo esercizio valido
            startButton.disabled = true;
            stopButton.disabled = true; // Stop rimane disabilitato
            // Assicurati che lo stato dell'ultimo esercizio non sia più attivo
            currentExerciseData = null;
            currentExerciseDefinition = null;
            totalTicks = 0;
            systemYPositions = [];
             // Potresti voler pulire lo spartito o lasciare l'ultimo visualizzato
             // scoreDiv.innerHTML = '<p>Categoria completata!</p>';
        }
    }
}


// --- Funzione updateMidiStatus ---
/**
 * Aggiorna lo stato della connessione MIDI nell'UI e abilita/disabilita i controlli.
 * @param {string} message - Messaggio di stato MIDI.
 * @param {boolean} isConnected - True se un dispositivo MIDI è connesso.
 */
function updateMidiStatus(message, isConnected) {
    midiStatusSpan.textContent = message;
    midiReady = isConnected;

    // Aggiorna lo stato del pulsante Start in base alla connessione MIDI
    // e allo stato corrente dell'applicazione
    const hasPlayableNotes = currentExerciseData ? [...currentExerciseData.notesTreble, ...currentExerciseData.notesBass, ...currentExerciseData.notes]
            .some(note => note && typeof note.startTick === 'number' && note.startTick >= 0 &&
                          !(note.keys && note.keys[0]?.toLowerCase().startsWith('r/'))) : false;

    if (isConnected) {
        // MIDI Connesso: Abilita Start SE un esercizio valido è selezionato,
        // ci sono note da suonare e non si sta già suonando.
        startButton.disabled = isPlaying || !currentExerciseData || !hasPlayableNotes;
         // Se un esercizio era selezionato ma start era disabilitato per mancanza di MIDI,
         // aggiorna il messaggio informativo.
         if (!isPlaying && currentExerciseData && hasPlayableNotes) {
             updateInfo(`MIDI pronto. Premi Start per ${currentExerciseDefinition.name || currentExerciseDefinition.id}.`);
         } else if (!currentExerciseData) {
             updateInfo("MIDI pronto. Seleziona un esercizio.");
         } else if (!hasPlayableNotes) {
             updateInfo("MIDI pronto. Questo esercizio non ha note suonabili.");
         }
    } else {
        // MIDI Disconnesso: Disabilita sempre Start.
        startButton.disabled = true;
        updateInfo("Collega un dispositivo MIDI per iniziare.");
        // Se l'esercizio era in corso, fermalo bruscamente.
        if (isPlaying) {
            console.warn("Dispositivo MIDI disconnesso durante l'esecuzione dell'esercizio!");
            stopExercise(); // Ferma l'esercizio
            // Mostra un messaggio più evidente all'utente
            alert("ATTENZIONE: Dispositivo MIDI disconnesso! Esercizio interrotto.");
            updateInfo("MIDI Disconnesso! Esercizio interrotto.");
        }
    }
}

// --- Event Listeners ---
categorySelect.addEventListener('change', (e) => {
    // Quando la categoria cambia, popola il select degli esercizi
    // e resetta lo stato (questo viene fatto dentro populateExerciseSelect)
    populateExerciseSelect(e.target.value);
});

exerciseSelect.addEventListener('change', (e) => {
    // Quando un esercizio viene selezionato, carica i suoi dati
    const selectedExerciseId = e.target.value;
    const selectedCategoryKey = categorySelect.value;
    selectExercise(selectedExerciseId, selectedCategoryKey);
});

startButton.addEventListener('click', startExercise);
stopButton.addEventListener('click', stopExercise);

// --- Inizializzazione Applicazione ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM completamente caricato e analizzato.");
    console.log("Inizializzazione Piano Future vFinale (Avanzamento a Ticks)...");

    // 1. Carica i dati degli esercizi da window.exerciseData (generato da build_exercises.js)
    loadExerciseData(); // Include la validazione base e popola le categorie

    // 2. Inizializza il sistema MIDI (Web MIDI API)
    // Passa le callback per gestire gli eventi MIDI (note on) e gli aggiornamenti di stato
    initializeMIDI(handleNoteOn, updateMidiStatus);

    // 3. Imposta lo stato iniziale dell'UI
    resetUIState(); // Assicura che l'UI sia nello stato iniziale corretto
    stopButton.disabled = true; // Stop sempre disabilitato all'inizio
    startButton.disabled = true; // Start disabilitato finché MIDI non è pronto E un esercizio valido è selezionato
    scoreDiv.innerHTML = '<p>Benvenuto! Seleziona una categoria e un esercizio.</p>'; // Messaggio iniziale
    updateInfo("Collega un dispositivo MIDI e seleziona un esercizio.");
});