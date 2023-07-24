/**
 * 衣服类组件
 * 
 * // uiPref.getChildByName("5").active = true;
   // var ac = uiPref.getComponent(cc.Animation);
   // ac.defaultClip.speed = 0.3;
   // console.info("1");

   状态的切换需要检测动画状态

 */

import ClientDef from "../../../common/ClientDef";
import DictMgr from "../../../manager/DictMgr";
import LoadMgr from "../../../manager/LoadMgr";
import GameMath from "../../../utils/GameMath";
import ComponentParent from "../ComponentParent";


const {ccclass, property} = cc._decorator;

declare var STATE_NAME : string[];
STATE_NAME=["idle","walk","die","attack","shapeshift","shapeshift_walk"];

//动画状态
enum ANIMATION_STATE {
    NORESOURCE,
    LOADING,
    LOAD_COMPLETE,
    UNUSE,
    USING,
}

@ccclass
export default class ClothComponent extends ComponentParent {

    _curState : number; //当前状态
    _curDir : number; //当前方向
    _animation: any;   //动画
    _animations_state:number;   //动画状态

    onLoad (host) 
    {    
        super.onLoad(host);
        this._curState = -1;
        this._curDir = 1; //正面
        this._animations_state = ANIMATION_STATE.NORESOURCE;
    }

    //获取当前动画状态
    //是否正在加载
    //是否正在使用中
    getAnimationState(state)
    {
        if(this._animations_state <= ANIMATION_STATE.LOADING)
        {
            return this._animations_state;
        }
        if(state == this._curState)
        {
            if(this._animation)
            {
                var anim = this._animation;
                let stateClip = anim.getClips()[state];
                let curClip = anim.currentClip;
                if(stateClip == curClip)
                {
                    return ANIMATION_STATE.USING;
                }
            }
        }
        return ANIMATION_STATE.UNUSE;
    }

    //获取当前动画状态有几个路径长度
    getAnimationCurStatePathLength()
    {
        var anim = this._animation;
        var clips = anim.getClips();
        let clipname = STATE_NAME[this._curState];
        for (let index = 0; index < clips.length; index++) {
            const clip = clips[index];
            if(clip.name == clipname)
            {
                var paths = clip.curveData.paths;
                return Object.keys(paths).length
            }
        }
        return 0;
    }

    changeDir()
    {
        var animation = this._animation;
        if(!animation) //没有这个资源
        {
            return;
        }
        var degree = this._host.getCProp(ClientDef.ENTITY_PROP_DEGREE)
        var childrenCnt = this.getAnimationCurStatePathLength();
        let dir = GameMath.degreeToEntityDirection(childrenCnt, degree);
        if( dir == this._curDir )
        {
            return;
        }
        this._curDir = dir;
        this.play();
    }

    //运行状态
    runState(state,replay:boolean = false)
    {
        
        var animationState = this.getAnimationState(state);
        if(animationState == ANIMATION_STATE.LOADING )
        {
            this._curState = state;
            return;
        } 
        
        if (animationState == ANIMATION_STATE.USING && !replay) //如果在加载和使用中就return
        {
            return;
        }

        this._curState = state;
        if(animationState == ANIMATION_STATE.NORESOURCE ) //资源池中没有该对象，开始下载该资源
        {
            this.download();
            return; 
        }

        this.play();
    }

    play()
    {
        if(this._animations_state <= ANIMATION_STATE.LOADING || !this._animation) //没有资源
        {
            return;
        }

        var degree = this._host.getCProp(ClientDef.ENTITY_PROP_DEGREE)
        var childrenCnt = this.getAnimationCurStatePathLength();
        let dir = GameMath.degreeToEntityDirection(childrenCnt, degree);
        this._curDir = dir;
        
        let anim = this._animation;
        let clipname = STATE_NAME[this._curState];
        anim.pause();
        anim.resume(clipname);
        anim.play(clipname);
        anim.on('finished',  this.onFinished,    this);
        anim.node.on('AttackFinish',  this.onAimAttack,    this);
        for (let index = 1; index <= this._animation.node.childrenCount; index++) 
        {
            const element = this._animation.node.getChildByName(index+"");
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

    onFinished()
    {
        this._host.emit("animation_finish");
    }

    onAimAttack()
    {
        this._host.emit("animation_AttackFinish");
    }

    download()
    {
        this._animations_state = ANIMATION_STATE.LOADING;
        var clothId = this.getHost().getCProp(ClientDef.ENTITY_PROP_STATICID) || 0;
        var clothResource = DictMgr.Instance.getDictByName("entity_data")[clothId].path;
        var loadPath = 'animation/entity/' +  clothResource +"/"+ clothResource ;
        LoadMgr.Instance.LoadAssetWithType(loadPath, cc.Prefab ,(asset)=>
            {
                if(this.getState() == ClientDef.COMP_STATE_REMOVE)
                {
                    return;
                }
                var aniPref = cc.instantiate(asset);
                aniPref.parent = this.getNode();
                for (let index = 1; index <= aniPref.childrenCount; index++) {
                    const element = aniPref.getChildByName(index+"");
                    element.active = false;
                }
                // this.getNode().scale = 0.85;
                this._animation = aniPref.getComponent(cc.Animation);
                this._animations_state = ANIMATION_STATE.LOAD_COMPLETE;
                this.runState(this._curState);
            });
    }
}
