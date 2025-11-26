// Funzione di inizializzazione app (chiamata dopo il login)
function initializeApp() {
    // Aggiorna UI iniziale
    game.updateUI();

    // Gestione tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;

            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(tabId).classList.add('active');

            if (tabId === 'team') {
                teamManager.renderTeamList();
            } else if (tabId === 'lineup') {
                lineupManager.renderField();
            }
        });
    });

    // Gestione acquisto bustine
    document.querySelectorAll('.pack').forEach(pack => {
        const buyBtn = pack.querySelector('.buy-btn');
        buyBtn.addEventListener('click', () => {
            const packType = pack.dataset.type;
            const players = packSystem.buyPack(packType);

            if (players) {
                packSystem.showPackResults(players);
            }
        });
    });

    // Chiusura modal bustine
    document.getElementById('close-modal').addEventListener('click', () => {
        document.getElementById('pack-modal').classList.add('hidden');
    });

    document.getElementById('pack-modal').addEventListener('click', (e) => {
        if (e.target.id === 'pack-modal') {
            document.getElementById('pack-modal').classList.add('hidden');
        }
    });

    // Gestione filtri rosa
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            teamManager.setFilter(btn.dataset.role);
        });
    });

    // Gestione cambio formazione
    document.getElementById('formation-select').addEventListener('change', (e) => {
        lineupManager.changeFormation(e.target.value);
    });

    // Gestione partita
    document.getElementById('play-match').addEventListener('click', () => {
        const result = matchSimulator.simulateMatch();

        if (result) {
            showMatchResult(result);
        }
    });

    // Inizializza il simulatore di partite
    window.matchSimulator = new MatchSimulator(game, lineupManager);
}

// Mostra il risultato della partita
function showMatchResult(result) {
    const container = document.getElementById('match-result');
    container.classList.remove('hidden');

    let resultClass = '';
    if (result.result === 'VITTORIA') resultClass = 'victory';
    else if (result.result === 'SCONFITTA') resultClass = 'defeat';
    else resultClass = 'draw';

    container.innerHTML = `
        <h3 class="${resultClass}">${result.result}!</h3>
        <div class="score-display">
            <span>TU</span>
            <span class="scores">${result.totalScore} - ${result.opponentScore}</span>
            <span>CPU</span>
        </div>
        <p class="credits-won">+${result.creditsWon} crediti guadagnati! </p>

        <div class="player-performance">
            <h4>📊 Pagelle</h4>
            ${result.performances.map(p => `
                <div class="performance-item">
                    <span>
                        <strong>${p.player.name}</strong>
                        <small>(${p.player.role})</small>
                        ${p.events.length > 0 ? `<br><small>${p.events.join(', ')}</small>` : ''}
                    </span>
                    <span class="score">
                        Voto: ${p.vote} | FV: ${p.fantasyPoints.toFixed(1)}
                    </span>
                </div>
            `).join('')}
        </div>
    `;
}

// Stili per i risultati
const matchStyles = document.createElement('style');
matchStyles.textContent = `
    .victory { color: #2ecc71; }
    .defeat { color: #e74c3c; }
    .draw { color: #f39c12; }

    .scores {
        font-size: 1.2em;
        margin: 0 20px;
        color: #e94560;
    }

    .credits-won {
        color: #2ecc71;
        font-size: 1.3em;
        margin: 15px 0;
    }

    .player-performance h4 {
        margin: 20px 0 10px;
        border-bottom: 1px solid #0f3460;
        padding-bottom: 10px;
    }
`;
document.head.appendChild(matchStyles);