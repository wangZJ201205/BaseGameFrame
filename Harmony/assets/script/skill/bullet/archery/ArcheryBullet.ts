/**
 * 冰球
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
        var skillInfo = this._skillInfo;

        const info: MoveNodeConfig = {
            moveNode: this.getNode(),
            startPos: this.getNode().position,
            targetPos: null,
            speed: skillInfo.speed,
            completeCallBack :null,
            target :this,
            direction:direction,
          };

        this._lineMovement.start(info);
        
    }

    update (dt) 
    {
        var heroNode = this._host.getHost().getEntityNode();
        var currentPosition = this.getNode().position;
        
        const distance = heroNode.position.sub(currentPosition).mag();
        if (distance > GameData.App_Game_Width/2) //超出边界
        {
            this.getNode().active = false;
            this.setProp(ClientDef.BULLET_PROP_STATE,ClientDef.BULLET_STATE_FREE);
        } 

        this._lineMovement.update(dt);
        super.update(dt);
    }

    
}
