/**
 * 特效组件父类
 */

import ClientDef from "../common/ClientDef";
import GameData from "../common/GameData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class EffectParent {

    protected _node : cc.Node;
    protected _state : number;        //粒子状态
    protected _delayRecycle : number; //等待回收
    protected _delayStop : number;    //等待停止 关闭active

    onLoad () 
    {
        this._delayRecycle  = GameData.Particle_Delay_Time;
        this._delayStop     = GameData.Particle_Delay_Time;  
    }

    start (parent,config) 
    {
        this._node =  new cc.Node();
        parent.addChild(this._node);
    }

    updata()
    {
        const state = this._state;
        let delayRecycle = this._delayRecycle;

        if (state === ClientDef.PARTICLE_STATE_FREE) {
            delayRecycle--;
            this.setDelayRecycle(delayRecycle);
        } else if (state === ClientDef.PARTICLE_STATE_STOP) {
            if (this._node.active) {
                this._updateParticleStop();
            }
        }
    }

    _updateParticleStop() 
    {
        if (this._delayStop <= 0) {
          this._node.active = false;
        }
        this._delayStop--;
    }

    remove()
    {
        this._node.removeFromParent();
    }

    getState()
    {
        return this._state;
    }

    setState(state)
    {
        this._state = state;
    }

    getDelayRecycle()
    {
        return this._delayRecycle;
    }

    setDelayRecycle(value)
    {
        this._delayRecycle = value;
    }

    setPosition(x,y)
    {
        this._node.setPosition(x,y);
    }



}
