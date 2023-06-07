/**
 * 半圆的运动方式
 */

import GameMath from "../../utils/GameMath";
import MovementParent from "../MovementParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class HalfCircleMovement extends MovementParent {

    private _diameter: number;
    private _radius: number;
    private _center: cc.Vec3;
    private _angle: number;
    private _time: number = 0;
    private _randDir : number = 1;
    start (data ) {
        super.start(data)

        this._moveNode.position = this._startPos;
        this._diameter = this._startPos.sub(this._targetPos).mag();
        this._radius = this._diameter / 2;
        this._center = this._startPos.add(this._targetPos).div(2);
        const direction = this._targetPos.sub(this._startPos); // 计算方向向量
        this._angle = cc.misc.radiansToDegrees(Math.atan2(direction.y, direction.x)) + 180; // 计算角度
        this._time = 0;
        this._randDir = (Math.floor(Math.random() * 2) * 2) - 1;
    }

    update (dt) 
    {
        if(this._time >= 180 / this._speed )
        {
            if (this._target && typeof this._completeCallBack === 'function') {
                this._completeCallBack.call(this._target); // 调用 completeCallBack 方法，并以 target 为上下文
            }
            return;
        }
        this._time ++  ;
        this._angle += this._speed*this._randDir;
        this._angle = this._angle % 360; // 取模运算可以避免判断
        const currentX = this._center.x + this._radius * GameMath.getCosCache(this._angle);
        const currentY = this._center.y + this._radius * GameMath.getSinCache(this._angle);
        const currentPos = cc.v3(currentX, currentY, 0);
        this._moveNode.position = currentPos;
        
    }

}
