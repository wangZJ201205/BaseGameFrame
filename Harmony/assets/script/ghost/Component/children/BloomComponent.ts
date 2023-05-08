import ClientDef from "../../../common/ClientDef";
import LabelMgr from "../../../manager/LabelMgr";
import ComponentParent from "../ComponentParent";


/**
 * 血条
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class BloomComponent extends ComponentParent {

    bloomLab : cc.Label;
    _curBloom:number;
    onLoad (host) 
    {    
        super.onLoad(host);
    }

    start () {
        super.start();

        var entityInfo = this.getHost().getEntityDict();
        this._curBloom = entityInfo["bloom"];
    }

    remove(): void {
        super.remove();
    }

    update (dt) 
    {
        //检测死亡
        if( this._curBloom <= 0 )
        {
            this.getHost().active = false;
            this.getHost().setClientProp(ClientDef.ENTITY_PROP_ACTIVE_STATE, ClientDef.ENTITY_ACTIVE_STATE_FREE);
        }
        
    }


    addDamage(damageValue)
    {
        if( this._curBloom <= 0 )
        {
            return;
        }
        //伤害弹跳
        var showDamageValue = this._curBloom > damageValue ? damageValue : this._curBloom;
        var type = Math.floor(Math.random()*5)+1;
        LabelMgr.Instance.addLabel(type,showDamageValue,this._host.getPosition());

        this._curBloom -= damageValue;
    }


}
