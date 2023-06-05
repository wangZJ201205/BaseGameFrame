/**
 * 粒子特效组件
 */

import ClientDef from "../common/ClientDef";
import LoadMgr from "../manager/LoadMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ParticleComponent {

    private _state : number;
    private _totalParts : number;
    private _particleSystem : cc.ParticleSystem;
    private _delayRecycle : number;
    
    onload(parent)
    {
        this._delayRecycle = 2;
        var node =  new cc.Node();
        parent.addChild(node);
        var particleSystem = node.addComponent(cc.ParticleSystem); // 添加粒子组件到 Node 上
        var self = this;
        LoadMgr.Instance.LoadAssetWithType('particle/test_pt', cc.ParticleAsset, function(particleAsset) {
            particleSystem.file = particleAsset;
            self._totalParts = particleSystem.totalParticles;
            self._state = ClientDef.PARTICLE_STATE_RUN;
        });
        this._particleSystem = particleSystem;
        this._state = ClientDef.PARTICLE_STATE_LOADING;
    }

    getDelayRecycle()
    {
        return this._delayRecycle;
    }

    setDelayRecycle(value)
    {
        this._delayRecycle = value;
    }

    getParticle()
    {
        return this._particleSystem;
    }

    setPosition(x,y)
    {
        this._particleSystem.node.setPosition(x,y);
    }

    getState()
    {
        return this._state;
    }

    setState(state)
    {
        this._state = state;

        if(!this._totalParts)
        {
            this._totalParts = this._particleSystem.totalParticles;
        }

        if(state == ClientDef.PARTICLE_STATE_STOP)
        {
            this._particleSystem.totalParticles = 0;
            this._particleSystem.node.active = false;
        }
        else if(state == ClientDef.PARTICLE_STATE_RUN)
        {
            this._particleSystem.totalParticles = this._totalParts;
            this._particleSystem.node.active = true;
        }
    }

}
