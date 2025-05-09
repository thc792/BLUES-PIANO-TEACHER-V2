/**
 * js/exercises/charper_2.js
 * Contiene dati per esercizi del Capitolo 2 (Charper 2).
 * Esercizio 1: Trascrizione completa (12 battute) di "Georgia on My Mind"
 * con accompagnamento di accordi di settima verticali in chiave di basso.
 *
 * Piano Blues Teacher
 * Copyright (c) 2025 Lorenzetti Giuseppe
 *
 * Questo codice sorgente è rilasciato sotto la licenza MIT.
 * Vedi il file LICENSE nel repository GitHub per i dettagli completi.
 * https://github.com/thc792/piano-tutor-extraime/blob/main/LICENSE
 */

// Array che conterrà tutti gli esercizi del Capitolo 2
const charper2Exercises = [

    // =======================================================================
    // === Esercizio 1 - Ch2 (Georgia Completo - 12 Battute) ===
    // =======================================================================
    // Melodia: Georgia on My Mind (12 battute)
    // Basso: Accordi verticali basati sui simboli (Fmaj7, E°7, Dm7, G7, Bbm7, E7, Gm7, C7, Am7, D7, C7+)
    {
        id: "charper2-ex1", // ID univoco per questo esercizio
        name: "Esercizio 1 - Ch2", // Nome semplice come richiesto
        category: "charper_2", // Categoria per il Capitolo 2
        staveLayout: "grand",
        keySignature: "F",    // Fa Maggiore (Bb)
        timeSignature: "4/4", // Tempo C = 4/4
        repetitions: 3,       // Numero di ripetizioni consigliato

        notesTreble: [
            // --- Battute 1-4 ---
            // Battuta 1 (Accordo: Fmaj7)
            { keys: ["a/4"], duration: "h", midiValue: 69 }, { keys: ["g/4"], duration: "q", midiValue: 67 }, { keys: ["f/4"], duration: "q", midiValue: 65 },
            // Battuta 2 (Accordo: E°7)
            { keys: ["e/4"], duration: "h", midiValue: 64 }, { keys: ["d/4"], duration: "h", midiValue: 62 },
            // Battuta 3 (Accordo: Dm7)
            { keys: ["c/4"], duration: "h", midiValue: 60 }, { keys: ["c/4"], duration: "q", midiValue: 60 }, { keys: ["d/4"], duration: "q", midiValue: 62 },
            // Battuta 4 (Accordo: G7)
            { keys: ["e/4"], duration: "h.", midiValue: 64 }, { keys: ["r/4"], duration: "q" },
            // --- Battute 5-8 ---
            // Battuta 5 (Accordo: Bbm7)
            { keys: ["f/4"], duration: "h", midiValue: 65 }, { keys: ["r/4"], duration: "h" },
            // Battuta 6 (Accordi: Fmaj7 | E7)
            { keys: ["a/4"], duration: "q", midiValue: 69 }, { keys: ["g/4"], duration: "q", midiValue: 67 }, { keys: ["f/4"], duration: "q", midiValue: 65 }, { keys: ["e/4"], duration: "q", midiValue: 64 },
            // Battuta 7 (Accordi: Gm7 | C7)
            { keys: ["d/4"], duration: "h", midiValue: 62 }, { keys: ["c/4"], duration: "h", midiValue: 60 },
            // Battuta 8 (Accordi: Gm7 | C7)
            { keys: ["d/4"], duration: "h", midiValue: 62 }, { keys: ["e/4"], duration: "q", midiValue: 64 }, { keys: ["f/4"], duration: "q", midiValue: 65 },
            // --- Battute 9-12 ---
            // Battuta 9 (Accordi: Am7 | D7)
            { keys: ["g/4"], duration: "h.", midiValue: 67 }, { keys: ["r/4"], duration: "q" },
            // Battuta 10 (Accordo: Gm7)
            { keys: ["a/4"], duration: "h", midiValue: 69 }, { keys: ["f#/4"], duration: "h", midiValue: 66 },
            // Battuta 11 (Accordo: C7+)
            { keys: ["g/4"], duration: "q", midiValue: 67 }, { keys: ["a/4"], duration: "q", midiValue: 69 }, { keys: ["bb/4"], duration: "q", midiValue: 70 }, { keys: ["c/5"], duration: "q", midiValue: 72 },
            // Battuta 12 (Accordo: Fmaj7)
            { keys: ["a/4"], duration: "h", midiValue: 69 }, { keys: ["g/4"], duration: "q", midiValue: 67 }, { keys: ["f/4"], duration: "q", midiValue: 65 }
        ],

        notesBass: [
             // --- Battute 1-4 ---
            // Battuta 1 (Fmaj7: F-A-C-E)
            { keys: ["f/1", "a/1", "c/2", "e/2"], duration: "w", midiValues: [29, 33, 36, 40] },
            // Battuta 2 (E°7: E-G-Bb-Db)
            { keys: ["e/1", "g/1", "bb/1", "db/2"], duration: "w", midiValues: [28, 31, 34, 37] },
            // Battuta 3 (Dm7: D-F-A-C)
            { keys: ["d/1", "f/1", "a/1", "c/2"], duration: "w", midiValues: [26, 29, 33, 36] },
             // Battuta 4 (G7: G-B-D-F)
            { keys: ["g/1", "b/1", "d/2", "f/2"], duration: "w", midiValues: [31, 35, 38, 41] },
             // --- Battute 5-8 ---
            // Battuta 5 (Bbm7: Bb-Db-F-Ab)
            { keys: ["bb/1", "db/2", "f/2", "ab/2"], duration: "w", midiValues: [34, 37, 41, 44] },
            // Battuta 6 (Fmaj7 | E7) - Due accordi da Minima
            { keys: ["f/1", "a/1", "c/2", "e/2"], duration: "h", midiValues: [29, 33, 36, 40] }, // Fmaj7
            { keys: ["e/1", "g#/1", "b/1", "d/2"], duration: "h", midiValues: [28, 32, 35, 38] }, // E7
            // Battuta 7 (Gm7 | C7) - Due accordi da Minima
            { keys: ["g/1", "bb/1", "d/2", "f/2"], duration: "h", midiValues: [31, 34, 38, 41] }, // Gm7
            { keys: ["c/2", "e/2", "g/2", "bb/2"], duration: "h", midiValues: [36, 40, 43, 46] }, // C7
            // Battuta 8 (Gm7 | C7) - Due accordi da Minima
            { keys: ["g/1", "bb/1", "d/2", "f/2"], duration: "h", midiValues: [31, 34, 38, 41] }, // Gm7
            { keys: ["c/2", "e/2", "g/2", "bb/2"], duration: "h", midiValues: [36, 40, 43, 46] }, // C7
             // --- Battute 9-12 ---
            // Battuta 9 (Am7 | D7) - Due accordi da Minima
            { keys: ["a/1", "c/2", "e/2", "g/2"], duration: "h", midiValues: [33, 36, 40, 43] }, // Am7
            { keys: ["d/2", "f#/2", "a/2", "c/3"], duration: "h", midiValues: [38, 42, 45, 48] }, // D7
            // Battuta 10 (Gm7: G-Bb-D-F)
            { keys: ["g/1", "bb/1", "d/2", "f/2"], duration: "w", midiValues: [31, 34, 38, 41] }, // Gm7
            // Battuta 11 (C7+: C-E-G#-Bb)
            { keys: ["c/2", "e/2", "g#/2", "bb/2"], duration: "w", midiValues: [36, 40, 44, 46] }, // C7+
            // Battuta 12 (Fmaj7: F-A-C-E)
            { keys: ["f/1", "a/1", "c/2", "e/2"], duration: "w", midiValues: [29, 33, 36, 40] }  // Fmaj7
        ]
    },

    , // <--- Assicurati che ci sia questa virgola dopo la fine dell'Esercizio 1

    // =======================================================================
    // === Esercizio 2 - Ch2 (Blues Lick in Do) ===
    // =======================================================================
    // Esercizio originale blues di 12 battute in Do.
    // Basso: Accordi verticali di settima (C7, F7, G7).
    {
        id: "charper2-ex2",
        name: "Esercizio 2 - Ch2 (Blues Lick Do)",
        category: "charper_2",
        staveLayout: "grand",
        keySignature: "C",    // Do Maggiore (useremo Eb, Bb come note blues)
        timeSignature: "4/4",
        repetitions: 3,

        notesTreble: [
            // Bar 1 (Accordo: C7)
            { keys: ["c/4"], duration: "q", midiValue: 60 }, { keys: ["eb/4"], duration: "q", midiValue: 63 }, { keys: ["c/4"], duration: "q", midiValue: 60 }, { keys: ["eb/4"], duration: "q", midiValue: 63 },
            // Bar 2 (Accordo: C7)
            { keys: ["f/4"], duration: "q", midiValue: 65 }, { keys: ["f#/4"], duration: "q", midiValue: 66 }, { keys: ["g/4"], duration: "h", midiValue: 67 },
            // Bar 3 (Accordo: C7)
            { keys: ["c/5"], duration: "q.", midiValue: 72 }, { keys: ["bb/4"], duration: "8", midiValue: 70 }, { keys: ["g/4"], duration: "h", midiValue: 67 },
            // Bar 4 (Accordo: C7)
            { keys: ["eb/4"], duration: "q", midiValue: 63 }, { keys: ["d/4"], duration: "q", midiValue: 62 }, { keys: ["c/4"], duration: "h", midiValue: 60 },

            // Bar 5 (Accordo: F7)
            { keys: ["f/4"], duration: "q", midiValue: 65 }, { keys: ["a/4"], duration: "q", midiValue: 69 }, { keys: ["c/5"], duration: "q", midiValue: 72 }, { keys: ["a/4"], duration: "q", midiValue: 69 },
            // Bar 6 (Accordo: F7)
            { keys: ["f/4"], duration: "8", midiValue: 65 }, { keys: ["a/4"], duration: "8", midiValue: 69 }, { keys: ["f/4"], duration: "q", midiValue: 65 }, { keys: ["eb/4"], duration: "h", midiValue: 63 }, // Eb blue note
            // Bar 7 (Accordo: C7)
            { keys: ["c/4"], duration: "q", midiValue: 60 }, { keys: ["g/4"], duration: "q", midiValue: 67 }, { keys: ["c/4"], duration: "q", midiValue: 60 }, { keys: ["g/4"], duration: "q", midiValue: 67 },
            // Bar 8 (Accordo: C7)
            { keys: ["eb/4"], duration: "h", midiValue: 63 }, { keys: ["d/4"], duration: "h", midiValue: 62 },

            // Bar 9 (Accordo: G7)
            { keys: ["d/4"], duration: "q", midiValue: 62 }, { keys: ["f/4"], duration: "q", midiValue: 65 }, { keys: ["g/4"], duration: "q", midiValue: 67 }, { keys: ["b/3"], duration: "q", midiValue: 59 }, // B naturale
            // Bar 10 (Accordo: F7)
            { keys: ["c/4"], duration: "q", midiValue: 60 }, { keys: ["a/3"], duration: "q", midiValue: 57 }, { keys: ["f/3"], duration: "h", midiValue: 53 },
            // Bar 11 (Accordo: C7)
            { keys: ["c/4"], duration: "8", midiValue: 60 }, { keys: ["eb/4"], duration: "8", midiValue: 63 }, { keys: ["c/4"], duration: "8", midiValue: 60 }, { keys: ["g/3"], duration: "8", midiValue: 55 }, { keys: ["c/4"], duration: "h", midiValue: 60 },
            // Bar 12 (Accordo: G7) - Turnaround
            { keys: ["g/4"], duration: "q", midiValue: 67 }, { keys: ["f/4"], duration: "q", midiValue: 65 }, { keys: ["d/4"], duration: "h", midiValue: 62 }
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
    , // <--- Assicurati che ci sia questa virgola dopo la fine dell'Esercizio 2

    // =======================================================================
    // === Esercizio 3 - Ch2 (Blues Lick in Fa) ===
    // =======================================================================
    // Esercizio originale blues di 12 battute in Fa.
    // Basso: Accordi verticali di settima (F7, Bb7, C7).
    {
        id: "charper2-ex3",
        name: "Esercizio 3 - Ch2 (Blues Lick Fa)",
        category: "charper_2",
        staveLayout: "grand",
        keySignature: "F",    // Fa Maggiore (Bb in chiave, useremo Ab, Eb come note blues)
        timeSignature: "4/4",
        repetitions: 3,

        notesTreble: [
            // Bar 1 (Accordo: F7)
            { keys: ["f/4"], duration: "q", midiValue: 65 }, { keys: ["ab/4"], duration: "q", midiValue: 68 }, { keys: ["c/5"], duration: "h", midiValue: 72 },
            // Bar 2 (Accordo: F7)
            { keys: ["f/4"], duration: "q", midiValue: 65 }, { keys: ["a/4"], duration: "q", midiValue: 69 }, { keys: ["c/5"], duration: "q", midiValue: 72 }, { keys: ["eb/5"], duration: "q", midiValue: 75 }, // Eb blue note
            // Bar 3 (Accordo: F7)
            { keys: ["f/5"], duration: "h", midiValue: 77 }, { keys: ["eb/5"], duration: "q", midiValue: 75 }, { keys: ["c/5"], duration: "q", midiValue: 72 },
            // Bar 4 (Accordo: F7)
            { keys: ["a/4"], duration: "q", midiValue: 69 }, { keys: ["ab/4"], duration: "q", midiValue: 68 }, { keys: ["f/4"], duration: "h", midiValue: 65 },

            // Bar 5 (Accordo: Bb7)
            { keys: ["bb/4"], duration: "q", midiValue: 70 }, { keys: ["d/5"], duration: "q", midiValue: 74 }, { keys: ["f/5"], duration: "h", midiValue: 77 },
            // Bar 6 (Accordo: Bb7)
            { keys: ["bb/4"], duration: "8", midiValue: 70 }, { keys: ["ab/4"], duration: "8", midiValue: 68 }, { keys: ["f/4"], duration: "q", midiValue: 65 }, { keys: ["d/4"], duration: "h", midiValue: 62 },
            // Bar 7 (Accordo: F7)
            { keys: ["c/4"], duration: "q", midiValue: 60 }, { keys: ["f/4"], duration: "q", midiValue: 65 }, { keys: ["a/4"], duration: "q", midiValue: 69 }, { keys: ["c/5"], duration: "q", midiValue: 72 },
            // Bar 8 (Accordo: F7)
            { keys: ["ab/4"], duration: "h", midiValue: 68 }, { keys: ["f/4"], duration: "h", midiValue: 65 },

            // Bar 9 (Accordo: C7)
            { keys: ["c/5"], duration: "q", midiValue: 72 }, { keys: ["bb/4"], duration: "q", midiValue: 70 }, { keys: ["g/4"], duration: "q", midiValue: 67 }, { keys: ["e/4"], duration: "q", midiValue: 64 }, // E naturale
            // Bar 10 (Accordo: Bb7)
            { keys: ["f/4"], duration: "q", midiValue: 65 }, { keys: ["d/4"], duration: "q", midiValue: 62 }, { keys: ["bb/3"], duration: "h", midiValue: 58 },
            // Bar 11 (Accordo: F7)
            { keys: ["c/4"], duration: "8", midiValue: 60 }, { keys: ["eb/4"], duration: "8", midiValue: 63 }, { keys: ["f/4"], duration: "q", midiValue: 65 }, { keys: ["ab/4"], duration: "h", midiValue: 68 },
            // Bar 12 (Accordo: C7) - Turnaround
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
        id: "charper2-ex5",
        name: "Esercizio 5 - Ch4 ",
        category: "charper_2",
        staveLayout: "grand",
        keySignature: "F",    // Fa Maggiore (Bb)
        timeSignature: "4/4",
        repetitions: 3,

        notesTreble: [
            // Bar 1 (Accordo: Fmaj7) - Inizio più basso
            { keys: ["f/4"], duration: "q", midiValue: 65 }, { keys: ["g/4"], duration: "q", midiValue: 67 }, { keys: ["a/4"], duration: "h", midiValue: 69 },
            // Bar 2 (Accordo: E°7) - Salto
            { keys: ["c/5"], duration: "h", midiValue: 72 }, { keys: ["a/4"], duration: "h", midiValue: 69 },
            // Bar 3 (Accordo: Dm7) - Ritmo terzinato (approssimato)
            { keys: ["d/4"], duration: "8", midiValue: 62 }, { keys: ["e/4"], duration: "8", midiValue: 64 }, { keys: ["f/4"], duration: "8", midiValue: 65 }, // Simula terzina
            { keys: ["g/4"], duration: "q", midiValue: 67 }, { keys: ["a/4"], duration: "q", midiValue: 69 },
            // Bar 4 (Accordo: G7) - Nota lunga
            { keys: ["g/4"], duration: "w", midiValue: 67 },

            // Bar 5 (Accordo: Bbm7) - Pausa e melodia discendente
            { keys: ["r/4"], duration: "q" }, { keys: ["f/5"], duration: "q", midiValue: 77 }, { keys: ["db/5"], duration: "q", midiValue: 73 }, { keys: ["bb/4"], duration: "q", midiValue: 70 },
            // Bar 6 (Accordo: Fmaj7) - Sincopato
            { keys: ["r/4"], duration: "8" }, { keys: ["c/5"], duration: "q.", midiValue: 72 }, { keys: ["a/4"], duration: "h", midiValue: 69 },
            // Bar 7 (Accordo: Gm7) - Melodia semplice
            { keys: ["d/4"], duration: "q", midiValue: 62 }, { keys: ["f/4"], duration: "q", midiValue: 65 }, { keys: ["g/4"], duration: "h", midiValue: 67 },
            // Bar 8 (Accordo: Gm7) - Ripetizione con pausa
            { keys: ["d/4"], duration: "q", midiValue: 62 }, { keys: ["f/4"], duration: "q", midiValue: 65 }, { keys: ["r/4"], duration: "h" },

            // Bar 9 (Accordo: Am7) - Arpeggio
            { keys: ["a/3"], duration: "q", midiValue: 57 }, { keys: ["c/4"], duration: "q", midiValue: 60 }, { keys: ["e/4"], duration: "q", midiValue: 64 }, { keys: ["g/4"], duration: "q", midiValue: 67 },
            // Bar 10 (Accordo: Gm7) - Nota blues e risoluzione
            { keys: ["bb/4"], duration: "q", midiValue: 70 }, { keys: ["a/4"], duration: "q", midiValue: 69 }, { keys: ["g/4"], duration: "h", midiValue: 67 },
            // Bar 11 (Accordo: C7+) - Melodia cromatica
            { keys: ["e/4"], duration: "q", midiValue: 64 }, { keys: ["f/4"], duration: "q", midiValue: 65 }, { keys: ["f#/4"], duration: "q", midiValue: 66 }, { keys: ["g/4"], duration: "q", midiValue: 67 },
            // Bar 12 (Accordo: Fmaj7) - Finale su tonica
            { keys: ["f/4"], duration: "w", midiValue: 65 }
        ],

        notesBass: [
            // Bar 1 (Fmaj7: F-A-C-E)
            { keys: ["f/1", "a/1", "c/2", "e/2"], duration: "w", midiValues: [29, 33, 36, 40] },
            // Bar 2 (E°7: E-G-Bb-Db)
            { keys: ["e/1", "g/1", "bb/1", "db/2"], duration: "w", midiValues: [28, 31, 34, 37] },
            // Bar 3 (Dm7: D-F-A-C)
            { keys: ["d/1", "f/1", "a/1", "c/2"], duration: "w", midiValues: [26, 29, 33, 36] },
            // Bar 4 (G7: G-B-D-F)
            { keys: ["g/1", "b/1", "d/2", "f/2"], duration: "w", midiValues: [31, 35, 38, 41] },

            // Bar 5 (Bbm7: Bb-Db-F-Ab)
            { keys: ["bb/1", "db/2", "f/2", "ab/2"], duration: "w", midiValues: [34, 37, 41, 44] },
            // Bar 6 (Fmaj7: F-A-C-E)
            { keys: ["f/1", "a/1", "c/2", "e/2"], duration: "w", midiValues: [29, 33, 36, 40] },
            // Bar 7 (Gm7: G-Bb-D-F)
            { keys: ["g/1", "bb/1", "d/2", "f/2"], duration: "w", midiValues: [31, 34, 38, 41] },
            // Bar 8 (Gm7)
            { keys: ["g/1", "bb/1", "d/2", "f/2"], duration: "w", midiValues: [31, 34, 38, 41] },

            // Bar 9 (Am7: A-C-E-G)
            { keys: ["a/1", "c/2", "e/2", "g/2"], duration: "w", midiValues: [33, 36, 40, 43] },
            // Bar 10 (Gm7)
            { keys: ["g/1", "bb/1", "d/2", "f/2"], duration: "w", midiValues: [31, 34, 38, 41] },
            // Bar 11 (C7+: C-E-G#-Bb)
            { keys: ["c/2", "e/2", "g#/2", "bb/2"], duration: "w", midiValues: [36, 40, 44, 46] },
            // Bar 12 (Fmaj7)
            { keys: ["f/1", "a/1", "c/2", "e/2"], duration: "w", midiValues: [29, 33, 36, 40] }
        ]
    },
    {
        

        notesTreble: [
            // Bar 1 (Accordo: Fmaj7) - Variazione ritmica
            { keys: ["a/4"], duration: "q.", midiValue: 69 }, { keys: ["g/4"], duration: "8", midiValue: 67 }, { keys: ["f/4"], duration: "q"}, { keys: ["a/4"], duration: "q", midiValue: 69 },
            // Bar 2 (Accordo: E°7) - Melodia diversa
            { keys: ["g/4"], duration: "q", midiValue: 67 }, { keys: ["bb/4"], duration: "q", midiValue: 70 }, { keys: ["a/4"], duration: "h", midiValue: 69 },
            // Bar 3 (Accordo: Dm7) - Sincopato
            { keys: ["r/4"], duration: "8" }, { keys: ["d/4"], duration: "q.", midiValue: 62 }, { keys: ["f/4"], duration: "q", midiValue: 65 }, { keys: ["e/4"], duration: "q", midiValue: 64 },
            // Bar 4 (Accordo: G7) - Risposta
            { keys: ["d/4"], duration: "h", midiValue: 62 }, { keys: ["c/4"], duration: "h", midiValue: 60 },

            // Bar 5 (Accordo: Bbm7) - Melodia più acuta
            { keys: ["f/5"], duration: "q", midiValue: 77 }, { keys: ["db/5"], duration: "q", midiValue: 73 }, { keys: ["c/5"], duration: "h", midiValue: 72 },
            // Bar 6 (Accordo: Fmaj7) - Semplificato (accordo F all'inizio della battuta)
            { keys: ["a/4"], duration: "q", midiValue: 69 }, { keys: ["c/5"], duration: "q", midiValue: 72 }, { keys: ["a/4"], duration: "h", midiValue: 69 },
            // Bar 7 (Accordo: Gm7) - Arpeggio discendente
            { keys: ["d/5"], duration: "q", midiValue: 74 }, { keys: ["bb/4"], duration: "q", midiValue: 70 }, { keys: ["g/4"], duration: "q", midiValue: 67 }, { keys: ["f/4"], duration: "q", midiValue: 65 },
            // Bar 8 (Accordo: Gm7) - Nota tenuta e pausa
            { keys: ["d/4"], duration: "h.", midiValue: 62 }, { keys: ["r/4"], duration: "q" },

            // Bar 9 (Accordo: Am7) - Inizio diverso
            { keys: ["e/4"], duration: "q", midiValue: 64 }, { keys: ["g/4"], duration: "q", midiValue: 67 }, { keys: ["a/4"], duration: "h", midiValue: 69 },
            // Bar 10 (Accordo: Gm7) - Melodia con F#
            { keys: ["d/4"], duration: "q", midiValue: 62 }, { keys: ["f#/4"], duration: "q", midiValue: 66 }, { keys: ["a/4"], duration: "h", midiValue: 69 },
            // Bar 11 (Accordo: C7+) - Variazione ritmica
            { keys: ["c/5"], duration: "q.", midiValue: 72 }, { keys: ["bb/4"], duration: "8", midiValue: 70 }, { keys: ["g#/4"], duration: "q", midiValue: 68 }, { keys: ["a/4"], duration: "q", midiValue: 69 },
            // Bar 12 (Accordo: Fmaj7) - Conclusione semplice
            { keys: ["f/4"], duration: "w", midiValue: 65 }
        ],

        notesBass: [
            // Bar 1 (Fmaj7: F-A-C-E)
            { keys: ["f/1", "a/1", "c/2", "e/2"], duration: "w", midiValues: [29, 33, 36, 40] },
            // Bar 2 (E°7: E-G-Bb-Db)
            { keys: ["e/1", "g/1", "bb/1", "db/2"], duration: "w", midiValues: [28, 31, 34, 37] },
            // Bar 3 (Dm7: D-F-A-C)
            { keys: ["d/1", "f/1", "a/1", "c/2"], duration: "w", midiValues: [26, 29, 33, 36] },
            // Bar 4 (G7: G-B-D-F)
            { keys: ["g/1", "b/1", "d/2", "f/2"], duration: "w", midiValues: [31, 35, 38, 41] },

            // Bar 5 (Bbm7: Bb-Db-F-Ab)
            { keys: ["bb/1", "db/2", "f/2", "ab/2"], duration: "w", midiValues: [34, 37, 41, 44] },
            // Bar 6 (Fmaj7: F-A-C-E) - Accordo principale della battuta
            { keys: ["f/1", "a/1", "c/2", "e/2"], duration: "w", midiValues: [29, 33, 36, 40] },
            // Bar 7 (Gm7: G-Bb-D-F) - Accordo principale della battuta
            { keys: ["g/1", "bb/1", "d/2", "f/2"], duration: "w", midiValues: [31, 34, 38, 41] },
            // Bar 8 (Gm7: G-Bb-D-F) - Accordo principale della battuta
            { keys: ["g/1", "bb/1", "d/2", "f/2"], duration: "w", midiValues: [31, 34, 38, 41] },

            // Bar 9 (Am7: A-C-E-G) - Accordo principale della battuta
            { keys: ["a/1", "c/2", "e/2", "g/2"], duration: "w", midiValues: [33, 36, 40, 43] },
            // Bar 10 (Gm7: G-Bb-D-F)
            { keys: ["g/1", "bb/1", "d/2", "f/2"], duration: "w", midiValues: [31, 34, 38, 41] },
            // Bar 11 (C7+: C-E-G#-Bb)
            { keys: ["c/2", "e/2", "g#/2", "bb/2"], duration: "w", midiValues: [36, 40, 44, 46] },
            // Bar 12 (Fmaj7: F-A-C-E)
            { keys: ["f/1", "a/1", "c/2", "e/2"], duration: "w", midiValues: [29, 33, 36, 40] }
        ]
    },
    , // <--- Assicurati ci sia la virgola dopo l'Esercizio 3

    // =======================================================================
    // === Esercizio 6 - Ch2 (Blues Lick in Bb - Sostituto per Ex.4) ===
    // =======================================================================
    // Esercizio originale blues di 12 battute in Bb.
    // Basso: Accordi verticali di settima (Bb7, Eb7, F7).
    {
        id: "charper2-ex6", // Puoi cambiare in "charper2-ex4" se sostituisce direttamente
        name: "Esercizio 5 - Ch5 (Blues Lick Bb)",
        category: "charper_2",
        staveLayout: "grand",
        keySignature: "Bb",   // Si bemolle Maggiore (Bb, Eb in chiave)
        timeSignature: "4/4",
        repetitions: 3,

        notesTreble: [
            // Bar 1 (Accordo: Bb7)
            { keys: ["d/4"], duration: "q", midiValue: 62 }, { keys: ["f/4"], duration: "q", midiValue: 65 }, { keys: ["d/4"], duration: "q", midiValue: 62 }, { keys: ["f/4"], duration: "q", midiValue: 65 },
            // Bar 2 (Accordo: Bb7)
            { keys: ["ab/4"], duration: "q", midiValue: 68 }, { keys: ["g/4"], duration: "q", midiValue: 67 }, { keys: ["f/4"], duration: "h", midiValue: 65 },
            // Bar 3 (Accordo: Bb7)
            { keys: ["bb/4"], duration: "q.", midiValue: 70 }, { keys: ["ab/4"], duration: "8", midiValue: 68 }, { keys: ["f/4"], duration: "h", midiValue: 65 },
            // Bar 4 (Accordo: Bb7)
            { keys: ["d/4"], duration: "q", midiValue: 62 }, { keys: ["c/4"], duration: "q", midiValue: 60 }, { keys: ["bb/3"], duration: "h", midiValue: 58 },

            // Bar 5 (Accordo: Eb7)
            { keys: ["eb/4"], duration: "q", midiValue: 63 }, { keys: ["g/4"], duration: "q", midiValue: 67 }, { keys: ["bb/4"], duration: "h", midiValue: 70 },
            // Bar 6 (Accordo: Eb7)
            { keys: ["eb/4"], duration: "8", midiValue: 63 }, { keys: ["gb/4"], duration: "8", midiValue: 66 }, { keys: ["eb/4"], duration: "q", midiValue: 63 }, { keys: ["db/4"], duration: "h", midiValue: 61 }, // Db blue note
            // Bar 7 (Accordo: Bb7)
            { keys: ["bb/3"], duration: "q", midiValue: 58 }, { keys: ["d/4"], duration: "q", midiValue: 62 }, { keys: ["f/4"], duration: "h", midiValue: 65 },
            // Bar 8 (Accordo: Bb7)
            { keys: ["ab/4"], duration: "h", midiValue: 68 }, { keys: ["f/4"], duration: "h", midiValue: 65 },

            // Bar 9 (Accordo: F7)
            { keys: ["c/4"], duration: "q", midiValue: 60 }, { keys: ["eb/4"], duration: "q", midiValue: 63 }, { keys: ["f/4"], duration: "q", midiValue: 65 }, { keys: ["a/3"], duration: "q", midiValue: 57 }, // A naturale
            // Bar 10 (Accordo: Eb7)
            { keys: ["bb/3"], duration: "q", midiValue: 58 }, { keys: ["g/3"], duration: "q", midiValue: 55 }, { keys: ["eb/3"], duration: "h", midiValue: 51 },
            // Bar 11 (Accordo: Bb7)
            { keys: ["bb/3"], duration: "8", midiValue: 58 }, { keys: ["db/4"], duration: "8", midiValue: 61 }, { keys: ["bb/3"], duration: "8", midiValue: 58 }, { keys: ["f/3"], duration: "8", midiValue: 53 }, { keys: ["bb/3"], duration: "h", midiValue: 58 },
            // Bar 12 (Accordo: F7) - Turnaround
            { keys: ["f/4"], duration: "q", midiValue: 65 }, { keys: ["eb/4"], duration: "q", midiValue: 63 }, { keys: ["c/4"], duration: "h", midiValue: 60 }
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
            { keys: ["eb/2", "g/2", "bb/2", "db/3"], duration: "w", midiValues: [39, 43, 46, 49] }, // Voicing un'ottava sopra
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
    {
        id: "charper2-exB1", // ID univoco per questo esercizio (B1 di Ch2)
        name: "B-1",        // Nome semplice come richiesto
        category: "charper_2", // APPARTIENE AL CAPITOLO 2
        staveLayout: "grand",
        keySignature: "C",    // Do Maggiore (useremo Eb, Bb come note blues)
        timeSignature: "4/4",
        repetitions: 3,

        notesTreble: [
            // Bar 1 (Accordo: C7) - "Quand il me prend..." (adattato)
            { keys: ["g/4"], duration: "q", midiValue: 67 }, { keys: ["g/4"], duration: "8", midiValue: 67 }, { keys: ["a/4"], duration: "8", midiValue: 69 }, { keys: ["g/4"], duration: "q", midiValue: 67 }, { keys: ["e/4"], duration: "q", midiValue: 64 },
            // Bar 2 (Accordo: C7) - "...dans ses bras"
            { keys: ["c/4"], duration: "q", midiValue: 60 }, { keys: ["eb/4"], duration: "q", midiValue: 63 }, { keys: ["d/4"], duration: "h", midiValue: 62 },
            // Bar 3 (Accordo: C7) - "Il me parle tout bas"
            { keys: ["g/4"], duration: "q", midiValue: 67 }, { keys: ["g/4"], duration: "8", midiValue: 67 }, { keys: ["a/4"], duration: "8", midiValue: 69 }, { keys: ["g/4"], duration: "q", midiValue: 67 }, { keys: ["e/4"], duration: "q", midiValue: 64 },
            // Bar 4 (Accordo: C7) - "Je vois la vie en rose" (melodia adattata)
            { keys: ["c/5"], duration: "q.", midiValue: 72 }, { keys: ["bb/4"], duration: "8", midiValue: 70 }, { keys: ["g/4"], duration: "h", midiValue: 67 },

            // Bar 5 (Accordo: F7) - Variazione bluesy
            { keys: ["f/4"], duration: "q", midiValue: 65 }, { keys: ["ab/4"], duration: "q", midiValue: 68 }, { keys: ["c/5"], duration: "h", midiValue: 72 },
            // Bar 6 (Accordo: F7)
            { keys: ["a/4"], duration: "q", midiValue: 69 }, { keys: ["f/4"], duration: "q", midiValue: 65 }, { keys: ["eb/4"], duration: "h", midiValue: 63 },
            // Bar 7 (Accordo: C7) - Ritorno al tema
            { keys: ["g/4"], duration: "q", midiValue: 67 }, { keys: ["g/4"], duration: "8", midiValue: 67 }, { keys: ["a/4"], duration: "8", midiValue: 69 }, { keys: ["g/4"], duration: "h", midiValue: 67 },
            // Bar 8 (Accordo: C7)
            { keys: ["e/4"], duration: "q", midiValue: 64 }, { keys: ["d/4"], duration: "q", midiValue: 62 }, { keys: ["c/4"], duration: "h", midiValue: 60 },

            // Bar 9 (Accordo: G7) - Frase blues
            { keys: ["d/4"], duration: "q", midiValue: 62 }, { keys: ["f/4"], duration: "q", midiValue: 65 }, { keys: ["g/4"], duration: "q", midiValue: 67 }, { keys: ["b/3"], duration: "q", midiValue: 59 },
            // Bar 10 (Accordo: F7) - Risposta
            { keys: ["c/4"], duration: "q", midiValue: 60 }, { keys: ["eb/4"], duration: "q", midiValue: 63 }, { keys: ["c/4"], duration: "h", midiValue: 60 },
            // Bar 11 (Accordo: C7) - Conclusione
            { keys: ["g/4"], duration: "q.", midiValue: 67 }, { keys: ["eb/4"], duration: "8", midiValue: 63 }, { keys: ["c/4"], duration: "h", midiValue: 60 },
            // Bar 12 (Accordo: G7) - Turnaround
            { keys: ["g/4"], duration: "q", midiValue: 67 }, { keys: ["f/4"], duration: "q", midiValue: 65 }, { keys: ["d/4"], duration: "h", midiValue: 62 }
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
        id: "charper2-exB2", // ID univoco per questo esercizio (B2 di Ch2)
        name: "B-2",        // Nome semplice
        category: "charper_2", // APPARTIENE AL CAPITOLO 2
        staveLayout: "grand",
        keySignature: "G",    // Sol Maggiore (F# in chiave, useremo F, C come note blues)
        timeSignature: "4/4",
        repetitions: 3,

        notesTreble: [
            // Bar 1 (Accordo: G7)
            { keys: ["g/4"], duration: "q", midiValue: 67 }, { keys: ["bb/4"], duration: "q", midiValue: 70 }, { keys: ["g/4"], duration: "q", midiValue: 67 }, { keys: ["bb/4"], duration: "q", midiValue: 70 },
            // Bar 2 (Accordo: G7)
            { keys: ["d/5"], duration: "q", midiValue: 74 }, { keys: ["c/5"], duration: "q", midiValue: 72 }, { keys: ["bb/4"], duration: "h", midiValue: 70 },
            // Bar 3 (Accordo: G7)
            { keys: ["g/4"], duration: "8", midiValue: 67 }, { keys: ["a/4"], duration: "8", midiValue: 69 }, { keys: ["bb/4"], duration: "q", midiValue: 70 }, { keys: ["g/4"], duration: "h", midiValue: 67 },
            // Bar 4 (Accordo: G7)
            { keys: ["d/4"], duration: "q", midiValue: 62 }, { keys: ["f/4"], duration: "q", midiValue: 65 }, { keys: ["d/4"], duration: "h", midiValue: 62 }, // F naturale (settima di G7)

            // Bar 5 (Accordo: C7)
            { keys: ["c/4"], duration: "q", midiValue: 60 }, { keys: ["e/4"], duration: "q", midiValue: 64 }, { keys: ["g/4"], duration: "h", midiValue: 67 },
            // Bar 6 (Accordo: C7)
            { keys: ["c/5"], duration: "q.", midiValue: 72 }, { keys: ["bb/4"], duration: "8", midiValue: 70 }, { keys: ["g/4"], duration: "h", midiValue: 67 },
            // Bar 7 (Accordo: G7)
            { keys: ["g/4"], duration: "q", midiValue: 67 }, { keys: ["b/4"], duration: "q", midiValue: 71 }, { keys: ["d/5"], duration: "h", midiValue: 74 },
            // Bar 8 (Accordo: G7)
            { keys: ["f/4"], duration: "h", midiValue: 65 }, { keys: ["d/4"], duration: "h", midiValue: 62 }, // F naturale

            // Bar 9 (Accordo: D7)
            { keys: ["d/4"], duration: "q", midiValue: 62 }, { keys: ["f#/4"], duration: "q", midiValue: 66 }, { keys: ["a/4"], duration: "h", midiValue: 69 },
            // Bar 10 (Accordo: C7)
            { keys: ["c/5"], duration: "q", midiValue: 72 }, { keys: ["a/4"], duration: "q", midiValue: 69 }, { keys: ["g/4"], duration: "h", midiValue: 67 },
            // Bar 11 (Accordo: G7)
            { keys: ["g/4"], duration: "8", midiValue: 67 }, { keys: ["bb/4"], duration: "8", midiValue: 70 }, { keys: ["g/4"], duration: "8", midiValue: 67 }, { keys: ["d/4"], duration: "8", midiValue: 62 }, { keys: ["g/4"], duration: "h", midiValue: 67 },
            // Bar 12 (Accordo: D7) - Turnaround
            { keys: ["a/4"], duration: "q", midiValue: 69 }, { keys: ["f#/4"], duration: "q", midiValue: 66 }, { keys: ["d/4"], duration: "h", midiValue: 62 }
        ],

        notesBass: [
            // Bar 1 (G7: G-B-D-F)
            { keys: ["g/1", "b/1", "d/2", "f/2"], duration: "w", midiValues: [31, 35, 38, 41] },
            // Bar 2 (G7)
            { keys: ["g/1", "b/1", "d/2", "f/2"], duration: "w", midiValues: [31, 35, 38, 41] },
            // Bar 3 (G7)
            { keys: ["g/1", "b/1", "d/2", "f/2"], duration: "w", midiValues: [31, 35, 38, 41] },
            // Bar 4 (G7)
            { keys: ["g/1", "b/1", "d/2", "f/2"], duration: "w", midiValues: [31, 35, 38, 41] },

            // Bar 5 (C7: C-E-G-Bb)
            { keys: ["c/2", "e/2", "g/2", "bb/2"], duration: "w", midiValues: [36, 40, 43, 46] },
            // Bar 6 (C7)
            { keys: ["c/2", "e/2", "g/2", "bb/2"], duration: "w", midiValues: [36, 40, 43, 46] },
            // Bar 7 (G7)
            { keys: ["g/1", "b/1", "d/2", "f/2"], duration: "w", midiValues: [31, 35, 38, 41] },
            // Bar 8 (G7)
            { keys: ["g/1", "b/1", "d/2", "f/2"], duration: "w", midiValues: [31, 35, 38, 41] },

            // Bar 9 (D7: D-F#-A-C)
            { keys: ["d/2", "f#/2", "a/2", "c/3"], duration: "w", midiValues: [38, 42, 45, 48] },
            // Bar 10 (C7)
            { keys: ["c/2", "e/2", "g/2", "bb/2"], duration: "w", midiValues: [36, 40, 43, 46] },
            // Bar 11 (G7)
            { keys: ["g/1", "b/1", "d/2", "f/2"], duration: "w", midiValues: [31, 35, 38, 41] },
            // Bar 12 (D7) - Turnaround
            { keys: ["d/2", "f#/2", "a/2", "c/3"], duration: "w", midiValues: [38, 42, 45, 48] }
        ]
    },
    , // <--- Assicurati ci sia la virgola dopo la fine dell'Esercizio B-2

    // =======================================================================
    // === Esercizio B-3 - Ch2 (Blues Lick in Fa - Variazione) ===
    // =======================================================================
    // Esercizio originale blues di 12 battute in Fa.
    // Basso: Accordi verticali di settima (F7, Bb7, C7).
    {
        id: "charper2-exB3", // ID univoco per questo esercizio (B3 di Ch2)
        name: "B-3",        // Nome semplice
        category: "charper_2", // APPARTIENE AL CAPITOLO 2
        staveLayout: "grand",
        keySignature: "F",    // Fa Maggiore (Bb in chiave, useremo Ab, Eb come note blues)
        timeSignature: "4/4",
        repetitions: 3,

        notesTreble: [
            // Bar 1 (Accordo: F7) - Frase iniziale diversa
            { keys: ["c/5"], duration: "q", midiValue: 72 }, { keys: ["ab/4"], duration: "q", midiValue: 68 }, { keys: ["f/4"], duration: "h", midiValue: 65 },
            // Bar 2 (Accordo: F7) - Ritmo sincopato
            { keys: ["r/4"], duration: "8" }, { keys: ["f/4"], duration: "q.", midiValue: 65 }, { keys: ["a/4"], duration: "q", midiValue: 69 }, { keys: ["c/5"], duration: "q", midiValue: 72 },
            // Bar 3 (Accordo: F7) - Discesa bluesy
            { keys: ["f/5"], duration: "q", midiValue: 77 }, { keys: ["eb/5"], duration: "q", midiValue: 75 }, { keys: ["c/5"], duration: "q", midiValue: 72 }, { keys: ["a/4"], duration: "q", midiValue: 69 },
            // Bar 4 (Accordo: F7) - Risoluzione temporanea
            { keys: ["f/4"], duration: "h.", midiValue: 65 }, { keys: ["r/4"], duration: "q" },

            // Bar 5 (Accordo: Bb7) - Tema su Bb7
            { keys: ["bb/4"], duration: "q", midiValue: 70 }, { keys: ["d/5"], duration: "q", midiValue: 74 }, { keys: ["bb/4"], duration: "q", midiValue: 70 }, { keys: ["d/5"], duration: "q", midiValue: 74 },
            // Bar 6 (Accordo: Bb7) - Discesa con Ab
            { keys: ["f/5"], duration: "q", midiValue: 77 }, { keys: ["db/5"], duration: "q", midiValue: 73 }, { keys: ["bb/4"], duration: "h", midiValue: 70 }, // Db blue note
            // Bar 7 (Accordo: F7) - Ritorno a F7
            { keys: ["a/4"], duration: "q", midiValue: 69 }, { keys: ["c/5"], duration: "q", midiValue: 72 }, { keys: ["a/4"], duration: "h", midiValue: 69 },
            // Bar 8 (Accordo: F7) - Pausa e frase breve
            { keys: ["r/4"], duration: "q" }, { keys: ["f/4"], duration: "8", midiValue: 65 }, { keys: ["ab/4"], duration: "8", midiValue: 68 }, { keys: ["f/4"], duration: "h", midiValue: 65 },

            // Bar 9 (Accordo: C7) - Tema su C7
            { keys: ["c/5"], duration: "q", midiValue: 72 }, { keys: ["e/5"], duration: "q", midiValue: 76 }, { keys: ["g/5"], duration: "h", midiValue: 79 }, // E naturale
            // Bar 10 (Accordo: Bb7) - Ritorno a Bb7
            { keys: ["bb/4"], duration: "q.", midiValue: 70 }, { keys: ["ab/4"], duration: "8", midiValue: 68 }, { keys: ["f/4"], duration: "h", midiValue: 65 },
            // Bar 11 (Accordo: F7) - Frase conclusiva
            { keys: ["c/5"], duration: "q", midiValue: 72 }, { keys: ["a/4"], duration: "q", midiValue: 69 }, { keys: ["f/4"], duration: "q", midiValue: 65 }, { keys: ["c/4"], duration: "q", midiValue: 60 },
            // Bar 12 (Accordo: C7) - Turnaround
            { keys: ["g/4"], duration: "q", midiValue: 67 }, { keys: ["e/4"], duration: "q", midiValue: 64 }, { keys: ["c/4"], duration: "h", midiValue: 60 } // E naturale
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
    , // <--- Assicurati ci sia la virgola dopo la fine dell'Esercizio B-3

    // =======================================================================
    // === Esercizio B-4 - Ch2 (Blues Lick in Do - Variazione 2) ===
    // =======================================================================
    // Esercizio originale blues di 12 battute in Do.
    // Basso: Accordi verticali di settima (C7, F7, G7).
    {
        id: "charper2-exB4", // ID univoco per questo esercizio (B4 di Ch2)
        name: "B-4",        // Nome semplice
        category: "charper_2", // APPARTIENE AL CAPITOLO 2
        staveLayout: "grand",
        keySignature: "C",    // Do Maggiore (useremo Eb, Bb come note blues)
        timeSignature: "4/4",
        repetitions: 3,

        notesTreble: [
            // Bar 1 (Accordo: C7) - Frase ascendente
            { keys: ["c/4"], duration: "q", midiValue: 60 }, { keys: ["d/4"], duration: "q", midiValue: 62 }, { keys: ["eb/4"], duration: "h", midiValue: 63 },
            // Bar 2 (Accordo: C7) - Risposta discendente
            { keys: ["g/4"], duration: "q", midiValue: 67 }, { keys: ["f/4"], duration: "q", midiValue: 65 }, { keys: ["eb/4"], duration: "h", midiValue: 63 },
            // Bar 3 (Accordo: C7) - Sincopato
            { keys: ["r/4"], duration: "8" }, { keys: ["c/5"], duration: "q.", midiValue: 72 }, { keys: ["bb/4"], duration: "q", midiValue: 70 }, { keys: ["g/4"], duration: "q", midiValue: 67 },
            // Bar 4 (Accordo: C7) - Pausa e nota lunga
            { keys: ["r/4"], duration: "q" }, { keys: ["eb/4"], duration: "h.", midiValue: 63 },

            // Bar 5 (Accordo: F7) - Tema su F7
            { keys: ["f/4"], duration: "q", midiValue: 65 }, { keys: ["a/4"], duration: "q", midiValue: 69 }, { keys: ["c/5"], duration: "q", midiValue: 72 }, { keys: ["ab/4"], duration: "q", midiValue: 68 }, // Ab blue note
            // Bar 6 (Accordo: F7) - Variazione
            { keys: ["f/4"], duration: "h", midiValue: 65 }, { keys: ["eb/4"], duration: "q", midiValue: 63 }, { keys: ["c/4"], duration: "q", midiValue: 60 },
            // Bar 7 (Accordo: C7) - Ritorno a C7
            { keys: ["e/4"], duration: "q", midiValue: 64 }, { keys: ["g/4"], duration: "q", midiValue: 67 }, { keys: ["c/5"], duration: "h", midiValue: 72 },
            // Bar 8 (Accordo: C7) - Frase discendente
            { keys: ["bb/4"], duration: "q", midiValue: 70 }, { keys: ["g/4"], duration: "q", midiValue: 67 }, { keys: ["eb/4"], duration: "h", midiValue: 63 },

            // Bar 9 (Accordo: G7) - Tema su G7
            { keys: ["g/4"], duration: "q", midiValue: 67 }, { keys: ["b/4"], duration: "q", midiValue: 71 }, { keys: ["d/5"], duration: "h", midiValue: 74 },
            // Bar 10 (Accordo: F7) - Ritorno a F7
            { keys: ["f/4"], duration: "q.", midiValue: 65 }, { keys: ["a/4"], duration: "8", midiValue: 69 }, { keys: ["c/5"], duration: "h", midiValue: 72 },
            // Bar 11 (Accordo: C7) - Conclusione
            { keys: ["g/4"], duration: "q", midiValue: 67 }, { keys: ["eb/4"], duration: "q", midiValue: 63 }, { keys: ["c/4"], duration: "h", midiValue: 60 },
            // Bar 12 (Accordo: G7) - Turnaround finale
            { keys: ["d/4"], duration: "q", midiValue: 62 }, { keys: ["f/4"], duration: "q", midiValue: 65 }, { keys: ["b/3"], duration: "h", midiValue: 59 }
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
        id: "charper2-exB5", // ID univoco per questo esercizio (B5 di Ch2)
        name: "B-5",        // Nome semplice
        category: "charper_2", // APPARTIENE AL CAPITOLO 2
        staveLayout: "grand",
        keySignature: "G",    // Sol Maggiore (F# in chiave, useremo F, C come note blues)
        timeSignature: "4/4",
        repetitions: 3,

        notesTreble: [
            // Bar 1 (Accordo: G7) - Inizio con pausa
            { keys: ["r/4"], duration: "q" }, { keys: ["d/5"], duration: "q", midiValue: 74 }, { keys: ["bb/4"], duration: "h", midiValue: 70 }, // Bb blue note
            // Bar 2 (Accordo: G7) - Frase discendente
            { keys: ["g/4"], duration: "q", midiValue: 67 }, { keys: ["f/4"], duration: "q", midiValue: 65 }, { keys: ["d/4"], duration: "h", midiValue: 62 }, // F naturale
            // Bar 3 (Accordo: G7) - Sincopato
            { keys: ["r/4"], duration: "8" }, { keys: ["g/4"], duration: "q.", midiValue: 67 }, { keys: ["bb/4"], duration: "q", midiValue: 70 }, { keys: ["d/5"], duration: "q", midiValue: 74 },
            // Bar 4 (Accordo: G7) - Risposta
            { keys: ["c/5"], duration: "h", midiValue: 72 }, { keys: ["g/4"], duration: "h", midiValue: 67 }, // C naturale

            // Bar 5 (Accordo: C7) - Tema su C7
            { keys: ["c/4"], duration: "q", midiValue: 60 }, { keys: ["e/4"], duration: "q", midiValue: 64 }, { keys: ["g/4"], duration: "q", midiValue: 67 }, { keys: ["bb/4"], duration: "q", midiValue: 70 },
            // Bar 6 (Accordo: C7) - Variazione
            { keys: ["a/4"], duration: "h", midiValue: 69 }, { keys: ["g/4"], duration: "h", midiValue: 67 },
            // Bar 7 (Accordo: G7) - Ritorno a G7
            { keys: ["b/4"], duration: "q", midiValue: 71 }, { keys: ["d/5"], duration: "q", midiValue: 74 }, { keys: ["g/4"], duration: "h", midiValue: 67 },
            // Bar 8 (Accordo: G7) - Pausa e frase
            { keys: ["r/4"], duration: "q" }, { keys: ["d/4"], duration: "8", midiValue: 62 }, { keys: ["f/4"], duration: "8", midiValue: 65 }, { keys: ["g/4"], duration: "h", midiValue: 67 }, // F naturale

            // Bar 9 (Accordo: D7) - Tema su D7
            { keys: ["a/4"], duration: "q.", midiValue: 69 }, { keys: ["c/5"], duration: "8", midiValue: 72 }, { keys: ["a/4"], duration: "h", midiValue: 69 }, // C naturale
            // Bar 10 (Accordo: C7) - Ritorno a C7
            { keys: ["g/4"], duration: "q", midiValue: 67 }, { keys: ["e/4"], duration: "q", midiValue: 64 }, { keys: ["c/4"], duration: "h", midiValue: 60 },
            // Bar 11 (Accordo: G7) - Conclusione
            { keys: ["d/4"], duration: "q", midiValue: 62 }, { keys: ["f/4"], duration: "q", midiValue: 65 }, { keys: ["bb/3"], duration: "h", midiValue: 58 }, // F e Bb blue notes
            // Bar 12 (Accordo: D7) - Turnaround finale
            { keys: ["a/3"], duration: "q", midiValue: 57 }, { keys: ["c/4"], duration: "q", midiValue: 60 }, { keys: ["d/4"], duration: "h", midiValue: 62 } // C naturale
        ],

        notesBass: [
            // Bar 1 (G7: G-B-D-F)
            { keys: ["g/1", "b/1", "d/2", "f/2"], duration: "w", midiValues: [31, 35, 38, 41] },
            // Bar 2 (G7)
            { keys: ["g/1", "b/1", "d/2", "f/2"], duration: "w", midiValues: [31, 35, 38, 41] },
            // Bar 3 (G7)
            { keys: ["g/1", "b/1", "d/2", "f/2"], duration: "w", midiValues: [31, 35, 38, 41] },
            // Bar 4 (G7)
            { keys: ["g/1", "b/1", "d/2", "f/2"], duration: "w", midiValues: [31, 35, 38, 41] },

            // Bar 5 (C7: C-E-G-Bb)
            { keys: ["c/2", "e/2", "g/2", "bb/2"], duration: "w", midiValues: [36, 40, 43, 46] },
            // Bar 6 (C7)
            { keys: ["c/2", "e/2", "g/2", "bb/2"], duration: "w", midiValues: [36, 40, 43, 46] },
            // Bar 7 (G7)
            { keys: ["g/1", "b/1", "d/2", "f/2"], duration: "w", midiValues: [31, 35, 38, 41] },
            // Bar 8 (G7)
            { keys: ["g/1", "b/1", "d/2", "f/2"], duration: "w", midiValues: [31, 35, 38, 41] },

            // Bar 9 (D7: D-F#-A-C)
            { keys: ["d/2", "f#/2", "a/2", "c/3"], duration: "w", midiValues: [38, 42, 45, 48] },
            // Bar 10 (C7)
            { keys: ["c/2", "e/2", "g/2", "bb/2"], duration: "w", midiValues: [36, 40, 43, 46] },
            // Bar 11 (G7)
            { keys: ["g/1", "b/1", "d/2", "f/2"], duration: "w", midiValues: [31, 35, 38, 41] },
            // Bar 12 (D7) - Turnaround
            { keys: ["d/2", "f#/2", "a/2", "c/3"], duration: "w", midiValues: [38, 42, 45, 48] }
        ]
    }

    
];

// Assicura che window.exerciseData esista e aggiunge la nuova categoria
window.exerciseData = window.exerciseData || {};
window.exerciseData.charper_2 = charper2Exercises;

// Messaggio per confermare il caricamento
console.log("Dati Esercizi Capitolo 2 Caricati (Esercizio 1 presente).");