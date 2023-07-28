/**
 * 冰冻组件组件
 */

import ClientDef from "../../../common/ClientDef";
import LoadMgr from "../../../manager/LoadMgr";
import ComponentParent from "../ComponentParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FrozenComponent extends ComponentParent {

    start () {
        super.start();
        var loadPath = "animation/effect/devoted_priest/devoted_priest";
        LoadMgr.Instance.LoadAssetWithType(loadPath,cc.Prefab,(asset)=>
            {
                if(this.getState() == ClientDef.COMP_STATE_REMOVE)
                {
                    return;
                }
                var aniPref = cc.instantiate(asset);
                aniPref.parent = this.getNode();
            });
    }

}
