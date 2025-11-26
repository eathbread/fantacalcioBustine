// Database di tutti i calciatori disponibili
const PLAYERS_DATABASE = {
    goalkeepers: [
        // Legendary
        { id: 1, name: "Donnarumma", team: "PSG", rating: 89, rarity: "legendary" },
        { id: 2, name: "Maignan", team: "Milan", rating: 87, rarity: "legendary" },
        // Epic
        { id: 3, name: "Sommer", team: "Inter", rating: 85, rarity: "epic" },
        { id: 4, name: "Szczesny", team: "Juventus", rating: 84, rarity: "epic" },
        { id: 5, name: "Carnesecchi", team: "Atalanta", rating: 82, rarity: "epic" },
        // Rare
        { id: 6, name: "Provedel", team: "Lazio", rating: 80, rarity: "rare" },
        { id: 7, name: "De Gea", team: "Fiorentina", rating: 80, rarity: "rare" },
        { id: 8, name: "Meret", team: "Napoli", rating: 79, rarity: "rare" },
        { id: 9, name: "Svilar", team: "Roma", rating: 78, rarity: "rare" },
        // Common
        { id: 10, name: "Milinkovic-Savic", team: "Torino", rating: 76, rarity: "common" },
        { id: 11, name: "Montipò", team: "Verona", rating: 74, rarity: "common" },
        { id: 12, name: "Falcone", team: "Lecce", rating: 73, rarity: "common" },
        { id: 13, name: "Turati", team: "Monza", rating: 72, rarity: "common" },
        { id: 14, name: "Okoye", team: "Udinese", rating: 74, rarity: "common" },
        { id: 15, name: "Skorupski", team: "Bologna", rating: 75, rarity: "common" }
    ],
    
    defenders: [
        // Legendary
        { id: 101, name: "Bastoni", team: "Inter", rating: 87, rarity: "legendary" },
        { id: 102, name: "Bremer", team: "Juventus", rating: 85, rarity: "legendary" },
        { id: 103, name: "Theo Hernandez", team: "Milan", rating: 86, rarity: "legendary" },
        // Epic
        { id: 104, name: "Di Lorenzo", team: "Napoli", rating: 84, rarity: "epic" },
        { id: 105, name: "Dimarco", team: "Inter", rating: 84, rarity: "epic" },
        { id: 106, name: "Acerbi", team: "Inter", rating: 83, rarity: "epic" },
        { id: 107, name: "Gatti", team: "Juventus", rating: 82, rarity: "epic" },
        { id: 108, name: "Buongiorno", team: "Napoli", rating: 83, rarity: "epic" },
        // Rare
        { id: 109, name: "Darmian", team: "Inter", rating: 80, rarity: "rare" },
        { id: 110, name: "Tomori", team: "Milan", rating: 81, rarity: "rare" },
        { id: 111, name: "Romagnoli", team: "Lazio", rating: 79, rarity: "rare" },
        { id: 112, name: "Cambiaso", team: "Juventus", rating: 80, rarity: "rare" },
        { id: 113, name: "Scalvini", team: "Atalanta", rating: 79, rarity: "rare" },
        { id: 114, name: "Ndicka", team: "Roma", rating: 78, rarity: "rare" },
        // Common
        { id: 115, name: "Thiaw", team: "Milan", rating: 76, rarity: "common" },
        { id: 116, name: "Bellanova", team: "Atalanta", rating: 77, rarity: "common" },
        { id: 117, name: "Biraghi", team: "Fiorentina", rating: 76, rarity: "common" },
        { id: 118, name: "Zappacosta", team: "Atalanta", rating: 75, rarity: "common" },
        { id: 119, name: "Parisi", team: "Fiorentina", rating: 74, rarity: "common" },
        { id: 120, name: "Celik", team: "Roma", rating: 74, rarity: "common" },
        { id: 121, name: "Marusic", team: "Lazio", rating: 75, rarity: "common" },
        { id: 122, name: "Danilo", team: "Juventus", rating: 76, rarity: "common" },
        { id: 123, name: "Calabria", team: "Milan", rating: 77, rarity: "common" },
        { id: 124, name: "Mazzocchi", team: "Napoli", rating: 74, rarity: "common" }
    ],
    
    midfielders: [
        // Legendary
        { id: 201, name: "Barella", team: "Inter", rating: 88, rarity: "legendary" },
        { id: 202, name: "Calhanoglu", team: "Inter", rating: 86, rarity: "legendary" },
        { id: 203, name: "Koopmeiners", team: "Juventus", rating: 85, rarity: "legendary" },
        // Epic
        { id: 204, name: "Zielinski", team: "Inter", rating: 83, rarity: "epic" },
        { id: 205, name: "Locatelli", team: "Juventus", rating: 82, rarity: "epic" },
        { id: 206, name: "Reijnders", team: "Milan", rating: 82, rarity: "epic" },
        { id: 207, name: "Lobotka", team: "Napoli", rating: 84, rarity: "epic" },
        { id: 208, name: "Luis Alberto", team: "Lazio", rating: 83, rarity: "epic" },
        { id: 209, name: "Ederson", team: "Atalanta", rating: 82, rarity: "epic" },
        // Rare
        { id: 210, name: "Mkhitaryan", team: "Inter", rating: 81, rarity: "rare" },
        { id: 211, name: "Rabiot", team: "Marsiglia", rating: 80, rarity: "rare" },
        { id: 212, name: "Pellegrini", team: "Roma", rating: 81, rarity: "rare" },
        { id: 213, name: "Pasalic", team: "Atalanta", rating: 79, rarity: "rare" },
        { id: 214, name: "Cataldi", team: "Fiorentina", rating: 78, rarity: "rare" },
        { id: 215, name: "Frattesi", team: "Inter", rating: 79, rarity: "rare" },
        // Common
        { id: 216, name: "Guendouzi", team: "Lazio", rating: 77, rarity: "common" },
        { id: 217, name: "Fagioli", team: "Juventus", rating: 75, rarity: "common" },
        { id: 218, name: "Bennacer", team: "Milan", rating: 77, rarity: "common" },
        { id: 219, name: "Anguissa", team: "Napoli", rating: 78, rarity: "common" },
        { id: 220, name: "Vecino", team: "Lazio", rating: 75, rarity: "common" },
        { id: 221, name: "Cristante", team: "Roma", rating: 76, rarity: "common" },
        { id: 222, name: "Ricci", team: "Torino", rating: 76, rarity: "common" },
        { id: 223, name: "Mandragora", team: "Fiorentina", rating: 74, rarity: "common" },
        { id: 224, name: "Rovella", team: "Lazio", rating: 75, rarity: "common" },
        { id: 225, name: "De Roon", team: "Atalanta", rating: 77, rarity: "common" }
    ],
    
    forwards: [
        // Legendary
        { id: 301, name: "Lautaro Martinez", team: "Inter", rating: 90, rarity: "legendary" },
        { id: 302, name: "Vlahovic", team: "Juventus", rating: 85, rarity: "legendary" },
        { id: 303, name: "Osimhen", team: "Napoli", rating: 88, rarity: "legendary" },
        { id: 304, name: "Leao", team: "Milan", rating: 86, rarity: "legendary" },
        // Epic
        { id: 305, name: "Lookman", team: "Atalanta", rating: 84, rarity: "epic" },
        { id: 306, name: "Thuram", team: "Inter", rating: 83, rarity: "epic" },
        { id: 307, name: "Dybala", team: "Roma", rating: 84, rarity: "epic" },
        { id: 308, name: "Kvara", team: "Napoli", rating: 84, rarity: "epic" },
        { id: 309, name: "Pulisic", team: "Milan", rating: 82, rarity: "epic" },
        { id: 310, name: "Yildiz", team: "Juventus", rating: 80, rarity: "epic" },
        // Rare
        { id: 311, name: "Zaccagni", team: "Lazio", rating: 80, rarity: "rare" },
        { id: 312, name: "Retegui", team: "Atalanta", rating: 79, rarity: "rare" },
        { id: 313, name: "Castellanos", team: "Lazio", rating: 78, rarity: "rare" },
        { id: 314, name: "Lukaku", team: "Napoli", rating: 81, rarity: "rare" },
        { id: 315, name: "Scamacca", team: "Atalanta", rating: 79, rarity: "rare" },
        { id: 316, name: "Gonzalez", team: "Juventus", rating: 80, rarity: "rare" },
        // Common
        { id: 317, name: "Okafor", team: "Milan", rating: 76, rarity: "common" },
        { id: 318, name: "Jovic", team: "Milan", rating: 75, rarity: "common" },
        { id: 319, name: "Soulé", team: "Roma", rating: 75, rarity: "common" },
        { id: 320, name: "Beltran", team: "Fiorentina", rating: 76, rarity: "common" },
        { id: 321, name: "Kean", team: "Fiorentina", rating: 77, rarity: "common" },
        { id: 322, name: "Politano", team: "Napoli", rating: 78, rarity: "common" },
        { id: 323, name: "Isaksen", team: "Lazio", rating: 74, rarity: "common" },
        { id: 324, name: "Pedro", team: "Lazio", rating: 76, rarity: "common" },
        { id: 325, name: "El Shaarawy", team: "Roma", rating: 75, rarity: "common" }
    ]
};

// Mappatura ruoli
const ROLE_MAP = {
    goalkeepers: "P",
    defenders: "D",
    midfielders: "C",
    forwards: "A"
};

// Funzione per ottenere tutti i giocatori con ruolo
function getAllPlayersWithRoles() {
    const allPlayers = [];
    
    for (const [category, players] of Object.entries(PLAYERS_DATABASE)) {
        players.forEach(player => {
            allPlayers.push({
                ... player,
                role: ROLE_MAP[category]
            });
        });
    }
    
    return allPlayers;
}

// Export per uso globale
window. PLAYERS_DATABASE = PLAYERS_DATABASE;
window. ROLE_MAP = ROLE_MAP;
window.getAllPlayersWithRoles = getAllPlayersWithRoles;