// 
// wzj
// 2023.2.23
// 游戏入口


const {ccclass, property} = cc._decorator;

@ccclass
export default class Main extends cc.Component {

    loadDirs:string[];

    onLoad () 
    {
        console.info("load game base info");

        this.loadDirs = [
            "scene",
            "script",
            "test"
        ];

    }

    start () {
        console.info("start game");

        cc.loader.loadResDir(this.loadDirs[0],
            (err,assets)=>{
                
            })

    }


    


    // update (dt) {}
}
