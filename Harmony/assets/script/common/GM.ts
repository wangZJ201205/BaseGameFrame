
import { Hero } from "../ghost/Hero";
import GameData from "./GameData";

/**
 * gm命令处理文件
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class GM {

    static GMTable = {};

    static init()
    {
        this.GMTable['db_phy'] = this.dbPhyFunc; //关闭物理引擎
        this.GMTable['eb_phy'] = this.ebPhyFunc; //开启物理引擎
        this.GMTable['addSkill'] = this.addSkill; //添加技能
        this.GMTable['addMonster'] = this.addMonster; //添加怪物
        this.GMTable['switchGameMode'] = this.switchGameMode; //切换游戏模式
        this.GMTable['allFullSkill'] = this.allFullSkill; //所有技能满级
    }

    static useGm(data)
    {
        if( this.GMTable[data[0]] )
        {
            this.GMTable[data[0]](data);
        }
    }

    static dbPhyFunc(data)
    {
        console.info(">>>>>test gm" + data[1]);
        cc.director.getPhysicsManager().enabled = false;  //关闭物理属性
        cc.director.getCollisionManager().enabled = false;//开启碰撞检测
    }

    static ebPhyFunc(data)
    {
        console.info(">>>>>test gm" + data[1]);
        cc.director.getPhysicsManager().enabled = true;  //开启物理属性
        cc.director.getCollisionManager().enabled = true;//开启碰撞检测
    }

    static addSkill(data)
    {
        Hero.Instance.addSkill(Number(data[1]));
    }

    static addMonster(data)
    {
        GameData.Monster_Show_Amount += Number(data[1]);
    }

    static switchGameMode(data)
    {
        GameData.Game_Mode = Number(data[1]);
    }

    static allFullSkill(data)
    {

        Hero.Instance.getEntity().getSkill().addSkill(10709);
        Hero.Instance.getEntity().getSkill().addSkill(10109);
        Hero.Instance.getEntity().getSkill().addSkill(10207);
        Hero.Instance.getEntity().getSkill().addSkill(10307);
        Hero.Instance.getEntity().getSkill().addSkill(10409);
        // Hero.Instance.getEntity().getSkill().addSkill(10603);
        Hero.Instance.getEntity().getSkill().addSkill(11009);
        // Hero.Instance.getEntity().getSkill().addSkill(11109);
        Hero.Instance.getEntity().getSkill().addSkill(11209);
        Hero.Instance.getEntity().getSkill().addSkill(11309);
        Hero.Instance.getEntity().getSkill().addSkill(11409);
        Hero.Instance.getEntity().getSkill().addSkill(11509);
        Hero.Instance.getEntity().getSkill().addSkill(11609);
        Hero.Instance.getEntity().getSkill().addSkill(11709);
        Hero.Instance.getEntity().getSkill().addSkill(11809);
        Hero.Instance.getEntity().getSkill().addSkill(11909);
    }


    
    
}
