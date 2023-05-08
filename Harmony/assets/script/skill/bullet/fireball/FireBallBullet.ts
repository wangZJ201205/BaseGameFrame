/**
 * 火球
 */
import ClientDef from "../../../common/ClientDef";
import GameData from "../../../common/GameData";
import GameMath from "../../../utils/GameMath";
import BulletHelp from "../../BulletHelp";
import BulletParent from "../../BulletParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FireBallBullet extends BulletParent {

    
    restart()
    {
        var minEntity = BulletHelp.FindEnemyByMinDistance(this.getHost().getHost())
        var direction = minEntity.position.sub(this.getHost().getHost().position);
        this.getNode().angle = GameMath.directionToAngle(direction);
        this.setProp(ClientDef.BULLET_PROP_DIRECTION , direction);
    }

    collisionEnter(other, self)
    {
        this.getNode().active = false;
        this.setProp(ClientDef.BULLET_PROP_STATE,ClientDef.BULLET_STATE_FREE);

        other.node.getEntityComponent(ClientDef.ENTITY_COMP_BLOOM).addDamage( this.getSkillDict().attackValue );
    }

    update (dt) 
    {
        var skillInfo = this.getSkillDict();

        var heroNode = this._host.getHost().getEntityNode();
        var currentPosition = this.getNode().position;
        var direction = this.getProp(ClientDef.BULLET_PROP_DIRECTION);
        direction = direction.normalize();
        
        const distance = heroNode.position.sub(currentPosition).mag();
        if (distance > GameData.App_Game_Width/2) //超出边界
        {
            this.getNode().active = false;
            this.setProp(ClientDef.BULLET_PROP_STATE,ClientDef.BULLET_STATE_FREE);
        } else {
          // 沿着固定方向移动
          const velocity = direction.mul(skillInfo.speed * dt);
          currentPosition = currentPosition.add(velocity);
          this.getNode().position = currentPosition.add(velocity);
        }
    }

    
}