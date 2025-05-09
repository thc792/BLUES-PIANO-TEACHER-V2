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
 * **VERSIONE DEBUG SCROLLING: Avanzamento basato sui ticks, gestione note contemporanee e scrolling migliorato.**
 * Implementa l'avanzamento passo-passo basato sulla posizione temporale (ticks)
 * e richiede il completamento di tutte le note/accordi attesi a un dato tick
 * prima di avanzare. Gestisce lo scrolling dello spartito: verso il basso per
 * nuove righe, verso l'alto alla fine dell'esercizio completo.
 * INCLUDE LOG DI DEBUG SPECIFICI PER LO SCROLLING.
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
 * @param {string} categoryKey - La chiave della categoria dell'esercizio.
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
        console.log("System Y Positions:", systemYPositions); // LOG DI DEBUG: Mostra le posizioni dei sistemi

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
                } else if (typeof noteObj.startTick === 'number' && (typeof noteObj.midiValue === 'number' || (Array.isArray(noteObj.midiValues) && noteObj.midiValues.length > 0))) {
                    noteObj.status = 'pending';
                    // Resetta l'array delle note corrette per gli accordi
                    if (Array.isArray(noteObj.midiValues)) {
                        noteObj.correctMidiValues = [];
                    }
                } else {
                    // Oggetto non riconosciuto, marca come ignorato (if it has a startTick)
                    if (typeof noteObj.startTick === 'number') {
                         noteObj.status = 'ignored';
                    }
                }
            }
        });
    };

    resetArray(currentExerciseData.notesTreble);
    resetArray(currentExerciseData.notesBass);
    resetArray(currentExerciseData.notes); // For single stave
}

/**
 * Trova e marca come 'expected' tutte le note/accordi il cui `startTick`
 * corrisponde al `currentTick` e il cui stato è 'pending'.
 * Aggiorna anche il messaggio UI con le note attese.
 */
function updateExpectedNotes() {
    if (!currentExerciseData) return;

    console.log(`--- updateExpectedNotes chiamato. currentTick: ${currentTick} ---`); // LOG DI DEBUG

    const notesAtCurrentTick = [];
    const allNotes = [...currentExerciseData.notesTreble, ...currentExerciseData.notesBass, ...currentExerciseData.notes];

    // Trova tutte le note/accordi che iniziano esattamente al currentTick e sono 'pending'
    allNotes.forEach(noteObj => {
        if (noteObj && noteObj.status === 'pending' && typeof noteObj.startTick === 'number' && noteObj.startTick === currentTick) {
            // If it's a rest, don't mark it as 'expected' but handle it in checkAndAdvanceStep
            if (noteObj.keys && Array.isArray(noteObj.keys) && noteObj.keys[0]?.toLowerCase().startsWith('r/')) {
                 // Leave as 'rest', checkAndAdvanceStep will handle it
                 console.log(`  - Trovata Pausa al tick ${currentTick}:`, noteObj); // LOG DI DEBUG
            } else {
                noteObj.status = 'expected'; // Mark as expected
                // For chords, ensure correctMidiValues array is empty at the start of the step
                if (Array.isArray(noteObj.midiValues)) {
                     noteObj.correctMidiValues = [];
                }
                notesAtCurrentTick.push(noteObj);
                console.log(`  - Marcata come 'expected' al tick ${currentTick}:`, noteObj); // LOG DI DEBUG
            }
        }
        // Optional: Reset 'expected' status for notes that have been passed by currentTick
        // This shouldn't happen with the current logic, but it's a safety net.
        if (noteObj && noteObj.status === 'expected' && typeof noteObj.startTick === 'number' && noteObj.startTick < currentTick) {
             noteObj.status = 'pending'; // Revert to pending if passed
             console.warn(`  - Nota al tick ${noteObj.startTick} era 'expected' ma superata da currentTick ${currentTick}. Riportata a 'pending'.`, noteObj); // LOG DI DEBUG
        }
    });

    // Update UI message with expected notes
    if (notesAtCurrentTick.length > 0) {
        const expectedText = notesAtCurrentTick.map(noteObj => {
            // Rests shouldn't be here, but for safety
            if (noteObj.keys && noteObj.keys[0]?.toLowerCase().startsWith('r/')) return "Pausa";
            if (noteObj.keys) return noteObj.keys.join(', '); // Use VexFlow keys if available
            if (Array.isArray(noteObj.midiValues)) return `Accordo (${noteObj.midiValues.join(', ')})`;
            if (typeof noteObj.midiValue === 'number') return `Nota MIDI ${noteObj.midiValue}`;
            return "Nota sconosciuta";
        }).join(' | '); // Separate expected notes with a pipe

        updateInfo(`Atteso: ${expectedText}`);
        console.log(`  Note 'expected' finali al tick ${currentTick}:`, notesAtCurrentTick); // LOG DI DEBUG
    } else {
         // This case happens if there are no playable notes at currentTick (e.g., only rests)
         // or if there's a logic error in advancement.
         const allNotesAndRests = [...currentExerciseData.notesTreble, ...currentExerciseData.notesBass, ...currentExerciseData.notes];
         const notesOrRestsAtCurrentTick = allNotesAndRests.filter(noteObj => noteObj && typeof noteObj.startTick === 'number' && noteObj.startTick === currentTick);

         if (notesOrRestsAtCurrentTick.length > 0 && notesOrRestsAtCurrentTick.every(n => n.keys && n.keys[0]?.toLowerCase().startsWith('r/'))) {
             // Only rests at currentTick
             updateInfo("Pausa...");
             console.log(`  Solo pause trovate al tick ${currentTick}.`); // LOG DI DEBUG
         } else if (currentTick < totalTicks) {
             // No valid notes/rests found at currentTick, but not at the end
             console.warn(`  Nessuna nota/pausa valida trovata al currentTick ${currentTick}. Potenziale errore logico o dati esercizio.`); // LOG DI DEBUG
             updateInfo("In attesa..."); // Generic message
         } else {
            // currentTick >= totalTicks, exercise is finished or completing
            updateInfo("Esercizio completato o in attesa.");
            console.log(`  currentTick ${currentTick} >= totalTicks ${totalTicks}. Esercizio finito.`); // LOG DI DEBUG
         }
    }
}

