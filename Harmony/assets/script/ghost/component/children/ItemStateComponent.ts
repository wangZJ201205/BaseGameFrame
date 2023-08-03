/**
 * 冰冻组件组件
 */

import ClientDef from "../../../common/ClientDef";
import { EventName } from "../../../common/EventName";
import GameData from "../../../common/GameData";
import EventMgr from "../../../manager/EventMgr";
import EntityParent from "../../EntityParent";
import { Hero } from "../../Hero";
import ComponentParent from "../ComponentParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ItemStateComponent extends ComponentParent {

    private _recycleTime : number;
    private _createTime :number;
    private _isMove = false;
    private _delta : number;

    onLoad (host) 
    {
        this._state = ClientDef.COMP_STATE_LOAD;
        this._host = host;
        this._recycleTime = GameData.Item_Recycle_Time;
        this._delta = cc.director.getTotalTime();
    }

    start () 
    {
        super.start();
        this._isMove = false;
        this._createTime = cc.director.getTotalTime();
    }

    update (dt) 
    {
        if(this._isMove)
        {
            return;
        }
        
        var delta = cc.director.getTotalTime() - this._createTime
        if(delta >= GameData.Item_Recycle_Time) //性能优化 超过回收时间，将其回收
        {
            this._host.restEntity();
        }

        var delta = cc.director.getTotalTime() - this._delta;

        var curHeroState = Hero.Instance.getEntity().getStateMachine().getStateID();
        if(curHeroState == ClientDef.ENTITY_STATE_IDLE && delta < 10000) //性能保护 如果人物未移动下不检查item距离
        {
            return;
        }

        this._delta = cc.director.getTotalTime();
        //  const startTime = cc.director.getTotalTime();
        var distance = this.calculateDistance(this._host, Hero.Instance.getEntity());
        var pickUpRange = Hero.Instance.getEntity().getCProp(ClientDef.ENTITY_PROP_PICKUP_RANGE);
        pickUpRange = pickUpRange * GameData.Player_PickItem_Range; //拾取范围检测
        if(distance <= pickUpRange ) //是否进入拾取范围
        {
            this.pickUp();
        }
        else if( distance > GameData.Item_Max_Range) //性能优化 超过人物最大距离，将其回收
        {
            this._host.restEntity();
        }
        //  const costTime = cc.director.getTotalTime() - startTime;

        //  console.log(`函数执行时间为2：${costTime} 毫秒`);
    }

    private pickUp()
    {
        this._isMove = true;
        var node : EntityParent = this._host;
        cc.tween(node).to(0.2,{x:Hero.Instance.getEntity().x, y:Hero.Instance.getEntity().y}).call(function () {
            node.restEntity();
            var itemInfo = node.getEntityDict();
            Hero.Instance.addExp(itemInfo.datax);
            EventMgr.Instance.Emit(EventName.EVENT_PLAYER_EXP_CHANGE);
        }).start();
    }

    calculateDistance(nodeA: cc.Node, nodeB: cc.Node): number {
        const positionA = nodeA.position;
        const positionB = nodeB.position;
        const vector = positionA.sub(positionB);
        return vector.mag();
    }

}
