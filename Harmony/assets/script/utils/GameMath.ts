/**
 * 游戏中用到的数学公式
 */
export default class GameMath {

    //角度转化为方向
    public static degreeToEntityDirection(angle)
    {
        var index= 0;
        if( angle >= 60 && angle < 120){
            index = 1
        }
        else if( angle >= 30 && angle < 60){
            index = 2
        }else if( angle >= -30 && angle < 30){
            index = 3
        }else if( angle >= -60 && angle < -30 ){
            index = 4
        }else if( angle >= 120 && angle < 150 ){
            index = 8
        }else if( angle <= -150 || angle > 150 ){
            index = 7
        }else if( angle >= -150 && angle < -120 ){
            index = 6
        }else if( angle < -60 && angle > -120 ){
            index = 5
        }
        return index;
    }
}
