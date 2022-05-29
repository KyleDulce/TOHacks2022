export type SocketEvents = "gameupdate" | "click" | "upgrade";

export interface GameUpdate {
    regions: Array<Region>,
    infectedUpgrades: Array<number>,
    whoUpgrades: Array<number>,
    infectedInfluence: number,
    whoInfluence: number,
    whoUpgradeCosts: Array<number>,
    infectedUpgradeCosts: Array<number>;
}

export type team = 0 | 1;
export type upgrade = 0 | 1 | 2;

export interface Region{
    id: number;
    infectedNumber: number;
    maxPopulation: number;
}

export interface ServerToClientEvents {
    gameupdate: (state: GameUpdate) => void
}

export interface ClientToServerEvents {
    click: (region: number, team: team) => void
    upgrade: (upgrade: upgrade, team: team, callback?: (state: GameUpdate) => void) => void
}



// export interface Click{
//     region: number;
//     team: 0 | 1;
// }


// export interface Upgrade{
//     upgrade: number;
//     team: 0 | 1;
// }