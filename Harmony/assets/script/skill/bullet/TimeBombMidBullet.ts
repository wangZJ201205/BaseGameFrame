/**
 * 定时炸弹 中期
 */

import ClientDef from "../../common/ClientDef";
import GameData from "../../common/GameData";
import Hero from "../../ghost/Hero";
import LoadMgr from "../../manager/LoadMgr";
import MovementParent, { MoveNodeConfig } from "../../movement/MovementParent";
import LineMovement from "../../movement/children/LineMovement";
import GameMath from "../../utils/GameMath";
import BulletHelp from "../BulletHelp";
import BulletParent from "../BulletParent";


const {ccclass, property} = cc._decorator;

@ccclass
export default class TimeBombMidBullet extends BulletParent {

    private _delta:number = 0;
    private _runTime:number = 0;
    private _lineMovement:MovementParent;
    private _curCpName : string = "";
    private _startPos : cc.Vec3;
    
    onLoad (host) 
    {
        super.onLoad(host);
        this._lineMovement = new LineMovement();
    }

    restart()
    {   

        this._delta = cc.director.getTotalTime();
        this._runTime = 0;
        super.restart();
        if(this.getNode().children[0])
        {
            var anim = this.getNode().children[0].getComponent(cc.Animation);

            var skins = this._bulletInfo.src.split(",");
            var rand = Math.floor(Math.random()*skins.length);
            this._curCpName = skins[rand];
            anim.resume(skins[rand]);
            anim.play(skins[rand]);

        }

        //设置方向
        const degree = Hero.Instance.getEntity().getClientProp(ClientDef.ENTITY_PROP_DEGREE);
        var dir = GameMath.degreeToEntityDirection2(degree);
        var angle = dir == 2 ? 180 : 0;
        this.getNode().scaleX = -1;
        
        var direction = BulletHelp.AngleConvertDirection(angle);
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

        this._lineMovement.update(dt);
        super.update(dt);
    }

    //碰撞开始
    collisionEnter(other, self)
    {   
        this.stop();

        var bullet = this.spawnNextBullet();
        bullet.getNode().active = true;
        bullet.getNode().position = this.getNode().position;
        bullet.restart();
        // var damageValue = this.getDamageValue(other);
        // other.node.setClientProp(ClientDef.ENTITY_PROP_POSION_TIME,cc.director.getTotalTime());
        //     if(damageValue == 0)return;
        // other.node.getEntityComponent(ClientDef.ENTITY_COMP_BLOOM).addDamage( damageValue );
    }

    loadPrefab()
    {
        var loadPath = 'animation/skill/' +  this._bulletInfo.preftab +"/"+ this._bulletInfo.preftab;
        var self = this
        LoadMgr.Instance.LoadAssetWithType(loadPath,cc.Prefab,(asset)=>{
            if(this._host.getHost().getClientProp(ClientDef.ENTITY_PROP_ACTIVE_STATE) != ClientDef.ENTITY_ACTIVE_STATE_RUN)
            {
                return;
            }
            var aniPref = cc.instantiate(asset);
            aniPref.parent = this.getNode();
            this.setProp(ClientDef.BULLET_PROP_STATE,ClientDef.BULLET_STATE_RUN);

            var anim = aniPref.getComponent(cc.Animation); //添加自动播放对应的动画
            var skins = this._bulletInfo.src.split(",");
            var rand = Math.floor(Math.random()*skins.length);
            this._curCpName = skins[rand];
            anim.resume(skins[rand]);
            anim.play(skins[rand]);
            anim.on('finished',  this.onFinished,    this);
        });
    }

    

}
