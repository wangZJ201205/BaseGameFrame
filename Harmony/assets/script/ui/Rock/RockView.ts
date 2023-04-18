
import ClientDef from "../../common/ClientDef";
import UIName from "../../common/UIName";
import Hero from "../../ghost/Hero";
import UIParent from "../UIParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RockView extends UIParent {

    @property(cc.Sprite)
    joyStickBG: cc.Sprite = null;
    @property(cc.Sprite)
    joyStickNode: cc.Sprite = null;

    @property
    max_radius:number = 70; // 遥感的最大半径
    @property
    radius_threshold:number = 10; // 遥感半径小于该值时，不移动人物

    joyStickDir:cc.Vec2;
    joyStickDistance:number = 0;
    _startPosition:cc.Vec2;

    onLoad () 
    {
        this.setUIName(UIName.ROCKVIEW);
        super.onLoad();
    }

    start () 
    {
        var joyPostion = this.joyStickBG.node.getPosition();
        this._startPosition = cc.v2(joyPostion.x,joyPostion.y);
        super.start();
    }

    register(): void 
    {
        this.joyStickBG.node.on( cc.Node.EventType.TOUCH_START,this.onJoyStickTouchStart,this); //添加监听
        this.joyStickBG.node.on( cc.Node.EventType.TOUCH_MOVE,this.onJoyStickTouchMove,this); //添加监听
        this.joyStickBG.node.on( cc.Node.EventType.TOUCH_END,this.onJoyStickTouchEnd,this); //添加监听
        this.joyStickBG.node.on( cc.Node.EventType.TOUCH_CANCEL,this.onJoyStickTouchEnd,this); //添加监听
    }

    close()
    {

    }

    onJoyStickTouchStart(event)
    {
        this.onJoyStickTouchMove(event);
        // var machine = Hero.Instance.getEntity().getStateMachine();
        // machine.addState(ClientDef.ENTITY_STATE_WALK);
        Hero.Instance.getEntity().setClientProp(ClientDef.ENTITY_PROP_CONTROL_STATE, ClientDef.PLAYER_CONTROL_TYPE_ROCK);
    }

    onJoyStickTouchMove(event)
    {
        const touchPos = event.touch.getLocation();
        const joyStickPos = this.joyStickBG.node.convertToNodeSpaceAR(touchPos) ;
        // 计算遥感的方向和距离
        this.joyStickDir = joyStickPos.normalize();
        this.joyStickDistance = joyStickPos.mag();
        var centerPos = cc.v2(this._startPosition.x,this._startPosition.y);
        // 限制遥感的半径不能超过最大值
        if (this.joyStickDistance > this.max_radius) {
          this.joyStickDistance = this.max_radius;
        }

        var movePos = this.joyStickDir.mul(Math.floor(this.joyStickDistance));
        centerPos.x += Math.floor(movePos.x);
        centerPos.y += Math.floor(movePos.y);
        let angleRadian = Math.atan2(joyStickPos.y, joyStickPos.x);
        let degree = angleRadian * 180 / Math.PI; // 转换为角度制
        let dir = this.degreeToEntityDirection(degree);
        // 更新虚拟摇杆的位置
        this.joyStickNode.node.setPosition(centerPos);

        Hero.Instance.getEntity().setClientProp(ClientDef.ENTITY_PROP_DIR,dir);
    }

    onJoyStickTouchEnd(event,param)
    {
        // 更新虚拟摇杆的位置
        this.joyStickNode.node.setPosition(this._startPosition);
        // var machine = Hero.Instance.getEntity().getStateMachine();
        // machine.addState(ClientDef.ENTITY_STATE_IDLE); //这里需要思考一下 是否一直停留在一个状态中
        Hero.Instance.getEntity().setClientProp(ClientDef.ENTITY_PROP_CONTROL_STATE, 0);
    }

    update(deltaTime: number) {
        // 如果没有人物节点或者遥感半径过小，则不移动人物
        if ( this.joyStickDistance < this.radius_threshold) {
          return;
        }
    
        // // 根据遥感方向和距离计算人物的速度
        // const velocity = this.joyStickDir.mul(this.move_speed);
        // // 计算重力对速度的影响
        // velocity.y -= this.gravity * deltaTime;
    
        // 移动人物节点
        //console.info(velocity.mul(deltaTime));
        //this.playerNode.setPosition(this.playerNode.position.add(velocity.mul(deltaTime)));
      }

    degreeToEntityDirection(angle)
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
