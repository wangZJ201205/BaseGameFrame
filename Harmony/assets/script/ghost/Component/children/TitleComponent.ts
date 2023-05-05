

import ClientDef from "../../../common/ClientDef";
import LoadMgr from "../../../manager/LoadMgr";
import ComponentParent from "../ComponentParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TitleComponent extends ComponentParent {

    

    onLoad (host) 
    {
        super.onLoad(host);
    }

    start () {

       
        var loadPath = "animation/title1/titleAnim";
        LoadMgr.Instance.LoadAsset(loadPath,(asset)=>
            {
                if(this.getState() == ClientDef.COMP_STATE_REMOVE)
                {
                    return;
                }
                var aniPref = cc.instantiate(asset);
                aniPref.parent = this.getNode();
                aniPref.active = false;
            });

    }

    // update (dt) {}
}
