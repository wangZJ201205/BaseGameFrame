/**
 * 火球
 */
import CollisionComponent from "../../../Component/CollisionComponent";
import ClientDef from "../../../common/ClientDef";
import GameData from "../../../common/GameData";
import GhostMgr from "../../../manager/GhostMgr";
import LoadMgr from "../../../manager/LoadMgr";
import GameMath from "../../../utils/GameMath";
import BulletParent from "../../BulletParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FireBallBullet extends BulletParent {

    start () 
    {
        this.setProp(ClientDef.BULLET_PROP_STATE,ClientDef.BULLET_STATE_LOADSRC);
        LoadMgr.Instance.LoadAssetWithType("animation/skill_fireball/skill_fashi_huoqiu_3_02",cc.SpriteFrame,(sp)=>{
            //检查人物状态
            if(this._host.getHost().getClientProp(ClientDef.ENTITY_PROP_ACTIVE_STATE) != ClientDef.ENTITY_ACTIVE_STATE_RUN)
            {
                return;
            }
            var sprite = this.getNode().addComponent(cc.Sprite);
            sprite.spriteFrame = sp;
            sprite.node.anchorX = 0.5;
            sprite.node.anchorY = 0.5;
            this.setProp(ClientDef.BULLET_PROP_STATE,ClientDef.BULLET_STATE_RUN);
        })

        var circle = this.getNode().addComponent(cc.CircleCollider);
        circle.radius = 20;
        circle.offset.x = 20;
        circle.offset.y = 2;
        circle.name = 'bullet';
        this.getNode().group = 'bullet';

        var collCmp = this.getNode().addComponent(CollisionComponent);
        collCmp.setCollisionEnterCallBack(this);
    }

    collisionEnter(other, self)
    {
        // console.info(">>>>>>>>>>>>>22222");
        this.getNode().active = false;
        this.setProp(ClientDef.BULLET_PROP_STATE,ClientDef.BULLET_STATE_FREE);

        other.node.active = false;
        other.node.setClientProp(ClientDef.ENTITY_PROP_ACTIVE_STATE, ClientDef.ENTITY_ACTIVE_STATE_FREE);
        other.node.getEntityComponent(ClientDef.ENTITY_COMP_BLOOM).addDamage();
    }

    update (dt) 
    {
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
          const velocity = direction.mul(100 * dt);
          currentPosition = currentPosition.add(velocity);
          this.getNode().position = currentPosition.add(velocity);
        }
    }

    
}
