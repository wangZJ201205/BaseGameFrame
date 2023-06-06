/**
 * 放毒
 */
import ClientDef from "../../../common/ClientDef";
import GameData from "../../../common/GameData";
import Hero from "../../../ghost/Hero";
import SkillMgr from "../../../manager/SkillMgr";
import BulletParent from "../../BulletParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class posionBallBullet extends BulletParent {

    private _delta:number = 0;
    private _damagePlayers : number = 0;
    private _bufferTime :  number = 50;
    private _phase : number = 0;

    onLoad (host) 
    {
        this._host = host;
        this._prop = {};

        this._phase = 1;
        this._node = new cc.Node();
        SkillMgr.Instance.getLayerLow().addChild(this._node);

        this.setProp(ClientDef.BULLET_PROP_STATE,ClientDef.BULLET_STATE_FREE);
    }
    restart()
    {   
        this._delta = cc.director.getTotalTime();
        super.restart();

    }


    update (dt) 
    {
        var delay = cc.director.getTotalTime() - this._delta;
        if(this._phase == 1)
        {
           
        }
        else
        {
            if(delay > this._skillInfo["sustaintime"])
            {
                this.stop();
            }
        }
    }

}
