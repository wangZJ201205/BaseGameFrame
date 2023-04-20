import ClientDef from "../common/ClientDef";
import GameData from "../common/GameData";
import GhostMgr from "../manager/GhostMgr";

/**
 * 普通玩法
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class CommonGamePlay {

    delta: number = 0;
    count:number = 0;
    onLoad () 
    {

    }

    start () 
    {
        this.delta = 1;
    }

    update (dt) 
    {
        this.delta -= 1;
        if(this.delta <= 0)
        {
            this.delta = 300;
        }
        else
        {
            return;
        }
        var count = GhostMgr.Instance.entitys.length;
        if(count > 1)return;
        // this.count++;
        var entity = GhostMgr.Instance.spawnEntity(ClientDef.ENTITY_TYPE_MONSTER);
        entity.start();
        var y = Math.random()* GameData.App_Game_Heigth ;
        entity.getEntityNode().setPosition(Math.random()*GameData.App_Game_Width  - GameData.App_Game_Width/2, y- GameData.App_Game_Heigth/2);
        entity.getEntityNode().zIndex = GameData.App_Game_Heigth - y;
    }
}
