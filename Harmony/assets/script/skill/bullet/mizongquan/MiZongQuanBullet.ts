/**
 * 迷踪拳
 */
import ClientDef from "../../../common/ClientDef";
import GameData from "../../../common/GameData";
import GameMath from "../../../utils/GameMath";
import BulletHelp from "../../BulletHelp";
import BulletParent from "../../BulletParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MiZongQuanBullet extends BulletParent {

    _startPos : cc.Vec3;
    restart()
    {   
        var angle = this.getProp(ClientDef.BULLET_PROP_ANGLE);
        var direction = BulletHelp.AngleConvertDirection(angle);
        this.getNode().angle = GameMath.directionToAngle(direction);
        this.setProp(ClientDef.BULLET_PROP_DIRECTION , direction);

        var heroNode = this._host.getHost().getEntityNode();
        this._startPos = new cc.Vec3();
        this._startPos = this._startPos.add(heroNode.position);
    }

    update (dt) 
    {
        var skillInfo = this._skillInfo;

        
        var currentPosition = this.getNode().position;
        var direction = this.getProp(ClientDef.BULLET_PROP_DIRECTION);
        direction = direction.normalize();
        
        const distance = this._startPos.sub(currentPosition).mag();
        if (distance > this._skillInfo['range']) //超出边界
        {
            this._startPos = new cc.Vec3();
            this.getNode().active = false;
            this.setProp(ClientDef.BULLET_PROP_STATE,ClientDef.BULLET_STATE_FREE);
        } else {
          // 沿着固定方向移动
          const velocity = direction.mul(skillInfo.speed * dt);
          currentPosition = currentPosition.add(velocity);
          this.getNode().position = currentPosition.add(velocity);
        }
        super.update(dt);
    }

    
}
