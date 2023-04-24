/**
 * 火球
 */

import BulletParent from "../BulletParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FireBallBullet extends BulletParent {


    onLoad (host) 
    {
        super.onLoad(host);
    }

    start () 
    {
        super.start();
    }

    update (dt) 
    {
        super.update(dt);
        this._curDelay ++;

        if( this._curDelay >= this._skillInfo['delay'] )
        {
            this._curDelay = 0;
            //可以释放技能
            console.info(">>>>>>>释放技能！");
        }
    }


}
