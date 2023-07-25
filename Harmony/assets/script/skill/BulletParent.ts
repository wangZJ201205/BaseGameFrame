/**
 * 子弹父类
 */

import CollisionComponent from "../component/CollisionComponent";
import ClientDef from "../common/ClientDef";
import DictMgr from "../manager/DictMgr";
import GhostMgr from "../manager/GhostMgr";
import LoadMgr from "../manager/LoadMgr";
import SkillMgr from "../manager/SkillMgr";
import SkillParent from "./SkillParent";
import ParticleMgr from "../manager/ParticleMgr";
import EffectParent from "../effect/EffectParent";
import AudioMgr from "../manager/AudioMgr";
import { DamageSys } from "../ghost/compSystem/DamageSys";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BulletParent {

    protected _node: cc.Node = null;
    protected _host: SkillParent = null;
    protected _prop: { [key: string]: any } = {};

    protected _skillInfo: any = null;
    protected _bulletInfo: any = null;
    protected _staticId : number;
    protected _effect:EffectParent;
    protected _phase : number;

    onLoad (host) 
    {
        this._host = host;
        this._prop = {};
        this.setProp(ClientDef.BULLET_PROP_STATE,ClientDef.BULLET_STATE_FREE);
    }

    start () 
    {
        this._phase = this.getProp(ClientDef.BULLET_PROP_PHASEID);
        this._skillInfo =  this.getSkillInfo();
        this._bulletInfo = DictMgr.Instance.getDictByName("bullet_data")[this._phase] ;
        var damageValue = this._skillInfo["attackValue"].split("-");
        this.setProp(ClientDef.BULLET_PROP_ATK_MIN, Number(damageValue[0]));
        this.setProp(ClientDef.BULLET_PROP_ATK_MAX, Number(damageValue[1]));
        this.setProp(ClientDef.BULLET_PROP_STATE,ClientDef.BULLET_STATE_LOADSRC);

        this._node = new cc.Node();
        if(this._bulletInfo.zorder == 1 ) //设置节点所在的深度
        {
            SkillMgr.Instance.getLayer().addChild(this._node);
        }
        else
        {
            SkillMgr.Instance.getLayerLow().addChild(this._node);
        }

        this.addBulletSkin();
        this.addCollision();
        this.addEffect();
    }

    restart()
    {
        this.setProp(ClientDef.BULLET_PROP_STRIKE,this._bulletInfo["strike"]);
        var sound = this._bulletInfo["sound"];
        AudioMgr.Instance.playEffect(sound,null);
        this.replayAnimation();
        
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
        
        if(this._effect)
        {
            this._effect.setState(ClientDef.PARTICLE_STATE_FREE);
        }
    }

    update (dt) 
    {
        GhostMgr.Instance.setEntityZOrder(this._node);
        if(this._effect)
        {
            this._effect.setPosition(this._node.position.x,this._node.position.y);
        }
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

        if (ClientDef.BULLET_PROP_STATE === type) //状态改变
        {
            this._changeBulletState(value);    
        }
    }

    _changeBulletState(value)
    {
        switch (value) 
        {
          case ClientDef.BULLET_STATE_RUN:
            this.setEffectState(ClientDef.PARTICLE_STATE_RUN);
            break;
          case ClientDef.BULLET_STATE_FREE:
          case ClientDef.BULLET_STATE_LOADSRC:
            this.setEffectState(ClientDef.PARTICLE_STATE_STOP);
            break;
        }
    }

    setEffectState(state) {
        if (this._effect) {
            this._effect.setState(state);
        }
    }

    getProp(type)
    {
        return this._prop[type] || 0;
    }

    getDamageValue(target)
    {
        var tgtMoveType = target.node.getEntityDict()["moveType"];
        var bulletAtkMoveType = this._bulletInfo.attackMoveType;

        if(bulletAtkMoveType < tgtMoveType)
        {
            return 0;
        }

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

        if(!this._bulletInfo.src)
        {
            this.setProp(ClientDef.BULLET_PROP_STATE,ClientDef.BULLET_STATE_RUN);
            return;
        }

        if(!this._bulletInfo.animation || this._bulletInfo.animation == 0) //无皮肤表现
        {
            return;
        }

        //子弹就是以一张图片的形式出现
        if(this._bulletInfo.animation == 1)
        {
            this.loadSprite();
        }
        else if(this._bulletInfo.animation == 2)
        {
            this.loadPrefab();
        }
    }

    loadSprite()
    {
        let atlas = this._bulletInfo.atlas;
        LoadMgr.Instance.LoadAssetWithType("animation/skill/"+atlas, cc.SpriteAtlas,(sp)=>{
            //检查人物状态
            if(this._host.getHost().getCProp(ClientDef.ENTITY_PROP_ACTIVE_STATE) != ClientDef.ENTITY_ACTIVE_STATE_RUN)
            {
                return;
            }
            var sprite = this.getNode().addComponent(cc.Sprite);
            let spriteFrame = sp.getSpriteFrame(this._bulletInfo.src);
            sprite.spriteFrame = spriteFrame;
            sprite.node.anchorX = 0.5;
            sprite.node.anchorY = 0.5;
            this.setProp(ClientDef.BULLET_PROP_STATE,ClientDef.BULLET_STATE_RUN);
        })
    }

    loadPrefab()
    {
        var loadPath = 'animation/skill/' +  this._bulletInfo.preftab +"/"+ this._bulletInfo.preftab;
        var self = this
        LoadMgr.Instance.LoadAssetWithType(loadPath,cc.Prefab,(asset)=>{
            if(this._host.getHost().getCProp(ClientDef.ENTITY_PROP_ACTIVE_STATE) != ClientDef.ENTITY_ACTIVE_STATE_RUN)
            {
                return;
            }
            var aniPref = cc.instantiate(asset);
            aniPref.parent = this.getNode();
            this.setProp(ClientDef.BULLET_PROP_STATE,ClientDef.BULLET_STATE_RUN);

            var anim = aniPref.getComponent(cc.Animation); //添加自动播放对应的动画
            anim.resume(this._bulletInfo.src);
            anim.play(this._bulletInfo.src);
            anim.on('finished',  this.onFinished,    this);
            aniPref.on('Attack',  this.onAimAttack,    this);

        });
    }

    onFinished()
    {
        //动画结束
    }

    onAimAttack()
    {
        //动画结束
    }

    addCollision()
    {
        if(this._bulletInfo.collision == 1)  //是否产生碰撞
        { 
            this.addCollisionRectComponent();
        }
        else if(this._bulletInfo.collision == 2) //是否产生碰撞 圆形
        {
            this.addCollisionCircleComponent();
        }
    }

    //添加碰撞组件
    addCollisionRectComponent()
    {
        var collrect: string = this._bulletInfo.collRect;
        var cr : string[] = collrect.split(",");
        var entityInfo = this._host.getHost().getEntityDict();
        //添加碰撞外框
        var box = this.getNode().addComponent(cc.BoxCollider);
        box.offset.x = Number(cr[0]);
        box.offset.y = Number(cr[1]);
        box.size.width = Number(cr[2]);
        box.size.height = Number(cr[3]);
        box.name = "bullet" + this.getProp(ClientDef.BULLET_PROP_ID);
        this.getNode().group = ClientDef.COLLISION_GROUP_BULLET + "_" + entityInfo.collGroup; 

        //添加碰撞组件
        var collCmp = this.getNode().addComponent(CollisionComponent);
        collCmp.setCollisioner(this);   
    }

    //添加圆形碰撞组件
    addCollisionCircleComponent()
    {
        var collrect: string = this._bulletInfo.collRect;
        var cr : string[] = collrect.split(",");
        var entityInfo = this._host.getHost().getEntityDict();
        //添加碰撞外框
        var circle = this.getNode().addComponent(cc.CircleCollider);
        circle.offset.x = Number(cr[0]);
        circle.offset.y = Number(cr[1]);
        circle.radius = Number(cr[2]);
        circle.name = "bullet" + this.getProp(ClientDef.BULLET_PROP_ID);
        this.getNode().group = ClientDef.COLLISION_GROUP_BULLET + "_"+ entityInfo.collGroup;

        //添加碰撞组件
        var collCmp = this.getNode().addComponent(CollisionComponent);
        collCmp.setCollisioner(this);   
    }

    //碰撞开始
    collisionEnter(other, self)
    {   
        if(!other.node.isLife())
        {
            return false;
        } 
        var tgt = other.node;
        if(tgt.getCProp(ClientDef.ENTITY_PROP_STATE) == ClientDef.ENTITY_STATE_DIE) //死亡状态不触发响应
        {
            return false;
        }
        var damageValue = this.getDamageValue(other);
        if(damageValue == 0)return false;
        DamageSys.addDamage(this._host.getHost(), tgt, damageValue );
        var strike = this.getProp(ClientDef.BULLET_PROP_STRIKE);
        strike --;
        this.setProp(ClientDef.BULLET_PROP_STRIKE,strike);
        if(strike == 0)
        {
            this.stop();
        }
        return true;
    }

    //碰撞中
    collisionStay(other, self)
    {
    }
    //碰撞结束
    collisionExit(other, self)
    {
    }

    addEffect()
    {
        if(this._bulletInfo.particle)
        {
            this._effect = ParticleMgr.Instance.addParticle(this._bulletInfo.particle);
        }
        else if(this._bulletInfo.motionStreak)
        {
            this._effect = ParticleMgr.Instance.addMotionStreak(this._bulletInfo.motionStreak);
        } 
    }

    spawnNextBullet()
    {
        if(!this._bulletInfo.nextBullet)
        {
            console.info(">>>>没有下一阶段:"+this._bulletInfo.id);
            return null;
        }
        var bullet = this._host.spawnBullet( this._bulletInfo.nextBullet );
        return bullet;
    }

    replayAnimation()
    {
        if(!this._bulletInfo.animation)
        {
            return;
        }
        var anipref = this.getNode().children[0];
        if(anipref)
        {
            var anim = anipref.getComponent(cc.Animation); //添加自动播放对应的动画
            anim.resume(this._bulletInfo.src);
            anim.play(this._bulletInfo.src);
        }
    }


}
