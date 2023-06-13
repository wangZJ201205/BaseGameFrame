
import ClientDef from "../../common/ClientDef";
import UIName from "../../common/UIName";
import Hero from "../../ghost/Hero";
import ClothComponent from "../../ghost/component/children/ClothComponent";
import GameMath from "../../utils/GameMath";
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
    radius_threshold:number = 50; // 遥感半径小于该值时，不移动人物

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
        this.changePlayerDirection(joyStickPos);
        // 更新虚拟摇杆的位置
        this.joyStickNode.node.setPosition(centerPos);
    }

    onJoyStickTouchEnd(event,param)
    {
        // 更新虚拟摇杆的位置
        this.joyStickNode.node.setPosition(this._startPosition);
        this.joyStickDistance = 0;
        
    }

    update(deltaTime: number) 
    {
        
        if(!Hero.Instance.getEntity())
        {
            return;
        }
        
        // 如果没有人物节点或者遥感半径过小，则不移动人物
        if ( this.joyStickDistance < this.radius_threshold) 
        {
            Hero.Instance.getEntity().setClientProp(ClientDef.ENTITY_PROP_CONTROL_STATE, 0);
            return;
        }
        // console.info(this.joyStickDistance ,this.radius_threshold);
        Hero.Instance.getEntity().setClientProp(ClientDef.ENTITY_PROP_CONTROL_STATE, ClientDef.PLAYER_CONTROL_TYPE_ROCK);
        Hero.Instance.getEntity().setClientProp(ClientDef.ENTITY_PROP_MOVE_X,this.joyStickDir.x);
        Hero.Instance.getEntity().setClientProp(ClientDef.ENTITY_PROP_MOVE_Y,this.joyStickDir.y);
    }

    changePlayerDirection(joyStickPos)
    {
        let angleRadian = Math.atan2(joyStickPos.y, joyStickPos.x);
        let degree = angleRadian * 180 / Math.PI; // 转换为角度制
        Hero.Instance.getEntity().setClientProp(ClientDef.ENTITY_PROP_DEGREE,degree);
        var cloth:ClothComponent = Hero.Instance.getEntity().getEntityComponent(ClientDef.ENTITY_COMP_CLOTH);
        if(cloth)
        {
            cloth.changeDir();
        }
    }
    
    

}