/**
 * Controlla se tutte le notes/chords expected at `currentTick` have been completed.
 * If yes, advances `currentTick` to the next step and updates state.
 * Also handles automatic advancement for rests.
 */
function checkAndAdvanceStep() {
    if (!isPlaying || !currentExerciseData) return;

    console.log(`--- checkAndAdvanceStep chiamato. currentTick: ${currentTick}, totalTicks: ${totalTicks} ---`); // LOG DI DEBUG

    const allNotes = [...currentExerciseData.notesTreble, ...currentExerciseData.notesBass, ...currentExerciseData.notes];
    const notesOrRestsAtCurrentTick = allNotes.filter(noteObj => noteObj && typeof noteObj.startTick === 'number' && noteObj.startTick === currentTick);

    console.log(`  Note/Pause trovate al currentTick (${currentTick}):`, notesOrRestsAtCurrentTick); // LOG DI DEBUG

    // Case 1: Only rests at currentTick
    if (notesOrRestsAtCurrentTick.length > 0 && notesOrRestsAtCurrentTick.every(n => n.keys && n.keys[0]?.toLowerCase().startsWith('r/'))) {
         console.log(`Solo pause al tick ${currentTick}. Avanzamento automatico.`); // LOG DI DEBUG
         // Find the next valid tick
         const nextTicks = allNotes
             .filter(noteObj => noteObj && typeof noteObj.startTick === 'number' && noteObj.startTick > currentTick)
             .map(noteObj => noteObj.startTick);

         const nextTick = Math.min(...nextTicks); // Find the minimum among subsequent ticks

         console.log(`  Prossimi tick disponibili (> ${currentTick}):`, nextTicks); // LOG DI DEBUG
         console.log(`  Prossimo tick calcolato (nextTick): ${nextTick}`); // LOG DI DEBUG

         if (isFinite(nextTick)) { // If a valid subsequent tick was found
             currentTick = nextTick;
             console.log(`Avanzamento automatico al prossimo tick: ${currentTick}`); // LOG DI DEBUG
             // Update note states for the new tick
             updateExpectedNotes();
             // Rerender the score with new states
             renderExercise(scoreDiv.id, currentExerciseData);
             // Check and handle scrolling
             scrollToCurrentSystem();
             // If the new tick is still only rests, the next checkAndAdvanceStep call will handle it
         } else {
             // No subsequent tick found, exercise is finished
             console.log("Nessun tick successivo trovato. Esercizio completato."); // LOG DI DEBUG
             // *** SCROLL UP AT THE END OF THE COMPLETE EXERCISE ***
             scoreDiv.scrollTo({ top: 0, behavior: 'smooth' });
             handleExerciseCompletion(); // Handles repetitions or moving to the next exercise
         }
         return; // Exit the function, the step has been handled (advanced or finished)
    }

    // Case 2: There are playable notes at currentTick
    const playableNotesAtCurrentTick = notesOrRestsAtCurrentTick.filter(noteObj => !(noteObj.keys && noteObj.keys[0]?.toLowerCase().startsWith('r/')));

    // If there are no playable notes (but there were notes/rests), and it wasn't only rests (Case 1),
    // there's a logic error or bad data.
    if (playableNotesAtCurrentTick.length === 0) {
         console.error(`Errore logico: checkAndAdvanceStep chiamato con tick ${currentTick} che non ha note suonabili né è solo pause.`); // LOG DI DEBUG
         updateInfo("Errore interno. Ferma e riavvia.");
         stopExercise(); // Stop the exercise to prevent infinite loops
         return;
    }

    console.log(`  Note suonabili attese al tick ${currentTick}:`, playableNotesAtCurrentTick); // LOG DI DEBUG

    // Check if all expected notes/chords at this tick have been completed
    const allNotesInStepCompleted = playableNotesAtCurrentTick.every(noteObj => {
        if (typeof noteObj.midiValue === 'number') {
            return noteObj.status === 'correct'; // Single note
        } else if (Array.isArray(noteObj.midiValues)) {
            // Chord: all MIDI notes in the chord must have been played
            const allMidiNotesPlayedForChord = noteObj.midiValues.every(requiredMidi => noteObj.correctMidiValues && noteObj.correctMidiValues.includes(requiredMidi));
            console.log(`    - Accordo al tick ${currentTick}: ${noteObj.correctMidiValues ? noteObj.correctMidiValues.length : 0}/${noteObj.midiValues.length} note suonate. Completato? ${allMidiNotesPlayedForChord}`); // LOG DI DEBUG
            return noteObj.status === 'correct' && allMidiNotesPlayedForChord;
        }
        return false; // Invalid object
    });

    console.log(`  Tutte le note al tick ${currentTick} completate? ${allNotesInStepCompleted}`); // LOG DI DEBUG

    if (allNotesInStepCompleted) {
        console.log(`Passo al tick ${currentTick} completato!`); // LOG DI DEBUG

        // Find the next valid tick (the minimum startTick > currentTick)
         const nextTicks = allNotes
             .filter(noteObj => noteObj && typeof noteObj.startTick === 'number' && noteObj.startTick > currentTick)
             .map(noteObj => noteObj.startTick);

         const nextTick = Math.min(...nextTicks); // Find the minimum among subsequent ticks

        console.log(`  Prossimi tick disponibili (> ${currentTick}):`, nextTicks); // LOG DI DEBUG
        console.log(`  Prossimo tick calcolato (nextTick): ${nextTick}`); // LOG DI DEBUG


        if (isFinite(nextTick)) { // If a valid subsequent tick was found
            currentTick = nextTick;
            console.log(`Avanzamento al prossimo tick: ${currentTick}`); // LOG DI DEBUG
            // Update note states for the new tick
            updateExpectedNotes();
            // Rerender the score with new states
            renderExercise(scoreDiv.id, currentExerciseData);
            // Check and handle scrolling
            scrollToCurrentSystem();
        } else {
            // No subsequent tick found, exercise is finished
            console.log("Nessun tick successivo trovato. Esercizio completato."); // LOG DI DEBUG
            // *** SCROLL UP AT THE END OF THE COMPLETE EXERCISE ***
            scoreDiv.scrollTo({ top: 0, behavior: 'smooth' });
            handleExerciseCompletion(); // Handles repetitions or moving to the next exercise
        }
    } else {
        // The current step is not yet completed, continue waiting for MIDI input
        console.log(`Passo al tick ${currentTick} non ancora completato. In attesa...`); // LOG DI DEBUG
        // Do nothing here, the next MIDI input will call handleNoteOn -> checkAndAdvanceStep again
    }
}

