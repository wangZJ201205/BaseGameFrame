/**
 * 毒火组件
 */

import ClientDef from "../../../common/ClientDef";
import LoadMgr from "../../../manager/LoadMgr";
import ComponentParent from "../ComponentParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PosionFireComponent extends ComponentParent 
{

    start () {
        super.start();
        var loadPath = "animation/skill/kr4_item_valyrian_fire/kr4_item_valyrian_fire";
        LoadMgr.Instance.LoadAssetWithType(loadPath,cc.Prefab,(asset)=>
            {
                if(this.getState() == ClientDef.COMP_STATE_REMOVE)
                {
                    return;
                }
                var aniPref = cc.instantiate(asset);
                aniPref.parent = this.getNode();
                var anim = aniPref.getComponent(cc.Animation); //添加自动播放对应的动画
                anim.resume("kr4_item_valyrian_fire_gene_cp");
                anim.play("kr4_item_valyrian_fire_gene_cp");
            });
    }

}
