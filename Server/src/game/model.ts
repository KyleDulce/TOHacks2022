
export class Region {
    id: number = -1;
    infectedNumber: number = -1;
}

export class GameUpdateMessage {
    regions: Region[] = [];
    infectedUpgrades: number[] = [];
    whoUpgrades: number[] = [];
}

export class ClickMessage {
    region: number = -1;
    team: number = -1;
}

export class UpgradeMessage {
    upgrade: number = -1;
    team: number = -1;
}