/**
 * Starts the selected exercise execution.
 */
function startExercise() {
    // Check pre-conditions for starting
    const hasPlayableNotes = currentExerciseData ? [...currentExerciseData.notesTreble, ...currentExerciseData.notesBass, ...currentExerciseData.notes]
            .some(note => note && typeof note.startTick === 'number' && note.startTick >= 0 &&
                          !(note.keys && note.keys[0]?.toLowerCase().startsWith('r/'))) : false;

    if (!currentExerciseData || !midiReady || !hasPlayableNotes || isPlaying) {
         console.warn("Impossibile avviare l'esercizio. Controlla stato MIDI, selezione esercizio, presenza note suonabili e se è già in corso.");
         // Provide feedback to the user if necessary
         if (!midiReady) updateInfo("Collega un dispositivo MIDI.");
         else if (!currentExerciseData) updateInfo("Seleziona un esercizio.");
         else if (!hasPlayableNotes) updateInfo("Questo esercizio non ha note da suonare.");
         else if (isPlaying) updateInfo("Esercizio già in corso.");
         return;
    }

    // Clear any previous timeouts for automatic advancement
    if (exerciseCompletionTimeout) {
        clearTimeout(exerciseCompletionTimeout);
        exerciseCompletionTimeout = null;
    }

    currentRepetition = 1;       // Start from the first repetition
    currentTick = 0;             // Start from the beginning of the exercise
    resetNoteStates();           // Reset all note states to 'pending'/'rest'
    console.log("Avvio Esercizio:", currentExerciseDefinition.name || currentExerciseDefinition.id, `- Ripetizione ${currentRepetition}/${targetRepetitions}`); // LOG DI DEBUG

    isPlaying = true;           // Set global state
    // Update UI
    startButton.disabled = true;
    stopButton.disabled = false;
    categorySelect.disabled = true;
    exerciseSelect.disabled = true;
    updateSuccessRate();        // Update success rate (initially 0%)
    playedNoteSpan.textContent = '--'; // Clear last played note

    // Mark the first notes/chords as 'expected' and update UI
    updateExpectedNotes();
    // Render the initial state (first notes will be highlighted as 'expected')
    renderExercise(scoreDiv.id, currentExerciseData);
    // Ensure the score is at the beginning
    scoreDiv.scrollTop = 0; // Always scroll to the top on start

    // UI message is already updated by updateExpectedNotes
    // updateInfo(`Ripetizione ${currentRepetition}/${targetRepetitions}. Suona la prima nota.`);
}

