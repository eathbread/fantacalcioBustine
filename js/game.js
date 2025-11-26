// Classe principale del gioco
class FantacalcioGame {
    constructor() {
        this.credits = 1000;
        this.myTeam = [];
        this.lineup = {
            formation: "4-4-2",
            starters: [],
            bench: []
        };
        this.maxTeamSize = 25;
        
        this.loadFromStorage();
    }
    
    // Salva lo stato nel localStorage
    saveToStorage() {
        const gameState = {
            credits: this.credits,
            myTeam: this.myTeam,
            lineup: this.lineup
        };
        localStorage.setItem('fantacalcio_save', JSON.stringify(gameState));
    }
    
    // Carica lo stato dal localStorage
    loadFromStorage() {
        const saved = localStorage.getItem('fantacalcio_save');
        if (saved) {
            const gameState = JSON.parse(saved);
            this.credits = gameState.credits;
            this.myTeam = gameState.myTeam || [];
            this. lineup = gameState. lineup || { formation: "4-4-2", starters: [], bench: [] };
        }
    }
    
    // Aggiunge crediti
    addCredits(amount) {
        this.credits += amount;
        this. saveToStorage();
        this.updateUI();
    }
    
    // Spende crediti
    spendCredits(amount) {
        if (this.credits >= amount) {
            this.credits -= amount;
            this. saveToStorage();
            this.updateUI();
            return true;
        }
        return false;
    }
    
    // Aggiunge un giocatore alla rosa
    addPlayerToTeam(player) {
        // Controlla se il giocatore è già in rosa
        if (this.myTeam.find(p => p. id === player.id)) {
            return { success: false, message: "Giocatore già in rosa!" };
        }
        
        // Controlla il limite della rosa
        if (this.myTeam.length >= this. maxTeamSize) {
            return { success: false, message: "Rosa al completo!  (max 25)" };
        }
        
        this.myTeam. push(player);
        this.saveToStorage();
        this.updateUI();
        return { success: true, message: "Giocatore aggiunto!" };
    }
    
    // Rimuove un giocatore dalla rosa
    removePlayerFromTeam(playerId) {
        this.myTeam = this.myTeam.filter(p => p.id !== playerId);
        // Rimuovi anche dalla formazione se presente
        this.lineup.starters = this.lineup.starters.filter(p => p && p.id !== playerId);
        this.lineup.bench = this.lineup.bench.filter(p => p && p.id !== playerId);
        this.saveToStorage();
        this.updateUI();
    }
    
    // Ottiene giocatori per ruolo
    getPlayersByRole(role) {
        if (role === 'all') return this.myTeam;
        return this.myTeam. filter(p => p.role === role);
    }
    
    // Aggiorna l'interfaccia
    updateUI() {
        document.getElementById('credits'). textContent = `Crediti: ${this.credits}`;
        document.getElementById('team-count').textContent = `Giocatori in rosa: ${this. myTeam.length}/${this.maxTeamSize}`;
    }
    
    // Reset del gioco
    resetGame() {
        if (confirm("Sei sicuro di voler resettare il gioco?  Perderai tutti i progressi! ")) {
            localStorage.removeItem('fantacalcio_save');
            this.credits = 1000;
            this.myTeam = [];
            this. lineup = { formation: "4-4-2", starters: [], bench: [] };
            this.updateUI();
            location.reload();
        }
    }
}

// Istanza globale del gioco
window.game = new FantacalcioGame();