import { ClickMessage, UpgradeMessage } from "./model";
import { Upgrade, upgrades } from "./upgrade";

export default class GameController {

    private clickerUpgrades: Upgrade[] = [];
    private passiveUpgrades: Upgrade[] = [];

    constructor() {
        //TODO setup repeating task
    }

    public onClick(event: ClickMessage) {
        //TODO
        for(let upgrade of this.clickerUpgrades){

            upgrade.execute();

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
}