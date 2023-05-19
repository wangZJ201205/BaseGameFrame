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

    //方向转成角度
    public static directionToAngle(direction)
    {
        let angleRadian = Math.atan2(direction.y, direction.x);
        let degree = angleRadian * 180 / Math.PI ; // 转换为角度制
        degree = (degree + 360) % 360  ; // 转换为0到360度的范围
        return degree;
    }

    public static convertToTimeFormat(number) {
        var minutes = Math.floor(number / 60); // 获取分钟数，使用 Math.floor 函数取整
        var seconds = number % 60; // 获取秒数
    
        // 通过字符串拼接方式，拼接出时间格式
        return ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2);
    }
}
