
const {ccclass, property} = cc._decorator;

@ccclass
export default class ParentMgr extends cc.Component {

    onLoad () 
    {
        this.register();
    }

    start () {

    }

    // update (dt) {}

    register(){}


}