/**
 * Stops the exercise execution.
 */
function stopExercise() {
     if (!isPlaying && stopButton.disabled) return; // Prevent multiple actions if already stopped

     // Clear timeout for automatic advancement if present
    if (exerciseCompletionTimeout) {
        clearTimeout(exerciseCompletionTimeout);
        exerciseCompletionTimeout = null;
    }

    console.log("Arresto manuale dell'esercizio."); // LOG DI DEBUG
    isPlaying = false;

    // Reset note states in the current exercise (if it exists) and render the 'clean' state
    if (currentExerciseData) {
        resetNoteStates(); // Revert notes to 'pending'/'rest'
        currentTick = 0; // Reset current tick
        // Rerender to show the score without state highlights
        renderExercise(scoreDiv.id, currentExerciseData);
        scoreDiv.scrollTop = 0; // Scroll to top when stopped
    } else {
        // If no exercise is loaded, ensure the score area is empty or shows a message
        scoreDiv.innerHTML = '<p>Nessun esercizio attivo.</p>';
    }

    // Re-enable controls
    // The start button should only be re-enabled if conditions are met
    const hasPlayableNotes = currentExerciseData ? [...currentExerciseData.notesTreble, ...currentExerciseData.notesBass, ...currentExerciseData.notes]
            .some(note => note && typeof note.startTick === 'number' && note.startTick >= 0 &&
                          !(note.keys && note.keys[0]?.toLowerCase().startsWith('r/'))) : false;
    startButton.disabled = !midiReady || !currentExerciseData || !hasPlayableNotes;
    stopButton.disabled = true; // Disable stop button as exercise is stopped
    categorySelect.disabled = false;
    exerciseSelect.disabled = false;

    // Reset status messages
    updateInfo("Esercizio interrotto. Pronto per iniziare.");
    // Don't reset success rate here, it might be useful to see until the next start
    // successRateSpan.textContent = '-- %';
    playedNoteSpan.textContent = '--';
}

/**
 * Resets the UI state to a neutral state.
 */
function resetUIState() {
    isPlaying = false; // Ensure game state is false
    currentTick = 0; // Reset current tick
    currentRepetition = 1; // Reset repetition
    successRateSpan.textContent = '-- %';
    updateInfo("-- Seleziona o avvia un esercizio --");
    playedNoteSpan.textContent = '--';
    stopButton.disabled = true; // Stop is always disabled when not playing

    // Re-enable selectors (they might have been disabled during the execution)
    categorySelect.disabled = false;
    // exerciseSelect is handled by populateExerciseSelect

    // Clear any residual timeout for automatic advancement
    if (exerciseCompletionTimeout) {
        clearTimeout(exerciseCompletionTimeout);
        exerciseCompletionTimeout = null;
    }
    // Scroll to top when resetting state
    scoreDiv.scrollTop = 0;
}

/**
 * Updates the displayed success rate percentage.
 * Calculated as total correct notes / total playable notes in the exercise.
 */
function updateSuccessRate() {
    if (!currentExerciseData) {
         successRateSpan.textContent = '-- %';
         return;
    }

    const allPlayableNotes = [...currentExerciseData.notesTreble, ...currentExerciseData.notesBass, ...currentExerciseData.notes]
        .filter(note => note && typeof note.startTick === 'number' && !(note.keys && note.keys[0]?.toLowerCase().startsWith('r/')));

    let totalPlayableNoteEvents = 0; // Count individual playable MIDI notes (not chords as a block)
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
         successRateSpan.textContent = 'N/A'; // Not applicable if there are no notes to play
     } else {
         // Ensure the count doesn't exceed the total (could happen due to logic errors)
         const currentCorrect = Math.min(correctPlayableNoteEvents, totalPlayableNoteEvents);
         const percentage = ((currentCorrect / totalPlayableNoteEvents) * 100).toFixed(1);
         successRateSpan.textContent = `${percentage} %`;
     }
}

/**
 * Updates the main info message in the UI.
 * @param {string} message - The message to display.
 */
function updateInfo(message) {
    expectedNoteSpan.textContent = message;
}

/**
 * Scrolls the score area to show the current system.
 */
function scrollToCurrentSystem() {
    if (!systemYPositions || systemYPositions.length === 0) {
        console.warn("scrollToCurrentSystem: systemYPositions non disponibile o vuoto."); // LOG DI DEBUG
        return;
    }

    console.log(`scrollToCurrentSystem chiamato. currentTick: ${currentTick}`); // LOG DI DEBUG
    console.log("  systemYPositions:", systemYPositions); // LOG DI DEBUG: Mostra l'array completo

    // Find the system containing the currentTick
    // Search for the last system whose startTick is <= currentTick
    let targetSystemY = 0; // Default: top of the score (tick 0)
    let foundSystem = false;
    for (let i = systemYPositions.length - 1; i >= 0; i--) {
        if (currentTick >= systemYPositions[i].tick) {
            targetSystemY = systemYPositions[i].y;
            foundSystem = true;
            console.log(`  Trovato sistema per tick ${currentTick} al tick ${systemYPositions[i].tick}. Target Y: ${targetSystemY}`); // LOG DI DEBUG
            break;
        }
    }

    if (!foundSystem) {
         console.warn(`  Nessun sistema trovato per currentTick ${currentTick}. Scroll all'inizio.`); // LOG DI DEBUG
         targetSystemY = 0; // Ensure it's 0 if no system matches (at least the first one should match)
    }


    // Perform the scroll
    // Use behavior: 'smooth' for smoother scrolling (may not be supported everywhere)
    scoreDiv.scrollTo({
        top: targetSystemY,
        behavior: 'smooth'
    });
    console.log(`  Scrolling eseguito a Y: ${targetSystemY}`); // LOG DI DEBUG
}


