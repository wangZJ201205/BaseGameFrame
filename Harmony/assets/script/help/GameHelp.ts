import ClientDef from "../common/ClientDef";
import GameData from "../common/GameData";
import Hero from "../ghost/Hero";

/**
 * 游戏帮助
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class GameHelp  {

    //获取游戏状态
    static GetGamePauseState()
    {   
        
        if((GameData.Game_Pause_FLAG & ClientDef.GAME_PAUSE_UPGRADE) == ClientDef.GAME_PAUSE_UPGRADE)
        {
            return true;
        }
        else if((GameData.Game_Pause_FLAG & ClientDef.GAME_PAUSE_SET) == ClientDef.GAME_PAUSE_SET)
        {
            return true;
        }
        else if((GameData.Game_Pause_FLAG & ClientDef.GAME_PAUSE_ADVERTISE) == ClientDef.GAME_PAUSE_ADVERTISE)
        {
            return true;
        }

        if(!GameData.Game_Show) //游戏是否显示或进入后台状态
        {
            return true;
        }

        return false;
    }

    static calculateRandomDirection() 
    {
        var randX = Math.random() * 2 - 1;
        var randY = Math.random() * 2 - 1;
        return new cc.Vec2(randX, randY);
    }
    
    static calculateSpawnPosition(direction) 
    {
        var heroPosition = Hero.Instance.getEntity().position;
        var x = 0;
        var y = 0;
    
        if (direction.x < 0) {
            x = Math.random() * GameData.App_Game_Width + heroPosition.x - GameData.App_Game_Width / 2;
            y = direction.y < 0 ? -360 : 360;
            y += heroPosition.y;
        } else {
            y = Math.random() * GameData.App_Game_Heigth + heroPosition.y - GameData.App_Game_Heigth / 2;
            x = direction.y < 0 ? -640 : 640;
            x += heroPosition.x;
        }
    
        return new cc.Vec2(x, y);
    }

    //添加抖动效果
    static shakeBody(entity)
    {
        cc.tween(entity)
        .to(0.05, { position: cc.v3(entity.position.x - 5, entity.position.y) })
        .to(0.05, { position: cc.v3(entity.position.x + 5, entity.position.y) })
        .to(0.05, { position: cc.v3(entity.position.x - 5, entity.position.y) })
        .to(0.05, { position: cc.v3(entity.position.x + 5, entity.position.y) })
        .to(0.05, { position: cc.v3(entity.position.x - 5, entity.position.y) })
        .to(0.05, { position: cc.v3(entity.position.x + 5, entity.position.y) })
        .to(0.05, { position: cc.v3(entity.position.x - 5, entity.position.y) })
        .to(0.05, { position: cc.v3(entity.position.x,     entity.position.y) })
        .start();
    }
   
}
