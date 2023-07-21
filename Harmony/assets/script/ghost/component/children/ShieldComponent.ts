/**
 * 护盾组件
 */

import ClientDef from "../../../common/ClientDef";
import LoadMgr from "../../../manager/LoadMgr";
import ComponentParent from "../ComponentParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ShieldComponent extends ComponentParent {


    onLoad (host) 
    {
        super.onLoad(host);
    }

    start () {
        super.start();
        var loadPath = "animation/effect/buffing_armor/buffing_armor";
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

    restart () {
        super.restart();
    }

    remove()
    {
        super.remove();
    }


}
