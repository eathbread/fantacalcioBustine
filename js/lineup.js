// Gestione della formazione
class LineupManager {
    constructor(game) {
        this.game = game;
        this. formations = {
            "4-4-2": { D: 4, C: 4, A: 2 },
            "4-3-3": { D: 4, C: 3, A: 3 },
            "3-5-2": { D: 3, C: 5, A: 2 },
            "3-4-3": { D: 3, C: 4, A: 3 }
        };
        this.selectedPosition = null;
    }
    
    // Renderizza il campo con le posizioni
    renderField() {
        const field = document.getElementById('formation-field');
        const formation = this.game.lineup.formation;
        const config = this.formations[formation];
        
        field.innerHTML = '';
        
        // Portiere
        this.addPosition(field, "P", 0, 50, 90);
        
        // Difensori
        const defCount = config.D;
        for (let i = 0; i < defCount; i++) {
            const left = ((i + 1) * 100) / (defCount + 1);
            this.addPosition(field, "D", i, left, 70);
        }
        
        // Centrocampisti
        const midCount = config.C;
        for (let i = 0; i < midCount; i++) {
            const left = ((i + 1) * 100) / (midCount + 1);
            this.addPosition(field, "C", i, left, 45);
        }
        
        // Attaccanti
        const fwdCount = config. A;
        for (let i = 0; i < fwdCount; i++) {
            const left = ((i + 1) * 100) / (fwdCount + 1);
            this.addPosition(field, "A", i, left, 15);
        }
        
        this.renderBench();
    }
    
    // Aggiunge una posizione al campo
    addPosition(field, role, index, leftPercent, topPercent) {
        const pos = document.createElement('div');
        pos.className = 'field-position';
        pos.style.left = `calc(${leftPercent}% - 35px)`;
        pos.style.top = `${topPercent}%`;
        pos.dataset.role = role;
        pos.dataset.index = index;
        
        const posKey = `${role}-${index}`;
        const player = this.getPlayerAtPosition(posKey);
        
        if (player) {
            pos.classList.add('filled');
            pos.innerHTML = `
                <span class="pos-label">${role}</span>
                <span class="pos-name">${player.name}</span>
                <span class="pos-rating">${player.rating}</span>
            `;
        } else {
            pos.innerHTML = `
                <span class="pos-label">${role}</span>
                <span class="pos-name">+</span>
            `;
        }
        
        pos.onclick = () => this.openPlayerSelection(role, index);
        field.appendChild(pos);
    }
    
    // Ottiene il giocatore in una posizione
    getPlayerAtPosition(posKey) {
        return this.game.lineup.starters.find(p => p && p.positionKey === posKey);
    }
    
    // Apre il modal di selezione giocatore
    openPlayerSelection(role, index) {
        const posKey = `${role}-${index}`;
        const availablePlayers = this. game.myTeam.filter(p => {
            // Deve essere del ruolo giusto
            if (p.role !== role) return false;
            // Non deve essere già in formazione (eccetto questa posizione)
            const currentPos = this.game.lineup. starters.find(s => s && s. id === p.id);
            return !currentPos || currentPos. positionKey === posKey;
        });
        
        if (availablePlayers.length === 0) {
            alert(`Non hai ${this.getRoleName(role)} disponibili! `);
            return;
        }
        
        this.showSelectionModal(availablePlayers, posKey);
    }
    
