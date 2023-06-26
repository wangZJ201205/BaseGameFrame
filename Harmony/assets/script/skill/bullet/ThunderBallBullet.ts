/**
 * 冰球
 */

import BulletParent from "../BulletParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ThunderBallBullet extends BulletParent {

    private _delta:number = 0;

    restart()
    {   
        this._delta = 50;
        super.restart();
    }

    update (dt) 
    {
        this._delta--;
        if(this._delta <= 0)
        {
            this.stop();
        }
        super.update(dt);
    }

    
}
