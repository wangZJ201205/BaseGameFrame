/**
 * 定时炸弹 - 空盒子
 */

import BulletParent from "../BulletParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TimeBombBoxesBullet extends BulletParent {

    
    private _relationBullet : BulletParent; //绑定相关子弹
    private _spawnBulletCnt : number;
    private _delayTime : number;
    private _stopRecvTime : number;
    private _startRecvTime : boolean = false;
    restart()
    {   

        this._startRecvTime = false;
        this._stopRecvTime = 0;

        var bullet = this.spawnNextBullet();
        bullet.getNode().active = true;
        bullet.getNode().zIndex = 100;
        bullet.getNode().position = this.getNode().position;
        bullet.restart();
        this._relationBullet = bullet;

        this._node.zIndex = 10000;

        this._spawnBulletCnt = 0;
        this._delayTime = cc.director.getTotalTime();

        super.restart();

    }

    update (dt) 
    {
        var delta = cc.director.getTotalTime() - this._delayTime;
        if( delta > 800 && this._spawnBulletCnt < this._skillInfo.subBulletCnt )
        {
            var bullet = this._relationBullet.spawnNextBullet();
            bullet.getNode().active = true;
            bullet.getNode().zIndex = 200;
            bullet.getNode().position = this.getNode().position;
            bullet.restart();

            this._spawnBulletCnt++;
            this._delayTime = cc.director.getTotalTime();
        }
        
        if(this._spawnBulletCnt == this._skillInfo.subBulletCnt && this._startRecvTime == false)
        {
            this._startRecvTime = true;
            this._stopRecvTime = cc.director.getTotalTime();
        }

        if(this._startRecvTime)
        {
            var delta = cc.director.getTotalTime() - this._stopRecvTime;
            if(delta > 2000)
            {
                this._relationBullet.stop();
                this.stop();
            }
        }

    }

    
}
