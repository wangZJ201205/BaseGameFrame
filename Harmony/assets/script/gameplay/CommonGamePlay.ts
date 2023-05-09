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
            this.delta = 3;
        }
        else
        {
            return;
        }
        
        var count = GhostMgr.Instance.entitys.length;
        var liveCnt = 0;
        for (let index = 0; index < count; index++) {
            const element = GhostMgr.Instance.entitys[index];
            if( element.getClientProp(ClientDef.ENTITY_PROP_ACTIVE_STATE) == ClientDef.ENTITY_ACTIVE_STATE_RUN)
            {
                liveCnt++;
            }
        }

        if(liveCnt > 200)return;
        var entity = GhostMgr.Instance.spawnEntity(200001); // 200001怪物id
        // entity.setClientProp(ClientDef.ENTITY_PROP_STATICID,"1");
        entity.restart();
        var y = Math.random()* GameData.App_Game_Heigth ;
        entity.getEntityNode().setPosition(Math.random()*GameData.App_Game_Width  - GameData.App_Game_Width/2, y- GameData.App_Game_Heigth/2);
        entity.getEntityNode().zIndex = GameData.App_Game_Heigth - y;
        
    }
}
