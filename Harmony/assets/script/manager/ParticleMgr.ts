/**
 * 粒子特效管理器
 * 
 * 提供两种特效管理方式：
 * 1.管理器管理粒子
 * 2.自己管理粒子
 */

import ClientDef from "../common/ClientDef";
import ParticleComponent from "../component/ParticleComponent";
import LoadMgr from "./LoadMgr";
import ParentMgr from "./ParentMgr";
import SceneMgr from "./SceneMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ParticleMgr extends ParentMgr {

    public static readonly Instance : ParticleMgr = new ParticleMgr();

    private _layer: cc.Node = null; //显示容器

    private _particleArray:ParticleComponent[];

    private _timerID:number;

    onLoad () 
    {
        this._particleArray = [];
    }

    start () 
    {
        this._layer = new cc.Node();
        this._layer.zIndex = ClientDef.SCENE_INDEX_PARTICLE;
        // this._layer.width = cc.winSize.width;
        // this._layer.height = cc.winSize.height;
        this._layer.parent = SceneMgr.Instance.layer;

        this._timerID = setInterval(this.update.bind(this), 1000);
    }

    update()
    {
        let stopCount = 0;
        let runCount = 0;
        this._particleArray = this._particleArray.filter(particle => {
            const state = particle.getState();
            let delayRecycle = particle.getDelayRecycle();
            if (delayRecycle <= 0) {
                particle.getParticle().node.removeFromParent();
                return false;
            }
            if (state === ClientDef.PARTICLE_STATE_IDLE) {
                stopCount++;
                delayRecycle--;
                particle.setDelayRecycle(delayRecycle);
            } else if (state === ClientDef.PARTICLE_STATE_RUN) {
                runCount++;
            }
            return true;
        });
        console.info(`>>>>>>>>particle total: ${this._particleArray.length}, stop count: ${stopCount}, run count: ${runCount}`);
    }

    addParticle()
    {
        var particleComponent = new ParticleComponent(); // 添加粒子组件到 Node 上
        this._particleArray.push(particleComponent);
        particleComponent.onload(this._layer);

        // var node =  new cc.Node();
        // this._layer.addChild(node);
        // var particleSystem = node.addComponent(cc.ParticleSystem); // 添加粒子组件到 Node 上
        // LoadMgr.Instance.LoadAssetWithType('particle/test_pt', cc.ParticleAsset, function(particleAsset) {
        //     // if (err) {
        //     //     cc.error(err.message || err);
        //     //     return;
        //     // }
        //     particleSystem.file = particleAsset;
        // });
        
        return particleComponent;
    }


}
