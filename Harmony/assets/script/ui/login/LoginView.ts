import Definition from "../../common/Definition";
import EventName from "../../common/EventName";
import GameData from "../../common/GameData";
import MessageName from "../../common/MessageDefine";
import UIName from "../../common/UIName";
import EventMgr from "../../manager/EventMgr";
import NetMgr from "../../manager/NetMgr";
import SceneMgr from "../../manager/SceneMgr";
import UIMgr from "../../manager/UIMgr";
import UIParent from "../UIParent";


const {ccclass, property} = cc._decorator;

@ccclass
export default class LoginView extends UIParent {

    @property(cc.EditBox)
    accountEB: cc.EditBox = null;

    @property(cc.EditBox)
    passwordEB: cc.EditBox = null;

    @property(cc.Button)
    startButton: cc.Button = null;
 
    onLoad () 
    {
        this.setUIName(UIName.LOGIN);
        super.onLoad();
    }

    start () 
    {
        this.accountEB.string = cc.sys.localStorage.getItem("user_name") || "";
        this.passwordEB.string = cc.sys.localStorage.getItem("user_password") || "";
        super.start();
    }

    register(): void 
    {
        this.startButton.node.on(cc.Node.EventType.TOUCH_END,this.openGame,this); //添加监听
        EventMgr.Instance.On(MessageName.LOGIN_CHECK_PLAYER_RESPONSE,this.loginCheck,this);
        super.register();
    }

    openGame(event,param)
    {
        var msg = {};
        msg['accountId'] = this.accountEB.string;
        msg['password'] = this.passwordEB.string;
        NetMgr.Instance.send(MessageName.LOGIN_CHECK_PLAYER,msg);
        
        //存储
        cc.sys.localStorage.setItem('user_name', this.accountEB.string);
        cc.sys.localStorage.setItem('user_password', this.passwordEB.string);

        // EventMgr.Instance.Emit(EventName.UI_CLOSE_PANEL + this.getUIName(),null);
    }

    close()
    {
        EventMgr.Instance.Off(MessageName.LOGIN_CHECK_PLAYER_RESPONSE,this.loginCheck,this);
        super.close();
    }

    loginCheck(data)
    {
        //进入游戏
        if( data.error != Definition.ERROR_CODE_SUCCESS)
        {
            EventMgr.Instance.Emit(EventName.EVENT_MSGBOX_ERROR,{error:data.error});
            return;
        }
        
        SceneMgr.Instance.enterScene(GameData.Map_Current_Id);
        EventMgr.Instance.Emit(EventName.UI_CLOSE_PANEL + this.getUIName(),null);
    }

}
