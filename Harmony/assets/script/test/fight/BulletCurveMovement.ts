import { MoveNodeConfig } from "../../movement/MovementParent";
import HalfCircleMovement from "../../movement/children/HalfCircleMovement";
import GameMath from "../../utils/GameMath";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BulletCurveMovement extends cc.Component {

    @property(cc.Node)
    startPoint: cc.Node = null;

    @property(cc.Node)
    targetPoint: cc.Node = null;

    @property(cc.Node)
    moveNode: cc.Node = null;

    @property(cc.Button)
    reStartBtn: cc.Button = null;

    _halfCircleMovement : HalfCircleMovement;

    start() {
        
        // this._time = 0;
        GameMath.start();
        this._halfCircleMovement = new HalfCircleMovement();
        
        const info: MoveNodeConfig = {
            moveNode: this.moveNode,
            startPos: this.startPoint.position,
            targetPos: this.targetPoint.position,
            speed: 3,
            completeCallBack :this.completeCallBack,
            target : this,
          };

        this._halfCircleMovement.start(info);

        this.reStartBtn.node.on(cc.Node.EventType.TOUCH_END,this.onRestartHandle,this); //添加监听
    }

    onRestartHandle(event,param)
    {
        var x = Math.random() * 720  - 360 ;
        var y = Math.random() * 720 - 360 ;
        this.targetPoint.position = cc.v3(x,y);

        const info: MoveNodeConfig = {
            moveNode: this.moveNode,
            startPos: this.startPoint.position,
            targetPos: this.targetPoint.position,
            speed: 3,
            completeCallBack :this.completeCallBack,
            target : this,
        };

        this._halfCircleMovement.start(info);

    }

    update(dt: number) {
         this._halfCircleMovement.update(dt);
        // this._angle = Math.PI - 2 * Math.asin(this._diameter / (2 * this._radius));
    }

    completeCallBack()
    {
        const info: MoveNodeConfig = {
            moveNode: this.moveNode,
            startPos: this.startPoint.position,
            targetPos: this.targetPoint.position,
            speed: 3,
            completeCallBack :this.completeCallBack,
            target : this,
        };

        this._halfCircleMovement.start(info);
    }
}
