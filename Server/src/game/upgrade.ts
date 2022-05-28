import GameController from "./GameController";

export abstract class Upgrade{

    public upgradeCost: number = 20;
    
    // PASSIVE_UPGRADE => timed stuff CLICKER_UPGRADE => clicks
    constructor(public upgradeId: number, 
        public upgradeType: 'PASSIVE_UPGRADE' | 'CLICKER_UPGRADE',
        public upgradeSide: 0 | 1
        ){  
            this.level = 0;
        }

    abstract execute(clickValue: number): number;
    public level: number;

}

export class MultiplierUpgrade extends Upgrade {

    public upgradeCost: number = 20;

    constructor(id: number, side: 0 | 1) {
        super(id, 'CLICKER_UPGRADE', side);
    }

    execute(clickValue: number): number {
        return clickValue * this.level;
    }
}

export class AutoClickUpgrade extends Upgrade {

    public upgradeCost: number = 20;

    constructor(id: number, side: 0 | 1) {
        super(id, 'PASSIVE_UPGRADE', side);
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

    public upgradeCost: number = 20;

    constructor(id: number, side: 0 | 1) {
        super(id, 'PASSIVE_UPGRADE', side);
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
        new MultiplierUpgrade(0, 0),
        new MultiplierUpgrade(0, 1),
    ]
    gameController.passiveUpgrades = [
        new AutoClickUpgrade(1, 0),
        new AutoClickUpgrade(1, 1),
        new InfluencePointGrowthMultiplier(2, 0),
        new InfluencePointGrowthMultiplier(2, 1)
    ]
    gameController.whoUpgrades = [
        0,0,0
    ]
    gameController.infectionUpgrades = [
        0,0,0
    ]
}