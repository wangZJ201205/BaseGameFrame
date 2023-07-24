/**
 * 雷击麻痹组件
 */

import ClientDef from "../../../common/ClientDef";
import LoadMgr from "../../../manager/LoadMgr";
import ComponentParent from "../ComponentParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ThunderRayComponent extends ComponentParent 
{

    start () {
        super.start();
        var loadPath = "animation/skill/lethalprism_ray/lethalprism_ray";
        LoadMgr.Instance.LoadAssetWithType(loadPath,cc.Prefab,(asset)=>
            {
                if(this.getState() == ClientDef.COMP_STATE_REMOVE)
                {
                    return;
                }
                var aniPref = cc.instantiate(asset);
                aniPref.parent = this.getNode();
                var anim = aniPref.getComponent(cc.Animation); //添加自动播放对应的动画
                anim.resume("lethalprism_ray_boom_cp");
                anim.play("lethalprism_ray_boom_cp");
            });
    }

}
