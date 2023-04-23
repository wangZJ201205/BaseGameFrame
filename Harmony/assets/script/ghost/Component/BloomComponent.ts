import ComponentParent from "./ComponentParent";

/**
 * 血条
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class BloomComponent extends ComponentParent {

    bloomLab : cc.Label;
   
    onLoad (host) 
    {    
        super.onLoad(host);
    }

    start () {
        super.start();

        this.bloomLab = this.getNode().addComponent(cc.Label);
        this.bloomLab.string = "120/120";

    }

    remove(): void {
        super.remove();
    }

    update (dt) 
    {
    }
}
