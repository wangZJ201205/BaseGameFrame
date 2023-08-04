/**
 * 定时炸弹 中期
 */

import ClientDef from "../../common/ClientDef";
import GameData from "../../common/GameData";
import Entity from "../../ghost/Entity";
import { DamageSystem } from "../../ghost/system/DamageSystem";
import LoadMgr from "../../manager/LoadMgr";
import MovementParent, { MoveNodeConfig } from "../../movement/MovementParent";
import LineMovement from "../../movement/children/LineMovement";
import TraceEntityMovement, { TraceEntityConfig } from "../../movement/children/TraceEntityMovement";
import BulletHelp from "../BulletHelp";
import BulletParent from "../BulletParent";
import TimeBombSkill from "../skills/TimeBombSkill";


const {ccclass, property} = cc._decorator;

@ccclass
export default class TimeBombMidBullet extends BulletParent {


    private _lineMovement:LineMovement;
    private _traceEntityMovement:TraceEntityMovement;
    private _startPos : cc.Vec3;

    private _walkOutTimeOfDoor: number = 0;
    private _attackEntity:Entity;
    private _noAttackTime :number = 1000;
    
    onLoad (host) 
    {
        super.onLoad(host);
        this._lineMovement = new LineMovement();
        this._traceEntityMovement = new TraceEntityMovement();
    }

    //重写
    replayAnimation(){
    }

    restart()
    {   
        this._attackEntity = null;
        this._walkOutTimeOfDoor = cc.director.getTotalTime();
        super.restart();
        if(this.getNode().children[0])
        {
            var anim = this.getNode().children[0].getComponent(cc.Animation);

            var skins = this._bulletInfo.src.split(",");
            var rand = Math.floor(Math.random()*skins.length);
            anim.resume(skins[rand]);
            anim.play(skins[rand]);
        }

        //设置方向
        var dir = 1;
        var angle = dir == 2 ? 180 : 0;
        this.getNode().scaleX = dir == 2 ? -1 : 1;
        
        var direction = BulletHelp.AngleConvertDirection(angle);
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
        
        this._startPos = this.getNode().position;
    }

    update (dt) 
    {
        var currentPosition = this.getNode().position;
        const distance = this._startPos.sub(currentPosition).mag();
        if (distance > GameData.App_Game_Width/2) //超出边界
        {
            this.stop();
        } 

        if(!this._attackEntity)
        {
            this._lineMovement.update(dt);
        }
        else
        {
            if(this._attackEntity.getCProp(ClientDef.ENTITY_PROP_ACTIVE_STATE) == ClientDef.ENTITY_ACTIVE_STATE_FREE ||
                !this._attackEntity.isLife())
            {
                this._attackEntity = null;
                return;
            }

            this.getNode().scaleX = this._attackEntity.position.x > this._node.position.x ? 1 : -1;
            
            this._traceEntityMovement.update(dt);
        }

        var walkTime = cc.director.getTotalTime() - this._walkOutTimeOfDoor;
        if( walkTime > this._noAttackTime && !this._attackEntity)
        {
            this._attackEntity = (this._host as TimeBombSkill).getAttackEntity(this);
            const info: TraceEntityConfig = {
                moveNode: this.getNode(),
                startPos: this.getNode().position,
                tgtEntity: this._attackEntity,
                speed: this._bulletInfo.speed * 2,
              };
    
            this._traceEntityMovement.start(info);
        }
    }

    //碰撞开始
    collisionEnter(other, self)
    {   
        if(!other.node.isLife())
        {
            return false;
        }

        var walkTime = cc.director.getTotalTime() - this._walkOutTimeOfDoor;
        if( walkTime < this._noAttackTime ) //是否到攻击时间
        {
            return false;
        }

        this.stop();

        var bullet = this.spawnNextBullet();
        bullet.getNode().active = true;
        bullet.getNode().position = other.node.position;
        bullet.restart();

        var damageValue = this.getDamageValue(other);
        other.node.setCProp(ClientDef.ENTITY_PROP_POSION_TIME,cc.director.getTotalTime());
        if(damageValue == 0)return false;
        DamageSystem.addDamage(this._host.getHost(), other.node, damageValue );
        return true;
    }

    collisionStay(other, self)
    {
        this.collisionEnter(other, self);
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
            var skins = this._bulletInfo.src.split(",");
            var rand = Math.floor(Math.random()*skins.length);
            anim.resume(skins[rand]);
            anim.play(skins[rand]);
        });
    }
}
