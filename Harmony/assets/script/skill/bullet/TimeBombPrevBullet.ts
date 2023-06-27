/**
 * 定时炸弹 前期
 */

import ClientDef from "../../common/ClientDef";
import BulletParent from "../BulletParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TimeBombPrevBullet extends BulletParent {


    start(): void {
        super.start();
    }

    restart()
    {   
        super.restart();
    }

    onFinished()
    {
        //动画结束
        for (let index = 0; index < 6; index++) {
            var bullet = this.spawnNextBullet();
            bullet.getNode().active = true;
            bullet.getNode().position = this.getNode().position;
            bullet.restart();
        }
        
    }

    

}
