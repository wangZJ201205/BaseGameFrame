/**
 * 碰撞组件
 */

import FireBallBullet from "../skill/bullet/fireball/FireBallBullet";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CollisionComponent extends cc.Component {

    _Collisioner:FireBallBullet; //可以想想实现一个接口类
    setCollisionEnterCallBack(bullet)
    {
        this._Collisioner = bullet;
    }

    onCollisionEnter(other, self){
        // 进入碰撞状态时调用的函数
        // console.info(">>>>>>>>>>>>>CollisionComponent");
        if(this._Collisioner)
        {
            this._Collisioner["collisionEnter"](other, self);
        }
    }

    onCollisionStay(other, self){
        // 进入碰撞状态时调用的函数
        // console.info(">>>>>>>>>>>>>onCollisionStay");
    }

    onCollisionExit(other, self){
        // 进入碰撞状态时调用的函数
        // console.info(">>>>>>>>>>>>>onCollisionExit");
    }
}
