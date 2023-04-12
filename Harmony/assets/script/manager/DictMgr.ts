/**
 * 配置管理器
 */

import EventName from "../common/EventName";
import GameData from "../common/GameData";
import DictConfig from "../config/DictConfig";
import EventMgr from "./EventMgr";
import LoadMgr from "./LoadMgr";
import ParentMgr from "./ParentMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class DictMgr extends ParentMgr {

    public static readonly Instance : DictMgr = new DictMgr();

    private dicts:{};

    onLoad () 
    {
        this.dicts = {};
        GameData.NeedWaitModules++;
    }

    start () {
        var dicts = DictConfig.getDict();
        var currentPgb = 0;
        for (let i = 0; i < dicts.length; i++) {
            LoadMgr.Instance.LoadAsset(dicts[i].path,(asset)=>{
                if (asset instanceof cc.JsonAsset) {
                    this.dicts[asset.name] = asset.json;
                }
                currentPgb++;
                console.info("current load dict pgb : " + currentPgb + " / " + dicts.length);

                if( currentPgb == dicts.length )
                {
                    EventMgr.Instance.Emit(EventName.EVENT_LOADED_MODULE,{name:"DictMgr"});
                }
            });
        }
    }

    getDictByName(dictName)
    {
        if(!this.dicts[dictName])
        {
            return null;
        }
        return this.dicts[dictName];
    }

}
