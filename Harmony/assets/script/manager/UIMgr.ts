/**
 * 界面管理类
 */
import EventName from "../common/EventName";
import GameData from "../common/GameData";
import UIConfig from "../config/UIConfig";
import EventMgr from "./EventMgr";
import LoadMgr from "./LoadMgr";
import ParentMgr from "./ParentMgr";

const {ccclass, property} = cc._decorator;

enum UIState
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
    uiList:Map<string,{}>;

    onLoad () 
    {
        super.onLoad();
        this.uiList = new Map();
    }

    start () 
    {
        var canvas = cc.director.getScene().getChildByName('Canvas');
        this.uiLayer = new cc.Node();
        this.uiLayer.zIndex = 999;
        this.uiLayer.width = cc.winSize.width;
        this.uiLayer.height = cc.winSize.height;
        this.uiLayer.parent = canvas;

        this.uiLayer.runAction(cc.repeatForever(cc.sequence(cc.delayTime(1),cc.callFunc(this.update, this))));
    }

    update (dt) 
    {
        for (const key in this.uiList) {
            if (Object.prototype.hasOwnProperty.call(this.uiList, key)) {
                const element = this.uiList[key];
                if(element.state == UIState.Close)
                {
                    element.uiContainer.parent = null;
                    delete this.uiList[key];
                    return;
                }
            }
        }
    }

    register()
    {
        // EventMgr.Instance.On(EventName.UI_OPEN_PANEL,this.openUI,this);//打开界面
    }

    openUI(uiname)
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
        
        var uiInf = this.getUI(uiname);

        if( uiInf )
        {
            if(uiInf.state == UIState.Close)
            {
                uiInf.uiContainer.parent = this.uiLayer; //重新打开
                uiInf.state = UIState.Open;
            }
            else{
                console.info(">>>有该对象! = "+ uiname);
            }
            return;
        }

        this.addUI(uiname, UIState.Loading);
        
        LoadMgr.Instance.LoadAsset(uiConfig.path,(prefab)=>{
            console.info("资源加载完成！" + uiname);
            
            var uiPref = cc.instantiate(prefab);
            uiPref.parent = this.uiLayer;
            uiPref.zIndex = uiConfig.index + this.uiLayer.childrenCount; //界面深度 配置的深度值+ 当前显示界面的数量
            
            var uiInf = this.getUI(uiname);
            if( uiInf ){
                uiInf.uiContainer = uiPref;
                uiInf.state = UIState.Open;
            }
        });
    }

    closeUI(uiname)
    {
        var uiInf = this.getUI(uiname);
        if(!uiInf)
        {
            return;
        }
        uiInf.state = UIState.Close;
    }

    /**
     * 添加界面
     * @param uiName 界面名字 
     * @param state 状态
     */
    addUI(uiName,state)
    {
        this.uiList[uiName] = {name:uiName,state:state};
        
    }

    getUI(uiName)
    {
        return this.uiList[uiName] || null;
    }

    /**
     * 获取界面状态
     * @param uiname 
     * @returns 
     */
    getUIState(uiname)
    {
        if(!this.getUI(uiname))
        {
            return UIState.Close;
        }
        return this.getUI(uiname).state;
    }

}
