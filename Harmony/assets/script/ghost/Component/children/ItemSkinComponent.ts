

import ClientDef from "../../../common/ClientDef";
import LoadMgr from "../../../manager/LoadMgr";
import ComponentParent from "../ComponentParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ItemSkinComponent extends ComponentParent {

    
    start () 
    {

        var entityInfo = this.getHost().getEntityDict();
        var loadPath = "item/itemsAlas" ;
        LoadMgr.Instance.LoadAsset(loadPath,(asset)=>
            {
                if(this.getState() == ClientDef.COMP_STATE_REMOVE)
                {
                    return;
                }
                let sprite = this.getNode().addComponent(cc.Sprite);
                let spriteFrame = asset.getSpriteFrame('i_b__053');
                sprite.spriteFrame = spriteFrame;
            });

    }

    // update (dt) {}
}
