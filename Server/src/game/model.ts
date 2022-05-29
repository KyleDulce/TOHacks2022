
export class Region {
    id: number = -1;
    infectedNumber: number = -1;
    maxPopulation: number = -1;
    team: -1 | 0 | 1 | 2 = -1;
}

export class GameUpdateMessage {
    regions: Region[] = [];
    infectedUpgrades: number[] = [];
    whoUpgrades: number[] = [];
    infectedInfluence: number = 0;
    whoInfluence: number = 0;
    whoUpgradeCosts: number[] = [];
    infectedUpgradeCosts: number[] = [];
}

export class ClickMessage {
    region: number = -1;
    team: 0 | 1 = 0;
}

export class UpgradeMessage {
    upgrade: number = -1;
    team: 0 | 1 = 0;
    callback?: (state: GameUpdateMessage) => void
}