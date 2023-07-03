/**
 * 激光
 */

import ClientDef from "../../common/ClientDef";
import BulletHelp from "../BulletHelp";
import BulletParent from "../BulletParent";


const {ccclass, property} = cc._decorator;

@ccclass
export default class LoserBullet extends BulletParent {

    private _currentPosition:cc.Vec3;
    private _direction:cc.Vec3;
    private _delay : number;
    restart()
    {
        this._node.scaleX = 1;
        this._delay = 0;
        var angle = this.getProp(ClientDef.BULLET_PROP_ANGLE);
        // var angle = 90;
        this._node.angle = angle;
        console.info(">>>>>>>>>restart:angle>"+angle);
        var direction = BulletHelp.AngleConvertDirection(angle);
        this._direction = direction.normalize();
        
        this._currentPosition = this._node.position;
        this._currentPosition.y -= 135;

        super.restart();
    }

    onFinished()
    {
        //动画结束
        this.stop();
    }

    update (dt) 
    {
        
        // 沿着固定方向移动
        const velocity = this._direction.mul(170 * dt);
        this._currentPosition = this._currentPosition.add(velocity);
        var tgt = this._currentPosition.add(velocity);

        const distance = this._node.position.sub(tgt).mag();
        var scale = distance / 116;
        this._node.scaleX = scale;

        // console.info(">>>>>>>>>distance>"+distance);
        const direction = tgt.sub(this._node.position).normalize();
        const angle = Math.acos(cc.Vec3.dot(this._direction, direction));
        const degrees = cc.misc.radiansToDegrees(angle);

        const angle1 = this.getProp(ClientDef.BULLET_PROP_ANGLE);
        if( angle1 == 180 )
        {
            this._node.angle = 180 + degrees ;
        }
        else
        {
            this._node.angle = 360 - degrees + angle1;
        }

        this._delay ++;
        if(this._delay % 30 == 0)
        {
            var bullet = this.spawnNextBullet();
            if(!bullet)return;
            bullet.getNode().active = true;
            bullet.getNode().position = tgt;
            bullet.restart();
        }

    }


    
}
