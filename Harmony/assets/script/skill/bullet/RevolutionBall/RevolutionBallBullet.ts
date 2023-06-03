/**
 * 冰球
 */
import ClientDef from "../../../common/ClientDef";
import GameData from "../../../common/GameData";
import LoadMgr from "../../../manager/LoadMgr";
import GameMath from "../../../utils/GameMath";
import BulletHelp from "../../BulletHelp";
import BulletParent from "../../BulletParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RevolutionBallBullet extends BulletParent {


    start () 
    {
        super.start();
        // 获取MotionStreak组件对象
        LoadMgr.Instance.LoadAsset("animation/skill/i_jpql_02" ,(sp)=>{
            //检查人物状态
            if(this._host.getHost().getClientProp(ClientDef.ENTITY_PROP_ACTIVE_STATE) != ClientDef.ENTITY_ACTIVE_STATE_RUN)
            {
                return;
            }
            var node =  new cc.Node();
            this.getNode().addChild(node);
            let motionStreak = node.addComponent(cc.MotionStreak);
            let texture = sp;
            motionStreak.texture = texture;
            motionStreak.minSeg = 0.2; // 拖尾长度
            motionStreak.fadeTime = 0.8; // 拖尾渐隐时间
            // motionStreak.width = 20;  // 拖尾宽度
            motionStreak.color = cc.Color.BLUE;  // 拖尾颜色
            // motionStreak.spacing = 10; // 拖尾间隔
            motionStreak.fastMode = true; // 使用快速模式来渲染纹理
        })
    }

    restart()
    {   
    }

    update (dt) 
    {
        var skillInfo = this._skillInfo;

        var currentPosition = this.getNode().position;

        // let motionStreak = this.getNode().getComponent(cc.MotionStreak);
        // if(motionStreak)
        // {
        //     motionStreak.node.position = cc.v3(currentPosition.x, currentPosition.y,0);
        //     motionStreak.reset();
        // }
    }
   
}
