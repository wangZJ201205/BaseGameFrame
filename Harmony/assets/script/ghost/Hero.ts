
import Entity from "./Entity";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Hero{
    public static readonly Instance : Hero = new Hero();

    private _entity:Entity;

    onLoad () 
    {

    }

    start () {
        this._entity._skill.addSkill(20001);
    }

    setEntity(entity)
    {
        this._entity = entity;
    }
    
    getEntity()
    {
        return this._entity;
    }

    // update (dt) {}

    
}
