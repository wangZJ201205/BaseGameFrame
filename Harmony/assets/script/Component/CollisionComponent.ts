/**
 * 碰撞组件
 * 碰撞对象中需要三个函数
 * 代码改线重新实现
 * collisionEnter
 * collisionStay
 * collisionExit
 */

const {ccclass, property} = cc._decorator;

@ccclass
export default class CollisionComponent extends cc.Component {

    _Collisioner:any; //定义一个模板对象
    setCollisioner(bullet)
    {
        this._Collisioner = bullet;
    }

    onCollisionEnter(other, self){
        // 进入碰撞状态时调用的函数
        if(this._Collisioner && this._Collisioner["collisionEnter"])
        {
            this._Collisioner["collisionEnter"](other, self);
        }
    }

    onCollisionStay(other, self){
        // 进入碰撞状态时调用的函数
        if(this._Collisioner && this._Collisioner["collisionStay"])
        {
            this._Collisioner["collisionStay"](other, self);
        }
    }

    onCollisionExit(other, self){
        // 进入碰撞状态时调用的函数
        if(this._Collisioner && this._Collisioner["collisionExit"])
        {
            this._Collisioner["collisionExit"](other, self);
        }
    }
}
