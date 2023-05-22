/**
 * 冰球
 */
import ClientDef from "../../../common/ClientDef";
import GameData from "../../../common/GameData";
import GameMath from "../../../utils/GameMath";
import BulletHelp from "../../BulletHelp";
import BulletParent from "../../BulletParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ThunderBallBullet extends BulletParent {

    private _delta:number = 0;

    restart()
    {   
        this._delta = 100;
    }

    update (dt) 
    {
        this._delta--;
        if(this._delta <= 0)
        {
            this.getNode().active = false;
            this.setProp(ClientDef.BULLET_PROP_STATE,ClientDef.BULLET_STATE_FREE);
        }
        
    }

    
}
