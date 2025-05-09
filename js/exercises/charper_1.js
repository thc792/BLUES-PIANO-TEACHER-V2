/**
 * js/exercises/charper_1.js
 * Contiene dati per esercizi del Capitolo 1 (Charper 1).
 * Include l'Esercizio 1 completo (12 battute con intervalli/accordi),
 * l'Esercizio 2 (4 battute con note singole),
 * e l'Esercizio 3 (12 battute trascritte dall'immagine completa fornita).
 *
 * Piano Future
 * Copyright (c) 2025 Lorenzetti Giuseppe
 *
 * Questo codice sorgente è rilasciato sotto la licenza MIT.
 * Vedi il file LICENSE nel repository GitHub per i dettagli completi.
 * https://github.com/thc792/piano-tutor-extraime/blob/main/LICENSE
 */

const charper1Exercises = [

    // ===========================================
    // === Esercizio 1 - Trascrizione Completa ===
    // ===========================================
    {
        id: "charper1-ex1",
        name: "Esercizio 1",
        category: "charper_1",
        staveLayout: "grand",
        keySignature: "C",
        timeSignature: "4/4",
        repetitions: 5,
        notesTreble: [
            // Battuta 1
            { keys: ["c/4"], duration: "w", midiValue: 60 },
            // Battuta 2
            { keys: ["d/4", "e/4"], duration: "h", midiValues: [62, 64] },
            { keys: ["e/4", "g/4"], duration: "h", midiValues: [64, 67] },
            // Battuta 3
            { keys: ["f/4", "a/4"], duration: "h", midiValues: [65, 69] },
            { keys: ["g/4", "b/4"], duration: "h", midiValues: [67, 71] },
            // Battuta 4
            { keys: ["c/4"], duration: "w", midiValue: 60 },
            // Battuta 5
            { keys: ["f/4"], duration: "w", midiValue: 65 },
            // Battuta 6
            { keys: ["g/4"], duration: "8", midiValue: 67 },
            { keys: ["f/4"], duration: "8", midiValue: 65 },
            { keys: ["e/4"], duration: "q", midiValue: 64 },
            { keys: ["d/4"], duration: "h", midiValue: 62 },
            // Battuta 7
            { keys: ["c/4", "b/3"], duration: "h", midiValues: [60, 59] },
            { keys: ["b/3", "a/3"], duration: "h", midiValues: [59, 57] },
            // Battuta 8
            { keys: ["e/4"], duration: "w", midiValue: 64 },
            // Battuta 9
            { keys: ["g/4"], duration: "w", midiValue: 67 },
            // Battuta 10
            { keys: ["f/4"], duration: "8", midiValue: 65 },
            { keys: ["e/4"], duration: "8", midiValue: 64 },
            { keys: ["d/4"], duration: "q", midiValue: 62 },
            { keys: ["c/4"], duration: "h", midiValue: 60 },
            // Battuta 11
            { keys: ["a/4", "g/4"], duration: "h", midiValues: [69, 67] },
            { keys: ["g/4", "f/4"], duration: "h", midiValues: [67, 65] },
            // Battuta 12
            { keys: ["c/4"], duration: "w", midiValue: 60 }
        ],
        notesBass: [
            // Battuta 1
            { keys: ["c/3"], duration: "w", midiValue: 48 },
            // Battuta 2
            { keys: ["f/2", "e/2"], duration: "h", midiValues: [41, 40] },
            { keys: ["e/2", "d/2"], duration: "h", midiValues: [40, 38] },
            // Battuta 3
            { keys: ["d/2", "c/2"], duration: "h", midiValues: [38, 36] },
            { keys: ["c/2", "b/1"], duration: "h", midiValues: [36, 35] },
            // Battuta 4
            { keys: ["c/2"], duration: "w", midiValue: 36 },
            // Battuta 5
            { keys: ["f/2"], duration: "w", midiValue: 41 },
            // Battuta 6
            { keys: ["bb/2", "d/3", "f/3"], duration: "w", midiValues: [46, 50, 53] },
            // Battuta 7
            { keys: ["g/2", "f/2"], duration: "h", midiValues: [43, 41] },
            { keys: ["f/2", "e/2"], duration: "h", midiValues: [41, 40] },
            // Battuta 8
            { keys: ["e/2"], duration: "w", midiValue: 40 },
            // Battuta 9
            { keys: ["g/2"], duration: "w", midiValue: 43 },
            // Battuta 10
            { keys: ["c/3", "b/2"], duration: "h", midiValues: [48, 47] },
            { keys: ["b/2", "a/2"], duration: "h", midiValues: [47, 45] },
            // Battuta 11
            { keys: ["a/2", "g/2"], duration: "h", midiValues: [45, 43] },
            { keys: ["g/2", "f/2"], duration: "h", midiValues: [43, 41] },
            // Battuta 12
            { keys: ["c/2"], duration: "w", midiValue: 36 }
        ]
    },

    // ===========================================
    // === Esercizio 2 - Trascrizione Completa ===
    // ===========================================
    {
        id: "charper1-ex2",
        name: "Esercizio 2",
        category: "charper_1",
        staveLayout: "grand",
        keySignature: "C",
        timeSignature: "4/4",
        repetitions: 5,
        notesTreble: [
            // Battuta 1
            { keys: ["c/4"], duration: "q", midiValue: 60 },
            { keys: ["d/4"], duration: "q", midiValue: 62 },
            { keys: ["e/4"], duration: "q", midiValue: 64 },
            { keys: ["f/4"], duration: "q", midiValue: 65 },
            // Battuta 2
            { keys: ["g/4"], duration: "q", midiValue: 67 },
            { keys: ["f/4"], duration: "q", midiValue: 65 },
            { keys: ["e/4"], duration: "q", midiValue: 64 },
            { keys: ["d/4"], duration: "q", midiValue: 62 },
            // Battuta 3
            { keys: ["c/4"], duration: "h", midiValue: 60 },
            { keys: ["r/4"], duration: "h" },
            // Battuta 4
            { keys: ["c/4"], duration: "w", midiValue: 60 }
        ],
        notesBass: [
            // Battuta 1
            { keys: ["c/3"], duration: "q", midiValue: 48 },
            { keys: ["d/3"], duration: "q", midiValue: 50 },
            { keys: ["e/3"], duration: "q", midiValue: 52 },
            { keys: ["f/3"], duration: "q", midiValue: 53 },
            // Battuta 2
            { keys: ["g/2"], duration: "q", midiValue: 43 },
            { keys: ["f/2"], duration: "q", midiValue: 41 },
            { keys: ["e/2"], duration: "q", midiValue: 40 },
            { keys: ["d/2"], duration: "q", midiValue: 38 },
            // Battuta 3
            { keys: ["c/3"], duration: "w", midiValue: 48 },
            // Battuta 4
            { keys: ["c/2"], duration: "w", midiValue: 36 }
        ]
    },

    // =======================================================================================
    // === Esercizio 3 - Trascrizione Completa dall'intera immagine (3 sistemi musicali) ===
    // =======================================================================================
    // Le prime 4 battute sono in Do Maggiore.
    // Le battute 5-12 sono in Si♭ Maggiore (trascritte con alterazioni accidentali).
    {
        id: "charper1-ex3",
        name: "Esercizio 3 (Completo Immagine)",
        category: "charper_1",
        staveLayout: "grand",
        keySignature: "C", // Impostato a Do M; Si♭ e Mi♭ saranno accidentali nelle battute 5-12
        timeSignature: "4/4",
        repetitions: 5,

        notesTreble: [
            // --- Inizio Primo Sistema (Do Maggiore) ---
            // Battuta 1
            { keys: ["c/4", "e/4", "g/4"], duration: "q", midiValues: [60, 64, 67] }, // Accordo Do-Mi-Sol
            { keys: ["f/4"], duration: "q", midiValue: 65 }, // Fa4
            { keys: ["e/4"], duration: "h", midiValue: 64 }, // Mi4
            // Battuta 2
            { keys: ["d/4", "f/4", "a/4"], duration: "q", midiValues: [62, 65, 69] }, // Accordo Re-Fa-La
            { keys: ["g/4"], duration: "q", midiValue: 67 }, // Sol4
            { keys: ["f/4"], duration: "h", midiValue: 65 }, // Fa4
            // Battuta 3
            { keys: ["e/4"], duration: "q", midiValue: 64 }, // Mi4
            { keys: ["d/4"], duration: "q", midiValue: 62 }, // Re4
            { keys: ["c/4"], duration: "h", midiValue: 60 }, // Do4
            // Battuta 4
            { keys: ["r/4"], duration: "h" }, // Pausa di minima
            { keys: ["r/4"], duration: "h" }, // Pausa di minima
            // --- Fine Primo Sistema ---

            // --- Inizio Secondo Sistema (etichettato "3.", originariamente Si♭ Maggiore) ---
            // Battuta 5
            { keys: ["c/5"], duration: "q", midiValue: 72 },
            { keys: ["bb/4"], duration: "q", midiValue: 70 }, // Si♭4
            { keys: ["a/4"], duration: "q", midiValue: 69 },
            { keys: ["g/4"], duration: "q", midiValue: 67 },
            // Battuta 6
            { keys: ["f/4"], duration: "q", midiValue: 65 },
            { keys: ["g/4"], duration: "q", midiValue: 67 },
            { keys: ["a/4"], duration: "q", midiValue: 69 },
            { keys: ["bb/4"], duration: "q", midiValue: 70 }, // Si♭4
            // Battuta 7
            { keys: ["c/5"], duration: "h", midiValue: 72 },
            { keys: ["r/4"], duration: "h" }, // Pausa di minima
            // Battuta 8
            { keys: ["d/5"], duration: "h", midiValue: 74 },
            { keys: ["c/5"], duration: "h", midiValue: 72 },
            // --- Fine Secondo Sistema ---

            // --- Inizio Terzo Sistema (continuazione "3.", originariamente Si♭ Maggiore) ---
            // Battuta 9
            { keys: ["g/4"], duration: "q", midiValue: 67 },
            { keys: ["a/4"], duration: "q", midiValue: 69 },
            { keys: ["bb/4"], duration: "q", midiValue: 70 }, // Si♭4
            { keys: ["c/5"], duration: "q", midiValue: 72 },
            // Battuta 10
            { keys: ["d/5"], duration: "q", midiValue: 74 },
            { keys: ["c/5"], duration: "q", midiValue: 72 },
            { keys: ["bb/4"], duration: "q", midiValue: 70 }, // Si♭4
            { keys: ["a/4"], duration: "q", midiValue: 69 },
            // Battuta 11
            { keys: ["g/4"], duration: "h", midiValue: 67 },
            { keys: ["r/4"], duration: "h" }, // Pausa di minima
            // Battuta 12
            { keys: ["f/4"], duration: "h", midiValue: 65 },
            { keys: ["eb/4"], duration: "h", midiValue: 63 }  // Mi♭4
            // --- Fine Terzo Sistema ---
        ],

        notesBass: [
            // --- Inizio Primo Sistema (Do Maggiore) ---
            // Battuta 1
            { keys: ["c/2"], duration: "w", midiValue: 36 }, // Do2 (interpretato come semibreve)
            // Battuta 2
            { keys: ["f/2"], duration: "w", midiValue: 41 }, // Fa2 (interpretato come semibreve)
            // Battuta 3
            { keys: ["g/2"], duration: "q", midiValue: 43 },
            { keys: ["g/2"], duration: "q", midiValue: 43 },
            { keys: ["g/2"], duration: "q", midiValue: 43 },
            { keys: ["g/2"], duration: "q", midiValue: 43 },
            // Battuta 4
            { keys: ["c/2"], duration: "w", midiValue: 36 }, // Do2
            // --- Fine Primo Sistema ---

            // --- Inizio Secondo Sistema (etichettato "3.", originariamente Si♭ Maggiore) ---
            // Battuta 5
            { keys: ["eb/3"], duration: "q", midiValue: 51 }, // Mi♭3
            { keys: ["f/3"], duration: "q", midiValue: 53 },
            { keys: ["g/3"], duration: "q", midiValue: 55 },
            { keys: ["a/3"], duration: "q", midiValue: 57 },
            // Battuta 6
            { keys: ["bb/2"], duration: "q", midiValue: 46 }, // Si♭2
            { keys: ["a/2"], duration: "q", midiValue: 45 },
            { keys: ["g/2"], duration: "q", midiValue: 43 },
            { keys: ["f/2"], duration: "q", midiValue: 41 },
            // Battuta 7
            { keys: ["eb/3"], duration: "h", midiValue: 51 }, // Mi♭3
            { keys: ["r/4"], duration: "h" }, // Pausa di minima
            // Battuta 8
            { keys: ["bb/2"], duration: "w", midiValue: 46 }, // Si♭2
            // --- Fine Secondo Sistema ---

            // --- Inizio Terzo Sistema (continuazione "3.", originariamente Si♭ Maggiore) ---
            // Battuta 9
            { keys: ["c/3"], duration: "q", midiValue: 48 },
            { keys: ["d/3"], duration: "q", midiValue: 50 },
            { keys: ["eb/3"], duration: "q", midiValue: 51 }, // Mi♭3
            { keys: ["f/3"], duration: "q", midiValue: 53 },
            // Battuta 10
            { keys: ["g/3"], duration: "q", midiValue: 55 },
            { keys: ["f/3"], duration: "q", midiValue: 53 },
            { keys: ["eb/3"], duration: "q", midiValue: 51 }, // Mi♭3
            { keys: ["d/3"], duration: "q", midiValue: 50 },
            // Battuta 11
            { keys: ["c/3"], duration: "h", midiValue: 48 },
            { keys: ["r/4"], duration: "h" }, // Pausa di minima
            // Battuta 12
            { keys: ["bb/2"], duration: "w", midiValue: 46 }  // Si♭2
            // --- Fine Terzo Sistema ---
        ]
    },
     // === Esercizio 4 - Trascrizione Immagine ===
    // ===========================================
    // Trascritto dall'immagine fornita (etichettata "4.").
    // Armatura di chiave: Do Maggiore. 12 battute totali.
    {
        id: "charper1-ex4",
        name: "Esercizio 4",
        category: "charper_1",
        staveLayout: "grand",
        keySignature: "C",    // Do Maggiore (nessuna alterazione in chiave)
        timeSignature: "4/4", // Indicazione di tempo 4/4
        repetitions: 5,       // Numero di ripetizioni consigliato

        notesTreble: [
            // --- Sistema 1 ---
            // Battuta 1
            { keys: ["e/4"], duration: "q", midiValue: 64 },
            { keys: ["f#/4"], duration: "q", midiValue: 66 }, // Fa#4
            { keys: ["g/4"], duration: "h", midiValue: 67 },
            // Battuta 2
            { keys: ["a/4"], duration: "q", midiValue: 69 },
            { keys: ["g/4"], duration: "q", midiValue: 67 },
            { keys: ["f#/4"], duration: "h", midiValue: 66 }, // Fa#4
            // Battuta 3
            { keys: ["e/4"], duration: "q", midiValue: 64 },
            { keys: ["d/4"], duration: "q", midiValue: 62 },
            { keys: ["c/4"], duration: "h", midiValue: 60 },
            // Battuta 4
            { keys: ["b/3"], duration: "q", midiValue: 59 },
            { keys: ["c/4"], duration: "q", midiValue: 60 },
            { keys: ["d/4"], duration: "h", midiValue: 62 },

            // --- Sistema 2 ---
            // Battuta 5
            { keys: ["e/4"], duration: "q", midiValue: 64 },
            { keys: ["f#/4"], duration: "q", midiValue: 66 }, // Fa#4
            { keys: ["g/4"], duration: "h", midiValue: 67 },
            // Battuta 6
            { keys: ["d/4"], duration: "q", midiValue: 62 },
            { keys: ["e/4"], duration: "q", midiValue: 64 },
            { keys: ["f#/4"], duration: "h", midiValue: 66 }, // Fa#4
            // Battuta 7
            { keys: ["g/4"], duration: "q", midiValue: 67 },
            { keys: ["a/4"], duration: "q", midiValue: 69 },
            { keys: ["b/4"], duration: "h", midiValue: 71 },
            // Battuta 8
            { keys: ["c/5"], duration: "q", midiValue: 72 },
            { keys: ["b/4"], duration: "q", midiValue: 71 },
            { keys: ["a/4"], duration: "h", midiValue: 69 },

            // --- Sistema 3 ---
            // Battuta 9
            { keys: ["g/4"], duration: "q", midiValue: 67 },
            { keys: ["f#/4"], duration: "q", midiValue: 66 }, // Fa#4
            { keys: ["e/4"], duration: "h", midiValue: 64 },
            // Battuta 10
            { keys: ["d/4"], duration: "q", midiValue: 62 },
            { keys: ["e/4"], duration: "q", midiValue: 64 },
            { keys: ["f#/4"], duration: "h", midiValue: 66 }, // Fa#4
            // Battuta 11
            { keys: ["g/4"], duration: "q", midiValue: 67 },
            { keys: ["a/4"], duration: "q", midiValue: 69 },
            { keys: ["b/3"], duration: "h", midiValue: 59 }, // Si3
            // Battuta 12
            { keys: ["c/4"], duration: "w", midiValue: 60 }
        ],

        notesBass: [
            // --- Sistema 1 ---
            // Battuta 1
            { keys: ["c/2"], duration: "w", midiValue: 36 },
            // Battuta 2
            { keys: ["f/2"], duration: "w", midiValue: 41 },
            // Battuta 3
            { keys: ["g/2"], duration: "w", midiValue: 43 },
            // Battuta 4
            { keys: ["c/2"], duration: "w", midiValue: 36 },

            // --- Sistema 2 ---
            // Battuta 5
            { keys: ["a/1"], duration: "w", midiValue: 33 }, // La1
            // Battuta 6
            { keys: ["d/2"], duration: "w", midiValue: 38 },
            // Battuta 7
            { keys: ["g/1"], duration: "w", midiValue: 31 }, // Sol1
            // Battuta 8
            { keys: ["c/2"], duration: "w", midiValue: 36 },

            // --- Sistema 3 ---
            // Battuta 9
            { keys: ["c/2"], duration: "w", midiValue: 36 },
            // Battuta 10
            { keys: ["f/2"], duration: "w", midiValue: 41 },
            // Battuta 11
            { keys: ["g/2", "b/2"], duration: "q", midiValues: [43, 47] },   // Sol2-Si2
            { keys: ["c/2", "e/2"], duration: "q", midiValues: [36, 40] },   // Do2-Mi2
            { keys: ["d/2", "f#/2"], duration: "h", midiValues: [38, 42] }, // Re2-Fa#2
            // Battuta 12
            { keys: ["g/1", "c/2"], duration: "w", midiValues: [31, 36] }  // Sol1-Do2
        ]
    },
    // === Esercizio 5 - Trascrizione Immagine (Sol Maggiore, note croma) ===
    // =======================================================================
    // Trascritto dall'immagine fornita.
    // Armatura di chiave: Sol Maggiore (1 diesis). 12 battute totali.
    // Note con stanghetta interpretate come crome (1/8).
    {
        id: "charper1-ex5",
        name: "Esercizio 5",
        category: "charper_1",
        staveLayout: "grand",
        keySignature: "G",    // Sol Maggiore (F#)
        timeSignature: "4/4", // Indicazione di tempo 4/4
        repetitions: 5,       // Numero di ripetizioni consigliato

        notesTreble: [
            // --- Sistema 1 ---
            // Battuta 1
            { keys: ["g/4"], duration: "w", midiValue: 67 },
            // Battuta 2
            { keys: ["f#/4"], duration: "h", midiValue: 66 },
            { keys: ["d/4"], duration: "h", midiValue: 62 },
            // Battuta 3
            { keys: ["e/4"], duration: "h", midiValue: 64 },
            { keys: ["c/4"], duration: "h", midiValue: 60 },
            // Battuta 4
            { keys: ["d/4"], duration: "w", midiValue: 62 },

            // --- Sistema 2 ---
            // Battuta 5
            { keys: ["g/4"], duration: "h", midiValue: 67 },
            { keys: ["b/3"], duration: "h", midiValue: 59 },
            // Battuta 6
            { keys: ["a/4"], duration: "h", midiValue: 69 },
            { keys: ["c/4"], duration: "h", midiValue: 60 },
            // Battuta 7
            { keys: ["b/4"], duration: "h", midiValue: 71 },
            { keys: ["d/4"], duration: "h", midiValue: 62 },
            // Battuta 8
            { keys: ["c/5"], duration: "w", midiValue: 72 },

            // --- Sistema 3 ---
            // Battuta 9
            { keys: ["b/4"], duration: "h", midiValue: 71 },
            { keys: ["g/4"], duration: "h", midiValue: 67 },
            // Battuta 10
            { keys: ["a/4"], duration: "h", midiValue: 69 },
            { keys: ["f#/4"], duration: "h", midiValue: 66 },
            // Battuta 11
            { keys: ["g/4"], duration: "h", midiValue: 67 },
            { keys: ["e/4"], duration: "h", midiValue: 64 },
            // Battuta 12
            { keys: ["d/4"], duration: "w", midiValue: 62 }
        ],

        notesBass: [
            // --- Sistema 1 ---
            // Battuta 1
            { keys: ["g/2"], duration: "q.", midiValue: 43 },   // Sol2 semiminima puntata
            { keys: ["f#/2"], duration: "8", midiValue: 42 },  // Fa#2 croma
            { keys: ["d/2"], duration: "h", midiValue: 38 },   // Re2 minima
            // Battuta 2
            { keys: ["b/1"], duration: "q.", midiValue: 35 },   // Si1 semiminima puntata
            { keys: ["c/2"], duration: "8", midiValue: 36 },   // Do2 croma
            { keys: ["g/2"], duration: "h", midiValue: 43 },   // Sol2 minima
            // Battuta 3
            { keys: ["c/2"], duration: "q.", midiValue: 36 },   // Do2 semiminima puntata
            { keys: ["b/1"], duration: "8", midiValue: 35 },   // Si1 croma
            { keys: ["a/1"], duration: "h", midiValue: 33 },   // La1 minima
            // Battuta 4
            { keys: ["d/2"], duration: "q.", midiValue: 38 },   // Re2 semiminima puntata
            { keys: ["f#/2"], duration: "8", midiValue: 42 },  // Fa#2 croma
            { keys: ["g/2"], duration: "h", midiValue: 43 },   // Sol2 minima

            // --- Sistema 2 ---
            // Battuta 5
            { keys: ["g/2"], duration: "q.", midiValue: 43 },   // Sol2 semiminima puntata
            { keys: ["f#/2"], duration: "8", midiValue: 42 },  // Fa#2 croma
            { keys: ["d/2"], duration: "h", midiValue: 38 },   // Re2 minima
            // Battuta 6
            { keys: ["f#/2"], duration: "q.", midiValue: 42 }, // Fa#2 semiminima puntata
            { keys: ["g/2"], duration: "8", midiValue: 43 },   // Sol2 croma
            { keys: ["a/2"], duration: "h", midiValue: 45 },   // La2 minima
            // Battuta 7
            { keys: ["g/2"], duration: "q.", midiValue: 43 },   // Sol2 semiminima puntata
            { keys: ["a/2"], duration: "8", midiValue: 45 },   // La2 croma
            { keys: ["b/2"], duration: "h", midiValue: 47 },   // Si2 minima
            // Battuta 8
            { keys: ["a/2"], duration: "q.", midiValue: 45 },   // La2 semiminima puntata
            { keys: ["b/2"], duration: "8", midiValue: 47 },   // Si2 croma
            { keys: ["c/3"], duration: "h", midiValue: 48 },   // Do3 minima

            // --- Sistema 3 ---
            // Battuta 9
            { keys: ["g/2"], duration: "q.", midiValue: 43 },   // Sol2 semiminima puntata
            { keys: ["f#/2"], duration: "8", midiValue: 42 },  // Fa#2 croma
            { keys: ["d/2"], duration: "h", midiValue: 38 },   // Re2 minima
            // Battuta 10
            { keys: ["b/1"], duration: "q.", midiValue: 35 },   // Si1 semiminima puntata
            { keys: ["c/2"], duration: "8", midiValue: 36 },   // Do2 croma
            { keys: ["g/2"], duration: "h", midiValue: 43 },   // Sol2 minima
            // Battuta 11
            { keys: ["c/2"], duration: "q.", midiValue: 36 },   // Do2 semiminima puntata
            { keys: ["b/1"], duration: "8", midiValue: 35 },   // Si1 croma
            { keys: ["a/1"], duration: "h", midiValue: 33 },   // La1 minima
            // Battuta 12
            { keys: ["g/1"], duration: "w", midiValue: 31 }    // Sol1 semibreve
        ]
    },
    // === Esercizio 6 - Jingle Bells Blues (Creazione da Zero) ===
    // ============================================================
    // Adattamento di "Jingle Bells" in stile blues, 12 battute.
    // Armatura di chiave: Do Maggiore (con alterazioni accidentali per note blues).
    {
        id: "charper1-ex6",
        name: "Esercizio 6 - Jingle Bells Blues",
        category: "charper_1",
        staveLayout: "grand",
        keySignature: "C",    // Do Maggiore (useremo Eb, Bb come note blues)
        timeSignature: "4/4",
        repetitions: 3,       // Tipico per blues

        notesTreble: [
            // Bar 1 (Accordo: C7)
            { keys: ["e/4"], duration: "q.", midiValue: 64 },   // Jin-
            { keys: ["eb/4"], duration: "8", midiValue: 63 },  // gle
            { keys: ["c/4"], duration: "h", midiValue: 60 },    // Bells
            // Bar 2 (Accordo: C7)
            { keys: ["e/4"], duration: "q.", midiValue: 64 },   // Jin-
            { keys: ["g/4"], duration: "8", midiValue: 67 },   // gle
            { keys: ["eb/4"], duration: "8", midiValue: 63 },  // Bells (var.)
            { keys: ["c/4"], duration: "q", midiValue: 60 },
            // Bar 3 (Accordo: C7)
            { keys: ["e/4"], duration: "8", midiValue: 64 },   // Jin-
            { keys: ["g/4"], duration: "8", midiValue: 67 },   // gle
            { keys: ["c/4"], duration: "q", midiValue: 60 },    // all
            { keys: ["d/4"], duration: "8", midiValue: 62 },   // the
            { keys: ["eb/4"], duration: "8", midiValue: 63 },  // way
            { keys: ["c/4"], duration: "q", midiValue: 60 },
            // Bar 4 (Accordo: C7) - Fill Blues
            { keys: ["g/4"], duration: "q", midiValue: 67 },
            { keys: ["eb/4"], duration: "q", midiValue: 63 },
            { keys: ["d/4"], duration: "8", midiValue: 62 },
            { keys: ["c/4"], duration: "8", midiValue: 60 },
            { keys: ["r/4"], duration: "q" }, // Pausa

            // Bar 5 (Accordo: F7)
            { keys: ["f/4"], duration: "q.", midiValue: 65 },  // Oh
            { keys: ["a/4"], duration: "8", midiValue: 69 },   // what
            { keys: ["f/4"], duration: "8", midiValue: 65 },   // fun
            { keys: ["eb/4"], duration: "8", midiValue: 63 },  // it
            { keys: ["c/4"], duration: "q", midiValue: 60 },    // is
            // Bar 6 (Accordo: F7)
            { keys: ["f/4"], duration: "q.", midiValue: 65 },  // to
            { keys: ["eb/4"], duration: "8", midiValue: 63 },  // ride
            { keys: ["c/4"], duration: "q", midiValue: 60 },
            { keys: ["r/4"], duration: "q" }, // Pausa
            // Bar 7 (Accordo: C7)
            { keys: ["e/4"], duration: "q.", midiValue: 64 },   // (Return to Jingle feel)
            { keys: ["eb/4"], duration: "8", midiValue: 63 },
            { keys: ["c/4"], duration: "h", midiValue: 60 },
            // Bar 8 (Accordo: C7) - Fill Blues
            { keys: ["c/5"], duration: "8", midiValue: 72 },
            { keys: ["bb/4"], duration: "8", midiValue: 70 },
            { keys: ["g/4"], duration: "q", midiValue: 67 },
            { keys: ["eb/4"], duration: "8", midiValue: 63 },
            { keys: ["d/4"], duration: "8", midiValue: 62 },
            { keys: ["c/4"], duration: "q", midiValue: 60 },

            // Bar 9 (Accordo: G7)
            { keys: ["d/4"], duration: "q.", midiValue: 62 },  // In a
            { keys: ["f/4"], duration: "8", midiValue: 65 },   // one-horse (F naturale su G7)
            { keys: ["d/4"], duration: "8", midiValue: 62 },   // o-
            { keys: ["b/3"], duration: "8", midiValue: 59 },   // pen
            { keys: ["d/4"], duration: "q", midiValue: 62 },
            // Bar 10 (Accordo: F7)
            { keys: ["c/4"], duration: "q.", midiValue: 60 },  // sleigh,
            { keys: ["eb/4"], duration: "8", midiValue: 63 },
            { keys: ["c/4"], duration: "q", midiValue: 60 },   // HEY! (implicito)
            { keys: ["g/4"], duration: "q", midiValue: 67 },   // (shout)
            // Bar 11 (Accordo: C7)
            { keys: ["e/4"], duration: "8", midiValue: 64 },   // Final
            { keys: ["eb/4"], duration: "8", midiValue: 63 },  // Jin-
            { keys: ["c/4"], duration: "q", midiValue: 60 },    // gle
            { keys: ["g/3"], duration: "h", midiValue: 55 },   // (risoluzione bassa)
            // Bar 12 (Accordo: G7) - Turnaround
            { keys: ["g/4"], duration: "8", midiValue: 67 },
            { keys: ["f/4"], duration: "8", midiValue: 65 },
            { keys: ["eb/4"], duration: "8", midiValue: 63 },
            { keys: ["d/4"], duration: "8", midiValue: 62 },
            { keys: ["c/4"], duration: "8", midiValue: 60 },
            { keys: ["bb/3"], duration: "8", midiValue: 58 },
            { keys: ["g/3"], duration: "q", midiValue: 55 }
        ],

        notesBass: [
            // Bar 1 (C7: C-E-G-Bb)
            { keys: ["c/3"], duration: "q", midiValue: 48 },
            { keys: ["e/3"], duration: "q", midiValue: 52 },
            { keys: ["g/3"], duration: "q", midiValue: 55 },
            { keys: ["bb/3"], duration: "q", midiValue: 58 },
            // Bar 2 (C7)
            { keys: ["c/3"], duration: "q", midiValue: 48 },
            { keys: ["e/3"], duration: "q", midiValue: 52 },
            { keys: ["g/3"], duration: "q", midiValue: 55 },
            { keys: ["bb/3"], duration: "q", midiValue: 58 },
            // Bar 3 (C7)
            { keys: ["c/3"], duration: "q", midiValue: 48 },
            { keys: ["e/3"], duration: "q", midiValue: 52 },
            { keys: ["g/3"], duration: "q", midiValue: 55 },
            { keys: ["bb/3"], duration: "q", midiValue: 58 },
            // Bar 4 (C7)
            { keys: ["c/3"], duration: "q", midiValue: 48 },
            { keys: ["e/3"], duration: "q", midiValue: 52 },
            { keys: ["g/3"], duration: "q", midiValue: 55 },
            { keys: ["bb/3"], duration: "q", midiValue: 58 },

            // Bar 5 (F7: F-A-C-Eb)
            { keys: ["f/2"], duration: "q", midiValue: 41 },
            { keys: ["a/2"], duration: "q", midiValue: 45 },
            { keys: ["c/3"], duration: "q", midiValue: 48 },
            { keys: ["eb/3"], duration: "q", midiValue: 51 },
            // Bar 6 (F7)
            { keys: ["f/2"], duration: "q", midiValue: 41 },
            { keys: ["a/2"], duration: "q", midiValue: 45 },
            { keys: ["c/3"], duration: "q", midiValue: 48 },
            { keys: ["eb/3"], duration: "q", midiValue: 51 },
            // Bar 7 (C7)
            { keys: ["c/3"], duration: "q", midiValue: 48 },
            { keys: ["e/3"], duration: "q", midiValue: 52 },
            { keys: ["g/3"], duration: "q", midiValue: 55 },
            { keys: ["bb/3"], duration: "q", midiValue: 58 },
            // Bar 8 (C7)
            { keys: ["c/3"], duration: "q", midiValue: 48 },
            { keys: ["e/3"], duration: "q", midiValue: 52 },
            { keys: ["g/3"], duration: "q", midiValue: 55 },
            { keys: ["bb/3"], duration: "q", midiValue: 58 },

            // Bar 9 (G7: G-B-D-F)
            { keys: ["g/2"], duration: "q", midiValue: 43 },
            { keys: ["b/2"], duration: "q", midiValue: 47 },
            { keys: ["d/3"], duration: "q", midiValue: 50 },
            { keys: ["f/3"], duration: "q", midiValue: 53 },
            // Bar 10 (F7)
            { keys: ["f/2"], duration: "q", midiValue: 41 },
            { keys: ["a/2"], duration: "q", midiValue: 45 },
            { keys: ["c/3"], duration: "q", midiValue: 48 },
            { keys: ["eb/3"], duration: "q", midiValue: 51 },
            // Bar 11 (C7)
            { keys: ["c/3"], duration: "q", midiValue: 48 },
            { keys: ["e/3"], duration: "q", midiValue: 52 },
            { keys: ["g/3"], duration: "q", midiValue: 55 },
            { keys: ["bb/3"], duration: "q", midiValue: 58 },
            // Bar 12 (G7) - Turnaround
            { keys: ["g/2"], duration: "q", midiValue: 43 },
            { keys: ["b/2"], duration: "q", midiValue: 47 },
            { keys: ["d/3"], duration: "q", midiValue: 50 },
            { keys: ["f/3"], duration: "q", midiValue: 53 }
        ]
    },
    // ====================================================================================================
    // === Esercizio 7 - September Morn Blues (Accordi Verticali Basso da Zero) ===
    // ====================================================================================================
    // Adattamento di "September Morn" in stile blues, 12 battute.
    // Chiave di Basso ESCLUSIVAMENTE con accordi di settima completi (note verticali), tenuti per l'intera battuta.
    // Tonalità di riferimento per la melodia: Sol Maggiore (G). Accordi blues: G7, C7, D7.
    {
        id: "charper1-ex7",
        name: "Esercizio 7 - September Morn Blues",
        category: "charper_1", // O una nuova categoria se preferisci
        staveLayout: "grand",
        keySignature: "G",    // Sol Maggiore (F# in chiave) per la melodia, ma gli accordi avranno le loro settime.
        timeSignature: "4/4",
        repetitions: 3,

        notesTreble: [
            // Bar 1 (Accordo: G7) - "Sep-tem-ber morn"
            { keys: ["b/4"], duration: "q", midiValue: 71 },   // Sep-
            { keys: ["a/4"], duration: "q", midiValue: 69 },   // tem-
            { keys: ["g/4"], duration: "h", midiValue: 67 },   // ber morn
            // Bar 2 (Accordo: G7) - "we danced until the night"
            { keys: ["d/5"], duration: "q", midiValue: 74 },   // we
            { keys: ["b/4"], duration: "q", midiValue: 71 },   // danced
            { keys: ["a/4"], duration: "8", midiValue: 69 },   // un-
            { keys: ["g/4"], duration: "8", midiValue: 67 },   // til
            { keys: ["f#/4"], duration: "q", midiValue: 66 },  // the night (F# naturale per Gmaj feel)
            // Bar 3 (Accordo: G7) - "became a brand new day"
            { keys: ["e/4"], duration: "q", midiValue: 64 },   // be-
            { keys: ["f#/4"], duration: "q", midiValue: 66 },  // came
            { keys: ["g/4"], duration: "8", midiValue: 67 },   // a
            { keys: ["a/4"], duration: "8", midiValue: 69 },   // brand
            { keys: ["b/4"], duration: "q", midiValue: 71 },   // new day
            // Bar 4 (Accordo: G7) - "Two lovers playing scenes"
            { keys: ["d/5"], duration: "q", midiValue: 74 },   // Two
            { keys: ["c/5"], duration: "q", midiValue: 72 },   // lov- (C naturale, blue note su G7)
            { keys: ["b/4"], duration: "h", midiValue: 71 },   // ers playing scenes

            // Bar 5 (Accordo: C7) - "from some romantic play"
            { keys: ["c/5"], duration: "q", midiValue: 72 },   // from
            { keys: ["bb/4"], duration: "q", midiValue: 70 },  // some (Bb, settima di C7)
            { keys: ["a/4"], duration: "8", midiValue: 69 },   // ro-
            { keys: ["g/4"], duration: "8", midiValue: 67 },   // man-
            { keys: ["f/4"], duration: "q", midiValue: 65 },   // tic play (F naturale, blue note su C7)
            // Bar 6 (Accordo: C7) - "September morning still"
            { keys: ["g/4"], duration: "q", midiValue: 67 },
            { keys: ["a/4"], duration: "q", midiValue: 69 },
            { keys: ["bb/4"], duration: "h", midiValue: 70 },
            // Bar 7 (Accordo: G7) - "can make me feel that way"
            { keys: ["b/4"], duration: "q", midiValue: 71 },
            { keys: ["a/4"], duration: "q", midiValue: 69 },
            { keys: ["g/4"], duration: "8", midiValue: 67 },
            { keys: ["f#/4"], duration: "8", midiValue: 66 },
            { keys: ["e/4"], duration: "q", midiValue: 64 },
            // Bar 8 (Accordo: G7) - Fill / Melodia continua
            { keys: ["d/4"], duration: "q", midiValue: 62 },
            { keys: ["e/4"], duration: "q", midiValue: 64 },
            { keys: ["f#/4"], duration: "h", midiValue: 66 },

            // Bar 9 (Accordo: D7) - "I used to be so uninspired"
            { keys: ["a/4"], duration: "q", midiValue: 69 },   // I
            { keys: ["g/4"], duration: "q", midiValue: 67 },   // used
            { keys: ["f#/4"], duration: "8", midiValue: 66 },  // to
            { keys: ["e/4"], duration: "8", midiValue: 64 },   // be
            { keys: ["d/4"], duration: "q", midiValue: 62 },   // so uninspired
            // Bar 10 (Accordo: C7) - "Never sure of what to do"
            { keys: ["c/4"], duration: "q", midiValue: 60 },   // Nev-
            { keys: ["d/4"], duration: "q", midiValue: 62 },   // er
            { keys: ["eb/4"], duration: "h", midiValue: 63 },  // sure of what to do (Eb blue note)
            // Bar 11 (Accordo: G7) - "Then you came and changed my world"
            { keys: ["g/4"], duration: "q", midiValue: 67 },
            { keys: ["f#/4"], duration: "q", midiValue: 66 },
            { keys: ["e/4"], duration: "8", midiValue: 64 },
            { keys: ["d/4"], duration: "8", midiValue: 62 },
            { keys: ["b/3"], duration: "q", midiValue: 59 },
            // Bar 12 (Accordo: D7) - "September morn" (turnaround)
            { keys: ["a/4"], duration: "q", midiValue: 69 },
            { keys: ["g/4"], duration: "q", midiValue: 67 },
            { keys: ["f#/4"], duration: "h", midiValue: 66 }
        ],

        notesBass: [
            // Bar 1 (G7: G-B-D-F)
            { keys: ["g/2", "b/2", "d/3", "f/3"], duration: "w", midiValues: [43, 47, 50, 53] },
            // Bar 2 (G7)
            { keys: ["g/2", "b/2", "d/3", "f/3"], duration: "w", midiValues: [43, 47, 50, 53] },
            // Bar 3 (G7)
            { keys: ["g/2", "b/2", "d/3", "f/3"], duration: "w", midiValues: [43, 47, 50, 53] },
            // Bar 4 (G7)
            { keys: ["g/2", "b/2", "d/3", "f/3"], duration: "w", midiValues: [43, 47, 50, 53] },

            // Bar 5 (C7: C-E-G-Bb)
            { keys: ["c/2", "e/2", "g/2", "bb/2"], duration: "w", midiValues: [36, 40, 43, 46] },
            // Bar 6 (C7)
            { keys: ["c/2", "e/2", "g/2", "bb/2"], duration: "w", midiValues: [36, 40, 43, 46] },
            // Bar 7 (G7)
            { keys: ["g/2", "b/2", "d/3", "f/3"], duration: "w", midiValues: [43, 47, 50, 53] },
            // Bar 8 (G7)
            { keys: ["g/2", "b/2", "d/3", "f/3"], duration: "w", midiValues: [43, 47, 50, 53] },

            // Bar 9 (D7: D-F#-A-C)
            { keys: ["d/2", "f#/2", "a/2", "c/3"], duration: "w", midiValues: [38, 42, 45, 48] },
            // Bar 10 (C7)
            { keys: ["c/2", "e/2", "g/2", "bb/2"], duration: "w", midiValues: [36, 40, 43, 46] },
            // Bar 11 (G7)
            { keys: ["g/2", "b/2", "d/3", "f/3"], duration: "w", midiValues: [43, 47, 50, 53] },
            // Bar 12 (D7) - Turnaround
            { keys: ["d/2", "f#/2", "a/2", "c/3"], duration: "w", midiValues: [38, 42, 45, 48] }
        ]
    },
    // ====================================================================================================
    // === Esercizio 8 - September Morn Blues - Part 2 (Accordi Verticali Basso) ===
    // ====================================================================================================
    // Secondo adattamento di "September Morn" in stile blues, 12 battute.
    // Chiave di Basso ESCLUSIVAMENTE con accordi di settima completi (note verticali), tenuti per l'intera battuta.
    // Tonalità di riferimento: Sol Maggiore (G). Accordi blues: G7, C7, D7.
    {
        id: "charper1-ex8",
        name: "Esercizio 8 - September Morn Blues Pt.2",
        category: "charper_1",
        staveLayout: "grand",
        keySignature: "G",    // Sol Maggiore (F# in chiave)
        timeSignature: "4/4",
        repetitions: 3,

        notesTreble: [
            // Bar 1 (Accordo: G7) - "Stay for just a while"
            { keys: ["d/5"], duration: "q", midiValue: 74 },   // Stay
            { keys: ["c/5"], duration: "q", midiValue: 72 },   // for (blue note)
            { keys: ["b/4"], duration: "h", midiValue: 71 },   // just a while
            // Bar 2 (Accordo: G7) - "Stay and let me look at you"
            { keys: ["b/4"], duration: "q", midiValue: 71 },
            { keys: ["a/4"], duration: "q", midiValue: 69 },
            { keys: ["g/4"], duration: "8", midiValue: 67 },
            { keys: ["f#/4"], duration: "8", midiValue: 66 },
            { keys: ["e/4"], duration: "q", midiValue: 64 },
            // Bar 3 (Accordo: G7) - "It's been so long, I was wrong"
            { keys: ["d/4"], duration: "q", midiValue: 62 },
            { keys: ["e/4"], duration: "q", midiValue: 64 },
            { keys: ["f#/4"], duration: "8", midiValue: 66 },
            { keys: ["g/4"], duration: "8", midiValue: 67 },
            { keys: ["a/4"], duration: "q", midiValue: 69 },
            // Bar 4 (Accordo: G7) - "Wasn't I?"
            { keys: ["b/4"], duration: "q.", midiValue: 71 },
            { keys: ["a/4"], duration: "8", midiValue: 69 },
            { keys: ["g/4"], duration: "h", midiValue: 67 },

            // Bar 5 (Accordo: C7) - "September morn" (eco)
            { keys: ["c/5"], duration: "q", midiValue: 72 },
            { keys: ["bb/4"], duration: "q", midiValue: 70 },
            { keys: ["a/4"], duration: "h", midiValue: 69 },
            // Bar 6 (Accordo: C7) - "Do you remember?"
            { keys: ["g/4"], duration: "q", midiValue: 67 },
            { keys: ["f/4"], duration: "q", midiValue: 65 }, // F naturale (blue note)
            { keys: ["eb/4"], duration: "h", midiValue: 63 },// Eb blue note
            // Bar 7 (Accordo: G7) - "How we danced that night away"
            { keys: ["d/5"], duration: "q", midiValue: 74 },
            { keys: ["b/4"], duration: "q", midiValue: 71 },
            { keys: ["a/4"], duration: "8", midiValue: 69 },
            { keys: ["g/4"], duration: "8", midiValue: 67 },
            { keys: ["f#/4"], duration: "q", midiValue: 66 },
            // Bar 8 (Accordo: G7) - Variazione melodica
            { keys: ["e/4"], duration: "q", midiValue: 64 },
            { keys: ["d/4"], duration: "q", midiValue: 62 },
            { keys: ["c/4"], duration: "h", midiValue: 60 }, // C naturale (blue note)

            // Bar 9 (Accordo: D7) - "Two lovers playing scenes" (eco)
            { keys: ["a/4"], duration: "q", midiValue: 69 },
            { keys: ["g/4"], duration: "q", midiValue: 67 },
            { keys: ["f#/4"], duration: "h", midiValue: 66 },
            // Bar 10 (Accordo: C7) - "From some romantic play" (eco)
            { keys: ["g/4"], duration: "q", midiValue: 67 },
            { keys: ["f/4"], duration: "q", midiValue: 65 },
            { keys: ["e/4"], duration: "h", midiValue: 64 }, // E naturale su C7
            // Bar 11 (Accordo: G7) - "September morn" (conclusione)
            { keys: ["d/5"], duration: "q", midiValue: 74 },
            { keys: ["b/4"], duration: "q", midiValue: 71 },
            { keys: ["g/4"], duration: "h", midiValue: 67 },
            // Bar 12 (Accordo: D7) - "Still can make me feel that way" (finale)
            { keys: ["a/4"], duration: "q", midiValue: 69 },
            { keys: ["f#/4"], duration: "q", midiValue: 66 },
            { keys: ["d/4"], duration: "h", midiValue: 62 }
        ],

        notesBass: [
            // Bar 1 (G7: G-B-D-F)
            { keys: ["g/2", "b/2", "d/3", "f/3"], duration: "w", midiValues: [43, 47, 50, 53] },
            // Bar 2 (G7)
            { keys: ["g/2", "b/2", "d/3", "f/3"], duration: "w", midiValues: [43, 47, 50, 53] },
            // Bar 3 (G7)
            { keys: ["g/2", "b/2", "d/3", "f/3"], duration: "w", midiValues: [43, 47, 50, 53] },
            // Bar 4 (G7)
            { keys: ["g/2", "b/2", "d/3", "f/3"], duration: "w", midiValues: [43, 47, 50, 53] },

            // Bar 5 (C7: C-E-G-Bb)
            { keys: ["c/2", "e/2", "g/2", "bb/2"], duration: "w", midiValues: [36, 40, 43, 46] },
            // Bar 6 (C7)
            { keys: ["c/2", "e/2", "g/2", "bb/2"], duration: "w", midiValues: [36, 40, 43, 46] },
            // Bar 7 (G7)
            { keys: ["g/2", "b/2", "d/3", "f/3"], duration: "w", midiValues: [43, 47, 50, 53] },
            // Bar 8 (G7)
            { keys: ["g/2", "b/2", "d/3", "f/3"], duration: "w", midiValues: [43, 47, 50, 53] },

            // Bar 9 (D7: D-F#-A-C)
            { keys: ["d/2", "f#/2", "a/2", "c/3"], duration: "w", midiValues: [38, 42, 45, 48] },
            // Bar 10 (C7)
            { keys: ["c/2", "e/2", "g/2", "bb/2"], duration: "w", midiValues: [36, 40, 43, 46] },
            // Bar 11 (G7)
            { keys: ["g/2", "b/2", "d/3", "f/3"], duration: "w", midiValues: [43, 47, 50, 53] },
            // Bar 12 (D7) - Turnaround
            { keys: ["d/2", "f#/2", "a/2", "c/3"], duration: "w", midiValues: [38, 42, 45, 48] }
        ]
    },
    // ====================================================================================================
    // === Esercizio 9 - September Morn Blues - Part 3 (Accordi Verticali Basso) ===
    // ====================================================================================================
    // Terzo adattamento di "September Morn" in stile blues, 12 battute. Conclude il Capitolo 1.
    // Chiave di Basso ESCLUSIVAMENTE con accordi di settima completi (note verticali), tenuti per l'intera battuta.
    // Tonalità di riferimento: Sol Maggiore (G). Accordi blues: G7, C7, D7.
    {
        id: "charper1-ex9",
        name: "Esercizio 9 - September Morn Blues Pt.3",
        category: "charper_1",
        staveLayout: "grand",
        keySignature: "G",    // Sol Maggiore (F# in chiave)
        timeSignature: "4/4",
        repetitions: 3,

        notesTreble: [
            // Bar 1 (Accordo: G7) - "Look at what you've done"
            { keys: ["g/4"], duration: "q", midiValue: 67 },   // Look
            { keys: ["a/4"], duration: "q", midiValue: 69 },   // at
            { keys: ["b/4"], duration: "8", midiValue: 71 },   // what
            { keys: ["c/5"], duration: "8", midiValue: 72 },   // you've (C blue note)
            { keys: ["d/5"], duration: "q", midiValue: 74 },   // done
            // Bar 2 (Accordo: G7) - "Why, you've become a song"
            { keys: ["b/4"], duration: "q", midiValue: 71 },
            { keys: ["g/4"], duration: "q", midiValue: 67 },
            { keys: ["e/4"], duration: "8", midiValue: 64 },
            { keys: ["f#/4"], duration: "8", midiValue: 66 },
            { keys: ["g/4"], duration: "q", midiValue: 67 },
            // Bar 3 (Accordo: G7) - "I sing it all day long"
            { keys: ["d/5"], duration: "q.", midiValue: 74 },
            { keys: ["c/5"], duration: "8", midiValue: 72 }, // C blue note
            { keys: ["b/4"], duration: "h", midiValue: 71 },
            // Bar 4 (Accordo: G7) - "September morn" (variazione ritmica)
            { keys: ["g/4"], duration: "8", midiValue: 67 },
            { keys: ["a/4"], duration: "8", midiValue: 69 },
            { keys: ["b/4"], duration: "q", midiValue: 71 },
            { keys: ["g/4"], duration: "h", midiValue: 67 },

            // Bar 5 (Accordo: C7) - "We shared a dream"
            { keys: ["c/5"], duration: "q", midiValue: 72 },
            { keys: ["bb/4"], duration: "q", midiValue: 70 },
            { keys: ["a/4"], duration: "q", midiValue: 69 },
            { keys: ["g/4"], duration: "q", midiValue: 67 },
            // Bar 6 (Accordo: C7) - "Our time has come and gone"
            { keys: ["f/4"], duration: "q.", midiValue: 65 }, // F blue note
            { keys: ["eb/4"], duration: "8", midiValue: 63 },// Eb blue note
            { keys: ["d/4"], duration: "h", midiValue: 62 },
            // Bar 7 (Accordo: G7) - "Like a faded, distant tune"
            { keys: ["b/4"], duration: "q", midiValue: 71 },
            { keys: ["a/4"], duration: "8", midiValue: 69 },
            { keys: ["g/4"], duration: "8", midiValue: 67 },
            { keys: ["f#/4"], duration: "q", midiValue: 66 },
            { keys: ["e/4"], duration: "q", midiValue: 64 },
            // Bar 8 (Accordo: G7) - "September morn" (conclusivo di frase)
            { keys: ["d/4"], duration: "q", midiValue: 62 },
            { keys: ["g/3"], duration: "q", midiValue: 55 }, // Salto verso il basso
            { keys: ["b/3"], duration: "h", midiValue: 59 },

            // Bar 9 (Accordo: D7) - "And when I see the sign"
            { keys: ["a/4"], duration: "q", midiValue: 69 },
            { keys: ["c/5"], duration: "q", midiValue: 72 }, // C naturale (settima di D7)
            { keys: ["b/4"], duration: "8", midiValue: 71 },
            { keys: ["a/4"], duration: "8", midiValue: 69 },
            { keys: ["g/4"], duration: "q", midiValue: 67 },
            // Bar 10 (Accordo: C7) - "That points one way"
            { keys: ["f/4"], duration: "q", midiValue: 65 }, // F blue note
            { keys: ["g/4"], duration: "q", midiValue: 67 },
            { keys: ["a/4"], duration: "h", midiValue: 69 },
            // Bar 11 (Accordo: G7) - "I'll follow it and come what may"
            { keys: ["b/4"], duration: "8", midiValue: 71 },
            { keys: ["a/4"], duration: "8", midiValue: 69 },
            { keys: ["g/4"], duration: "8", midiValue: 67 },
            { keys: ["f#/4"], duration: "8", midiValue: 66 },
            { keys: ["e/4"], duration: "q", midiValue: 64 },
            { keys: ["d/4"], duration: "q", midiValue: 62 },
            // Bar 12 (Accordo: D7) - "September morn" (finale bluesy)
            { keys: ["a/3"], duration: "q", midiValue: 57 }, // La basso
            { keys: ["c/4"], duration: "q", midiValue: 60 }, // Do naturale
            { keys: ["d/4"], duration: "h", midiValue: 62 }  // Risoluzione su Re
        ],

        notesBass: [
            // Bar 1 (G7: G-B-D-F)
            { keys: ["g/2", "b/2", "d/3", "f/3"], duration: "w", midiValues: [43, 47, 50, 53] },
            // Bar 2 (G7)
            { keys: ["g/2", "b/2", "d/3", "f/3"], duration: "w", midiValues: [43, 47, 50, 53] },
            // Bar 3 (G7)
            { keys: ["g/2", "b/2", "d/3", "f/3"], duration: "w", midiValues: [43, 47, 50, 53] },
            // Bar 4 (G7)
            { keys: ["g/2", "b/2", "d/3", "f/3"], duration: "w", midiValues: [43, 47, 50, 53] },

            // Bar 5 (C7: C-E-G-Bb)
            { keys: ["c/2", "e/2", "g/2", "bb/2"], duration: "w", midiValues: [36, 40, 43, 46] },
            // Bar 6 (C7)
            { keys: ["c/2", "e/2", "g/2", "bb/2"], duration: "w", midiValues: [36, 40, 43, 46] },
            // Bar 7 (G7)
            { keys: ["g/2", "b/2", "d/3", "f/3"], duration: "w", midiValues: [43, 47, 50, 53] },
            // Bar 8 (G7)
            { keys: ["g/2", "b/2", "d/3", "f/3"], duration: "w", midiValues: [43, 47, 50, 53] },

            // Bar 9 (D7: D-F#-A-C)
            { keys: ["d/2", "f#/2", "a/2", "c/3"], duration: "w", midiValues: [38, 42, 45, 48] },
            // Bar 10 (C7)
            { keys: ["c/2", "e/2", "g/2", "bb/2"], duration: "w", midiValues: [36, 40, 43, 46] },
            // Bar 11 (G7)
            { keys: ["g/2", "b/2", "d/3", "f/3"], duration: "w", midiValues: [43, 47, 50, 53] },
            // Bar 12 (D7) - Turnaround
            { keys: ["d/2", "f#/2", "a/2", "c/3"], duration: "w", midiValues: [38, 42, 45, 48] }
        ]
    },


];

// Assicura che window.exerciseData esista e aggiunge la nuova categoria
window.exerciseData = window.exerciseData || {};
window.exerciseData.charper_1 = charper1Exercises;

console.log("Dati Esercizi Capitolo 1 Caricati (Esercizi 1, 2 e 3 [completo da immagine] presenti).");