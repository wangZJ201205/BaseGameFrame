import ClientDef from "../../common/ClientDef";
import Entity from "../Entity";
import BloomComponent from "./children/BloomComponent";
import ClothComponent from "./children/ClothComponent";
import CollComponent from "./children/CollComponent";
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

    onLoad (host) 
    {

        this._host = host;
        this._entity_components = {};
        this._delta = cc.director.getTotalTime();

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
        this.addCollision();
    }

    restart () 
    {
        this.getEntityComponent(ClientDef.ENTITY_COMP_BLOOM).restart();
    }

    update (dt) 
    {
        // var delta = cc.director.getTotalTime() - this._delta;
        // if( delta < 500 ) //组件更新时间限制
        // {
        //     return;
        // }

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
        }
    }

    //添加碰撞
    addCollision()
    {
        var coll = null;
        if(this._host.isMonster())
        {
            coll = new CollComponent();
        }
        if(coll)
        {
            coll.onLoad(this._host);
            this.addEntityComponent(ClientDef.ENTITY_COMP_COLL,coll);
            coll.start();
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
