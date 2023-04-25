/**
 * 火球
 */
import GhostMgr from "../../../manager/GhostMgr";
import LoadMgr from "../../../manager/LoadMgr";
import BulletParent from "../../BulletParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FireBallBullet extends BulletParent {

    
    onLoad (host) 
    {
        super.onLoad(host);
    }

    start () 
    {
        LoadMgr.Instance.LoadAssetWithType("animation/skill_fireball/skill_fashi_huoqiu_3_02",cc.SpriteFrame,(sp)=>{
            var node = new cc.Node();
            var sprite = node.addComponent(cc.Sprite);
            sprite.spriteFrame = sp;
            GhostMgr.Instance.getLayer().addChild(node);
            node.position = this._host.getHost().position;
        })
    }

    update (dt) 
    {

    }
}
