/**
 * 粒子特效组件
 */

import ClientDef from "../../common/ClientDef";
import GameData from "../../common/GameData";
import LoadMgr from "../../manager/LoadMgr";
import EffectParent from "../EffectParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ParticleEffect extends EffectParent {

    private _particleSystem : cc.ParticleSystem;
    private _totalParts : number;   //总粒子数

    start(parent,config)
    {
        super.start(parent,config);
        this._particleSystem = this._node.addComponent(cc.ParticleSystem); // 添加粒子组件到 Node 上
        var self = this;
        LoadMgr.Instance.LoadAssetWithType('particle/'+config, cc.ParticleAsset, function(particleAsset) {
            self._particleSystem.file = particleAsset;
            self._totalParts = self._particleSystem.totalParticles;
            self._state = ClientDef.PARTICLE_STATE_RUN;
        });
        
        this._state = ClientDef.PARTICLE_STATE_LOADING;
    }


    setState(state)
    {
        super.setState(state);

        if(!this._totalParts)
        {
            this._totalParts = this._particleSystem.totalParticles;
        }

        if(state == ClientDef.PARTICLE_STATE_STOP)
        {
            this._particleSystem.totalParticles = 0;
        }
        else if(state == ClientDef.PARTICLE_STATE_RUN)
        {
            this._particleSystem.totalParticles = this._totalParts;
            this._node.active = true;
            this._delayStop = GameData.Particle_Delay_Time;
        }
    }
    

}
