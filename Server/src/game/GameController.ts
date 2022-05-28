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
        if(!this.isAdjacentToRegion(event.region, event.team)) {
            return;
        }
        
        let clickValue: number = 1;
        for(let upgrade of this.clickerUpgrades){
            clickValue = upgrade.execute(clickValue);
        }
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

    private isAdjacentToRegion(region_id: number, checkInfected: number) {
        const maxRegionCount = GameController.MAP_WIDTH * GameController.MAP_HEIGHT;
        let regionsToCheck: number[] = [];

        //checks up and down
        if(region_id - GameController.MAP_WIDTH >= 0) {
            regionsToCheck.push(region_id - GameController.MAP_WIDTH);
        }
        if(region_id + GameController.MAP_WIDTH < maxRegionCount) {
            regionsToCheck.push(region_id + GameController.MAP_WIDTH);
        }

        //checks left and right
        //note if width 5 + 1, puts it on the next row, that is not adjecent
        if((region_id + 1) < maxRegionCount && (region_id + 1) % GameController.MAP_WIDTH != 0) {
            regionsToCheck.push(region_id + 1);
        }
        if((region_id - 1) >= 0 && (region_id - 1) % GameController.MAP_WIDTH != (GameController.MAP_WIDTH - 1)) {
            regionsToCheck.push(region_id - 1);
        }
        
        for(let r = 0; r < regionsToCheck.length; r++) {
            let region: Region = this.regions[regionsToCheck[r]]
            if(region.infectedNumber / region.maxPopulation == checkInfected) {
                return true;
            }
        }
        return false;
    }
}