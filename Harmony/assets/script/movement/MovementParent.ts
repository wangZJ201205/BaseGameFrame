/**
 * 运动父类
 */

const {ccclass, property} = cc._decorator;

export interface MoveNodeConfig {
  moveNode: cc.Node; // 运动的对象 -- 由外部传入
  startPos: cc.Vec3; // 开始点
  targetPos: cc.Vec3; // 结束点
  speed: number; // 速度
  completeCallBack?: Function; // 完成时的回调函数，可选
  target?: any;
}

@ccclass
export default class MovementParent {

    
    protected _moveNode : cc.Node; //运动的对象 -- 由外部传入
    protected _startPos : cc.Vec3; //开始点
    protected _targetPos : cc.Vec3; //结束点
    protected _speed : number; //速度
    protected _target : any; //速度

    protected _completeCallBack : Function;

    start (data) 
    {
        this._moveNode  = data.moveNode;
        this._startPos  = data.startPos;
        this._targetPos = data.targetPos;
        this._speed     = data.speed;
        this._completeCallBack = data.completeCallBack;
        this._target = data.target;
    }

    

    update (dt) 
    {
        
    }
}
