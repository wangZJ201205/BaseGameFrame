/**
 * 拖尾特效组件（运行线条）
 */

import ClientDef from "../../common/ClientDef";
import GameData from "../../common/GameData";
import LoadMgr from "../../manager/LoadMgr";
import EffectParent from "../EffectParent";



const {ccclass, property} = cc._decorator;

@ccclass
export default class MotionSteakEffect extends EffectParent {

    private _motionStreakSystem : cc.MotionStreak;
    private _totalParts : number;   //总粒子数
    

    start(parent,config)
    {
        super.start(parent,config);
        this._motionStreakSystem = this._node.addComponent(cc.MotionStreak); // 添加粒子组件到 Node 上
        var self = this;
        

        LoadMgr.Instance.LoadAsset("animation/skill/i_jpql_02" ,(sp)=>{
            //检查人物状态
            
            let texture = sp;
            self._motionStreakSystem.texture = texture;
            self._motionStreakSystem.minSeg = 0.2; // 拖尾长度
            self._motionStreakSystem.fadeTime = 1; // 拖尾渐隐时间
            self._motionStreakSystem.stroke = 40;
            // motionStreak.width = 20;  // 拖尾宽度
            // motionStreak.color = cc.Color.BLUE;  // 拖尾颜色
            // motionStreak.spacing = 10; // 拖尾间隔
            // motionStreak.fastMode = true; // 使用快速模式来渲染纹理
            self._state = ClientDef.PARTICLE_STATE_RUN;
        })
        
        this._state = ClientDef.PARTICLE_STATE_LOADING;
    }

    setState(state)
    {
        super.setState(state);

        if(state == ClientDef.PARTICLE_STATE_RUN)
        {
            this._motionStreakSystem.reset();
            this._node.active = true;
            this._delayStop = GameData.Particle_Delay_Time;
        }
    }

}
