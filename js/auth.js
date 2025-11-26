// Gestione autenticazione
class AuthManager {
    constructor() {
        this.currentUser = null;
        this.setupAuthListeners();
    }

    setupAuthListeners() {
        // Osserva cambiamenti stato autenticazione
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                this.currentUser = user;
                await this.onUserLoggedIn(user);
            } else {
                this.currentUser = null;
                this.showAuthScreen();
            }
        });

        // Login con Google
        document.getElementById('google-login').addEventListener('click', () => {
            this.loginWithGoogle();
        });

        // Login con Email
        document.getElementById('email-login').addEventListener('click', () => {
            this.loginWithEmail();
        });

        // Registrazione con Email
        document.getElementById('email-register').addEventListener('click', () => {
            this.registerWithEmail();
        });

        // Logout
        document.getElementById('logout-btn').addEventListener('click', () => {
            this.logout();
        });
    }

    async loginWithGoogle() {
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            await auth.signInWithPopup(provider);
        } catch (error) {
            alert("Errore login Google: " + error.message);
        }
    }

    async loginWithEmail() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!email || !password) {
            alert("Inserisci email e password");
            return;
        }

        try {
            await auth.signInWithEmailAndPassword(email, password);
        } catch (error) {
            alert("Errore login: " + error.message);
        }
    }

    async registerWithEmail() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!email || !password) {
            alert("Inserisci email e password");
            return;
        }

        if (password.length < 6) {
            alert("La password deve avere almeno 6 caratteri");
            return;
        }

        try {
            await auth.createUserWithEmailAndPassword(email, password);
        } catch (error) {
            alert("Errore registrazione: " + error.message);
        }
    }

    async logout() {
        if (confirm("Vuoi uscire?")) {
            await auth.signOut();
        }
    }

    async onUserLoggedIn(user) {
        // Mostra schermata di gioco
        document.getElementById('auth-screen').classList.add('hidden');
        document.getElementById('game-screen').classList.remove('hidden');
        
        // Mostra nome utente
        const displayName = user.displayName || user.email.split('@')[0];
        document.getElementById('user-name').textContent = `👤 ${displayName}`;

        // Carica dati gioco dal cloud
        await game.loadFromCloud(user.uid);
        
        // Inizializza l'app
        initializeApp();
    }

    showAuthScreen() {
        document.getElementById('auth-screen').classList.remove('hidden');
        document.getElementById('game-screen').classList.add('hidden');
    }
}

// Inizializza auth manager
window.authManager = new AuthManager();