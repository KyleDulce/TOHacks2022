import { ClickMessage, GameUpdateMessage, Region, UpgradeMessage } from "./model";
import SocketController from "../SocketController";
import { Upgrade, upgrades } from "./upgrade";

export default class GameController {
    static singleton: GameController;
    static readonly DELAY_INTERVAL_FOR_LOOP_MILLIS = 1000;
    static readonly MAXPOP = 5000;
    static readonly MAP_WIDTH = 35;
    static readonly MAP_HEIGHT = 5;

    regions: Region[] = [];

    private clickerUpgrades: Upgrade[] = [];
    private passiveUpgrades: Upgrade[] = [];
    private infectionPoints: number = 5000;
    private whoPoints: number = 5000;
    private whoUpgrades: number[] = [];
    private infectionUpgrades: number[] = [];

    constructor() {
        GameController.singleton = this;
        const numOfRegions = GameController.MAP_HEIGHT * GameController.MAP_WIDTH;
        
        for(let r = 0; r < numOfRegions; r++) {
            let region: Region = new Region();
            region.id = r;
            region.maxPopulation = this.getRandomInRange(100, GameController.MAXPOP);
            region.infectedNumber = Math.floor(Math.random()) * GameController.MAXPOP;
            this.regions.push(region);
        }

        setInterval(this.onRepeatingTask, GameController.DELAY_INTERVAL_FOR_LOOP_MILLIS);
    }

    public onClick(event: ClickMessage) {
        if(!this.isAdjacentToRegion(event.region, event.team)) {
            return;
        }

        let clickValue: number = 1;
        for(let upgrade of this.clickerUpgrades){
            if(upgrade.upgradeSide === event.team){
                clickValue = upgrade.execute(clickValue);
            }
        }

        let multiplier = event.team == 0? -1 : 1;
        let newVal = this.regions[event.region].infectedNumber + (clickValue * multiplier);
        if(newVal >= 0 || newVal <= this.regions[event.region].maxPopulation){
            this.regions[event.region].infectedNumber = newVal;
        }
    }

    public onUpgrade(event: UpgradeMessage) {
        let upgrade = upgrades.get(event.upgrade);
        if(upgrade === undefined){
            throw new Error("Upgrade not found");
        }

        if(upgrade.upgradeSide === 0 && upgrade.upgradeCost <= this.whoPoints || upgrade.upgradeSide === 1 && upgrade.upgradeCost <= this.infectionPoints){

            if(upgrade.upgradeType === 'CLICKER_UPGRADE'){

                this.clickerUpgrades.push(upgrade);
    
            }else{
    
                this.passiveUpgrades.push(upgrade);
    
            }
    
            if(upgrade.upgradeSide === 0){
    
                this.whoUpgrades.push(event.upgrade);
    
            }else{
    
                this.infectionUpgrades.push(event.upgrade);
    
            }

        }
    }

    public updatePoints(){

        let baseIncrease = 1;
        let totalInfected = 0;
        let totalPop = 0;
        for(let region of this.regions){

            totalInfected += region.infectedNumber;
            totalPop += region.maxPopulation;

        }

        let infectionFactor = (totalInfected / totalPop) + 1;
        let whoFactor = (1 - (totalInfected / totalPop)) + 1;
        
        this.whoPoints += Math.round(baseIncrease * whoFactor);
        this.infectionPoints += Math.round(baseIncrease * infectionFactor);

    }

    //run from outside scope
    public onRepeatingTask() {
        let socket = SocketController.singleton;
        const current = GameController.singleton;
        
        for(let i = 0; i < current.passiveUpgrades.length; i++){

            current.passiveUpgrades[i].execute(0);

        }
        this.updatePoints();
        socket.sendMessage('gameupdate', { regions: current.regions, infectedUpgrades: current.infectionUpgrades, whoUpgrades: current.whoUpgrades });
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