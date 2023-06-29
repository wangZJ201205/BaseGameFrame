/**
 * 自定义动画组件脚本
 * 抛出帧回调事件
 */

const {ccclass, property} = cc._decorator;

@ccclass
export default class AnimComponent extends cc.Component {

    Attack()
    {
        this.node.emit("Attack");
    }
    
    AttackFinish()
    {
        this.node.emit("AttackFinish");
    }

}
