/**
 * 人物组件父类
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class ComponentParent{

    node:cc.Component;

    onLoad (parent) 
    {
        this.start();
    }

    start () {

    }

    remove()
    {

    }

    // update (dt) {}
}
