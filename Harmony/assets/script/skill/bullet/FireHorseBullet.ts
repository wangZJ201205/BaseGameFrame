/**
 * 烈火马
 */

import ClientDef from "../../common/ClientDef";
import GameData from "../../common/GameData";
import MovementParent, { MoveNodeConfig } from "../../movement/MovementParent";
import LineMovement from "../../movement/children/LineMovement";
import GameMath from "../../utils/GameMath";
import BulletHelp from "../BulletHelp";
import BulletParent from "../BulletParent";


const {ccclass, property} = cc._decorator;

@ccclass
export default class FireHorseBullet extends BulletParent {

    private _lineMovement:MovementParent;
    private _startPos : cc.Vec3;

    onLoad (host) 
    {
        super.onLoad(host);
        this._lineMovement = new LineMovement();
    }

    restart()
    {   
        var angle = this.getProp(ClientDef.BULLET_PROP_ANGLE);
        var direction = BulletHelp.AngleConvertDirection(angle);
        this.getNode().angle = GameMath.directionToAngle(direction);
        this.setProp(ClientDef.BULLET_PROP_DIRECTION , direction);
        
        super.restart();
        var bulletInfo = this._bulletInfo;

        const info: MoveNodeConfig = {
            moveNode: this.getNode(),
            startPos: this.getNode().position,
            targetPos: null,
            speed: bulletInfo.speed,
            completeCallBack :null,
            target :this,
            direction:direction,
          };

        this._lineMovement.start(info);

        var animnode = this._node.children[0];
        if(animnode)
        {
            for (let index = 0; index < animnode.childrenCount; index++) {
                const element = animnode.children[index];
                element.active = false;
                if(index == 1)
                {
                    element.active = true;
                }
            }
        }

        this._startPos = this._host.getHost().getEntityNode().position;
    }

    update (dt) 
    {
        var currentPosition = this.getNode().position;
        
        const distance = this._startPos.sub(currentPosition).mag();
        if (distance > GameData.App_Game_Width/2) //超出边界
        {
            this.getNode().active = false;
            this.setProp(ClientDef.BULLET_PROP_STATE,ClientDef.BULLET_STATE_FREE);
        } 

        this._lineMovement.update(dt);
        super.update(dt);
    }


    
}
