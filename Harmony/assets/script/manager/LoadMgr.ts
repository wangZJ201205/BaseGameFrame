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
     * 加载资源清单
     */
    /*====================================================================================================*/
    // loadResources(callback)
    // {
    //     cc.assetManager.loadBundle('resources', (err,bundle)=>{
    //         if (err) {
    //             cc.error("LoadAsset failed ... and path = ");
    //             return;
    //         }
    //         callback();
    //     });
    // }

    /*====================================================================================================*/
    /**
     * 异步加载资源
     */
    /*====================================================================================================*/
    LoadAsset(relative_path, complete_callback) 
    {
        var bundles = cc.assetManager.getBundle('resources');
        bundles.load(relative_path ,(error,asset) =>
        {
            if (error) {
                cc.error("LoadAsset failed ... and path = " + relative_path);
                return;
            }
            else {
                complete_callback && complete_callback(asset);
            }
        });
    }

    
}
