/**
 * 玩法中
 * 怪物组
 */

import ClientDef from "../common/ClientDef";
import GameData from "../common/GameData";
import GhostMgr from "../manager/GhostMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GPMonster {

    private delta: number = 0;
    private count:number = 0;

    onLoad () 
    {

    }

    start () {
        this.delta = 1;
    }

    update () 
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

        if( liveCnt > GameData.Monster_Show_Amount )return;
        var entity = GhostMgr.Instance.spawnEntity(200001); // 200001怪物id
        entity.restart();
        var y = Math.random() * GameData.App_Game_Heigth ;
        entity.getEntityNode().setPosition(Math.random()*GameData.App_Game_Width  - GameData.App_Game_Width/2, y- GameData.App_Game_Heigth/2);
        entity.getEntityNode().zIndex = GameData.App_Game_Heigth - y;

    }
}