// --- Gestione Input MIDI (Modificata per la nuova logica di avanzamento) ---

/**
 * Handles the Note On event received from the MIDI device.
 * @param {string} noteName - Name of the note (e.g., "C#4").
 * @param {number} midiNote - MIDI value of the note (0-127).
 * @param {number} velocity - Velocity of the note (1-127).
 */
function handleNoteOn(noteName, midiNote, velocity) {
    // Update the played note in the UI
    playedNoteSpan.textContent = `${noteName} (MIDI: ${midiNote})`; // Removed Vel for brevity
    playedNoteSpan.style.color = ''; // Reset color from previous error if any

    if (!isPlaying || !currentExerciseData) {
         console.log(`Input MIDI ${noteName} (MIDI: ${midiNote}) ignorato: esercizio non in corso.`);
         return; // Ignore input if not playing
    }

    console.log(`Input MIDI Ricevuto: ${noteName} (MIDI: ${midiNote}) al tick ${currentTick}`); // LOG DI DEBUG

    const allNotes = [...currentExerciseData.notesTreble, ...currentExerciseData.notesBass, ...currentExerciseData.notes];
    const notesAtCurrentTick = allNotes.filter(noteObj => noteObj && typeof noteObj.startTick === 'number' && noteObj.startTick === currentTick && noteObj.status === 'expected');

    let noteMatchedInStep = false; // Flag to know if the played note matches ANYTHING expected

    // Iterate over all expected notes/chords at the currentTick
    notesAtCurrentTick.forEach(noteObj => {
        // Skip rests (they shouldn't be 'expected' here)
        if (noteObj.keys && noteObj.keys[0]?.toLowerCase().startsWith('r/')) return;

        // CASE 1: Single expected note
        if (typeof noteObj.midiValue === 'number' && noteObj.midiValue === midiNote) {
            // Found a match for a single expected note
            if (noteObj.status === 'expected') { // Double check status
                noteObj.status = 'correct'; // Mark as correct
                noteMatchedInStep = true;
                console.log(`   Corretta! Nota singola ${noteName} (MIDI: ${midiNote}) al tick ${currentTick}.`); // LOG DI DEBUG
                // Don't update info here, it will be done after checkAndAdvanceStep
            }
        }
        // CASE 2: Expected chord
        else if (Array.isArray(noteObj.midiValues) && noteObj.midiValues.includes(midiNote)) {
            // Found a match for a note within an expected chord
            if (noteObj.status === 'expected') { // Double check status
                // Check if this specific MIDI note has already been marked as correct for this chord
                if (!noteObj.correctMidiValues || !Array.isArray(noteObj.correctMidiValues)) {
                     noteObj.correctMidiValues = []; // Initialize if missing (safety check)
                }
                if (!noteObj.correctMidiValues.includes(midiNote)) {
                    noteObj.correctMidiValues.push(midiNote); // Add the correct MIDI note to the chord
                    noteMatchedInStep = true;
                    console.log(`   Corretta! Nota ${noteName} (MIDI: ${midiNote}) parte di accordo al tick ${currentTick}. Note accordo suonate: ${noteObj.correctMidiValues.length}/${noteObj.midiValues.length}.`); // LOG DI DEBUG

                    // If the chord is complete, mark the entire note object as 'correct'
                    // Check if ALL MIDI notes in the chord have been played
                    const allMidiNotesPlayedForChord = noteObj.midiValues.every(requiredMidi =>
                        noteObj.correctMidiValues.includes(requiredMidi)
                    );

                    if (allMidiNotesPlayedForChord) {
                        noteObj.status = 'correct';
                        console.log(`   -> Accordo al tick ${currentTick} completato!`); // LOG DI DEBUG
                    }
                    // Don't update info here, it will be done after checkAndAdvanceStep
                }
            }
        }
        // else: played note doesn't match this specific expected note/chord, continue loop
    });

    // --- Post-Input Logic ---
    if (noteMatchedInStep) {
        // If at least one expected note was played correctly
        updateSuccessRate(); // Update overall success percentage
        renderExercise(scoreDiv.id, currentExerciseData); // Redraw the score with updated state
        // Check if the current step is completed and advance if necessary
        checkAndAdvanceStep();
        // UI message is updated by updateExpectedNotes or checkAndAdvanceStep
    } else {
        // The played note does not match any 'expected' note at the currentTick
        console.log(`   Nota ${noteName} (MIDI: ${midiNote}) non attesa al tick ${currentTick}.`); // LOG DI DEBUG
        updateInfo(`Errore: ${noteName} non atteso`);
        playedNoteSpan.style.color = 'red'; // Highlight the error
        // The red color will remain until the next MIDI input arrives
    }
}


