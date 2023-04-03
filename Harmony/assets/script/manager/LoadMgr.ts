import ParentMgr from "./ParentMgr";

/**
 * 加载管理器
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class LoadMgr extends ParentMgr {

    public static readonly Instance : LoadMgr = new LoadMgr();

    
    /*====================================================================================================*/
    /**
     * 异步加载资源
     */
    /*====================================================================================================*/
    LoadAsset(relative_path, complete_callback) 
    {
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
