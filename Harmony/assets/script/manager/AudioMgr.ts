/**
 * 音频播放管理器
 */

import LoadMgr from "./LoadMgr";
import ParentMgr from "./ParentMgr";

const {ccclass, property} = cc._decorator;

AudioType:cc.Enum({
    BGM:0,
    EFFECT:1,
})

@ccclass
export default class AudioMgr extends ParentMgr {

    public static readonly Instance : AudioMgr = new AudioMgr();
   
    /**bgm音量*/
    _bgm_volume:number = 0.2;

    /**音效音量*/
    _effect_volume: number = 0.2;

    /**当前bgm音频id*/
    _current_bgm_audio_id: number;

    /**当前bgm名*/
    _current_bgm_name: string;

    /**AudioConfig路径配置 */
    _audio_config: any;

    onLoad () 
    {

    }

    start () 
    {
        // this.playBGM();
        // this.playEffect(null,null);
    }

    SetBGMVolume(volume) {
        if (typeof volume != 'number') return;
        if (volume < 0 || volume > 1) {
            cc.error('volume must be in 0.0 ~ 1.0');
            return;
        }

        this._bgm_volume = volume;
        cc.audioEngine.setMusicVolume(this._bgm_volume);
    }

    _PlayBGMLoop(path) {
        LoadMgr.Instance.LoadAssetWithType(path, cc.AudioClip, (audio) => {
            this._current_bgm_name = path;
            let id = cc.audioEngine.playMusic(audio, false);
            this.SetBGMVolume(this._bgm_volume);
            this._current_bgm_audio_id = id;
            cc.audioEngine.setFinishCallback(id, () => {
                this._PlayBGMLoop(path);
            });
        });
    }

    playBGM() 
    {   
        var path = "audio/music_xinshoucun";
        LoadMgr.Instance.LoadAssetWithType(path, cc.AudioClip, (audio) => {
            this._current_bgm_name = path;
            let id = cc.audioEngine.playMusic(audio, false);
            this.SetBGMVolume(this._bgm_volume);
            this._current_bgm_audio_id = id;
            cc.audioEngine.setFinishCallback(id, () => {
                this._PlayBGMLoop(path);
            });
        });
    }

    /*====================================================================================================*/
    /**
     * 外部接口
     * 播放音效
     * @description
     * 播放一个音效
     * suffix 有后缀
     * id_cb 音效id回调
     * exclusion 特效不可共存，需停止前一个音效
     */
    /*====================================================================================================*/
    playEffect(audio_key, id_cb)
    {
        // let id = cc.audioEngine.playEffect(audio, is_loop);
        // this.SetEffectVolume(this._effect_volume);
        var path = "audio/effect_ui_success";
        LoadMgr.Instance.LoadAssetWithType(path, cc.AudioClip, (audio) => {
            let id = this._PlayEffect(audio);
            id_cb && id_cb({id: id});
        });       
    }

    /*====================================================================================================*/
    /**
     * 播放音效
     * @param {cc.Audio} audio 音效路径或者音效对象
     * @param {bool} is_loop 是否循环
     * @param {function} end_cb 回调
     * @param {function} exclusion 特效不可共存
     */
    /*====================================================================================================*/
    _PlayEffect(audio) {
        let id = cc.audioEngine.playEffect(audio, true);
        return id;
    }


}
