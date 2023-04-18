
/**
 * 配置文件
 */

import EventName from "../common/EventName";

interface DictEntry {
    path: string;
  }

export default class DictConfig{

    private static readonly DictPath : string = '/config/';


    private static dicts: DictEntry[]; //配置文件地址注册

    static init()
    {
        this.dicts = [];

        //注册配置文件

        DictConfig.registerDict("map_data");
        DictConfig.registerDict("language_data");
        DictConfig.registerDict("equip_data");
        DictConfig.registerDict("monster_data");

    }

    private static registerDict(path: string): void 
    {
        const dictEntry: DictEntry = { path: DictConfig.DictPath + path };
        DictConfig.dicts.push(dictEntry);
    }

    static getDict()
    {
        return this.dicts;
    }

}
