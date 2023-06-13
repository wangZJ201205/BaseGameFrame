/**
 * 粒子特效管理器
 * 
 * 提供两种特效管理方式：
 * 1.管理器管理粒子
 * 2.自己管理粒子
 */

import ClientDef from "../common/ClientDef";
import EffectParent from "../effect/EffectParent";
import MotionSteakEffect from "../effect/children/MotionStreakEffect";
import ParticleEffect from "../effect/children/ParticleEffect";
import ParentMgr from "./ParentMgr";
import SceneMgr from "./SceneMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ParticleMgr extends ParentMgr {

    public static readonly Instance : ParticleMgr = new ParticleMgr();

    private _layer: cc.Node = null; //显示容器

    private _particleArray:EffectParent[];

    private _timerID:number;

    onLoad () 
    {
        this._particleArray = [];
    }

    start () 
    {
        this._layer = new cc.Node();
        this._layer.zIndex = ClientDef.SCENE_INDEX_PARTICLE;
        this._layer.parent = SceneMgr.Instance.layer;

        this._timerID = setInterval(this.update.bind(this), 1000);
    }

    clear(): void {
        this._particleArray = this._particleArray.filter(particle => {
            particle.remove();
            return false;
        });
    }

    update()
    {
        this._particleArray = this._particleArray.filter(particle => {
            const state = particle.getState();
            let delayRecycle = particle.getDelayRecycle();
            if (delayRecycle <= 0) 
            {
                particle.remove();
                return false;
            }
            particle.updata();
            return true;
        });
        
        // console.info(`>>>>>particle count : ${this._particleArray.length}`);
    }

    //添加子弹粒子
    addParticle(config)
    {
        var particleComponent = new ParticleEffect(); // 添加粒子组件到 Node 上
        this._particleArray.push(particleComponent);
        particleComponent.onLoad();
        particleComponent.start(this._layer,config);

        return particleComponent;
    }

    //添加拖尾特效
    addMotionStreak(config)
    {
        var motionStreakComponent = new MotionSteakEffect(); // 添加特效组件到 Node 上
        this._particleArray.push(motionStreakComponent);
        motionStreakComponent.onLoad();
        motionStreakComponent.start(this._layer,config);

        return motionStreakComponent;
    }

}
