/**
 * 直线的运动方式
 */

import GameMath from "../../utils/GameMath";
import MovementParent from "../MovementParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LineMovement extends MovementParent {

    start (data ) {
        super.start(data)

        this._direction = this._direction.normalize();
    }

    update (dt) 
    {
        var currentPosition = this._moveNode.position;
        // 沿着固定方向移动
        const velocity = this._direction.mul(this._speed * dt);
        currentPosition = currentPosition.add(velocity);
        this._moveNode.position = currentPosition.add(velocity);
    }

}
