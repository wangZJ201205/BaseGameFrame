import GameData from "../../common/GameData";
import LabelMgr from "../../manager/LabelMgr";
import LoadMgr from "../../manager/LoadMgr";
import ComponentParent from "./ComponentParent";

/**
 * 血条
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class BloomComponent extends ComponentParent {

    bloomLab : cc.Label;
   
    onLoad (host) 
    {    
        // super.onLoad(host);
        this._host = host;
        this._node = new cc.Node();
        var y = Math.random()* GameData.App_Game_Heigth ;
        this._node.setPosition(Math.random()*GameData.App_Game_Width  - GameData.App_Game_Width/2, y- GameData.App_Game_Heigth/2)
        LabelMgr.Instance.getLayer().addChild(this._node);
    }

    start () {
        super.start();

        // var node = new cc.Node();
        // var bloomLab1 = node.addComponent(cc.Label);
        // bloomLab1.string = "1354646";
        // bloomLab1.cacheMode = cc.Label.CacheMode.CHAR;
        // var y = Math.random()* GameData.App_Game_Heigth ;
        // node.setPosition(Math.random()*GameData.App_Game_Width  - GameData.App_Game_Width/2, y- GameData.App_Game_Heigth/2)
        // LabelMgr.Instance.getLayer().addChild(node);

        LoadMgr.Instance.LoadAssetWithType('fonts/bifen',cc.BitmapFont,(font)=>{
            this.bloomLab = this.getNode().addComponent(cc.Label);
            this.bloomLab.font = font;
            this.bloomLab.string = "120120";
            this.bloomLab.cacheMode = cc.Label.CacheMode.CHAR;
        })

    }

    remove(): void {
        super.remove();
    }

    update (dt) 
    {
        // var y = Math.floor(Math.random()* 120) ;
        // this.bloomLab.string = y+"120";
    }
}
