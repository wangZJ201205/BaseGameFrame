import ClientDef from "../../../common/ClientDef";
import GhostMgr from "../../../manager/GhostMgr";
// import GhostMgr from "../../../manager/GhostMgr";
import ItemMgr from "../../../manager/ItemMgr";
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

    start () {
        super.start();
        if(this._host.getClientProp(ClientDef.ENTITY_PROP_TYPE) == ClientDef.ENTITY_TYPE_PLAYER)
        {
            this.bloomLab = this._host.addComponent(cc.Label);
            this.bloomLab.string = "100/100";
        }
    }
   
    restart () {
        super.restart();

        var entityInfo = this.getHost().getEntityDict();
        this._curBloom = entityInfo["bloom"];
        if(this.bloomLab)
        {
            this.bloomLab.string = this._curBloom + "/" + this._curBloom;
        }
    }

    update (dt) 
    {
        //检测死亡
        if( this._curBloom <= 0 )
        {
            this.dropItem();
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

    //掉落物品
    dropItem()
    {
        var entityInfo = this.getHost().getEntityDict();
        var dropItem = entityInfo['dropItem'];
        if( dropItem == null )
        {
            return;
        }

        var item = ItemMgr.Instance.spawnItem(Number(dropItem));
        item.restart();
        item.getEntityNode().setPosition(this.getHost().getEntityNode().position);
        GhostMgr.Instance.setEntityZOrder(item.getEntityNode());
    }


}
