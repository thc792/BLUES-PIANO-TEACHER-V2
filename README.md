# Piano Trainer Interattivo

Applicazione web per esercitarsi al pianoforte con feedback MIDI in tempo reale.

## Funzionalità Principali

*   Visualizzazione esercizi su pentagramma (VexFlow)
*   Connessione a tastiere MIDI (USB o Virtuali)
*   Feedback visivo sulle note suonate
*   Diverse categorie di esercizi: Scale, Giri Armonici, Indipendenza Mani, Accordi, Arpeggi, Tecnica, Teoria, Voicing, Lick, Ritmica, Scale Ottave.
*   Configurazione ripetizioni per esercizio
*   Avanzamento esercizi random o ordinato (per categorie specifiche come Rivolti)

## Come Usare

1.  Connetti la tua tastiera MIDI al computer.
2.  Apri l'applicazione nel browser (tramite server locale o deploy online).
3.  Permetti l'accesso MIDI quando richiesto dal browser.
4.  Verifica che lo "Stato MIDI" mostri la tua tastiera come connessa.
5.  Seleziona una Categoria e un Esercizio.
6.  Premi "Start".
7.  Suona le note evidenziate in blu! Le note corrette diventeranno verdi.
8.  Premi "Stop" per interrompere.

## Utilizzo con Tastiere MIDI Bluetooth (MIDI BLE)

Questa applicazione utilizza l'API Web MIDI standard, che potrebbe non rilevare direttamente tutte le tastiere MIDI Bluetooth.

Se desideri usare una tastiera MIDI BLE senza cavo, ti consigliamo di utilizzare un software "ponte" sul tuo computer per rendere la tua tastiera BLE visibile come una porta MIDI virtuale standard:

*   **Windows:** Prova **midiberry** (cerca online per il download) o altre utility simili. Configuralo per ricevere input dalla tua tastiera BLE e inviarlo a una porta MIDI virtuale (es. loopMIDI).
*   **macOS:** Spesso il supporto è integrato. Apri "Configurazione MIDI Audio" (in Applicazioni > Utility). Vai su Finestra > Mostra Studio MIDI. Se il tuo dispositivo BLE è connesso al Mac, prova a cliccare sull'icona Bluetooth ("Configura dispositivi Bluetooth"). Potrebbe anche esserci bisogno di app specifiche dall'App Store come **MIDI BLE Connect**.

Una volta creata la porta MIDI virtuale, ricarica l'applicazione Piano Trainer nel browser e dovresti poter selezionare la porta virtuale nel popup di accesso MIDI.

## Sviluppo Locale

*   Clona il repository: `git clone https://github.com/thc792/piano-tutor-extraime.git`
*   Apri `index.html` tramite un server locale (es. Live Server per VS Code).
