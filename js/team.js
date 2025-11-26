// Gestione della rosa
class TeamManager {
    constructor(game) {
        this.game = game;
        this.currentFilter = 'all';
    }
    
    // Renderizza la lista giocatori
    renderTeamList() {
        const container = document.getElementById('team-list');
        const players = this.game.getPlayersByRole(this.currentFilter);
        
        container.innerHTML = '';
        
        if (players.length === 0) {
            container.innerHTML = `
                <div class="empty-message" style="grid-column: 1/-1; text-align: center; padding: 40px;">
                    <p style="font-size: 1.2em; color: #aaa;">
                        ${this.currentFilter === 'all' 
                            ? 'Nessun giocatore in rosa.  Acquista delle bustine!' 
                            : 'Nessun giocatore in questo ruolo. '}
                    </p>
                </div>
            `;
            return;
        }
        
        // Ordina per rating decrescente
        players.sort((a, b) => b. rating - a.rating);
        
        players.forEach(player => {
            const card = this. createPlayerCardWithActions(player);
            container.appendChild(card);
        });
    }
    
    // Crea card giocatore con azioni
    createPlayerCardWithActions(player) {
        const wrapper = document.createElement('div');
        wrapper.className = 'player-card-wrapper';
        
        const card = document. createElement('div');
        card.className = `player-card ${player.rarity}`;
        
        const isInLineup = this.isPlayerInLineup(player. id);
        
        card.innerHTML = `
            <span class="role role-${player.role}">${player.role}</span>
            <div class="name">${player.name}</div>
            <div class="team">${player.team}</div>
            <div class="rating">${player.rating}</div>
            ${isInLineup ?  '<div class="in-lineup-badge">⭐ In Formazione</div>' : ''}
        `;
        
        wrapper.appendChild(card);
        
        // Pulsante rimuovi
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-player-btn';
        removeBtn.innerHTML = '🗑️';
        removeBtn.title = 'Rimuovi dalla rosa';
        removeBtn.onclick = (e) => {
            e.stopPropagation();
            if (confirm(`Rimuovere ${player.name} dalla rosa?`)) {
                this. game.removePlayerFromTeam(player. id);
                this.renderTeamList();
            }
        };
        wrapper.appendChild(removeBtn);
        
        return wrapper;
    }
    
    // Controlla se il giocatore è in formazione
    isPlayerInLineup(playerId) {
        const { starters, bench } = this.game.lineup;
        return starters.some(p => p && p.id === playerId) || 
               bench.some(p => p && p.id === playerId);
    }
    
    // Imposta il filtro corrente
    setFilter(role) {
        this.currentFilter = role;
        this. renderTeamList();
        
        // Aggiorna i pulsanti
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.role === role);
        });
    }
}

// Inizializza il manager della rosa
window.teamManager = new TeamManager(window. game);

// Aggiungi stili per le card con azioni
const teamStyles = document.createElement('style');
teamStyles.textContent = `
    .player-card-wrapper {
        position: relative;
    }
    
    .remove-player-btn {
        position: absolute;
        top: 5px;
        right: 5px;
        background: rgba(231, 76, 60, 0. 8);
        border: none;
        border-radius: 50%;
        width: 25px;
        height: 25px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .player-card-wrapper:hover .remove-player-btn {
        opacity: 1;
    }
    
    .in-lineup-badge {
        font-size: 0.7em;
        color: #ffd700;
        margin-top: 5px;
    }
`;
document. head.appendChild(teamStyles);