// --- Exercise Completion and Advancement Handling (MODIFIED) ---
/**
 * Handles the completion of a repetition or the entire exercise.
 */
function handleExerciseCompletion() {
    // This function is called when checkAndAdvanceStep determines there are no more subsequent ticks.
    // It means the last step of the exercise has been completed.

    if (currentRepetition < targetRepetitions) {
        // Repetition completed, but not the entire exercise
        console.log(`--- Ripetizione ${currentRepetition} di ${targetRepetitions} completata! ---`); // LOG DI DEBUG
        currentRepetition++; // Move to the next repetition

        console.log(`Avvio preparazione per ripetizione ${currentRepetition}/${targetRepetitions}`); // LOG DI DEBUG
        updateInfo(`Ottimo! Prepara la Rip. ${currentRepetition}`);
        playedNoteSpan.textContent = "Bene!"; // Temporary message

        // Use setTimeout to give the user time to see the result
        // and prepare for the next sequence.
        const delay = 1500; // Delay before resetting for the next repetition (e.g., 1.5 seconds)
        // Disable controls during the wait
        startButton.disabled = true;
        stopButton.disabled = true;
        categorySelect.disabled = true;
        exerciseSelect.disabled = true;


        exerciseCompletionTimeout = setTimeout(() => {
            exerciseCompletionTimeout = null; // Clear the timeout reference
            if (!isPlaying) {
                 console.log("Esercizio fermato durante il delay di ripetizione."); // LOG DI DEBUG
                 resetUIState(); // Ensure UI is in correct state after interruption
                 // Re-enable controls for manual selection
                 categorySelect.disabled = false;
                 exerciseSelect.disabled = false;
                 // Start button is handled by resetUIState and updateMidiStatus
                 return;
            }
            console.log(`Inizio Ripetizione ${currentRepetition}`); // LOG DI DEBUG
            currentTick = 0;            // Reset current tick to the beginning of the exercise
            resetNoteStates();          // Reset states to 'pending'/'rest'
            updateExpectedNotes();      // Mark the first notes as 'expected' and update info
            renderExercise(scoreDiv.id, currentExerciseData); // Render for the new repetition
            updateSuccessRate();        // Reset % for the new repetition (will show 0%)
            scrollToCurrentSystem();    // Scroll to the top of the score (tick 0)

            // Re-enable controls (Start remains disabled if MIDI not ready or exercise not startable)
            const hasPlayableNotes = currentExerciseData ? [...currentExerciseData.notesTreble, ...currentExerciseData.notesBass, ...currentExerciseData.notes]
                .some(note => note && typeof note.startTick === 'number' && note.startTick >= 0 &&
                              !(note.keys && note.keys[0]?.toLowerCase().startsWith('r/'))) : false;
            startButton.disabled = !midiReady || !currentExerciseData || !hasPlayableNotes;
            stopButton.disabled = false; // Stop is enabled as exercise has restarted
            categorySelect.disabled = true; // Remain disabled during execution
            exerciseSelect.disabled = true;

        }, delay);

    } else {
        // All repetitions completed, exercise finished
        console.log("Esercizio (tutte le ripetizioni) completato con successo!"); // LOG DI DEBUG
        isPlaying = false; // Stop game state
        stopButton.disabled = true; // Disable stop
        // startButton will remain disabled until a new exercise is selected/advanced to

        updateInfo("Esercizio Completato!");
        playedNoteSpan.textContent = "Bravo!"; // Congratulations message

        const currentCategoryKey = categorySelect.value;
        const currentExerciseId = currentExerciseDefinition?.id;

        // Check that state is consistent to proceed
        if (!currentCategoryKey || !allExercises[currentCategoryKey] || !currentExerciseId || !Array.isArray(allExercises[currentCategoryKey])) {
            console.error("Stato applicazione non valido per determinare il prossimo esercizio. Categoria o ID esercizio corrente mancanti o non validi."); // LOG DI DEBUG
            // Re-enable controls for manual selection
            categorySelect.disabled = false;
            exerciseSelect.disabled = false;
            startButton.disabled = true; // Force re-selection or wait for new exercise
            updateInfo("Errore stato. Seleziona un nuovo esercizio.");
            return;
        }

        const categoryExercises = allExercises[currentCategoryKey];
        let nextExercise = null; // Next exercise to start

        // === Advancement Logic: Ordered vs Random ===
        if (ORDERED_CATEGORIES.includes(currentCategoryKey)) {
            // --- Ordered Advancement ---
            console.log(`Categoria "${currentCategoryKey}" è configurata per avanzamento ordinato. Cerco esercizio successivo.`); // LOG DI DEBUG
            const currentIndex = categoryExercises.findIndex(ex => ex && ex.id === currentExerciseId);

            if (currentIndex !== -1 && currentIndex < categoryExercises.length - 1) {
                // Found current exercise, take the next one in the array
                 let nextIndex = currentIndex + 1;
                 // Skip any invalid elements in the exercises array
                 while(nextIndex < categoryExercises.length && (!categoryExercises[nextIndex] || !categoryExercises[nextIndex].id)) {
                    console.warn(`Elemento all'indice ${nextIndex} non valido nella categoria ordinata, salto al successivo.`); // LOG DI DEBUG
                    nextIndex++;
                 }
                 if (nextIndex < categoryExercises.length) {
                    nextExercise = categoryExercises[nextIndex];
                    console.log(`Prossimo esercizio (ordinato): ${nextExercise.name || nextExercise.id} (ID: ${nextExercise.id})`); // LOG DI DEBUG
                 } else {
                    console.log("Nessun esercizio valido trovato dopo l'indice corrente nella categoria ordinata."); // LOG DI DEBUG
                    nextExercise = null; // No other valid exercise found
                 }
            } else if (currentIndex === -1) {
                console.error(`Errore: Impossibile trovare l'indice dell'esercizio corrente (ID: ${currentExerciseId}) nella categoria ordinata.`); // LOG DI DEBUG
                nextExercise = null; // Cannot determine next
            } else {
                // Was the last exercise (or last valid one) in the category
                console.log("Ultimo esercizio della categoria ordinata completato."); // LOG DI DEBUG
                nextExercise = null;
            }
        } else {
            // --- Random Advancement ---
            console.log(`Categoria "${currentCategoryKey}" non è in ORDERED_CATEGORIES. Cerco esercizio random (diverso dal corrente).`); // LOG DI DEBUG
            // Filter to get only valid exercises (with ID) different from the one just completed
            const availableExercises = categoryExercises.filter(ex => ex && ex.id && ex.id !== currentExerciseId);

            if (availableExercises.length > 0) {
                const randomIndex = Math.floor(Math.random() * availableExercises.length);
                nextExercise = availableExercises[randomIndex];
                console.log(`Prossimo esercizio (random): ${nextExercise.name || nextExercise.id} (ID: ${nextExercise.id})`); // LOG DI DEBUG
            } else {
                // Only 1 exercise in the category or all others are invalid
                console.log("Nessun altro esercizio valido disponibile per la selezione random in questa categoria."); // LOG DI DEBUG
                nextExercise = null;
            }
        }
        // ============================================

        // --- Start the next exercise or finish ---
        if (nextExercise && nextExercise.id) {
            const delay = 2500; // Pause before starting the next one (in ms)
            updateInfo(`Prossimo: ${nextExercise.name || nextExercise.id}...`);
            console.log(`Attendo ${delay}ms prima di caricare ${nextExercise.id}`); // LOG DI DEBUG

            // Disable controls during the wait
            categorySelect.disabled = true;
            exerciseSelect.disabled = true;
            startButton.disabled = true;
            stopButton.disabled = true; // Ensure stop is disabled

            exerciseCompletionTimeout = setTimeout(() => {
                exerciseCompletionTimeout = null; // Clear the timeout reference
                 if (!nextExercise || !nextExercise.id) { // Double check
                     console.error("Timeout scaduto ma nextExercise non è valido."); // LOG DI DEBUG
                     updateInfo("Errore caricamento prossimo esercizio.");
                     categorySelect.disabled = false; // Re-enable for manual choice
                     exerciseSelect.disabled = false;
                     startButton.disabled = !midiReady; // Enable start if MIDI ready
                     return;
                 }
                console.log(`Caricamento automatico: ${nextExercise.id}`); // LOG DI DEBUG
                // Set the value in the select (update UI)
                exerciseSelect.value = nextExercise.id;
                // Select the exercise (load data, render, calculate ticks, enable/disable start)
                selectExercise(nextExercise.id, currentCategoryKey);

                // Automatically start the new exercise only if MIDI is ready and the exercise has playable notes
                const hasPlayableNotes = currentExerciseData ? [...currentExerciseData.notesTreble, ...currentExerciseData.notesBass, ...currentExerciseData.notes]
                    .some(note => note && typeof note.startTick === 'number' && note.startTick >= 0 &&
                                  !(note.keys && note.keys[0]?.toLowerCase().startsWith('r/'))) : false;

                if (midiReady && currentExerciseData && hasPlayableNotes) {
                     console.log("Avvio automatico del prossimo esercizio..."); // LOG DI DEBUG
                     // Short additional pause to allow rendering before actual start
                     setTimeout(startExercise, 200);
                } else {
                     console.warn("MIDI non pronto o esercizio non avviabile. L'utente dovrà premere Start."); // LOG DI DEBUG
                     // Ensure controls are in the correct state
                     categorySelect.disabled = true; // Keep locked on current category
                     exerciseSelect.disabled = true; // Keep locked on loaded exercise
                     // Start button is already handled by selectExercise
                     stopButton.disabled = true; // Stop remains disabled
                     if (!midiReady) updateInfo(`Prossimo: ${nextExercise.name || nextExercise.id}. Collega MIDI.`);
                     else if (!hasPlayableNotes) updateInfo(`Prossimo: ${nextExercise.name || nextExercise.id}. Nessuna nota suonabile.`);
                     else updateInfo(`Prossimo: ${nextExercise.name || nextExercise.id}. Premi Start.`);
                }
            }, delay);

        } else {
            // No other exercise available or category completed
            console.log("Nessun prossimo esercizio da avviare automaticamente."); // LOG DI DEBUG
            updateInfo("Categoria Completata! Scegli una nuova categoria o esercizio.");
            playedNoteSpan.textContent = "Ottimo Lavoro!";
            // Re-enable controls to allow the user to choose what to do next
            categorySelect.disabled = false;
            exerciseSelect.disabled = false;
            // Start button remains disabled until a new valid exercise is selected
            startButton.disabled = true;
            stopButton.disabled = true; // Stop remains disabled
            // Ensure the state of the last exercise is no longer active
            currentExerciseData = null;
            currentExerciseDefinition = null;
            totalTicks = 0;
            systemYPositions = [];
             // You might want to clear the score or leave the last one displayed
             // scoreDiv.innerHTML = '<p>Categoria completata!</p>';
        }
    }
}


