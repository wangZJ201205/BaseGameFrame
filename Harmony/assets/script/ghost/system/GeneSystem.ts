import ClientDef from "../../common/ClientDef";
import GeneParent from "../gene/GeneParent";
import AddAttackGene from "../gene/children/AddAttackGene";
import AddBulletGene from "../gene/children/AddBulletGene";
import AddEXPGene from "../gene/children/AddEXPGene";
import AddRangeGene from "../gene/children/AddRangeGene";
import AttackSpeedGene from "../gene/children/AttackSpeedGene";
import BloomGene from "../gene/children/BloomGene";
import FireShieldGene from "../gene/children/FireShieldGene";
import IceFrozenGene from "../gene/children/IceFrozenGene";
import MagnetGene from "../gene/children/MagnetGene";
import PosionFireGene from "../gene/children/PosionFireGene";
import RecvBloomGene from "../gene/children/RecvBloomGene";
import RenewGene from "../gene/children/RenewGene";
import ShieldGene from "../gene/children/ShieldGene";
import SpeedGene from "../gene/children/SpeedGene";
import SubShieldGene from "../gene/children/SubShieldGene";
import ThunderRayGene from "../gene/children/ThunderRayGene";

/**
 * 基因系统
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class GeneSystem {

    private static _typeClass : Map<number,GeneParent>;

    static init()
    {
        this._typeClass = new Map<number,GeneParent>();
        this._typeClass[ClientDef.GENE_TYPE_SPEED] = SpeedGene;
        this._typeClass[ClientDef.GENE_TYPE_SHAPESHIFT] = SpeedGene;
        this._typeClass[ClientDef.GENE_TYPE_RENEW] = RenewGene;
        this._typeClass[ClientDef.GENE_TYPE_SHIELD] = ShieldGene;
        this._typeClass[ClientDef.GENE_TYPE_THUNDER_RAY] = ThunderRayGene;
        this._typeClass[ClientDef.GENE_TYPE_ADD_ATKSPEED] = AttackSpeedGene;
        this._typeClass[ClientDef.GENE_TYPE_ATTACK_DAMGE] = AddAttackGene;
        this._typeClass[ClientDef.GENE_TYPE_BLOOM] = BloomGene;
        this._typeClass[ClientDef.GENE_TYPE_MAGNET] = MagnetGene;
        this._typeClass[ClientDef.GENE_TYPE_RECV_BLOOM] = RecvBloomGene;
        this._typeClass[ClientDef.GENE_TYPE_ADD_ATKRANGE] = AddRangeGene;
        this._typeClass[ClientDef.GENE_TYPE_ADD_EXP] = AddEXPGene;
        this._typeClass[ClientDef.GENE_TYPE_SUB_SHIELD] = SubShieldGene;
        this._typeClass[ClientDef.GENE_TYPE_ADD_BULLET] = AddBulletGene;
        this._typeClass[ClientDef.GENE_TYPE_ICE_FROZEN] = IceFrozenGene;
        this._typeClass[ClientDef.GENE_TYPE_POSION_FIRE] = PosionFireGene;
        this._typeClass[ClientDef.GENE_TYPE_FIRE_SHIELD] = FireShieldGene;
    }
    
    static get(type:number)
    {
        return this._typeClass[type];
    }
}
