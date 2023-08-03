/**
 * 追踪对象
 */

import EntityParent from "../../ghost/EntityParent";
import MovementParent from "../MovementParent";

const {ccclass, property} = cc._decorator;

export interface TraceEntityConfig {
    moveNode: cc.Node; // 运动的对象 -- 由外部传入
    startPos: cc.Vec3; // 开始点
    tgtEntity: EntityParent; // 攻击对象
    speed: number;      // 速度
  }

@ccclass
export default class TraceEntityMovement extends MovementParent {

    private _traceEntity : EntityParent;
    start (data ) {
        this._moveNode  = data.moveNode;
        this._startPos  = data.startPos;
        this._traceEntity = data.tgtEntity;
        this._speed     = data.speed;
    }

    update (dt) 
    {
        var myNode = this._moveNode;
        var currentPosition = this._moveNode.position;
        var direction = this._traceEntity.position.sub(currentPosition);
        direction = direction.normalize();

        // 沿着移动方向移动
        const velocity = direction.mul(this._speed * dt);
        currentPosition = currentPosition.add(velocity);
        myNode.position = currentPosition.add(velocity);
    }


}
