import GameData from "../common/GameData";
import MessageName from "../common/MessageDefine";
import ParentMgr from "./ParentMgr";


//网络管理器
const {ccclass, property} = cc._decorator;


@ccclass
export default class NetMgr extends ParentMgr {

    public static readonly Instance : NetMgr = new NetMgr();

    private socket : Socket = null;
    private connectState : boolean = false; //连接状态
    private isPinging:boolean = false;
    private lastRecieveTime : number = 0;
    private delayMS : number = 0;
    private lastSendTime:number = 0;
    private delayTime : number = 0;

    start () {

        //测试
        //这个是不允许跨域调用
        // let url = "http://api.douban.com/v2/movie/top250?start=25&count=25";

        // //请求
        // let request = cc.loader.getXMLHttpRequest();
        // request.open("GET","http://localhost:9000",true); //异步
        // request.onreadystatechange = ()=>{
        //     //请求状态改变
        //     //请求结束后，获取信息
        //     if(request.readyState == 4 && request.status == 200)
        //     {
        //         console.info("请求完成");
        //         console.info(request.responseText);
        //     }
        // };
        // request.send();

        this.delayTime = 0;
        let opts = {
            'reconnection':false,
            'force new connection': true,
            'transports':['websocket', 'polling']
        }
        this.socket = io.connect(GameData.IpPort, opts);
            
        this.socket.on(MessageName.BUILD_CONNECTION, (data)=>{
            console.info(data);
            this.connectState = true;
            this.startHearBeat();
        });
    
        this.socket.on(MessageName.DISCONNECTION, (data)=>{
            console.log("disconnect");
            this.connectState = false;
        }); 

    }

    //启动心跳
    startHearBeat(){
        this.socket.on(MessageName.PONG,()=>{
            this.lastRecieveTime = Date.now();
            this.delayMS = this.lastRecieveTime - this.lastSendTime;
        });

        this.lastRecieveTime = Date.now();

        if(!this.isPinging){
            this.isPinging = true;
            cc.game.on(cc.game.EVENT_HIDE,()=>{   
                this.ping();
            });
            setInterval(()=>{
                if(this.socket){
                    this.ping();          
                }
            },2000);
            setInterval(()=>{
                if(this.socket){
                    if(Date.now() - this.lastRecieveTime > 10000){
                        this.close();
                    } 
                }
            },500);
        }   
    }

    /** 
     * ping
    */
    ping(){
        if(this.socket){
            this.lastSendTime = Date.now();
            this.socket.emit(MessageName.PING,{});
        }
    }

    /** 
     * 关闭
    */
    close(){
        console.log('close');
        this.delayMS = 0;
        if(this.socket && this.connectState){
            this.connectState = false;
            this.socket.disconnect();
        }
        this.socket = null;
    }

    /**
     * 心跳
     */
    update (dt) {
        if(!this.connectState)
        {
            this.delayTime += dt;
        }
        if(!this.connectState && this.delayTime > 5) //在断开连接的情况下，每5秒检查一次连接情况
        {
            this.start();
        }
    }

    /**
     * 发送消息
     * @param socketName 消息名
     * @param data 数据
     */
    send(socketName,data)
    {
        if(this.socket)
        {
            this.socket.emit(socketName, data);
        }
    }

    /**
     * 注册监听事件
     * @param socketName 
     * @param callBack 
     * @returns 
     */
    on(socketName,callBack)
    {
        if(!this.socket){
            return;
        }
        this.socket.on(socketName,callBack);
    }

    /**
     * 移除监听事件
     * @param socketName 
     * @param callBack 
     * @returns 
     */
    off(socketName,callBack)
    {
        if(!this.socket){
            return;
        }
        this.socket.off(socketName,callBack);
    }
}
