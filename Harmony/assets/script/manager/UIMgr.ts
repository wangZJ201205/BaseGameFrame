/**
 * 界面管理类
 */
import ClientDef from "../common/ClientDef";
import GameData from "../common/GameData";
import { UIName } from "../common/UIName";
import UIConfig from "../config/UIConfig";
import LoadMgr from "./LoadMgr";
import ParentMgr from "./ParentMgr";

const {ccclass, property} = cc._decorator;

export enum UIState
{
    Loading, //加载状态
    Open,    //运行状态
    Hide,    //隐藏状态
    Close,   //关闭等待回收状态
}

@ccclass
export default class UIMgr extends ParentMgr {
    public static readonly Instance : UIMgr = new UIMgr();


    uiLayer: cc.Node = null; //ui显示层
    uiList:Array<any>;

    onLoad () 
    {
        super.onLoad();
        this.uiList = [];
    }

    start () 
    {
        var canvas = cc.director.getScene().getChildByName('Canvas');
        this.uiLayer = new cc.Node();
        this.uiLayer.zIndex = ClientDef.GAME_INDEX_UI;
        this.uiLayer.width = cc.winSize.width;
        this.uiLayer.height = cc.winSize.height;
        this.uiLayer.parent = canvas;
        this.uiLayer.group = "ui";

        this.uiLayer.runAction(cc.repeatForever(cc.sequence(cc.delayTime(1),cc.callFunc(this.update, this))));
    }

    update (dt) 
    {
        this.uiList = this.uiList.filter((ui)=>
        {
            if(ui.state == UIState.Close)
            {
                ui.uiContainer.parent = null;
                return false;
            }
            return true;
        });
        console.info(">>>>>>ui lenght : " + this.uiList.length);
    }

    register()
    {
        // EventMgr.Instance.On(EventName.UI_OPEN_PANEL,this.openUI,this);//打开界面
    }

    openUI(uiname:UIName)
    {   
        var uiConfig = UIConfig.getUIPath(uiname);

        if(!uiConfig)
        {
            console.error('没有注册此界面资源路径' + uiname + ',先去UIConfig中写入界面路径！');
            return;
        }

        if( GameData.IsDebug )
        {
            console.info(">>>>>>open uiname:" + uiname+" | uipath:"+uiConfig.path);
        }
        
        for (let index = 0; index < this.uiList.length; index++) 
        {
            const uiInfo = this.uiList[index];
            if(uiname == uiInfo.name && (uiInfo.state == UIState.Loading || uiInfo.state == UIState.Open))
            {
                console.info(">>>有该对象! = "+ uiname);
                return;
            }
        }

        this.addUI(uiname, UIState.Loading);
        
        LoadMgr.Instance.LoadAsset(uiConfig.path,(prefab)=>{
            console.info("资源加载完成！" + uiname);
            
            var uiPref = cc.instantiate(prefab);
            uiPref.parent = this.uiLayer;
            uiPref.zIndex = uiConfig.index + this.uiLayer.childrenCount; //界面深度 配置的深度值+ 当前显示界面的数量
            
            for (let index = 0; index < this.uiList.length; index++) 
            {
                const uiInfo = this.uiList[index];
                if(uiname == uiInfo.name && uiInfo.state == UIState.Loading )
                {
                    uiInfo.uiContainer = uiPref;
                    uiInfo.state = UIState.Open;
                    break;
                }
            }
        });
    }

    closeUI(uiname)
    {
        for (let index = 0; index < this.uiList.length; index++) 
        {
            const uiInfo = this.uiList[index];
            if(uiname == uiInfo.name && uiInfo.state == UIState.Open)
            {
                uiInfo.uiContainer.active = false;
                uiInfo.state = UIState.Close;
                var script = uiInfo.uiContainer.getComponent('UIParent');
                script!.close();
                break;
            }
        }
    }

    /**
     * 添加界面
     * @param uiName 界面名字 
     * @param state 状态
     */
    addUI(uiName,state)
    {
        this.uiList.push({name:uiName,state:state});
    }

    getUI(uiName)
    {
        var ui = null;
        for (let index = 0; index < this.uiList.length; index++) 
        {
            const uiInfo = this.uiList[index];
            if(uiName == uiInfo.name)
            {
                ui = uiInfo;
                break;
            }
        }
        return ui;
    }

    /**
     * 获取界面状态
     * @param uiname 
     * @returns 
     */
    getUIState(uiname)
    {
        var ui = this.getUI(uiname);
        if(!ui)
        {
            return UIState.Close;
        }
        return ui.state;
    }

}
