
/**
模板类
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
        this.setUIName(UIName.LOGIN));
        super.onLoad();
    }

    start () 
    {
        
    }

    register(): void 
    {
        this.startButton.node.on(cc.Node.EventType.TOUCH_END,this.openGame,this); //添加监听

        super.register();
    }

    openGame(event,param)
    {
        EventMgr.Instance.Emit(EventName.UI_CLOSE_PANEL + this.getUIName(),null);
    }

    close()
    {
        super.close();
    }

    // update (dt) {}
}
*/