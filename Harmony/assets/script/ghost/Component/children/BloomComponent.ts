import ClientDef from "../../../common/ClientDef";
import GameData from "../../../common/GameData";
import LabelMgr from "../../../manager/LabelMgr";
import LoadMgr from "../../../manager/LoadMgr";
import ComponentParent from "../ComponentParent";


/**
 * 血条
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class BloomComponent extends ComponentParent {

    bloomLab : cc.Label;
    _delay:number;
    onLoad (host) 
    {    
        this._delay = 10000;
        super.onLoad(host);
        // this._host = host;
        // this._node = new cc.Node();
        // var y = Math.random()* GameData.App_Game_Heigth ;
        // this._node.setPosition(Math.random()*GameData.App_Game_Width  - GameData.App_Game_Width/2, y- GameData.App_Game_Heigth/2)
        // LabelMgr.Instance.getLayer().addChild(this._node);
    }

    start () {
        super.start();

    }

    remove(): void {
        super.remove();
    }

    update (dt) 
    {
        // this._delay ++;
        // if(this._delay <= 500)
        // {
        //     return; 
        // }
        // this._delay = 0;
        
    }

    addDamage()
    {
        var y = Math.random()* GameData.App_Game_Heigth ;
        LabelMgr.Instance.addLabel(Math.floor(Math.random()*5),Math.floor(y),this._host.getPosition());
    }
}
