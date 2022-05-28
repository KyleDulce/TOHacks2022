export const upgrades: Map<number, Upgrade> = new Map();

export abstract class Upgrade{
    
    // PASSIVE_UPGRADE => timed stuff CLICKER_UPGRADE => clicks
    constructor(public upgradeId: number, public upgradeType: 'PASSIVE_UPGRADE' | 'CLICKER_UPGRADE', public upgradeSide: 'WHO' | 'INFECTION'){ 

        upgrades.set(upgradeId, this);

    }

    abstract execute(): void;

}
