/**
 * 放毒 前期
 */
import ClientDef from "../../../common/ClientDef";
import Hero from "../../../ghost/Hero";
import SkillMgr from "../../../manager/SkillMgr";
import MovementParent, { MoveNodeConfig } from "../../../movement/MovementParent";
import HalfCircleMovement from "../../../movement/children/HalfCircleMovement";
import GameMath from "../../../utils/GameMath";
import BulletParent from "../../BulletParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PosionStartBallBullet extends BulletParent {

    private _halfCircleMovement:MovementParent;
    private _targetPos : cc.Vec3;

    onLoad (host) 
    {
        this._host = host;
        this._prop = {};

        this._node = new cc.Node();
        SkillMgr.Instance.getLayerLow().addChild(this._node);

        this.setProp(ClientDef.BULLET_PROP_STATE,ClientDef.BULLET_STATE_FREE);

        this._halfCircleMovement = new HalfCircleMovement();
    
    }

    restart()
    {   
        super.restart();
        var heroNode = Hero.Instance.getEntity();
        const angle = Math.random() * 360;
        // 计算点的x和y坐标
        var x = GameMath.getCosCache(angle) * 330 + heroNode.position.x;
        var y = GameMath.getSinCache(angle) * 330 + heroNode.position.y;
        this._targetPos = cc.v3(x,y);
    
        const info: MoveNodeConfig = {
            moveNode: this.getNode(),
            startPos: this.getNode().position,
            targetPos: this._targetPos,
            speed: 1,
            completeCallBack :this.completeCallBack,
            target :this,
            direction:null,
          };

        this._halfCircleMovement.start(info);

    }

    completeCallBack()
    {
        this.stop();
        var heroPosition = Hero.Instance.getEntity().position;
        
        var bullet = this._host.spawnBullet(ClientDef.BULLET_PHASE_3);
        bullet.getNode().active = true;
        bullet.getNode().position = this._targetPos;
        bullet.restart();
    }

    update (dt) 
    {
        super.update(dt);
        this._halfCircleMovement.update(dt);
    }

    //碰撞关闭
    addCollision()
    {
    }

}
