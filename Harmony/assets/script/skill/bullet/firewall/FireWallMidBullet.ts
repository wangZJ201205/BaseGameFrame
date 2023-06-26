/**
 * 火墙 -- 中期
 */

import ClientDef from "../../../common/ClientDef";
import BulletParent from "../../BulletParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FireWallMidBullet extends BulletParent {

    private _delta:number = 0;
    private _runTime : number = 0;
    restart()
    {   
        this._delta = cc.director.getTotalTime();;
        super.restart();
        this._runTime = 0;
    }

    update (dt) 
    {
        var delay = cc.director.getTotalTime() - this._delta;
        if(delay > 100)
        {
            this._runTime++;
            this._delta = cc.director.getTotalTime();
        }
        else
        {
            return;
        }
        if(this._runTime*100 > this._bulletInfo["sustaintime"])
        {
            this.stop();
            this._runTime = 0;
            var bullet = this._host.spawnBullet(ClientDef.BULLET_PHASE_3);
            bullet.getNode().active = true;
            bullet.getNode().position = this.getNode().position;
            bullet.restart();

        }
        super.update(dt);
    }

}
