import Entity from "../Entity";

/**
 * 人物组件父类
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class ComponentParent{

    _host:Entity;

    onLoad (host) 
    {
        this._host = host;
        this.start();
    }

    start () {

    }

    remove()
    {

    }

    update (dt) 
    {

    }
}
