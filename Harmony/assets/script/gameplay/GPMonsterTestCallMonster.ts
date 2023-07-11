/**
 * 玩法中
 * 怪物组
 * 测试召唤怪物
 */

import ClientDef from "../common/ClientDef";
import GameData from "../common/GameData";
import Hero from "../ghost/Hero";
import GameHelp from "../help/GameHelp";
import GhostMgr from "../manager/GhostMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GPMonsterTestCallMonster {

    private delta: number = 0; //在测试模式下运行
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
            this.delta = GameData.Game_Play_Monster_Time_Delay;
        }
        else
        {
            return;
        }
        this.checkMonsterCount();
    
    }

    private checkMonsterCount()
    {
        var count = GhostMgr.Instance.entitys.length;
        var liveCnt = 0;
        for (let index = 0; index < count; index++) {
            const element = GhostMgr.Instance.entitys[index];
            if( element.isRun() && element.isMonster())
            {
                liveCnt++;
            }
        }

        if( liveCnt >= GameData.Monster_Show_Amount )return;

        var monsters = []; //随机数组
        // monsters.push(200002);
        // monsters.push(200003);
        // monsters.push(200004);
        // monsters.push(200005);
        // monsters.push(200006);
        // monsters.push(200007);
        // monsters.push(200008);
        // monsters.push(200009);
        // monsters.push(200010);
        // monsters.push(200011);
        // monsters.push(200012);
        // monsters.push(200013);
        // monsters.push(200014);
        // monsters.push(200015);
        // monsters.push(200016);
        // monsters.push(200017);
        // monsters.push(200018);
        // monsters.push(200019);
        // monsters.push(200020);
        // monsters.push(200021);
        // monsters.push(200022);
        // monsters.push(200023);
        // monsters.push(200024);
        // monsters.push(200025);
        // monsters.push(200026);
        // monsters.push(200027);
        // monsters.push(200028);
        // monsters.push(200029);
        // monsters.push(200030);
        // monsters.push(200031);
        // monsters.push(200032);
        // monsters.push(200033);
        // monsters.push(200034);
        // monsters.push(200035);
        // monsters.push(200036);
        // monsters.push(200037);
        // monsters.push(200038);
        monsters.push(200039);

        var id = Math.random()*monsters.length ;
        id = monsters[ Math.floor(id) ];
        var entity = GhostMgr.Instance.spawnEntity(id); // 200001怪物id 怪物的释放规则还没有实现
        entity.restart();
        entity.randomEntityPosition();
        
    }


}
