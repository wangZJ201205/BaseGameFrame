import ClientDef from "../../common/ClientDef";
import GameData from "../../common/GameData";
import Entity from "../Entity";
import ComponentParent from "./ComponentParent";
import BloomComponent from "./children/BloomComponent";
import ClothComponent from "./children/ClothComponent";
import CollComponent from "./children/CollComponent";
import NameComponent from "./children/NameComponent";
import ShieldComponent from "./children/ShieldComponent";
import TitleComponent from "./children/TitleComponent";

/**
 * 对象--组件管理器
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class ComponentMgr{

    _host:Entity;
    _entity_components:{}; //对象组件
    _delta : number;

    static componentClass: Map<number,ComponentParent> = new Map<number,ComponentParent>();

    static init()
    {
        ComponentMgr.componentClass[ClientDef.ENTITY_COMP_CLOTH] = ClothComponent;
        ComponentMgr.componentClass[ClientDef.ENTITY_COMP_BLOOM] = BloomComponent;
        ComponentMgr.componentClass[ClientDef.ENTITY_COMP_TITLE] = TitleComponent;
        ComponentMgr.componentClass[ClientDef.ENTITY_COMP_NAME]  = NameComponent;
        ComponentMgr.componentClass[ClientDef.ENTITY_COMP_COLL]  = CollComponent;
        ComponentMgr.componentClass[ClientDef.ENTITY_COMP_SHIELD]  = ShieldComponent;
    }

    onLoad (host) 
    {
        this._host = host;
        this._entity_components = {};
        this._delta = cc.director.getTotalTime();
    }

    start () 
    {
        this.add(ClientDef.ENTITY_COMP_CLOTH);
        this.add(ClientDef.ENTITY_COMP_BLOOM);
        this.add(ClientDef.ENTITY_COMP_TITLE);
        if(GameData.IsDebug)
        {
            this.add(ClientDef.ENTITY_COMP_NAME);
        }
        if(this._host.isMonster())
        {
            this.add(ClientDef.ENTITY_COMP_COLL);   
        }
    }

    restart () 
    {
        this.get(ClientDef.ENTITY_COMP_BLOOM).restart();
    }

    update (dt) 
    {
        this._delta = cc.director.getTotalTime();

        for (const key in this._entity_components) {
            const element = this._entity_components[key];
            element.update(dt);
        }
    }

    remove()
    {
        for (const key in this._entity_components) {
            const element = this._entity_components[key];
            element.remove();
            element.getNode().parent = null;
        }
    }

    get(type)
    {
        return this._entity_components[type] || null;
    }

    add(type)
    {
        var cmpClass = ComponentMgr.componentClass[type];
        var cmp = new cmpClass();
        cmp.onLoad(this._host);
        cmp.start();
        this._entity_components[type] = cmp;
    }

    del(type)
    {
        if(!this._entity_components[type])
        {
            return;
        }
        var component = this._entity_components[type];
        component.remove();
        component.getNode().parent = null;
        delete this._entity_components[type];
    }



}
