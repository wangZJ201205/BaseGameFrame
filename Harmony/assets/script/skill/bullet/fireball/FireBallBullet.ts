/**
 * 火球
 */
import ClientDef from "../../../common/ClientDef";
import GhostMgr from "../../../manager/GhostMgr";
import LoadMgr from "../../../manager/LoadMgr";
import GameMath from "../../../utils/GameMath";
import BulletParent from "../../BulletParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FireBallBullet extends BulletParent {

    _node:cc.Node;
    onLoad (host) 
    {
        super.onLoad(host);
        this._node = new cc.Node();
        GhostMgr.Instance.getLayer().addChild(this._node);
        this._node.position = this._host.getHost().position;
    }

    start () 
    {
        LoadMgr.Instance.LoadAssetWithType("animation/skill_fireball/skill_fashi_huoqiu_3_02",cc.SpriteFrame,(sp)=>{
            var sprite = this._node.addComponent(cc.Sprite);
            sprite.spriteFrame = sp;
            sprite.node.anchorX = 0.5;
            sprite.node.anchorY = 0;
        })

    }

    update (dt) 
    {
        // var heroNode = Hero.Instance.getEntity().getEntityNode();
        // var myNode = this.getHost().getEntityNode();
        var currentPosition = this._node.position;
        var direction = this.getProp(ClientDef.BULLET_TYPE_DIRECTION );
        direction = direction.normalize();
        
        // const distance = heroNode.position.sub(currentPosition).mag();
        // if (distance <= 50)
        // {
        //   // 到达目标节点
        //   super.update(dt);
        //   this.getHost().getEntityNode().active = false;
        //   this.getHost().setClientProp(ClientDef.ENTITY_PROP_ACTIVE_STATE, ClientDef.ENTITY_ACTIVE_STATE_FREE);
        // } else {
          // 沿着移动方向移动
          const velocity = direction.mul(10 * dt);
          currentPosition = currentPosition.add(velocity);
          this._node.position = currentPosition.add(velocity);
        //   myNode.zIndex = GameData.App_Game_Heigth -(GameData.App_Game_Heigth/2 + myNode.position.y);
        // }

        this.changePlayerDirection(direction);
    }

    changePlayerDirection(direction)
    {
        let angleRadian = Math.atan2(direction.y, direction.x);
        let degree = angleRadian * 180 / Math.PI ; // 转换为角度制
        degree = (degree + 360) % 360 + 90; // 转换为0到360度的范围
        console.info(">>>>>>>>degree>"+degree);
        this._node.angle = -degree;
    }
}
