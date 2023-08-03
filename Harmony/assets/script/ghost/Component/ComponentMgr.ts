
import EntityParent from "../EntityParent";
import ComponentSystem from "../system/ComponentSystem";

/**
 * 对象--组件管理器
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class ComponentMgr{

    _host:EntityParent;
    _entity_components:{}; //对象组件
    _delta : number;

    onLoad (host) 
    {
        this._host = host;
        this._entity_components = {};
        this._delta = cc.director.getTotalTime();
    }

    start () 
    {
    }

    restart () 
    {
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
        }
    }

    get(type)
    {
        return this._entity_components[type] || null;
    }

    add(type)
    {
        var cmpClass = ComponentSystem.componentClass[type];
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
