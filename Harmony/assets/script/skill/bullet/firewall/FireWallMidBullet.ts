/**
 * 火墙 -- 中期
 */

import ClientDef from "../../../common/ClientDef";
import BulletParent from "../../BulletParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FireWallMidBullet extends BulletParent {

    private _delta:number = 0;

    restart()
    {   
        this._delta = cc.director.getTotalTime();;
        super.restart();
    }

    update (dt) 
    {
        var delay = cc.director.getTotalTime() - this._delta;
        if(delay > this._bulletInfo["sustaintime"])
        {
            this.stop();

            var bullet = this._host.spawnBullet(ClientDef.BULLET_PHASE_3);
            bullet.getNode().active = true;
            bullet.getNode().position = this.getNode().position;
            bullet.restart();

        }
        super.update(dt);
    }

}
