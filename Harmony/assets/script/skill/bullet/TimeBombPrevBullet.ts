/**
 * 定时炸弹 前期
 */

import BulletParent from "../BulletParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TimeBombPrevBullet extends BulletParent 
{

    private _isCanStop : boolean = false;

    update (dt) 
    {

        if(this._isCanStop)
        {
            this.stop();
            this._isCanStop = false;
        }
    }

    onFinished()
    {
        //动画结束
        
        var bullet = this.spawnNextBullet();
        bullet.getNode().active = true;
        bullet.getNode().position = this.getNode().position;
        bullet.restart();
        
        this._isCanStop = true;
    }

    

}
