import ClientDef from "../../../common/ClientDef";
import GameData from "../../../common/GameData";
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
    private _height : number = 50;
    onLoad (host) 
    {
        this._state = ClientDef.COMP_STATE_LOAD;
        this._host = host;
        this._node = new cc.Node();
        HeadEffectMgr.Instance.addHeadEffect(this._node);
    }

    start () {
        super.start();
        
        this.adjustHeight();

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

    adjustHeight()
    {
        var entityInfo = this._host.getEntityDict();
        if( entityInfo.collision == 1 )
        {
            var size:string = entityInfo.collRect;
            var collSize:string[] = size.split(",");
            this._height = Number(collSize[1]);
            this._height += Number(collSize[2]);
        }
        else if(entityInfo.collision == 2)
        {
            var size:string = entityInfo.collRect;
            var collSize:string[] = size.split(",");
            this._height = Number(collSize[3])/2;
        }
    }

    remove()
    {
        this._node.removeFromParent();
        super.remove();
    }

    update (dt) 
    {        
        this._node.setPosition(-10 + this._host.position.x, this._height + this._host.position.y, 0);

        if(this._curBloom <= 0 && this._host.getClientProp(ClientDef.ENTITY_PROP_CUR_BLOOM) > 0) //判断复活
        {
            this._curBloom = this._host.getClientProp(ClientDef.ENTITY_PROP_CUR_BLOOM);
            this._node.active = true;
            var per = this._curBloom / this._maxBloom;
            this._green_bar.node.scaleX = per > 0 ? per : 0;
        }
    }

    addDamage(damageValue)
    {
        if( this._curBloom <= 0 )
        {
            return;
        }

        if(this.getHost().getClientProp(ClientDef.ENTITY_PROP_STATE_SHAPESHIFT) == 1)
        {
            return;
        }

        //伤害弹跳
        var showDamageValue = this._curBloom > damageValue ? damageValue : this._curBloom;
        HeadEffectMgr.Instance.addDamageTips(1,showDamageValue,this._host.getPosition());

        var entityInfo = this.getHost().getEntityDict();
        HeadEffectMgr.Instance.addBloomEffect(1, entityInfo["bloomEffect"] ,this._host.getPosition());
        // var type = 1;
        // LabelMgr.Instance.addLabel(type,showDamageValue,this._host.getPosition());

        this._curBloom -= damageValue;
        this._host.setClientProp(ClientDef.ENTITY_PROP_CUR_BLOOM, this._curBloom);

        if(this._green_bar)
        {
            var per = this._curBloom / this._maxBloom;
            this._green_bar.node.scaleX = per > 0 ? per : 0;
        }
        
        //进入死亡状态
        if( this._curBloom <= 0 )
        {
            this.checkShapeShift();
        }
    }

    //检测变身状态
    checkShapeShift()
    {
        var entityInfo = this.getHost().getEntityDict();
        let shapeShift = entityInfo["shapeshift"];
        if(shapeShift > 0)
        {
            if(this.getHost().getClientProp(ClientDef.ENTITY_PROP_STATE_SHAPESHIFT) == 2)
            {
                this._host.addEntityState(ClientDef.ENTITY_STATE_DIE);
                this._host.refreshEntityState();
                this._node.active = false;
                GameData.Kill_Monster_Count ++;
            }
            else
            {
                this.restart();
                this._host.addEntityState(ClientDef.ENTITY_STATE_SHAPESHIFT);
                this._host.refreshEntityState();
            }
        }
        else
        {
            this._host.addEntityState(ClientDef.ENTITY_STATE_DIE);
            this._host.refreshEntityState();
            this._node.active = false;
            GameData.Kill_Monster_Count ++;
        }
    }

    

}
