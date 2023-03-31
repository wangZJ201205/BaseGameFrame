
//网络管理器
const {ccclass, property} = cc._decorator;


@ccclass
export default class NetMgr extends cc.Component {

    static Instance : NetMgr;

    static getInstance()
    {   
        let mgr : NetMgr = NetMgr.Instance;
        if( !NetMgr.Instance )
        {
            mgr = new NetMgr();
        }
        console.info("getInstance NetMgr");
        return mgr;
    }

    socket : Socket = null;

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
        let opts = {
            'reconnection':false,
            'force new connection': true,
            'transports':['websocket', 'polling']
        }
        this.socket = io.connect('http://localhost:9000',opts);
        
        this.socket.on('connect',(data)=>{
            console.info("连接成功");
        });

        this.socket.on('disconnect',(data)=>{
            console.log("disconnect");
            // this.connected = false;
        }); 

    }

    // update (dt) {}
}