    // Mostra il modal di selezione
    showSelectionModal(players, posKey) {
        const modal = document.createElement('div');
        modal.className = 'player-select-modal';
        
        const content = document.createElement('div');
        content.className = 'player-select-content';
        
        content.innerHTML = `<h3>Seleziona Giocatore</h3>`;
        
        const grid = document.createElement('div');
        grid.className = 'players-grid';
        
        // Opzione per rimuovere
        const removeOption = document.createElement('div');
        removeOption.className = 'selectable-player';
        removeOption.innerHTML = `
            <div class="player-card" style="border-color: #e74c3c;">
                <span class="role">❌</span>
                <div class="name">Rimuovi</div>
            </div>
        `;
        removeOption.onclick = () => {
            this.removePlayerFromPosition(posKey);
            document.body.removeChild(modal);
            this.renderField();
        };
        grid.appendChild(removeOption);
        
        players.forEach(player => {
            const wrapper = document.createElement('div');
            wrapper.className = 'selectable-player';
            
            const card = document.createElement('div');
            card.className = `player-card ${player.rarity}`;
            card.innerHTML = `
                <span class="role role-${player.role}">${player.role}</span>
                <div class="name">${player.name}</div>
                <div class="team">${player.team}</div>
                <div class="rating">${player.rating}</div>
            `;
            
            wrapper.appendChild(card);
            wrapper.onclick = () => {
                this. setPlayerAtPosition(player, posKey);
                document.body.removeChild(modal);
                this.renderField();
            };
            
            grid.appendChild(wrapper);
        });
        
        content.appendChild(grid);
        
        const closeBtn = document. createElement('button');
        closeBtn.textContent = 'Annulla';
        closeBtn.style.marginTop = '20px';
        closeBtn.style.padding = '10px 30px';
        closeBtn.style.background = '#e94560';
        closeBtn.style.border = 'none';
        closeBtn. style.borderRadius = '20px';
        closeBtn.style.color = '#fff';
        closeBtn.style.cursor = 'pointer';
        closeBtn. onclick = () => document.body.removeChild(modal);
        content.appendChild(closeBtn);
        
        modal.appendChild(content);
        document. body.appendChild(modal);
    }
    
    // Imposta un giocatore in una posizione
    setPlayerAtPosition(player, posKey) {
        // Rimuovi dalla posizione precedente se presente
        this.game.lineup. starters = this.game.lineup.starters.filter(
            p => p && p.positionKey !== posKey && p.id !== player.id
        );
        
        // Aggiungi alla nuova posizione
        this.game.lineup.starters.push({
            ... player,
            positionKey: posKey
        });
        
        this.game.saveToStorage();
    }
    
    // Rimuove un giocatore da una posizione
    removePlayerFromPosition(posKey) {
        this.game. lineup.starters = this.game.lineup.starters.filter(
            p => p && p.positionKey !== posKey
        );
        this.game.saveToStorage();
    }
    
    // Renderizza la panchina
    renderBench() {
        const bench = document. getElementById('bench-players');
        const availableForBench = this. game.myTeam.filter(p => {
            return ! this.game.lineup. starters.find(s => s && s.id === p.id);
        });
        
        bench.innerHTML = `<h3>🪑 Panchina (${availableForBench.length} disponibili)</h3>`;
        
        const grid = document.createElement('div');
        grid.className = 'players-grid';
        grid.style.justifyContent = 'flex-start';
        
        availableForBench.slice(0, 7).forEach(player => {
            const card = document.createElement('div');
            card.className = `player-card ${player.rarity}`;
            card.style.width = '100px';
            card. innerHTML = `
                <span class="role role-${player.role}">${player.role}</span>
                <div class="name" style="font-size: 0.75em;">${player. name}</div>
                <div class="rating">${player.rating}</div>
            `;
            grid.appendChild(card);
        });
        
        bench.appendChild(grid);
    }
    
    // Cambia formazione
    changeFormation(formation) {
        this. game.lineup.formation = formation;
        this.game.lineup.starters = []; // Reset titolari
        this. game.saveToStorage();
        this.renderField();
    }
    
    // Nome del ruolo
    getRoleName(role) {
        const names = { P: 'portieri', D: 'difensori', C: 'centrocampisti', A: 'attaccanti' };
        return names[role];
    }
    
    // Controlla se la formazione è completa
    isLineupComplete() {
        const formation = this.game.lineup. formation;
        const config = this.formations[formation];
        const starters = this. game.lineup.starters;
        
        const hasGK = starters.filter(p => p && p. role === 'P').length === 1;
        const hasDef = starters.filter(p => p && p.role === 'D').length === config.D;
        const hasMid = starters. filter(p => p && p.role === 'C').length === config.C;
        const hasFwd = starters.filter(p => p && p.role === 'A'). length === config.A;
        
        return hasGK && hasDef && hasMid && hasFwd;
    }
}

// Inizializza il manager della formazione
window.lineupManager = new LineupManager(window. game);

// Stili aggiuntivi
const lineupStyles = document. createElement('style');
lineupStyles.textContent = `
    .pos-rating {
        font-size: 0. 9em;
        color: #e94560;
        font-weight: bold;
    }
`;
document.head. appendChild(lineupStyles);