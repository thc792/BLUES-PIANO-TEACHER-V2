/**
 * NomeFile.js/style.css - Breve descrizione (da personalizzare per ogni file)
 *
 * Piano Future
 * Copyright (c) 2025 Lorenzetti Giuseppe
 *
 * Questo codice sorgente è rilasciato sotto la licenza MIT.
 * Vedi il file LICENSE nel repository GitHub per i dettagli completi.
 * https://github.com/thc792/piano-tutor-extraime/blob/main/LICENSE
 */
/**
 * js/midi_handler.js
 * Gestore per l'input MIDI Web API
 * **VERSIONE CON AGGIUNTA FORZATA DEL LISTENER in updateDevices**
 */

let midiAccess = null;
let currentInput = null;
let noteOnCallback = null; // Funzione da chiamare quando una nota è premuta (handleNoteOn in main.js)
let midiStatusCallback = null; // Funzione per aggiornare lo stato nell'UI

const MIDI_NOTE_MAP = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

function midiNumberToNoteName(midiNote) {
    if (midiNote < 0 || midiNote > 127) return null;
    const octave = Math.floor(midiNote / 12) - 1;
    const noteIndex = midiNote % 12;
    return `${MIDI_NOTE_MAP[noteIndex]}/${octave}`;
}

// Listener principale che riceve i messaggi MIDI
function onMIDIMessage(event) {
    const rawData = event.data;
    const command = rawData[0] >> 4;
    const noteNumber = rawData[1];
    const velocity = rawData.length > 2 ? rawData[2] : 0;

    // Logga SEMPRE il messaggio ricevuto per debug
    console.log(`%cMIDI Message Received:`, 'color: orange; font-weight: bold;', {
        rawData: `[${rawData[0]}, ${rawData[1]}${rawData.length > 2 ? ', ' + rawData[2] : ''}]`,
        command: command,
        noteNumber: noteNumber,
        velocity: velocity
    });

    // Processa solo Note On con velocity > 0
    if (command === 9 && velocity > 0) {
        const noteName = midiNumberToNoteName(noteNumber);
        console.log(`  -> Interpreted as: Note On (Name: ${noteName})`); // DEBUG

        if (noteOnCallback && noteName) {
            console.log("  -> Calling noteOnCallback (handleNoteOn)..."); // DEBUG
            noteOnCallback(noteName, noteNumber, velocity);
        } else if (!noteOnCallback) {
            console.error("  -> Error: noteOnCallback is missing!");
        } else if (!noteName) {
            console.warn(`  -> Warning: Could not get noteName for MIDI note ${noteNumber}`);
        }
    } else {
        // Ignora altri comandi per ora
        // console.log(" -> Ignoring non-NoteOn message."); // DEBUG opzionale
    }
}

// Funzione CHIAVE: Gestisce l'aggiunta/rimozione del listener
function updateDevices(inputs) {
    console.log("updateDevices: Checking inputs...");
    const inputsIterator = inputs.values();
    const firstInput = inputs.size > 0 ? inputsIterator.next().value : null;

    // Rimuovi SEMPRE il listener dal vecchio input, se esiste
    if (currentInput && currentInput !== firstInput) {
        console.log(`updateDevices: Removing listener from old device ${currentInput.name}`);
        try {
             currentInput.removeEventListener('midimessage', onMIDIMessage);
        } catch (e) { console.error("Error removing listener:", e)} // Aggiungi try-catch per sicurezza
        currentInput = null; // Resetta currentInput qui
    } else if (currentInput && currentInput === firstInput) {
        console.log(`updateDevices: Device ${currentInput.name} is the same, attempting to refresh listener.`);
         try {
             currentInput.removeEventListener('midimessage', onMIDIMessage);
             console.log(`updateDevices: Successfully removed listener before re-adding.`);
        } catch (e) { console.error("Error removing listener before re-adding:", e)}
    }


    // Se c'è un nuovo (o lo stesso) dispositivo valido
    if (firstInput) {
        currentInput = firstInput; // Imposta (o reimposta) l'input corrente
        console.log(`updateDevices: Attempting to attach listener to ${currentInput.name}...`);
        try {
            // Aggiungi il listener
            currentInput.addEventListener('midimessage', onMIDIMessage);
            // *** Log di conferma IMMEDIATAMENTE dopo ***
            console.log(`%cupdateDevices: Listener ATTACHED (or re-attached) successfully to ${currentInput.name}`, 'color: green; font-weight: bold;');
        } catch (e) {
             console.error(`%cupdateDevices: FAILED to attach listener to ${currentInput.name}`, 'color: red; font-weight: bold;', e);
        }

        if (midiStatusCallback) midiStatusCallback(`Connesso a: ${currentInput.name}`, true);

    } else {
        // Nessun dispositivo trovato
        console.log("updateDevices: No input devices found.");
        currentInput = null; // Assicurati che currentInput sia null
        if (midiStatusCallback) midiStatusCallback("Nessun dispositivo MIDI trovato", false);
    }
}

// Chiamato quando l'accesso MIDI ha successo
function onMIDISuccess(access) {
    midiAccess = access;
    console.log("onMIDISuccess: Accesso MIDI OK.");
    updateDevices(midiAccess.inputs); // Configura il dispositivo iniziale

    midiAccess.onstatechange = (event) => {
        console.log(`%cMIDI State Change: Port=${event.port.name}, State=${event.port.state}, Type=${event.port.type}`, 'color: purple;');
        if (event.port.type === 'input') {
             console.log("onstatechange: Input port changed state, calling updateDevices..."); // DEBUG
            updateDevices(midiAccess.inputs); // Riconfigura i dispositivi
        }
    };
}

// Chiamato se l'accesso MIDI fallisce
function onMIDIFailure(msg) {
    console.error("onMIDIFailure: Errore accesso MIDI:", msg);
    if (midiStatusCallback) midiStatusCallback(`Errore: ${msg}`, false);
}

// Funzione esportata per inizializzare
export function initializeMIDI(_noteOnCallback, _statusCallback) {
    console.log("initializeMIDI: Initializing...");
    noteOnCallback = _noteOnCallback;
    midiStatusCallback = _statusCallback;

    if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess({ sysex: false })
            .then(onMIDISuccess, onMIDIFailure);
    } else {
        console.warn("initializeMIDI: Web MIDI API non supportata.");
        if (midiStatusCallback) midiStatusCallback("Web MIDI non supportato", false);
    }
}

// Funzioni lasciate per compatibilità importazione ma non fanno più nulla
export function stopMIDIListening() {
     // console.log("stopMIDIListening: Called (Does nothing).");
}
export function startMIDIListening() {
     // console.log("startMIDIListening: Called (Does nothing).");
}