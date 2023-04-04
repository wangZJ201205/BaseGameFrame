// 
// wzj
// 2023.2.23
// 游戏入口
// 加载远程分包资源
// 第一步下载必要的资源 代码，场景 登陆游戏相关资源
// 

const {ccclass, property} = cc._decorator;

@ccclass
export default class Main extends cc.Component {

    
    onLoad () 
    {
        console.info("Harmony load game base info");
    }

    start () {
        
        //加载远程文件
        let bundleRoot = [];
        bundleRoot.push('script');
        bundleRoot.push('startscene');
        bundleRoot.push('resources');

        let count = 0;

        function cb(err)
        {
            if (err) {
                return console.error(err.message, err.stack);
            }

            count++;
            console.info(cc.assetManager.bundles);
            if (count === bundleRoot.length) {
                //cc.game.run(option, onStart);
                cc.director.loadScene("startscene/game");
            }
        }

        for( let i = 0; i < bundleRoot.length ; i++)
        {
            cc.assetManager.loadBundle(bundleRoot[i], cb);
        }
        

    }

    // update (dt) {}
}
