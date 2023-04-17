/**
 * 衣服类组件
 * 
 * // uiPref.getChildByName("5").active = true;
   // var ac = uiPref.getComponent(cc.Animation);
   // ac.defaultClip.speed = 0.3;
   // console.info("1");

   状态的切换需要检测动画状态

 */

import ClientDef from "../../common/ClientDef";
import DictMgr from "../../manager/DictMgr";
import LoadMgr from "../../manager/LoadMgr";
import ComponentParent from "./ComponentParent";
import Definition from "../../common/Definition";

const {ccclass, property} = cc._decorator;

declare var STATE_NAME : string[];
STATE_NAME=["","idle","walk"];

//动画状态
enum ANIMATION_STATE {
    NORESOURCE,
    LOADING,
    UNUSE,
    USING,
}

@ccclass
export default class ClothComponent extends ComponentParent {

    _curState : number; //当前状态
    _curDir : number; //当前方向
    _animations:{};   //动画
    _animations_state:{};   //动画状态

    onLoad (host) 
    {    
        super.onLoad(host);
    }

    start () {
        this._curState = 0;
        this._curDir = 5; //正面
        this._animations = {};
        this._animations_state = {};
        super.start();
    }

    remove(): void {
        super.remove();
    }

    update (dt) 
    {
    }

    getAnimationState(state)
    {
        var animationName = STATE_NAME[state];
        var animationState = this._animations_state[animationName] || 0;
        return animationState;
    }

    changeDir(dir)
    {
        if(this._curDir == dir)
        {
            return;
        }
        this._curDir = dir;
        this.play();
    }

    //运行状态
    runState(state)
    {
        if(state == this._curState)
        {
            var animationState = this.getAnimationState(state);
            if(animationState == ANIMATION_STATE.LOADING || animationState == ANIMATION_STATE.USING) //如果在加载和使用中就return
            {
                return;
            }
        }

        this._curState = state;
        var animationName = STATE_NAME[state];
        var animation = this._animations[animationName];
        if(!animation) //资源池中没有该对象，开始下载该资源
        {
            this.download(state);
            return; 
        }
        
        for (const key in this._animations_state) { //寻找上一个正在运行的动画并且停止掉
            const element = this._animations_state[key];
            if(element == ANIMATION_STATE.USING)
            {
                this._animations_state[key] = ANIMATION_STATE.UNUSE;
                var oldAnimation = this._animations[key];
                oldAnimation.active = false;
            }
        }
        
        animation.active = true;
        this._animations_state[animationName] = ANIMATION_STATE.USING;
        this.play();
    }

    play()
    {
        var animationName = STATE_NAME[this._curState];
        var animation = this._animations[animationName];

        if(!animation) //没有这个资源
        {
            return;
        }

        for (let index = 1; index <= animation.childrenCount; index++) {
            const element = animation.getChildByName(index+"");
            if(index == this._curDir)
            {
                element.active = true;
            }
            else
            {
                element.active = false;
            }
        } 
    }

    download(state)
    {
        var animationName = STATE_NAME[state];
        this._animations_state[animationName] = ANIMATION_STATE.LOADING;
        var clothId = this.getHost().getServerProp(Definition.ENTITY_PROP_CLOTH) || 0;
        var clothResource = DictMgr.Instance.getDictByName("equip_data")[clothId].resource;
        var loadPath = 'animation/' + + clothResource +"/"+ animationName;
        LoadMgr.Instance.LoadAsset(loadPath,(asset)=>
            {
                var aniPref = cc.instantiate(asset);
                aniPref.parent = this.getNode();
                for (let index = 1; index <= aniPref.childrenCount; index++) {
                    const element = aniPref.getChildByName(index+"");
                    element.active = false;
                }
                aniPref.active = false;
                this._animations[aniPref.name] = aniPref;
                this._animations_state[aniPref.name] = ANIMATION_STATE.UNUSE;
                var animationName = STATE_NAME[this._curState];
                if( animationName == aniPref.name )
                {
                    this.runState(this._curState);
                }
            });
    }

}
