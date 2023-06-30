import ClientDef from "../common/ClientDef";
import GameData from "../common/GameData";

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
        return false;
    }

   
}
