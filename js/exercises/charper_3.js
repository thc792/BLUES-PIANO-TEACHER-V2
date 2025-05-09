/**
 * js/exercises/charper_3.js
 * Contiene dati per esercizi del Capitolo 3 (Charper 3).
 * Focus: Improvvisazione Blues, Armonizzazione Melodia.
 * Esercizio C-1: Blues in Do con melodia armonizzata per terze.
 *
 * Piano Blues Teacher
 * Copyright (c) 2025 Lorenzetti Giuseppe
 *
 * Questo codice sorgente è rilasciato sotto la licenza MIT.
 * Vedi il file LICENSE nel repository GitHub per i dettagli completi.
 * https://github.com/thc792/piano-tutor-extraime/blob/main/LICENSE
 */

// Array che conterrà tutti gli esercizi del Capitolo 3
const charper3Exercises = [

    // =======================================================================
    // === Esercizio C-1 - Ch3 (Blues in Do - Melodia Armonizzata) ===
    // =======================================================================
    // Melodia bluesy in Do armonizzata per terze (inferiori).
    // Basso: Accordi verticali di settima (C7, F7, G7).
    {
        id: "charper3-exC1", // ID univoco (Improvisazione 1)
        name: "Improvisazione 1",        // Nome richiesto
        category: "charper_3", // Categoria per il Capitolo 3
        staveLayout: "grand",
        keySignature: "C",    // Do Maggiore (useremo Eb, Bb come note blues)
        timeSignature: "4/4",
        repetitions: 3,

        notesTreble: [
            // Bar 1 (Accordo: C7) - Melodia G-G-Eb-C armonizzata
            { keys: ["g/4", "e/4"], duration: "q", midiValues: [67, 64] },
            { keys: ["g/4", "e/4"], duration: "8", midiValues: [67, 64] },
            { keys: ["eb/4", "c/4"], duration: "8", midiValues: [63, 60] }, // Eb armonizzato con C
            { keys: ["c/4", "a/3"], duration: "h", midiValues: [60, 57] },
            // Bar 2 (Accordo: C7) - Melodia C-D-Eb-D armonizzata
            { keys: ["c/4", "a/3"], duration: "q", midiValues: [60, 57] },
            { keys: ["d/4", "b/3"], duration: "q", midiValues: [62, 59] },
            { keys: ["eb/4", "c/4"], duration: "q", midiValues: [63, 60] },
            { keys: ["d/4", "b/3"], duration: "q", midiValues: [62, 59] },
            // Bar 3 (Accordo: C7) - Ripetizione Bar 1
            { keys: ["g/4", "e/4"], duration: "q", midiValues: [67, 64] },
            { keys: ["g/4", "e/4"], duration: "8", midiValues: [67, 64] },
            { keys: ["eb/4", "c/4"], duration: "8", midiValues: [63, 60] },
            { keys: ["c/4", "a/3"], duration: "h", midiValues: [60, 57] },
            // Bar 4 (Accordo: C7) - Melodia G-F-Eb-C armonizzata
            { keys: ["g/4", "e/4"], duration: "q", midiValues: [67, 64] },
            { keys: ["f/4", "d/4"], duration: "q", midiValues: [65, 62] },
            { keys: ["eb/4", "c/4"], duration: "q", midiValues: [63, 60] },
            { keys: ["c/4", "a/3"], duration: "q", midiValues: [60, 57] },

            // Bar 5 (Accordo: F7) - Melodia F-A-C-A armonizzata
            { keys: ["f/4", "d/4"], duration: "q", midiValues: [65, 62] },
            { keys: ["a/4", "f/4"], duration: "q", midiValues: [69, 65] },
            { keys: ["c/5", "a/4"], duration: "q", midiValues: [72, 69] },
            { keys: ["a/4", "f/4"], duration: "q", midiValues: [69, 65] },
            // Bar 6 (Accordo: F7) - Melodia C-Bb-A-F armonizzata
            { keys: ["c/5", "a/4"], duration: "q", midiValues: [72, 69] },
            { keys: ["bb/4", "g/4"], duration: "q", midiValues: [70, 67] }, // Bb armonizzato con G
            { keys: ["a/4", "f/4"], duration: "q", midiValues: [69, 65] },
            { keys: ["f/4", "d/4"], duration: "q", midiValues: [65, 62] },
            // Bar 7 (Accordo: C7) - Ripetizione Bar 1
            { keys: ["g/4", "e/4"], duration: "q", midiValues: [67, 64] },
            { keys: ["g/4", "e/4"], duration: "8", midiValues: [67, 64] },
            { keys: ["eb/4", "c/4"], duration: "8", midiValues: [63, 60] },
            { keys: ["c/4", "a/3"], duration: "h", midiValues: [60, 57] },
            // Bar 8 (Accordo: C7) - Melodia E-D-C armonizzata
            { keys: ["e/4", "c/4"], duration: "q", midiValues: [64, 60] },
            { keys: ["d/4", "b/3"], duration: "q", midiValues: [62, 59] },
            { keys: ["c/4", "a/3"], duration: "h", midiValues: [60, 57] },

            // Bar 9 (Accordo: G7) - Melodia D-F-B-G armonizzata
            { keys: ["d/4", "b/3"], duration: "q", midiValues: [62, 59] },
            { keys: ["f/4", "d/4"], duration: "q", midiValues: [65, 62] }, // F naturale (settima di G7)
            { keys: ["b/4", "g/4"], duration: "q", midiValues: [71, 67] },
            { keys: ["g/4", "e/4"], duration: "q", midiValues: [67, 64] },
            // Bar 10 (Accordo: F7) - Melodia C-A-F armonizzata
            { keys: ["c/5", "a/4"], duration: "q", midiValues: [72, 69] },
            { keys: ["a/4", "f/4"], duration: "q", midiValues: [69, 65] },
            { keys: ["f/4", "d/4"], duration: "h", midiValues: [65, 62] },
            // Bar 11 (Accordo: C7) - Melodia G-Eb-C armonizzata
            { keys: ["g/4", "e/4"], duration: "q", midiValues: [67, 64] },
            { keys: ["eb/4", "c/4"], duration: "q", midiValues: [63, 60] },
            { keys: ["c/4", "a/3"], duration: "h", midiValues: [60, 57] },
            // Bar 12 (Accordo: G7) - Melodia G-F-D armonizzata (Turnaround)
            { keys: ["g/4", "e/4"], duration: "q", midiValues: [67, 64] },
            { keys: ["f/4", "d/4"], duration: "q", midiValues: [65, 62] },
            { keys: ["d/4", "b/3"], duration: "h", midiValues: [62, 59] }
        ],

        notesBass: [
            // Bar 1 (C7: C-E-G-Bb)
            { keys: ["c/2", "e/2", "g/2", "bb/2"], duration: "w", midiValues: [36, 40, 43, 46] },
            // Bar 2 (C7)
            { keys: ["c/2", "e/2", "g/2", "bb/2"], duration: "w", midiValues: [36, 40, 43, 46] },
            // Bar 3 (C7)
            { keys: ["c/2", "e/2", "g/2", "bb/2"], duration: "w", midiValues: [36, 40, 43, 46] },
            // Bar 4 (C7)
            { keys: ["c/2", "e/2", "g/2", "bb/2"], duration: "w", midiValues: [36, 40, 43, 46] },

            // Bar 5 (F7: F-A-C-Eb)
            { keys: ["f/1", "a/1", "c/2", "eb/2"], duration: "w", midiValues: [29, 33, 36, 39] },
            // Bar 6 (F7)
            { keys: ["f/1", "a/1", "c/2", "eb/2"], duration: "w", midiValues: [29, 33, 36, 39] },
            // Bar 7 (C7)
            { keys: ["c/2", "e/2", "g/2", "bb/2"], duration: "w", midiValues: [36, 40, 43, 46] },
            // Bar 8 (C7)
            { keys: ["c/2", "e/2", "g/2", "bb/2"], duration: "w", midiValues: [36, 40, 43, 46] },

            // Bar 9 (G7: G-B-D-F)
            { keys: ["g/1", "b/1", "d/2", "f/2"], duration: "w", midiValues: [31, 35, 38, 41] },
            // Bar 10 (F7)
            { keys: ["f/1", "a/1", "c/2", "eb/2"], duration: "w", midiValues: [29, 33, 36, 39] },
            // Bar 11 (C7)
            { keys: ["c/2", "e/2", "g/2", "bb/2"], duration: "w", midiValues: [36, 40, 43, 46] },
            // Bar 12 (G7) - Turnaround
            { keys: ["g/1", "b/1", "d/2", "f/2"], duration: "w", midiValues: [31, 35, 38, 41] }
        ]
    },
    , // <--- Assicurati ci sia la virgola dopo la fine dell'Esercizio C-1

    // =======================================================================
    // === Esercizio C-2 - Ch3 (Blues in Fa - Armonizzazione Selettiva) ===
    // =======================================================================
    // Melodia bluesy in Fa con armonizzazione per terze usata selettivamente.
    // Basso: Accordi verticali di settima (F7, Bb7, C7).
    {
        id: "charper3-exC2", // ID univoco (C2 di Ch3)
        name: "Improvisazione 2",        // Nome richiesto
        category: "charper_3", // APPARTIENE AL CAPITOLO 3
        staveLayout: "grand",
        keySignature: "F",    // Fa Maggiore (Bb in chiave, useremo Ab, Eb come note blues)
        timeSignature: "4/4",
        repetitions: 3,

        notesTreble: [
            // Bar 1 (Accordo: F7) - Inizio con nota singola, poi terza
            { keys: ["c/5"], duration: "q", midiValue: 72 }, { keys: ["ab/4"], duration: "q", midiValue: 68 }, { keys: ["f/4", "a/4"], duration: "h", midiValues: [65, 69] }, // Terza su F
            // Bar 2 (Accordo: F7) - Note singole
            { keys: ["c/5"], duration: "q", midiValue: 72 }, { keys: ["bb/4"], duration: "q", midiValue: 70 }, { keys: ["a/4"], duration: "h", midiValue: 69 },
            // Bar 3 (Accordo: F7) - Terza su nota blues e risoluzione
            { keys: ["ab/4", "f/4"], duration: "q", midiValues: [68, 65] }, { keys: ["g/4"], duration: "q", midiValue: 67 }, { keys: ["f/4"], duration: "h", midiValue: 65 },
            // Bar 4 (Accordo: F7) - Frase discendente singola
            { keys: ["c/5"], duration: "8", midiValue: 72 }, { keys: ["bb/4"], duration: "8", midiValue: 70 }, { keys: ["a/4"], duration: "q", midiValue: 69 }, { keys: ["f/4"], duration: "h", midiValue: 65 },

            // Bar 5 (Accordo: Bb7) - Melodia singola
            { keys: ["bb/4"], duration: "q", midiValue: 70 }, { keys: ["d/5"], duration: "q", midiValue: 74 }, { keys: ["f/5"], duration: "h", midiValue: 77 },
            // Bar 6 (Accordo: Bb7) - Armonizzazione finale
            { keys: ["eb/5", "g/4"], duration: "q", midiValues: [75, 67] }, { keys: ["d/5", "f/4"], duration: "q", midiValues: [74, 65] }, { keys: ["c/5", "eb/4"], duration: "h", midiValues: [72, 63] }, // Eb armonizzato
            // Bar 7 (Accordo: F7) - Ritorno con terza
            { keys: ["a/4", "f/4"], duration: "q", midiValues: [69, 65] }, { keys: ["c/5", "a/4"], duration: "q", midiValues: [72, 69] }, { keys: ["a/4", "f/4"], duration: "h", midiValues: [69, 65] },
            // Bar 8 (Accordo: F7) - Note singole
            { keys: ["g/4"], duration: "q", midiValue: 67 }, { keys: ["f/4"], duration: "q", midiValue: 65 }, { keys: ["eb/4"], duration: "h", midiValue: 63 },

            // Bar 9 (Accordo: C7) - Terza iniziale
            { keys: ["c/5", "e/4"], duration: "q", midiValues: [72, 64] }, { keys: ["bb/4"], duration: "q", midiValue: 70 }, { keys: ["g/4"], duration: "h", midiValue: 67 },
            // Bar 10 (Accordo: Bb7) - Note singole
            { keys: ["f/4"], duration: "q", midiValue: 65 }, { keys: ["d/4"], duration: "q", midiValue: 62 }, { keys: ["bb/3"], duration: "h", midiValue: 58 },
            // Bar 11 (Accordo: F7) - Armonizzazione finale
            { keys: ["c/4", "a/3"], duration: "q", midiValues: [60, 57] }, { keys: ["f/4", "a/4"], duration: "q", midiValues: [65, 69] }, { keys: ["ab/4", "f/4"], duration: "h", midiValues: [68, 65] },
            // Bar 12 (Accordo: C7) - Turnaround singolo
            { keys: ["c/5"], duration: "q", midiValue: 72 }, { keys: ["a/4"], duration: "q", midiValue: 69 }, { keys: ["g/4"], duration: "h", midiValue: 67 }
        ],

        notesBass: [
            // Bar 1 (F7: F-A-C-Eb)
            { keys: ["f/1", "a/1", "c/2", "eb/2"], duration: "w", midiValues: [29, 33, 36, 39] },
            // Bar 2 (F7)
            { keys: ["f/1", "a/1", "c/2", "eb/2"], duration: "w", midiValues: [29, 33, 36, 39] },
            // Bar 3 (F7)
            { keys: ["f/1", "a/1", "c/2", "eb/2"], duration: "w", midiValues: [29, 33, 36, 39] },
            // Bar 4 (F7)
            { keys: ["f/1", "a/1", "c/2", "eb/2"], duration: "w", midiValues: [29, 33, 36, 39] },

            // Bar 5 (Bb7: Bb-D-F-Ab)
            { keys: ["bb/1", "d/2", "f/2", "ab/2"], duration: "w", midiValues: [34, 38, 41, 44] },
            // Bar 6 (Bb7)
            { keys: ["bb/1", "d/2", "f/2", "ab/2"], duration: "w", midiValues: [34, 38, 41, 44] },
            // Bar 7 (F7)
            { keys: ["f/1", "a/1", "c/2", "eb/2"], duration: "w", midiValues: [29, 33, 36, 39] },
            // Bar 8 (F7)
            { keys: ["f/1", "a/1", "c/2", "eb/2"], duration: "w", midiValues: [29, 33, 36, 39] },

            // Bar 9 (C7: C-E-G-Bb)
            { keys: ["c/2", "e/2", "g/2", "bb/2"], duration: "w", midiValues: [36, 40, 43, 46] },
            // Bar 10 (Bb7)
            { keys: ["bb/1", "d/2", "f/2", "ab/2"], duration: "w", midiValues: [34, 38, 41, 44] },
            // Bar 11 (F7)
            { keys: ["f/1", "a/1", "c/2", "eb/2"], duration: "w", midiValues: [29, 33, 36, 39] },
            // Bar 12 (C7) - Turnaround
            { keys: ["c/2", "e/2", "g/2", "bb/2"], duration: "w", midiValues: [36, 40, 43, 46] }
        ]
    },
    {
        id: "charper3-exC3", // ID univoco (C3 di Ch3)
        name: "Improvisazione 3",        // Nome richiesto
        category: "charper_3", // APPARTIENE AL CAPITOLO 3
        staveLayout: "grand",
        keySignature: "C",    // Do Maggiore (useremo Eb, Bb come note blues)
        timeSignature: "4/4",
        repetitions: 3,

        notesTreble: [
            // Bar 1 (Accordo: C7) - Stab e melodia
            { keys: ["g/4", "bb/4", "e/5"], duration: "8", midiValues: [67, 70, 76] }, { keys: ["r/4"], duration: "8" }, // Stab C7 (voicing aperto)
            { keys: ["g/4"], duration: "q", midiValue: 67 }, { keys: ["eb/4"], duration: "h", midiValue: 63 },
            // Bar 2 (Accordo: C7) - Melodia singola
            { keys: ["c/4"], duration: "q", midiValue: 60 }, { keys: ["d/4"], duration: "q", midiValue: 62 }, { keys: ["eb/4"], duration: "q", midiValue: 63 }, { keys: ["e/4"], duration: "q", midiValue: 64 },
            // Bar 3 (Accordo: C7) - Stab e risposta
            { keys: ["g/4", "bb/4", "e/5"], duration: "8", midiValues: [67, 70, 76] }, { keys: ["r/4"], duration: "8" }, // Stab C7
            { keys: ["g/4"], duration: "q", midiValue: 67 }, { keys: ["f/4"], duration: "q", midiValue: 65 }, { keys: ["eb/4"], duration: "q", midiValue: 63 },
            // Bar 4 (Accordo: C7) - Conclusione frase
            { keys: ["c/4"], duration: "h.", midiValue: 60 }, { keys: ["r/4"], duration: "q" },

            // Bar 5 (Accordo: F7) - Stab F7 e melodia
            { keys: ["a/4", "c/5", "eb/5"], duration: "8", midiValues: [69, 72, 75] }, { keys: ["r/4"], duration: "8" }, // Stab F7
            { keys: ["a/4"], duration: "q", midiValue: 69 }, { keys: ["f/4"], duration: "h", midiValue: 65 },
            // Bar 6 (Accordo: F7) - Melodia armonizzata
            { keys: ["c/5", "a/4"], duration: "q", midiValues: [72, 69] }, { keys: ["bb/4", "g/4"], duration: "q", midiValues: [70, 67] }, { keys: ["a/4", "f/4"], duration: "h", midiValues: [69, 65] },
            // Bar 7 (Accordo: C7) - Ritorno C7 con stab
            { keys: ["g/4", "bb/4", "e/5"], duration: "8", midiValues: [67, 70, 76] }, { keys: ["r/4"], duration: "8" }, // Stab C7
            { keys: ["g/4"], duration: "q", midiValue: 67 }, { keys: ["e/4"], duration: "h", midiValue: 64 },
            // Bar 8 (Accordo: C7) - Melodia singola
            { keys: ["c/4"], duration: "q", midiValue: 60 }, { keys: ["d/4"], duration: "q", midiValue: 62 }, { keys: ["eb/4"], duration: "h", midiValue: 63 },

            // Bar 9 (Accordo: G7) - Stab G7 e melodia
            { keys: ["b/4", "d/5", "f/5"], duration: "8", midiValues: [71, 74, 77] }, { keys: ["r/4"], duration: "8" }, // Stab G7
            { keys: ["b/4"], duration: "q", midiValue: 71 }, { keys: ["g/4"], duration: "h", midiValue: 67 },
            // Bar 10 (Accordo: F7) - Stab F7 e risposta
            { keys: ["a/4", "c/5", "eb/5"], duration: "8", midiValues: [69, 72, 75] }, { keys: ["r/4"], duration: "8" }, // Stab F7
            { keys: ["a/4"], duration: "q", midiValue: 69 }, { keys: ["f/4"], duration: "h", midiValue: 65 },
            // Bar 11 (Accordo: C7) - Melodia armonizzata finale
            { keys: ["g/4", "e/4"], duration: "q", midiValues: [67, 64] }, { keys: ["eb/4", "c/4"], duration: "q", midiValues: [63, 60] }, { keys: ["c/4", "a/3"], duration: "h", midiValues: [60, 57] },
            // Bar 12 (Accordo: G7) - Turnaround con stab
            { keys: ["b/3", "d/4", "f/4"], duration: "8", midiValues: [59, 62, 65] }, { keys: ["r/4"], duration: "8" }, // Stab G7 basso
            { keys: ["g/4"], duration: "q", midiValue: 67 }, { keys: ["d/4"], duration: "h", midiValue: 62 }
        ],

        notesBass: [
            // Bar 1 (C7: C-E-G-Bb)
            { keys: ["c/2", "e/2", "g/2", "bb/2"], duration: "w", midiValues: [36, 40, 43, 46] },
            // Bar 2 (C7)
            { keys: ["c/2", "e/2", "g/2", "bb/2"], duration: "w", midiValues: [36, 40, 43, 46] },
            // Bar 3 (C7)
            { keys: ["c/2", "e/2", "g/2", "bb/2"], duration: "w", midiValues: [36, 40, 43, 46] },
            // Bar 4 (C7)
            { keys: ["c/2", "e/2", "g/2", "bb/2"], duration: "w", midiValues: [36, 40, 43, 46] },

            // Bar 5 (F7: F-A-C-Eb)
            { keys: ["f/1", "a/1", "c/2", "eb/2"], duration: "w", midiValues: [29, 33, 36, 39] },
            // Bar 6 (F7)
            { keys: ["f/1", "a/1", "c/2", "eb/2"], duration: "w", midiValues: [29, 33, 36, 39] },
            // Bar 7 (C7)
            { keys: ["c/2", "e/2", "g/2", "bb/2"], duration: "w", midiValues: [36, 40, 43, 46] },
            // Bar 8 (C7)
            { keys: ["c/2", "e/2", "g/2", "bb/2"], duration: "w", midiValues: [36, 40, 43, 46] },

            // Bar 9 (G7: G-B-D-F)
            { keys: ["g/1", "b/1", "d/2", "f/2"], duration: "w", midiValues: [31, 35, 38, 41] },
            // Bar 10 (F7)
            { keys: ["f/1", "a/1", "c/2", "eb/2"], duration: "w", midiValues: [29, 33, 36, 39] },
            // Bar 11 (C7)
            { keys: ["c/2", "e/2", "g/2", "bb/2"], duration: "w", midiValues: [36, 40, 43, 46] },
            // Bar 12 (G7) - Turnaround
            { keys: ["g/1", "b/1", "d/2", "f/2"], duration: "w", midiValues: [31, 35, 38, 41] }
        ]
    },
    {
        id: "charper3-exC4", // ID univoco (C4 di Ch3)
        name: "Improvisazione 4",        // Nome richiesto
        category: "charper_3", // APPARTIENE AL CAPITOLO 3
        staveLayout: "grand",
        keySignature: "C",    // Do Maggiore
        timeSignature: "4/4",
        repetitions: 3,

        notesTreble: [
            // Bar 1 (Accordo: C7) - Grace note (Eb->E) e sesta
            { keys: ["eb/4"], duration: "32", midiValue: 63 }, { keys: ["e/4", "c/4"], duration: "q", midiValues: [64, 60] }, // Grace Eb su E, armonizzato con C
            { keys: ["g/4", "e/4"], duration: "q", midiValues: [67, 64] }, // Sesta G/E
            { keys: ["a/4", "f/4"], duration: "h", midiValues: [69, 65] }, // Sesta A/F
            // Bar 2 (Accordo: C7) - Risposta con grace note
            { keys: ["ab/4"], duration: "32", midiValue: 68 }, { keys: ["g/4", "e/4"], duration: "q", midiValues: [67, 64] }, // Grace Ab su G, armonizzato con E
            { keys: ["eb/4"], duration: "q", midiValue: 63 },
            { keys: ["c/4"], duration: "h", midiValue: 60 },
            // Bar 3 (Accordo: C7) - Frase discendente con seste
            { keys: ["a/4", "f/4"], duration: "q", midiValues: [69, 65] },
            { keys: ["g/4", "e/4"], duration: "q", midiValues: [67, 64] },
            { keys: ["f/4", "d/4"], duration: "q", midiValues: [65, 62] },
            { keys: ["e/4", "c/4"], duration: "q", midiValues: [64, 60] },
            // Bar 4 (Accordo: C7) - Conclusione frase
            { keys: ["d/4"], duration: "q", midiValue: 62 }, { keys: ["eb/4"], duration: "q", midiValue: 63 }, { keys: ["c/4"], duration: "h", midiValue: 60 },

            // Bar 5 (Accordo: F7) - Grace note su F7
            { keys: ["eb/4"], duration: "32", midiValue: 63 }, { keys: ["f/4", "d/4"], duration: "q", midiValues: [65, 62] }, // Grace Eb su F, armonizzato D
            { keys: ["a/4", "f/4"], duration: "q", midiValues: [69, 65] }, // Sesta A/F
            { keys: ["c/5", "a/4"], duration: "h", midiValues: [72, 69] }, // Sesta C/A
            // Bar 6 (Accordo: F7) - Risposta
            { keys: ["ab/4"], duration: "32", midiValue: 68 }, { keys: ["a/4", "f/4"], duration: "q", midiValues: [69, 65] }, // Grace Ab su A, armonizzato F
            { keys: ["f/4"], duration: "q", midiValue: 65 },
            { keys: ["c/4"], duration: "h", midiValue: 60 },
            // Bar 7 (Accordo: C7) - Ritorno a C7 con seste
            { keys: ["g/4", "e/4"], duration: "q", midiValues: [67, 64] },
            { keys: ["a/4", "f/4"], duration: "q", midiValues: [69, 65] },
            { keys: ["g/4", "e/4"], duration: "h", midiValues: [67, 64] },
            // Bar 8 (Accordo: C7) - Melodia singola
            { keys: ["c/5"], duration: "q", midiValue: 72 }, { keys: ["bb/4"], duration: "q", midiValue: 70 }, { keys: ["g/4"], duration: "h", midiValue: 67 },

            // Bar 9 (Accordo: G7) - Grace note su G7
            { keys: ["f/4"], duration: "32", midiValue: 65 }, { keys: ["g/4", "e/4"], duration: "q", midiValues: [67, 64] }, // Grace F su G, armonizzato E
            { keys: ["b/4", "g/4"], duration: "q", midiValues: [71, 67] }, // Sesta B/G
            { keys: ["d/5", "b/4"], duration: "h", midiValues: [74, 71] }, // Sesta D/B
            // Bar 10 (Accordo: F7) - Ritorno a F7 con seste
            { keys: ["c/5", "a/4"], duration: "q", midiValues: [72, 69] },
            { keys: ["a/4", "f/4"], duration: "q", midiValues: [69, 65] },
            { keys: ["f/4", "d/4"], duration: "h", midiValues: [65, 62] },
            // Bar 11 (Accordo: C7) - Conclusione con grace note
            { keys: ["eb/4"], duration: "32", midiValue: 63 }, { keys: ["e/4", "c/4"], duration: "q", midiValues: [64, 60] },
            { keys: ["d/4"], duration: "q", midiValue: 62 }, { keys: ["c/4"], duration: "h", midiValue: 60 },
            // Bar 12 (Accordo: G7) - Turnaround con seste
            { keys: ["d/4", "b/3"], duration: "q", midiValues: [62, 59] }, // Sesta D/B
            { keys: ["f/4", "d/4"], duration: "q", midiValues: [65, 62] }, // Sesta F/D
            { keys: ["g/4", "e/4"], duration: "h", midiValues: [67, 64] }  // Sesta G/E
        ],

        notesBass: [
            // Bar 1 (C7: C-E-G-Bb)
            { keys: ["c/2", "e/2", "g/2", "bb/2"], duration: "w", midiValues: [36, 40, 43, 46] },
            // Bar 2 (C7)
            { keys: ["c/2", "e/2", "g/2", "bb/2"], duration: "w", midiValues: [36, 40, 43, 46] },
            // Bar 3 (C7)
            { keys: ["c/2", "e/2", "g/2", "bb/2"], duration: "w", midiValues: [36, 40, 43, 46] },
            // Bar 4 (C7)
            { keys: ["c/2", "e/2", "g/2", "bb/2"], duration: "w", midiValues: [36, 40, 43, 46] },

            // Bar 5 (F7: F-A-C-Eb)
            { keys: ["f/1", "a/1", "c/2", "eb/2"], duration: "w", midiValues: [29, 33, 36, 39] },
            // Bar 6 (F7)
            { keys: ["f/1", "a/1", "c/2", "eb/2"], duration: "w", midiValues: [29, 33, 36, 39] },
            // Bar 7 (C7)
            { keys: ["c/2", "e/2", "g/2", "bb/2"], duration: "w", midiValues: [36, 40, 43, 46] },
            // Bar 8 (C7)
            { keys: ["c/2", "e/2", "g/2", "bb/2"], duration: "w", midiValues: [36, 40, 43, 46] },

            // Bar 9 (G7: G-B-D-F)
            { keys: ["g/1", "b/1", "d/2", "f/2"], duration: "w", midiValues: [31, 35, 38, 41] },
            // Bar 10 (F7)
            { keys: ["f/1", "a/1", "c/2", "eb/2"], duration: "w", midiValues: [29, 33, 36, 39] },
            // Bar 11 (C7)
            { keys: ["c/2", "e/2", "g/2", "bb/2"], duration: "w", midiValues: [36, 40, 43, 46] },
            // Bar 12 (G7) - Turnaround
            { keys: ["g/1", "b/1", "d/2", "f/2"], duration: "w", midiValues: [31, 35, 38, 41] }
        ]
    },
    {
        id: "charper3-exC5", // ID univoco (C5 di Ch3)
        name: "Improvisazione 5",        // Nome richiesto
        category: "charper_3", // APPARTIENE AL CAPITOLO 3
        staveLayout: "grand",
        keySignature: "Bb",   // Si bemolle Maggiore (Bb, Eb in chiave)
        timeSignature: "4/4",
        repetitions: 3,

        notesTreble: [
            // Bar 1 (Accordo: Bb7) - Inizio sincopato
            { keys: ["r/4"], duration: "8" }, { keys: ["f/4"], duration: "q.", midiValue: 65 }, { keys: ["ab/4"], duration: "q", midiValue: 68 }, { keys: ["f/4"], duration: "q", midiValue: 65 },
            // Bar 2 (Accordo: Bb7) - Melodia discendente
            { keys: ["d/4"], duration: "q", midiValue: 62 }, { keys: ["c/4"], duration: "q", midiValue: 60 }, { keys: ["bb/3"], duration: "h", midiValue: 58 },
            // Bar 3 (Accordo: Bb7) - Frase con Db (blue note)
            { keys: ["f/4"], duration: "q", midiValue: 65 }, { keys: ["db/4"], duration: "q", midiValue: 61 }, { keys: ["c/4"], duration: "q", midiValue: 60 }, { keys: ["bb/3"], duration: "q", midiValue: 58 },
            // Bar 4 (Accordo: Bb7) - Risposta e pausa
            { keys: ["d/4"], duration: "h", midiValue: 62 }, { keys: ["r/4"], duration: "h" },

            // Bar 5 (Accordo: Eb7) - Tema su Eb7
            { keys: ["eb/4"], duration: "q", midiValue: 63 }, { keys: ["g/4"], duration: "q", midiValue: 67 }, { keys: ["bb/4"], duration: "q", midiValue: 70 }, { keys: ["db/5"], duration: "q", midiValue: 73 }, // Db (settima di Eb7)
            // Bar 6 (Accordo: Eb7) - Variazione ritmica
            { keys: ["bb/4"], duration: "q.", midiValue: 70 }, { keys: ["g/4"], duration: "8", midiValue: 67 }, { keys: ["eb/4"], duration: "h", midiValue: 63 },
            // Bar 7 (Accordo: Bb7) - Ritorno a Bb7
            { keys: ["f/4"], duration: "q", midiValue: 65 }, { keys: ["d/4"], duration: "q", midiValue: 62 }, { keys: ["bb/3"], duration: "h", midiValue: 58 },
            // Bar 8 (Accordo: Bb7) - Armonizzazione per seste
            { keys: ["ab/4", "f/4"], duration: "q", midiValues: [68, 65] }, { keys: ["g/4", "eb/4"], duration: "q", midiValues: [67, 63] }, { keys: ["f/4", "d/4"], duration: "h", midiValues: [65, 62] },

            // Bar 9 (Accordo: F7) - Tema su F7
            { keys: ["a/4"], duration: "q", midiValue: 69 }, { keys: ["c/5"], duration: "q", midiValue: 72 }, { keys: ["eb/5"], duration: "h", midiValue: 75 }, // A naturale, Eb (settima F7)
            // Bar 10 (Accordo: Eb7) - Ritorno a Eb7
            { keys: ["db/5"], duration: "q", midiValue: 73 }, { keys: ["bb/4"], duration: "q", midiValue: 70 }, { keys: ["g/4"], duration: "h", midiValue: 67 },
            // Bar 11 (Accordo: Bb7) - Frase finale
            { keys: ["f/4"], duration: "8", midiValue: 65 }, { keys: ["d/4"], duration: "8", midiValue: 62 }, { keys: ["bb/3"], duration: "q", midiValue: 58 }, { keys: ["db/4"], duration: "h", midiValue: 61 }, // Db blue note
            // Bar 12 (Accordo: F7) - Turnaround finale
            { keys: ["c/4"], duration: "q", midiValue: 60 }, { keys: ["a/3"], duration: "q", midiValue: 57 }, { keys: ["f/3"], duration: "h", midiValue: 53 } // A naturale
        ],

        notesBass: [
            // Bar 1 (Bb7: Bb-D-F-Ab)
            { keys: ["bb/1", "d/2", "f/2", "ab/2"], duration: "w", midiValues: [34, 38, 41, 44] },
            // Bar 2 (Bb7)
            { keys: ["bb/1", "d/2", "f/2", "ab/2"], duration: "w", midiValues: [34, 38, 41, 44] },
            // Bar 3 (Bb7)
            { keys: ["bb/1", "d/2", "f/2", "ab/2"], duration: "w", midiValues: [34, 38, 41, 44] },
            // Bar 4 (Bb7)
            { keys: ["bb/1", "d/2", "f/2", "ab/2"], duration: "w", midiValues: [34, 38, 41, 44] },

            // Bar 5 (Eb7: Eb-G-Bb-Db)
            { keys: ["eb/2", "g/2", "bb/2", "db/3"], duration: "w", midiValues: [39, 43, 46, 49] },
            // Bar 6 (Eb7)
            { keys: ["eb/2", "g/2", "bb/2", "db/3"], duration: "w", midiValues: [39, 43, 46, 49] },
            // Bar 7 (Bb7)
            { keys: ["bb/1", "d/2", "f/2", "ab/2"], duration: "w", midiValues: [34, 38, 41, 44] },
            // Bar 8 (Bb7)
            { keys: ["bb/1", "d/2", "f/2", "ab/2"], duration: "w", midiValues: [34, 38, 41, 44] },

            // Bar 9 (F7: F-A-C-Eb)
            { keys: ["f/1", "a/1", "c/2", "eb/2"], duration: "w", midiValues: [29, 33, 36, 39] },
            // Bar 10 (Eb7)
            { keys: ["eb/2", "g/2", "bb/2", "db/3"], duration: "w", midiValues: [39, 43, 46, 49] },
            // Bar 11 (Bb7)
            { keys: ["bb/1", "d/2", "f/2", "ab/2"], duration: "w", midiValues: [34, 38, 41, 44] },
            // Bar 12 (F7) - Turnaround
            { keys: ["f/1", "a/1", "c/2", "eb/2"], duration: "w", midiValues: [29, 33, 36, 39] }
        ]
    },


];

// Assicura che window.exerciseData esista e aggiunge la nuova categoria
window.exerciseData = window.exerciseData || {};
// Aggiunge l'array di esercizi di questo capitolo all'oggetto globale
window.exerciseData.charper_3 = charper3Exercises;

// Messaggio per confermare il caricamento
console.log("Dati Esercizi Capitolo 3 Caricati (Esercizio C-1 presente).");