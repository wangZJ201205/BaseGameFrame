/**
 * 激光
 */

import ClientDef from "../../common/ClientDef";
import BulletParent from "../BulletParent";


const {ccclass, property} = cc._decorator;

@ccclass
export default class LoserBullet extends BulletParent {



    // restart()
    // {

    //     this.setProp(ClientDef.BULLET_PROP_CHANG_DIR, 1); //变化的方向  
    //     this.setProp(ClientDef.BULLET_PROP_CHANG_RANGE, 0);
    //     this._maxRadus = this._skillInfo["range"] ; // 子弹的半径
    //     this._speed = this._bulletInfo["speed"] ; // 子弹的速度
    //     this.getNode().setPosition(0,0,0);
    //     super.restart();
    // }

    // getRadius()
    // {
    //     var rang = this.getProp(ClientDef.BULLET_PROP_CHANG_RANGE);
    //     var dir = this.getProp(ClientDef.BULLET_PROP_CHANG_DIR);
    //     rang = rang + this._speed * dir;
    //     if(Math.abs(rang) >= this._maxRadus)
    //     {
    //         dir *= -1;
    //         this.setProp(ClientDef.BULLET_PROP_CHANG_DIR, dir);
    //     }
    //     this.setProp(ClientDef.BULLET_PROP_CHANG_RANGE, rang);
    //     return rang;
    // }

    
}