// --- updateMidiStatus Function ---
/**
 * Updates the MIDI connection status in the UI and enables/disables controls.
 * @param {string} message - MIDI status message.
 * @param {boolean} isConnected - True if a MIDI device is connected.
 */
function updateMidiStatus(message, isConnected) {
    midiStatusSpan.textContent = message;
    midiReady = isConnected;

    // Update the state of the Start button based on MIDI connection
    // and the current application state
    const hasPlayableNotes = currentExerciseData ? [...currentExerciseData.notesTreble, ...currentExerciseData.notesBass, ...currentExerciseData.notes]
            .some(note => note && typeof note.startTick === 'number' && note.startTick >= 0 &&
                          !(note.keys && note.keys[0]?.toLowerCase().startsWith('r/'))) : false;

    if (isConnected) {
        // MIDI Connected: Enable Start IF a valid exercise is selected,
        // there are playable notes, and it's not already playing.
        startButton.disabled = isPlaying || !currentExerciseData || !hasPlayableNotes;
         // If an exercise was selected but start was disabled due to lack of MIDI,
         // update the info message.
         if (!isPlaying && currentExerciseData && hasPlayableNotes) {
             updateInfo(`MIDI pronto. Premi Start per ${currentExerciseDefinition.name || currentExerciseDefinition.id}.`);
         } else if (!currentExerciseData) {
             updateInfo("MIDI pronto. Seleziona un esercizio.");
         } else if (!hasPlayableNotes) {
             updateInfo("MIDI pronto. Questo esercizio non ha note suonabili.");
         }
    } else {
        // MIDI Disconnected: Always disable Start.
        startButton.disabled = true;
        updateInfo("Collega un dispositivo MIDI per iniziare.");
        // If the exercise was in progress, stop it abruptly.
        if (isPlaying) {
            console.warn("Dispositivo MIDI disconnesso durante l'esecuzione dell'esercizio!"); // LOG DI DEBUG
            stopExercise(); // Stop the exercise
            // Show a more prominent message to the user
            alert("ATTENZIONE: Dispositivo MIDI disconnesso! Esercizio interrotto.");
            updateInfo("MIDI Disconnesso! Esercizio interrotto.");
        }
    }
}

