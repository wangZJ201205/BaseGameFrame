/**
 * 衣服类组件
 */

import ClientDef from "../../common/ClientDef";
import LoadMgr from "../../manager/LoadMgr";
import ComponentParent from "./ComponentParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ClothComponent extends ComponentParent {

    _curState : number;


    onLoad (host) 
    {    
        super.onLoad(host);
    }

    start () {
        this._curState = 0;
        super.start();
    }

    remove(): void {
        super.remove();
    }

    update (dt) 
    {
    }

    //运行状态
    runState(state)
    {
        if(state == this._curState)
        {
            return;
        }

        if( state == ClientDef.ENTITY_STATE_IDLE )
        {
            
            LoadMgr.Instance.LoadAsset("animation/1001/1001_idle",(asset)=>
            {
                var uiPref = cc.instantiate(asset);
                uiPref.parent = this._host.getEntityNode();
                for (let index = 1; index <= uiPref.childrenCount; index++) {
                    const element = uiPref.getChildByName(index+"");
                    element.active = false;
                }
                uiPref.getChildByName("5").active = true;
                // var ac = uiPref.getComponent(cc.Animation);
                // ac.defaultClip.speed = 0.3;
                // console.info("1");
            })
        }

        
    }

}
