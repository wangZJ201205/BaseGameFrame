/**
 * 子弹父类
 */

import CollisionComponent from "../component/CollisionComponent";
import ClientDef from "../common/ClientDef";
import GameData from "../common/GameData";
import Entity from "../ghost/Entity";
import DictMgr from "../manager/DictMgr";
import GhostMgr from "../manager/GhostMgr";
import LoadMgr from "../manager/LoadMgr";
import SceneMgr from "../manager/SceneMgr";
import SkillMgr from "../manager/SkillMgr";
import SkillParent from "./SkillParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BulletParent {

    protected _node: cc.Node = null;
    protected _host: SkillParent = null;
    protected _prop: { [key: string]: any } = {};

    protected _skillInfo: any = null;
    protected _staticId : number;

    onLoad (host) 
    {
        this._host = host;
        this._prop = {};

        this._node = new cc.Node();
        SkillMgr.Instance.getLayer().addChild(this._node);

        this.setProp(ClientDef.BULLET_PROP_STATE,ClientDef.BULLET_STATE_FREE);
    }

    start () 
    {
        this._skillInfo =  this.getSkillInfo();
        var damageValue = this._skillInfo["attackValue"].split("-");
        this.setProp(ClientDef.BULLET_PROP_ATK_MIN, Number(damageValue[0]));
        this.setProp(ClientDef.BULLET_PROP_ATK_MAX, Number(damageValue[1]));
        this.setProp(ClientDef.BULLET_PROP_STATE,ClientDef.BULLET_STATE_LOADSRC);
        this.addBulletSkin();
        this.addCollision();
        

    }

    restart()
    {
        
    }

    stop()
    {
        this.getNode().active = false;
        this.setProp(ClientDef.BULLET_PROP_STATE,ClientDef.BULLET_STATE_FREE);
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
        GhostMgr.Instance.setEntityZOrder(this._node);
        
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

    getSkillInfo()
    {
        var sid = this._prop[ClientDef.BULLET_PROP_STATICID];
        var skillInfo = DictMgr.Instance.getDictByName("skill_data")[sid];
        return skillInfo;
    }

    addBulletSkin()
    {
        var skillInfo = this._skillInfo;

        //子弹就是以一张图片的形式出现
        if(skillInfo.animation == 0)
        {
            this.loadSprite();
        }
        else
        {
            this.loadPrefab();
        }
    }

    loadSprite()
    {
        LoadMgr.Instance.LoadAssetWithType("animation/skill/skill_res" ,cc.SpriteAtlas,(sp)=>{
            //检查人物状态
            if(this._host.getHost().getClientProp(ClientDef.ENTITY_PROP_ACTIVE_STATE) != ClientDef.ENTITY_ACTIVE_STATE_RUN)
            {
                return;
            }
            var sprite = this.getNode().addComponent(cc.Sprite);
            let spriteFrame = sp.getSpriteFrame(this._skillInfo.src);
            sprite.spriteFrame = spriteFrame;
            sprite.node.anchorX = 0.5;
            sprite.node.anchorY = 0.5;
            this.setProp(ClientDef.BULLET_PROP_STATE,ClientDef.BULLET_STATE_RUN);
        })
    }

    loadPrefab()
    {
        var loadPath = 'animation/skill/' +  this._skillInfo.src +"/"+ this._skillInfo.src ;
        LoadMgr.Instance.LoadAssetWithType(loadPath,cc.Prefab,(asset)=>{
            if(this._host.getHost().getClientProp(ClientDef.ENTITY_PROP_ACTIVE_STATE) != ClientDef.ENTITY_ACTIVE_STATE_RUN)
            {
                return;
            }
            var aniPref = cc.instantiate(asset);
            aniPref.parent = this.getNode();
            this.setProp(ClientDef.BULLET_PROP_STATE,ClientDef.BULLET_STATE_RUN);
        });
    }

    addCollision()
    {
        if(this._skillInfo.collision == 1)  //是否产生碰撞
        { 
            this.addCollisionRectComponent();
        }
        else if(this._skillInfo.collision == 2) //是否产生碰撞 圆形
        {
            this.addCollisionCircleComponent();
        }
    }

    //添加碰撞组件
    addCollisionRectComponent()
    {
        var collrect: string = this._skillInfo.collRect;
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

    //添加圆形碰撞组件
    addCollisionCircleComponent()
    {
        var collrect: string = this._skillInfo.collRect;
        var cr : string[] = collrect.split(",");

        //添加碰撞外框
        var circle = this.getNode().addComponent(cc.CircleCollider);
        circle.offset.x = Number(cr[0]);
        circle.offset.y = Number(cr[1]);
        circle.radius = Number(cr[2]);
        circle.name = "bullet" + this.getProp(ClientDef.BULLET_PROP_ID);
        this.getNode().group = ClientDef.COLLISION_GROUP_BULLET;

        //添加碰撞组件
        var collCmp = this.getNode().addComponent(CollisionComponent);
        collCmp.setCollisioner(this);   
    }

    //碰撞开始
    collisionEnter(other, self)
    {   
        
        this.stop();
        var damageValue = this.getDamageValue();
        other.node.getEntityComponent(ClientDef.ENTITY_COMP_BLOOM).addDamage( damageValue );
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
