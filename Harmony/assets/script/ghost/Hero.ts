
import Entity from "./Entity";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Hero{
    public static readonly Instance : Hero = new Hero();

    _entity:Entity;

    onLoad () 
    {

    }

    start () {

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
