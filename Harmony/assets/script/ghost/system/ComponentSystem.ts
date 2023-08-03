
import ClientDef from "../../common/ClientDef";
import ComponentParent from "../component/ComponentParent";
import BloomComponent from "../component/children/BloomComponent";
import ClothComponent from "../component/children/ClothComponent";
import CollComponent from "../component/children/CollComponent";
import FireShieldComponent from "../component/children/FireShieldComponent";
import FrozenComponent from "../component/children/FrozenComponent";
import ItemSkinComponent from "../component/children/ItemSkinComponent";
import ItemStateComponent from "../component/children/ItemStateComponent";
import NameComponent from "../component/children/NameComponent";
import PosionFireComponent from "../component/children/PosionFireComponent";
import ShieldComponent from "../component/children/ShieldComponent";
import ThunderRayComponent from "../component/children/ThunderRayComponent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ComponentSystem {

    static componentClass: Map<number,ComponentParent> = new Map<number,ComponentParent>();

    static init()
    {
        ComponentSystem.componentClass[ClientDef.ENTITY_COMP_CLOTH] = ClothComponent;
        ComponentSystem.componentClass[ClientDef.ENTITY_COMP_BLOOM] = BloomComponent;
        ComponentSystem.componentClass[ClientDef.ENTITY_COMP_NAME]  = NameComponent;
        ComponentSystem.componentClass[ClientDef.ENTITY_COMP_COLL]  = CollComponent;
        ComponentSystem.componentClass[ClientDef.ENTITY_COMP_SHIELD]  = ShieldComponent;
        ComponentSystem.componentClass[ClientDef.ENTITY_COMP_THUNDERRAY]  = ThunderRayComponent;
        ComponentSystem.componentClass[ClientDef.ENTITY_COMP_FROZEN]  = FrozenComponent;
        ComponentSystem.componentClass[ClientDef.ENTITY_COMP_POSION_FIRE] = PosionFireComponent;
        ComponentSystem.componentClass[ClientDef.ENTITY_COMP_FIRE_SHIELD] = FireShieldComponent;
        ComponentSystem.componentClass[ClientDef.ENTITY_COMP_ITEM_SKIN] = ItemSkinComponent;
        ComponentSystem.componentClass[ClientDef.ENTITY_COMP_ITEM_STATE] = ItemStateComponent;
    
    }

}
