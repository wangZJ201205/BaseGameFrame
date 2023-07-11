

import ClientDef from "../../../common/ClientDef";
import LoadMgr from "../../../manager/LoadMgr";
import ComponentParent from "../ComponentParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NameComponent extends ComponentParent {

    
    start () {

        super.start();
        var entityInfo = this.getHost().getEntityDict();
        let label = this._node.addComponent(cc.Label);
        label.fontSize = 15;
        label.string = entityInfo.name +"["+entityInfo.id+"]";
        
    }


}
