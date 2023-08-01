/**
 * 护盾组件
 */

import ClientDef from "../../../common/ClientDef";
import LoadMgr from "../../../manager/LoadMgr";
import ComponentParent from "../ComponentParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FireShieldComponent extends ComponentParent {

    start () {
        super.start();
        var loadPath = "animation/effect/finalboss_shield/finalboss_shield";
        LoadMgr.Instance.LoadAssetWithType(loadPath,cc.Prefab,(asset)=>
            {
                if(this.getState() == ClientDef.COMP_STATE_REMOVE)
                {
                    return;
                }
                var aniPref = cc.instantiate(asset);
                aniPref.parent = this.getNode();
                this.getNode().zIndex = -1;
            });
    }

}
