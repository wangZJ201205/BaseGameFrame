import ClientDef from "../../common/ClientDef";
import Entity from "../Entity";
import BloomComponent from "./children/BloomComponent";
import ClothComponent from "./children/ClothComponent";
import TitleComponent from "./children/TitleComponent";

/**
 * 对象--组件管理器
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class ComponentMgr{

    _host:Entity;
    _entity_components:{}; //对象组件


    onLoad (host) 
    {

        this._host = host;
        this._entity_components = {};

        var cloth = new ClothComponent();
        cloth.onLoad(host);
        this.addEntityComponent(ClientDef.ENTITY_COMP_CLOTH,cloth); //添加衣服组件

        var bloom = new BloomComponent();
        bloom.onLoad(host);
        this.addEntityComponent(ClientDef.ENTITY_COMP_BLOOM,bloom); //添加衣服组件

        var title = new TitleComponent();
        title.onLoad(host);
        this.addEntityComponent(ClientDef.ENTITY_COMP_TITLE,title);

    }

    start () 
    {
        this.getEntityComponent(ClientDef.ENTITY_COMP_CLOTH).start();
        this.getEntityComponent(ClientDef.ENTITY_COMP_BLOOM).start();
        this.getEntityComponent(ClientDef.ENTITY_COMP_TITLE).start();
    }

    restart () 
    {
        this.getEntityComponent(ClientDef.ENTITY_COMP_BLOOM).restart();
    }

    update (dt) 
    {
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
        }
    }

    getEntityComponent(type)
    {
        return this._entity_components[type] || null;
    }

    addEntityComponent(type,component)
    {
        this._entity_components[type] = component;
    }

    delEntityComponent(type)
    {
        if(!this._entity_components[type])
        {
            return;
        }
        var component = this._entity_components[type];
        component.remove();
        component.parent = null;
        delete this._entity_components[type];
    }



}
