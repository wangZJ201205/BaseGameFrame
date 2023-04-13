
/**
 * 消息配置
 */

import MessageName from "../common/MessageDefine";
import EventMgr from "../manager/EventMgr";
import NetMgr from "../manager/NetMgr";


export default class SocketRegister{

    private static readonly RegisterMessageAccordingToTheEndingText : [string] = ['RESPONSE']; //根据结尾文字注册消息

    static start()
    {
        for (const key in MessageName) {
            var messageNames = key.split("_");
            for (let i = 0; i < this.RegisterMessageAccordingToTheEndingText.length; i++) {
                const element = this.RegisterMessageAccordingToTheEndingText[i];
                if(element == messageNames[messageNames.length-1])
                {
                    NetMgr.Instance.on(key,this.registerSocket);
                }
            }
        }
    }

    private static registerSocket(msg): void 
    {
        EventMgr.Instance.Emit(msg.socketName,msg);
    }

    
}
