import { ClickMessage, Region, UpgradeMessage } from "./model";
import { Upgrade, upgrades } from "./upgrade";

export default class GameController {
    static readonly DELAY_INTERVAL_FOR_LOOP_MILLIS = 1000;
    static readonly MAXPOP = 5000;
    static readonly MAP_WIDTH = 35;
    static readonly MAP_HEIGHT = 5;

    regions: Region[] = [];

    private clickerUpgrades: Upgrade[] = [];
    private passiveUpgrades: Upgrade[] = [];

    constructor() {
        const numOfRegions = GameController.MAP_HEIGHT * GameController.MAP_WIDTH;
        
        for(let r = 0; r < numOfRegions; r++) {
            let region: Region = new Region();
            region.id = r;
            region.maxPopulation = this.getRandomInRange(100, GameController.MAXPOP);
            region.infectedNumber = Math.floor(Math.random()) * GameController.MAXPOP;
        }

        setInterval(this.onRepeatingTask, GameController.DELAY_INTERVAL_FOR_LOOP_MILLIS);
    }

    public onClick(event: ClickMessage) {
<<<<<<< HEAD
        
=======
        //TODO
        for(let upgrade of this.clickerUpgrades){

            upgrade.execute();

        }

>>>>>>> fa329d6d01c160a7a230dc7361960e2f6eddbf31
    }

    public onUpgrade(event: UpgradeMessage) {
        //TODO
        let upgrade = upgrades.get(event.upgrade);
        if(upgrade === undefined){

            throw new Error("Upgrade not found");

        }
        
        if(upgrade.upgradeType === 'CLICKER_UPGRADE'){

            this.clickerUpgrades.push(upgrade);

        }else{

            this.passiveUpgrades.push(upgrade);

        }

    }

    public onRepeatingTask() {
        //TODO
        for(let upgrade of this.passiveUpgrades){

            upgrade.execute();

        }

    }

    private getRandomInRange(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min) + min);
    }
    
    private isAdjacent(id: number, other: number): boolean {
                //checks if adjecent horizontally
                //note, if a grid is 5 in width, index 4 and 5 are not adjecent horizontally because next row
        return (Math.abs(id - other) == 1 && !(id % GameController.MAP_WIDTH == 0 || other % GameController.MAP_WIDTH == 0)) ||
                (Math.abs(id - other) == GameController.MAP_WIDTH);
    }
}