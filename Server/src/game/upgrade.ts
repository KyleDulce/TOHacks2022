import GameController from "./GameController";

export const upgrades: Map<number, Upgrade> = new Map();

export abstract class Upgrade{
    
    // PASSIVE_UPGRADE => timed stuff CLICKER_UPGRADE => clicks
    constructor(public upgradeId: number, 
        public upgradeType: 'PASSIVE_UPGRADE' | 'CLICKER_UPGRADE',
        public upgradeSide: 0 | 1,
        public upgradeCost: number
        ){  }

    abstract execute(clickValue: number): number;

}

export class MultiplierUpgrade extends Upgrade {
    multiplier: number;

    constructor(id: number, multipler: number, side: 0 | 1, price: number) {
        super(id, 'CLICKER_UPGRADE', side, price);
        this.multiplier = multipler;
    }

    execute(clickValue: number): number {
        return clickValue * this.multiplier;
    }
}

export class AutoClickUpgrade extends Upgrade {
    multiplier: number;

    constructor(id: number, multipler: number, side: 0 | 1, price: number) {
        super(id, 'PASSIVE_UPGRADE', side, price);
        this.multiplier = multipler;
    }

    execute(clickValue: number): number {
        let singleton = GameController.singleton;
        
        singleton.getRegions().forEach(region => {
            if(region.infectedNumber / region.maxPopulation != 0 && region.infectedNumber / region.maxPopulation != 1) {
                singleton.addClicks(region, this.upgradeSide, this.multiplier);
            }
        });
        return 0;
    }
}

export class InfluencePointGrowthMultiplier extends Upgrade {
    multiplier: number;
    constructor(id: number, multipler: number, side: 0 | 1, price: number) {
        super(id, 'PASSIVE_UPGRADE', side, price);
        this.multiplier = multipler;
    }

    execute(clickValue: number): number {
        //TODO done
        return 0;
    }
    
}