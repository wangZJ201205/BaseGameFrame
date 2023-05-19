/**
 * 子弹父类
 */

import CollisionComponent from "../Component/CollisionComponent";
import ClientDef from "../common/ClientDef";
import Entity from "../ghost/Entity";
import DictMgr from "../manager/DictMgr";
import GhostMgr from "../manager/GhostMgr";
import LoadMgr from "../manager/LoadMgr";
import SkillParent from "./SkillParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BulletParent {

    private _node : cc.Node;
    protected _host:SkillParent;
    private _prop:{};

    onLoad (host) 
    {
        this._host = host;
        this._prop = {};

        this._node = new cc.Node();
        GhostMgr.Instance.getLayer().addChild(this._node);
        this.setProp(ClientDef.BULLET_PROP_STATE,ClientDef.BULLET_STATE_FREE);
    }

    start () 
    {
        var sid = this._prop[ClientDef.BULLET_PROP_STATICID];
        var skillInfo = DictMgr.Instance.getDictByName("skill_data")[sid];

        var damageValue = skillInfo["attackValue"].split("-");

        this.setProp(ClientDef.BULLET_PROP_ATK_MIN, Number(damageValue[0]));
        this.setProp(ClientDef.BULLET_PROP_ATK_MAX, Number(damageValue[1]));

        this.setProp(ClientDef.BULLET_PROP_STATE,ClientDef.BULLET_STATE_LOADSRC);
        //子弹就是以一张图片的形式出现
        if(skillInfo.animation == 0)
        {
            LoadMgr.Instance.LoadAssetWithType("animation/skill/"+ skillInfo.src ,cc.SpriteFrame,(sp)=>{
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
        }
        else
        {
            var loadPath = 'animation/skill/' +  skillInfo.src +"/"+ skillInfo.src ;
            LoadMgr.Instance.LoadAssetWithType(loadPath,cc.Prefab,(asset)=>
                {
                    if(this._host.getHost().getClientProp(ClientDef.ENTITY_PROP_ACTIVE_STATE) != ClientDef.ENTITY_ACTIVE_STATE_RUN)
                    {
                        return;
                    }
                    var aniPref = cc.instantiate(asset);
                    aniPref.parent = this.getNode();
                    this.setProp(ClientDef.BULLET_PROP_STATE,ClientDef.BULLET_STATE_RUN);
                });
        }

        //是否产生碰撞
        if(skillInfo.collision == 1)
        {
            this.addCollisionComponent();
        }

    }

    restart()
    {

    }

    remove()
    {
        if(this._node)
        {
            this._node.removeFromParent();
        }
    }

    update (dt) 
    {

    }

    getNode()
    {
        return this._node;
    }

    getHost()
    {
        return this._host;
    }

    setProp(type,value)
    {
        this._prop[type] = value;
    }

    getProp(type)
    {
        return this._prop[type] || 0;
    }

    getDamageValue()
    {
        var min = this.getProp(ClientDef.BULLET_PROP_ATK_MIN);
        var max = this.getProp(ClientDef.BULLET_PROP_ATK_MAX);
        var value = Math.floor(min + Math.random() * (max-min));
        return value;
    }

    getSkillDict()
    {
        var sid = this._prop[ClientDef.BULLET_PROP_STATICID];
        var skillInfo = DictMgr.Instance.getDictByName("skill_data")[sid];
        return skillInfo;
    }

    //添加碰撞组件
    addCollisionComponent()
    {
        var skillInfo = this.getSkillDict();
        var collrect: string = skillInfo.collRect;
        var cr : string[] = collrect.split(",");

        //添加碰撞外框
        var box = this.getNode().addComponent(cc.BoxCollider);
        box.offset.x = Number(cr[0]);
        box.offset.y = Number(cr[1]);
        box.size.width = Number(cr[2]);
        box.size.height = Number(cr[3]);
        box.name = "bullet" + this.getProp(ClientDef.BULLET_PROP_ID);
        this.getNode().group = ClientDef.COLLISION_GROUP_BULLET;

        //添加碰撞组件
        var collCmp = this.getNode().addComponent(CollisionComponent);
        collCmp.setCollisioner(this);
        
    }

    //碰撞开始
    collisionEnter(other, self)
    {
    }
    //碰撞中
    collisionStay(other, self)
    {
    }
    //碰撞结束
    collisionExit(other, self)
    {
    }

}
