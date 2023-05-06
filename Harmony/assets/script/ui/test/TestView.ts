

import CommonGamePlay from "../../gameplay/CommonGamePlay";
import GhostMgr from "../../manager/GhostMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TestView extends cc.Component {

    @property(cc.Label)
    entityCountLab: cc.Label = null;

    // onLoad () {}

    start () {
        
    }

    update (dt) 
    {
        this.entityCountLab.string = GhostMgr.Instance.entitys.length + "";
    }
}
