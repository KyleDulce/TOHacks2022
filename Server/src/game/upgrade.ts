export const upgrades: Map<number, Upgrade> = new Map();

export abstract class Upgrade{
    
    // PASSIVE_UPGRADE => timed stuff CLICKER_UPGRADE => clicks
    constructor(public upgradeId: number, public upgradeType: 'PASSIVE_UPGRADE' | 'CLICKER_UPGRADE'){ 

        upgrades.set(upgradeId, this);

    }

    abstract execute(clickValue: number): number;

}
