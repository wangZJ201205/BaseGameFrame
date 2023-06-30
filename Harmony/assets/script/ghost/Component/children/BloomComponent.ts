import ClientDef from "../../../common/ClientDef";
import HeadEffectMgr from "../../../manager/HeadEffectMgr";
import LabelMgr from "../../../manager/LabelMgr";
import LoadMgr from "../../../manager/LoadMgr";
import ComponentParent from "../ComponentParent";


/**
 * 血条
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class BloomComponent extends ComponentParent {

    private _curBloom:number;
    private _green_bar:cc.Sprite;
    private _red_bar:cc.Sprite;
    private _maxBloom : number;
    onLoad (host) 
    {
        this._state = ClientDef.COMP_STATE_LOAD;
        this._host = host;
        this._node = new cc.Node();
        HeadEffectMgr.Instance.addHeadEffect(this._node);
    }

    start () {
        super.start();
        
        const loadPath = "headEffect/headEffect" ;
        LoadMgr.Instance.LoadAsset(loadPath,(asset)=>
            {
                if(this.getState() == ClientDef.COMP_STATE_REMOVE)
                {
                    return;
                }
                
                var rednode = new cc.Node()
                this._red_bar = rednode.addComponent(cc.Sprite);
                let spriteFrame1 = asset.getSpriteFrame("lifebar_bg_small");
                this._red_bar.spriteFrame = spriteFrame1;
                rednode.setAnchorPoint(0,0.5);
                this._node.addChild(rednode);

                var node = new cc.Node()
                this._green_bar = node.addComponent(cc.Sprite);
                let spriteFrame = asset.getSpriteFrame("lifebar_small");
                this._green_bar.spriteFrame = spriteFrame;
                node.setAnchorPoint(0,0.5);
                this._node.addChild(node);
            });
            
    }
   
    restart () {
        super.restart();
        this._node.active = true;
        
        var entityInfo = this.getHost().getEntityDict();
        this._curBloom = entityInfo["bloom"];
        this._maxBloom = entityInfo["bloom"];
        this._host.setClientProp(ClientDef.ENTITY_PROP_CUR_BLOOM, this._curBloom);
        if(this._green_bar){
            this._green_bar.node.scaleX = 1;
        }

    }

    remove()
    {
        this._node.removeFromParent();
        super.remove();
    }

    update (dt) 
    {        
        this._node.setPosition(-10 + this._host.position.x ,50 + this._host.position.y,0);
        this._curBloom = this._host.getClientProp(ClientDef.ENTITY_PROP_CUR_BLOOM);
    }

    addDamage(damageValue)
    {
        if( this._curBloom <= 0 )
        {
            return;
        }

        //伤害弹跳
        var showDamageValue = this._curBloom > damageValue ? damageValue : this._curBloom;
        HeadEffectMgr.Instance.addDamageTips(1,showDamageValue,this._host.getPosition());
        // var type = 1;
        // LabelMgr.Instance.addLabel(type,showDamageValue,this._host.getPosition());

        this._curBloom -= damageValue;
        this._host.setClientProp(ClientDef.ENTITY_PROP_CUR_BLOOM, this._curBloom);

        var per = this._curBloom / this._maxBloom;
        this._green_bar.node.scaleX = per > 0 ? per : 0;

        //进入死亡状态
        if( this._curBloom <= 0 )
        {
            this._host.addEntityState(ClientDef.ENTITY_STATE_DIE);
            this._host.refreshEntityState();
            this._node.active = false;
        }
        else
        {
            this.shakeBody();
        }
    }

    //添加抖动效果
    shakeBody()
    {
        if(this._curBloom <= 0 )
        {
            return;
        }
        cc.tween(this._host)
        .to(0.05, { position: cc.v3(this._host.position.x - 5, this._host.position.y) })
        .to(0.05, { position: cc.v3(this._host.position.x + 5, this._host.position.y) })
        .to(0.05, { position: cc.v3(this._host.position.x - 5, this._host.position.y) })
        .to(0.05, { position: cc.v3(this._host.position.x + 5, this._host.position.y) })
        .to(0.05, { position: cc.v3(this._host.position.x - 5, this._host.position.y) })
        .to(0.05, { position: cc.v3(this._host.position.x + 5, this._host.position.y) })
        .to(0.05, { position: cc.v3(this._host.position.x - 5, this._host.position.y) })
        .to(0.05, { position: cc.v3(this._host.position.x,     this._host.position.y) })
        .start();
    }

}