// --- Event Listeners ---
categorySelect.addEventListener('change', (e) => {
    // When category changes, populate exercise select
    // and reset state (this is done inside populateExerciseSelect)
    populateExerciseSelect(e.target.value);
});

exerciseSelect.addEventListener('change', (e) => {
    // When an exercise is selected, load its data
    const selectedExerciseId = e.target.value;
    const selectedCategoryKey = categorySelect.value;
    selectExercise(selectedExerciseId, selectedCategoryKey);
});

startButton.addEventListener('click', startExercise);
stopButton.addEventListener('click', stopExercise);

// --- Application Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM completamente caricato e analizzato.");
    console.log("Inizializzazione Piano Future vFinale (Avanzamento a Ticks, Scrolling migliorato, DEBUG SCROLLING ON)..."); // LOG DI DEBUG

    // 1. Load exercise data from window.exerciseData (generated by build_exercises.js)
    loadExerciseData(); // Includes basic validation and populates categories

    // 2. Initialize MIDI system (Web MIDI API)
    // Pass callbacks to handle MIDI events (note on) and status updates
    initializeMIDI(handleNoteOn, updateMidiStatus);

    // 3. Set initial UI state
    resetUIState(); // Ensure UI is in correct initial state
    stopButton.disabled = true; // Stop is always disabled initially
    startButton.disabled = true; // Start is disabled until MIDI is ready AND a valid exercise is selected
    scoreDiv.innerHTML = '<p>Benvenuto! Seleziona una categoria e un esercizio.</p>'; // Initial message
    updateInfo("Collega un dispositivo MIDI e seleziona un esercizio.");
});