/**
 * 毒树藤 前期
 */

import ClientDef from "../../common/ClientDef";
import MovementParent, { MoveNodeConfig } from "../../movement/MovementParent";
import HalfCircleMovement from "../../movement/children/HalfCircleMovement";
import GameMath from "../../utils/GameMath";
import BulletParent from "../BulletParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PosionTimboPrevBullet extends BulletParent {

    private _halfCircleMovement:MovementParent;
    private _targetPos : cc.Vec3;

    start(): void {
        super.start();
        this._halfCircleMovement = new HalfCircleMovement();
    }

    restart()
    {   
        super.restart();
        var heroNode = this._host.getHost();
        const angle = this.getProp(ClientDef.BULLET_PROP_ANGLE);
        // 计算点的x和y坐标
        var x = GameMath.getCosCache(angle) * this._skillInfo.range + heroNode.position.x;
        var y = GameMath.getSinCache(angle) * this._skillInfo.range + heroNode.position.y;
        this._targetPos = cc.v3(x,y);
    
        const info: MoveNodeConfig = {
            moveNode: this.getNode(),
            startPos: this.getNode().position,
            targetPos: this._targetPos,
            speed: this._bulletInfo.speed,
            completeCallBack :this.completeCallBack,
            target :this,
            direction:null,
          };

        this._halfCircleMovement.start(info);

    }

    completeCallBack()
    {
        this.stop();
        
        var bullet = this.spawnNextBullet();
        bullet.getNode().active = true;
        bullet.getNode().position = this._targetPos;
        bullet.restart();
    }

    update (dt) 
    {
        super.update(dt);
        this._halfCircleMovement.update(dt);
    }

}
