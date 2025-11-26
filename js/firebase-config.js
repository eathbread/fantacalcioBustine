// Configurazione Firebase
// SOSTITUISCI con le tue credenziali da Firebase Console
const firebaseConfig = {
    apiKey: "LA-TUA-API-KEY",
    authDomain: "tuo-progetto.firebaseapp.com",
    projectId: "tuo-progetto",
    storageBucket: "tuo-progetto.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
};

// Inizializza Firebase
firebase.initializeApp(firebaseConfig);

// Riferimenti globali
const auth = firebase.auth();
const db = firebase.firestore();

// Abilita persistenza offline
db.enablePersistence().catch((err) => {
    console.log("Persistenza offline non disponibile:", err.code);
});