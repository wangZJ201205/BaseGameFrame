/**
 * 放毒
 */
import ClientDef from "../../../common/ClientDef";
import Hero from "../../../ghost/Hero";
import SkillMgr from "../../../manager/SkillMgr";
import MovementParent, { MoveNodeConfig } from "../../../movement/MovementParent";
import HalfCircleMovement from "../../../movement/children/HalfCircleMovement";
import GameMath from "../../../utils/GameMath";
import BulletParent from "../../BulletParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class posionBallBullet extends BulletParent {

    private _delta:number = 0;
    private _damagePlayers : number = 0;
    private _bufferTime :  number = 50;
    private _phase : number = 0;
    private _halfCircleMovement:MovementParent;

    onLoad (host) 
    {
        this._host = host;
        this._prop = {};

        this._phase = 1;
        this._node = new cc.Node();
        SkillMgr.Instance.getLayerLow().addChild(this._node);

        this.setProp(ClientDef.BULLET_PROP_STATE,ClientDef.BULLET_STATE_FREE);

        this._halfCircleMovement = new HalfCircleMovement();
    
    }

    restart()
    {   
        this._delta = cc.director.getTotalTime();
        super.restart();
        var heroNode = Hero.Instance.getEntity();
        const angle = Math.random() * 360;
        // 计算点的x和y坐标
        var x = GameMath.getCosCache(angle) * 330 + heroNode.position.x;
        var y = GameMath.getSinCache(angle) * 330 + heroNode.position.y;
        var targetPoint = cc.v3(x,y);
        
        const info: MoveNodeConfig = {
            moveNode: this.getNode(),
            startPos: this.getNode().position,
            targetPos: targetPoint,
            speed: 1,
            completeCallBack :this.completeCallBack,
            target :this,
          };

        this._halfCircleMovement.start(info);

    }

    completeCallBack()
    {
        this.stop();
    }

    update (dt) 
    {
        super.update(dt);
        var delay = cc.director.getTotalTime() - this._delta;
        if(this._phase == 1)
        {
           this._halfCircleMovement.update(dt);
        }
        else
        {
            if(delay > this._skillInfo["sustaintime"])
            {
                this.stop();
            }
        }
    }

}
