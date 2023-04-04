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
        // cc.assetManager.loadBundle(relative_path, (err,bundle)=>{
        //     if (err) {
        //         cc.error("LoadAsset failed ... and path = " + relative_path);
        //         return;
        //     }
        //     bundle.load(relative_path ,(error,asset) =>
        //     {
        //         if (error) {
        //             cc.error("LoadAsset failed ... and path = " + relative_path);
        //             return;
        //         }
        //         else {
        //             complete_callback && complete_callback(asset);
        //         }
        //     });
        //     // complete_callback && complete_callback(asset);
        // });  
        cc.resources.load(relative_path, (error, asset) => {
            if (error) {
                cc.error("LoadAsset failed ... and path = " + relative_path);
                return;
            }
            else {
                complete_callback && complete_callback(asset);
            }
        }); 
    }

    




    // update (dt) {}
}
