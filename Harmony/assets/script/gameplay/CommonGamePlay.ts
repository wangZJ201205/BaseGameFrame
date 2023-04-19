import ClientDef from "../common/ClientDef";
import GhostMgr from "../manager/GhostMgr";

/**
 * 普通玩法
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class CommonGamePlay {

   delta: number = 0;

    onLoad () 
    {

    }

    start () 
    {
        this.delta = 10;
    }

    update () 
    {
        this.delta -= 1;
        if(this.delta <= 0)
        {
            this.delta = 10;
        }
        else
        {
            return;
        }
        var entity = GhostMgr.Instance.spawnEntity(ClientDef.ENTITY_TYPE_MONSTER);
        entity.start();
        entity.getEntityNode().setPosition(Math.random()*1280  - 640,Math.random()*720  - 360);
    }
}
