/**
 * 游戏中用到的数学公式
 */
export default class GameMath {

    private static _cosCache = {};
    private static _sinCache = {};

    public static start()
    {
        // 缓存常用计算式
        for (var i = -360; i <= 360; i++) {
            var radian = i / 180 * Math.PI;
            GameMath._cosCache[i] = Number((Math.cos(radian)).toFixed(3));
            GameMath._sinCache[i] = Number((Math.sin(radian)).toFixed(3));
        }
    }

    public static getCosCache(angle)
    {
        return GameMath._cosCache[Math.floor(angle)];
    }

    public static getSinCache(angle)
    {
        return GameMath._sinCache[Math.floor(angle)];
    }


    //角度转化为方向
    public static degreeToEntityDirection(angle)
    {
        var index= 0;
        if( angle >= 45 && angle < 135){
            index = 1
        }else if( angle >= -45 && angle < 45){
            index = 2
        }else if( angle >= -135 && angle < -45 ){
            index = 3
        }else{
            index = 4
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
