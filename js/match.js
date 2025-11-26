// Sistema di simulazione partita
class MatchSimulator {
    constructor(game, lineupManager) {
        this.game = game;
        this.lineupManager = lineupManager;
    }
    
    // Simula una partita
    simulateMatch() {
        if (!this.lineupManager.isLineupComplete()) {
            alert("Completa la formazione prima di giocare!");
            return null;
        }
        
        const starters = this.game.lineup.starters. filter(p => p);
        const performances = [];
        let totalScore = 0;
        
        starters.forEach(player => {
            const performance = this.calculatePlayerPerformance(player);
            performances. push(performance);
            totalScore += performance.fantasyPoints;
        });
        
        // Bonus squadra
        const teamBonus = this. calculateTeamBonus(totalScore);
        totalScore += teamBonus;
        
        // Genera punteggio avversario
        const opponentScore = Math.floor(Math.random() * 30) + 50;
        
        // Risultato
        let result = "PAREGGIO";
        let creditsWon = 50;
        
        if (totalScore > opponentScore + 5) {
            result = "VITTORIA";
            creditsWon = 150;
        } else if (totalScore < opponentScore - 5) {
            result = "SCONFITTA";
            creditsWon = 25;
        }
        
        // Aggiungi crediti guadagnati
        this.game.addCredits(creditsWon);
        
        return {
            performances,
            totalScore: Math.round(totalScore),
            opponentScore,
            result,
            creditsWon
        };
    }
    
    // Calcola la performance di un giocatore
    calculatePlayerPerformance(player) {
        const baseScore = 6; // Voto base
        const ratingBonus = (player.rating - 70) * 0.05;
        
        // Eventi casuali
        const events = [];
        let bonus = 0;
        
        // Possibilità di eventi basati sul ruolo
        if (player.role === 'P') {
            if (Math.random() < 0.3) {
                const saved = Math.floor(Math. random() * 3) + 1;
                events.push(`${saved} parate`);
                bonus += saved * 0.5;
            }
            if (Math.random() < 0.15) {
                events.push("Gol subito");
                bonus -= 1;
            }
            if (Math.random() < 0.1) {
                events.push("Rigore parato!");
                bonus += 3;
            }
        }
        
        if (player.role === 'D') {
            if (Math.random() < 0.1) {
                events.push("⚽ GOL!");
                bonus += 3;
            }
            if (Math.random() < 0.2) {
                events.push("Assist");
                bonus += 1;
            }
            if (Math.random() < 0.1) {
                events.push("🟨 Ammonizione");
                bonus -= 0.5;
            }
        }
        
        if (player.role === 'C') {
            if (Math. random() < 0.2) {
                events.push("⚽ GOL!");
                bonus += 3;
            }
            if (Math.random() < 0.25) {
                events.push("Assist");
                bonus += 1;
            }
            if (Math.random() < 0.15) {
                events.push("🟨 Ammonizione");
                bonus -= 0.5;
            }
        }
        
        if (player.role === 'A') {
            if (Math.random() < 0.35) {
                events.push("⚽ GOL!");
                bonus += 3;
                if (Math.random() < 0.2) {
                    events.push("⚽ DOPPIETTA!");
                    bonus += 3;
                }
            }
            if (Math.random() < 0.2) {
                events.push("Assist");
                bonus += 1;
            }
            if (Math.random() < 0.1) {
                events. push("Rigore sbagliato");
                bonus -= 3;
            }
        }
        
        // Variazione casuale del voto
        const randomVariation = (Math.random() - 0.5) * 2;
        
        const finalScore = Math.max(4, Math.min(10, baseScore + ratingBonus + randomVariation));
        const fantasyPoints = finalScore + bonus;
        
        return {
            player,
            vote: finalScore. toFixed(1),
            events,
            bonus: bonus. toFixed(1),
            fantasyPoints: fantasyPoints
        };
    }
    
    // Bonus squadra
    calculateTeamBonus(totalScore) {
        if (totalScore > 70) return 3;
        if (totalScore > 65) return 2;
        if (totalScore > 60) return 1;
        return 0;
    }
}
