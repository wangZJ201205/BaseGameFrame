/**
 * 火球
 */
import ClientDef from "../../../common/ClientDef";
import GameData from "../../../common/GameData";
import LoadMgr from "../../../manager/LoadMgr";
import MovementParent, { MoveNodeConfig } from "../../../movement/MovementParent";
import LineMovement from "../../../movement/children/LineMovement";
import GameMath from "../../../utils/GameMath";
import BulletHelp from "../../BulletHelp";
import BulletParent from "../../BulletParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FireBallBullet extends BulletParent {

    private _lineMovement:MovementParent;

    onLoad (host) 
    {
        super.onLoad(host);
        this._lineMovement = new LineMovement();
    }

    restart()
    {   
        // const startTime = cc.director.getTotalTime();
       
        var angle = Math.random()*360;
        var direction = BulletHelp.AngleConvertDirection(angle);

        // var minEntity = BulletHelp.FindEnemyByMinDistance(this.getHost().getHost())
        // var direction = minEntity.position.sub(this.getHost().getHost().position);
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
