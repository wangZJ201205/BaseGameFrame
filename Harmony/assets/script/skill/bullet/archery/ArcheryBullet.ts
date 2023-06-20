/**
 * 射箭
 */
import ClientDef from "../../../common/ClientDef";
import GameData from "../../../common/GameData";
import Hero from "../../../ghost/Hero";
import MovementParent, { MoveNodeConfig } from "../../../movement/MovementParent";
import LineMovement from "../../../movement/children/LineMovement";
import GameMath from "../../../utils/GameMath";
import BulletHelp from "../../BulletHelp";
import BulletParent from "../../BulletParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ArcheryBullet extends BulletParent {

    private _lineMovement:MovementParent;
    private _startPos : cc.Vec3;
    onLoad (host) 
    {
        super.onLoad(host);
        this._lineMovement = new LineMovement();
    }

    restart()
    {   

        //设置方向
        const degree = Hero.Instance.getEntity().getClientProp(ClientDef.ENTITY_PROP_DEGREE);
        var dir = GameMath.degreeToEntityDirection2(degree);
        var angle = dir == 2 ? 180 : 0;
        this.getNode().scaleX = -1;
        
        var direction = BulletHelp.AngleConvertDirection(angle);
        this.getNode().angle = GameMath.directionToAngle(direction);
        this.setProp(ClientDef.BULLET_PROP_DIRECTION , direction);
        
        super.restart();
        var bulletInfo = this._bulletInfo;

        const info: MoveNodeConfig = {
            moveNode: this.getNode(),
            startPos: this.getNode().position,
            targetPos: null,
            speed: bulletInfo.speed,
            completeCallBack :null,
            target :this,
            direction:direction,
          };

        this._lineMovement.start(info);
        
        this._startPos = this._host.getHost().getEntityNode().position;
    }

    update (dt) 
    {
        var currentPosition = this.getNode().position;
        const distance = this._startPos.sub(currentPosition).mag();
        if (distance > GameData.App_Game_Width/2) //超出边界
        {
            this.stop();
        } 

        this._lineMovement.update(dt);
        super.update(dt);
    }

    //碰撞开始
    collisionEnter(other, self)
    {   
        var tgt = other.node;
        if(tgt.getClientProp(ClientDef.ENTITY_PROP_STATE) == ClientDef.ENTITY_STATE_DIE) //死亡状态不触发响应
        {
            return;
        }
        super.collisionEnter(other, self);
        if( this._skillInfo.id == 11009 )
        {
            var bullet = this._host.spawnBullet(ClientDef.BULLET_PHASE_3);
            bullet.getNode().active = true;
            bullet.getNode().position = this.getNode().position;
            bullet.restart();
        }
    }
    
}
