
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

    @property
    moveTime: number = 200;

    private _diameter: number;
    private _radius: number;
    private _center: cc.Vec3;
    private _angle: number;
    private _speed: number;
    private _time: number = 0;

    start() {
        this._diameter = this.startPoint.position.sub(this.targetPoint.position).mag();
        this._radius = this._diameter / 2;
        this._center = this.startPoint.position.add(this.targetPoint.position).div(2);
        this._angle = Math.PI - 2 * Math.asin(this._diameter / (2 * this._radius));
        this._speed = this._diameter / this.moveTime;
        this._speed = 0.1
        // this._time = 0;

        this.reStartBtn.node.on(cc.Node.EventType.TOUCH_END,this.onRestartHandle,this); //添加监听
    }

    onRestartHandle(event,param)
    {
        var x = Math.random() * 1280  - 640 ;
        var y = Math.random() * 720 - 360 ;
        this.targetPoint.position = cc.v3(x,y);
        this._diameter = this.startPoint.position.sub(this.targetPoint.position).mag();
        this._radius = this._diameter / 2;
        this._center = this.startPoint.position.add(this.targetPoint.position).div(2);
        this._angle = 3.14;
        this._speed = this._diameter / this.moveTime;
        // this._speed = 0.1
        this._time = 0;
        console.info(">>>>>>>>>"+this._speed);
    }

    update(dt: number) {
        if (this._time < 10) {
            this._time += dt / this.moveTime;

            const angle = this._angle * this._time * 2;
            const currentX = this._center.x + this._radius * Math.cos(angle);
            const currentY = this._center.y + this._radius * Math.sin(angle);
            const currentPos = cc.v3(-currentX, currentY, 0);
            this.moveNode.position = currentPos;
        }
    }
}
