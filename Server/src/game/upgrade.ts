import GameController from "./GameController";

export const upgrades: Map<number, Upgrade> = new Map();

export abstract class Upgrade{
    
    // PASSIVE_UPGRADE => timed stuff CLICKER_UPGRADE => clicks
    constructor(public upgradeId: number, 
        public upgradeType: 'PASSIVE_UPGRADE' | 'CLICKER_UPGRADE',
        public upgradeSide: 0 | 1,
        public upgradeCost: number
        ){  
            this.level = 0;
        }

    abstract execute(clickValue: number): number;
    public level: number;

}

export class MultiplierUpgrade extends Upgrade {

    constructor(id: number, side: 0 | 1, price: number) {
        super(id, 'CLICKER_UPGRADE', side, price);
    }

    execute(clickValue: number): number {
        return clickValue * this.level;
    }
}

export class AutoClickUpgrade extends Upgrade {

    constructor(id: number, side: 0 | 1, price: number) {
        super(id, 'PASSIVE_UPGRADE', side, price);
    }

    execute(clickValue: number): number {
        let singleton = GameController.singleton;
        
        singleton.getRegions().forEach(region => {
            if(region.infectedNumber / region.maxPopulation != 0 && region.infectedNumber / region.maxPopulation != 1) {
                singleton.addClicks(region, this.upgradeSide, this.level);
            }
        });
        return 0;
    }
}

export class InfluencePointGrowthMultiplier extends Upgrade {
    constructor(id: number, side: 0 | 1, price: number) {
        super(id, 'PASSIVE_UPGRADE', side, price);
    }

    execute(clickValue: number): number {
        let singleton = GameController.singleton;
        
        if(this.upgradeSide == 0) {
            singleton.whoPoints += 5 * this.level;
        } else {
            singleton.infectionPoints += 5 * this.level;
        }

        return 0;
    }
}

export function setUpgrades(gameController: GameController) {
    gameController.clickerUpgrades = [
        new MultiplierUpgrade(0, 0, 20),
        new MultiplierUpgrade(0, 1, 20),
    ]
    gameController.passiveUpgrades = [
        new AutoClickUpgrade(1, 0, 20),
        new AutoClickUpgrade(1, 1, 20),
        new InfluencePointGrowthMultiplier(2, 0, 20),
        new InfluencePointGrowthMultiplier(2, 1, 20)
    ]
    gameController.whoUpgrades = [
        0,0,0
    ]
    gameController.infectionUpgrades = [
        0,0,0
    ]
}