// Classe principale del gioco con persistenza Firebase
class FantacalcioGame {
    constructor() {
        this.userId = null;
        this.credits = 1000;
        this.myTeam = [];
        this.lineup = {
            formation: "4-4-2",
            starters: [],
            bench: []
        };
        this.maxTeamSize = 25;
        this.saveTimeout = null;
    }

    // Carica dati dal cloud
    async loadFromCloud(userId) {
        this.userId = userId;
        
        try {
            const doc = await db.collection('users').doc(userId).get();
            
            if (doc.exists) {
                const data = doc.data();
                this.credits = data.credits ??  1000;
                this.myTeam = data.myTeam ?? [];
                this.lineup = data.lineup ?? {
                    formation: "4-4-2",
                    starters: [],
                    bench: []
                };
                console.log("Dati caricati dal cloud");
            } else {
                // Nuovo utente - crea documento
                await this.saveToCloud();
                console.log("Nuovo profilo creato");
            }
            
            this.updateUI();
        } catch (error) {
            console.error("Errore caricamento dati:", error);
            // Fallback a localStorage
            this.loadFromStorage();
        }
    }

    // Salva dati sul cloud (con debounce)
    saveToCloud() {
        if (! this.userId) return;

        // Debounce: aspetta 1 secondo prima di salvare
        if (this.saveTimeout) {
            clearTimeout(this.saveTimeout);
        }

        this.saveTimeout = setTimeout(async () => {
            try {
                await db.collection('users').doc(this.userId).set({
                    credits: this.credits,
                    myTeam: this.myTeam,
                    lineup: this.lineup,
                    lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
                }, { merge: true });
                
                console.log("Dati salvati sul cloud");
            } catch (error) {
                console.error("Errore salvataggio cloud:", error);
                // Fallback a localStorage
                this.saveToStorage();
            }
        }, 1000);
    }

    // Fallback: Salva nel localStorage
    saveToStorage() {
        const gameState = {
            credits: this.credits,
            myTeam: this.myTeam,
            lineup: this.lineup
        };
        localStorage.setItem('fantacalcio_save', JSON.stringify(gameState));
    }

    // Fallback: Carica dal localStorage
    loadFromStorage() {
        const saved = localStorage.getItem('fantacalcio_save');
        if (saved) {
            const gameState = JSON.parse(saved);
            this.credits = gameState.credits;
            this.myTeam = gameState.myTeam || [];
            this.lineup = gameState.lineup || { 
                formation: "4-4-2", 
                starters: [], 
                bench: [] 
            };
        }
        this.updateUI();
    }

    // Aggiunge crediti
    addCredits(amount) {
        this.credits += amount;
        this.saveToCloud();
        this.updateUI();
    }

    // Spende crediti
    spendCredits(amount) {
        if (this.credits >= amount) {
            this.credits -= amount;
            this.saveToCloud();
            this.updateUI();
            return true;
        }
        return false;
    }

    // Aggiunge un giocatore alla rosa
    addPlayerToTeam(player) {
        if (this.myTeam.find(p => p.id === player.id)) {
            return { success: false, message: "Giocatore già in rosa!" };
        }

        if (this.myTeam.length >= this.maxTeamSize) {
            return { success: false, message: "Rosa al completo!  (max 25)" };
        }

        this.myTeam.push(player);
        this.saveToCloud();
        this.updateUI();
        return { success: true, message: "Giocatore aggiunto!" };
    }

    // Rimuove un giocatore dalla rosa
    removePlayerFromTeam(playerId) {
        this.myTeam = this.myTeam.filter(p => p.id !== playerId);
        this.lineup.starters = this.lineup.starters.filter(p => p && p.id !== playerId);
        this.lineup.bench = this.lineup.bench.filter(p => p && p.id !== playerId);
        this.saveToCloud();
        this.updateUI();
    }

    // Ottiene giocatori per ruolo
    getPlayersByRole(role) {
        if (role === 'all') return this.myTeam;
        return this.myTeam.filter(p => p.role === role);
    }

    // Aggiorna l'interfaccia
    updateUI() {
        const creditsEl = document.getElementById('credits');
        const teamCountEl = document.getElementById('team-count');
        
        if (creditsEl) {
            creditsEl.textContent = `Crediti: ${this.credits}`;
        }
        if (teamCountEl) {
            teamCountEl.textContent = `Giocatori in rosa: ${this.myTeam.length}/${this.maxTeamSize}`;
        }
    }

    // Reset del gioco
    async resetGame() {
        if (confirm("Sei sicuro di voler resettare il gioco?  Perderai tutti i progressi! ")) {
            this.credits = 1000;
            this.myTeam = [];
            this.lineup = { formation: "4-4-2", starters: [], bench: [] };
            
            await this.saveToCloud();
            localStorage.removeItem('fantacalcio_save');
            
            this.updateUI();
            location.reload();
        }
    }
}

// Istanza globale del gioco
window.game = new FantacalcioGame();