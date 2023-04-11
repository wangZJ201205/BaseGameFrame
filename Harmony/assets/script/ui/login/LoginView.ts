import EventName from "../../common/EventName";
import MessageName from "../../common/MessageDefine";
import EventMgr from "../../manager/EventMgr";
import NetMgr from "../../manager/NetMgr";
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
        this.setUIName(EventName.UI_LOGIN);
        super.onLoad();
    }

    start () 
    {
        this.accountEB.string = cc.sys.localStorage.getItem("user_name") || "";
        this.passwordEB.string = cc.sys.localStorage.getItem("user_password") || "";
    }

    register(): void 
    {
        this.startButton.node.on(cc.Node.EventType.TOUCH_END,this.openGame,this); //添加监听
        NetMgr.Instance.on(MessageName.LOGIN_CHECK_PLAYER,this.loginCheck);
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
        NetMgr.Instance.off(MessageName.LOGIN_CHECK_PLAYER,this.loginCheck);
        super.close();
    }

    loginCheck(data)
    {

    }

}
