// Sistema di gestione bustine
class PackSystem {
    constructor(game) {
        this.game = game;
        this.allPlayers = getAllPlayersWithRoles();
        
        this.packTypes = {
            bronze: {
                price: 100,
                guaranteedRarity: null,
                weights: { common: 85, rare: 12, epic: 2.5, legendary: 0.5 }
            },
            silver: {
                price: 250,
                guaranteedRarity: "rare",
                weights: { common: 60, rare: 30, epic: 8, legendary: 2 }
            },
            gold: {
                price: 500,
                guaranteedRarity: "epic",
                weights: { common: 40, rare: 35, epic: 20, legendary: 5 }
            }
        };
    }
    
    // Acquista e apri una bustina
    buyPack(packType) {
        const pack = this.packTypes[packType];
        
        if (!pack) {
            alert("Tipo di bustina non valido!");
            return null;
        }
        
        if (! this.game.spendCredits(pack.price)) {
            alert("Crediti insufficienti!");
            return null;
        }
        
        return this.openPack(packType);
    }
    
    // Apri la bustina e ottieni 5 giocatori
    openPack(packType) {
        const pack = this.packTypes[packType];
        const players = [];
        
        // Primo giocatore garantito (se applicabile)
        if (pack.guaranteedRarity) {
            players.push(this.getRandomPlayerByRarity(pack.guaranteedRarity));
        }
        
        // Riempi fino a 5 giocatori
        while (players.length < 5) {
            const rarity = this.rollRarity(pack.weights);
            const player = this.getRandomPlayerByRarity(rarity);
            
            // Evita duplicati nella stessa bustina
            if (!players.find(p => p.id === player.id)) {
                players.push(player);
            }
        }
        
        return players;
    }
    
    // Determina la rarità in base ai pesi
    rollRarity(weights) {
        const roll = Math.random() * 100;
        let cumulative = 0;
        
        for (const [rarity, weight] of Object.entries(weights)) {
            cumulative += weight;
            if (roll < cumulative) {
                return rarity;
            }
        }
        
        return "common";
    }
    
    // Ottiene un giocatore casuale di una specifica rarità
    getRandomPlayerByRarity(rarity) {
        const playersOfRarity = this.allPlayers.filter(p => p.rarity === rarity);
        
        if (playersOfRarity.length === 0) {
            // Fallback a common se la rarità non ha giocatori
            return this.getRandomPlayerByRarity("common");
        }
        
        const randomIndex = Math.floor(Math.random() * playersOfRarity.length);
        return { ...playersOfRarity[randomIndex] };
    }
    
    // Mostra i risultati della bustina
    showPackResults(players) {
        const modal = document.getElementById('pack-modal');
        const resultsContainer = document.getElementById('pack-results');
        
        resultsContainer.innerHTML = '';
        
        players.forEach((player, index) => {
            const card = this.createPlayerCard(player);
            card.style.animationDelay = `${index * 0.2}s`;
            card.classList.add('reveal-animation');
            resultsContainer.appendChild(card);
            
            // Aggiungi alla rosa
            const result = this.game.addPlayerToTeam(player);
            if (! result.success) {
                card.classList.add('duplicate');
                const dupLabel = document.createElement('div');
                dupLabel.className = 'duplicate-label';
                dupLabel.textContent = 'GIÀ IN ROSA';
                card.appendChild(dupLabel);
            }
        });
        
        modal.classList.remove('hidden');
    }
    
    // Crea una card giocatore
    createPlayerCard(player) {
        const card = document.createElement('div');
        card.className = `player-card ${player.rarity}`;
        
        card.innerHTML = `
            <span class="role role-${player.role}">${player.role}</span>
            <div class="name">${player.name}</div>
            <div class="team">${player.team}</div>
            <div class="rating">${player.rating}</div>
        `;
        
        return card;
    }
}

// Inizializza il sistema bustine
window.packSystem = new PackSystem(window.game);

// Aggiungi stile per animazione reveal
const style = document.createElement('style');
style.textContent = `
    .reveal-animation {
        animation: revealCard 0.5s ease forwards;
        opacity: 0;
        transform: scale(0.5) rotateY(180deg);
    }
    
    @keyframes revealCard {
        to {
            opacity: 1;
            transform: scale(1) rotateY(0deg);
        }
    }
    
    .player-card.duplicate {
        opacity: 0.5;
        position: relative;
    }
    
    .duplicate-label {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(-15deg);
        background: #e74c3c;
        padding: 5px 10px;
        border-radius: 5px;
        font-size: 0.7em;
        font-weight: bold;
    }
`;
document.head.appendChild(style);