
// const {ccclass, property} = cc._decorator;

// /** 角色动作名 */
// export enum RoleAnimatorType {
//     /** 待机 */
//     Idle = "Idle",
//     /** 攻击 */
//     Attack = "Attack",
//     /** 受击 */
//     Hurt = "Hurt",
//     /** 死亡 */
//     Dead = "Dead"
// }

// /** 武器名 */
// export var WeaponName: any = {
//     0: "Fist",
//     1: "Katana",
//     2: "CrossGun",
//     3: "LongGun",
//     4: "Razor",
//     5: "Arch",
//     6: "Crossbow",
//     7: "IronCannon",
//     8: "FireGun",
//     9: "Wakizashi",
//     10: "Kunai",
//     11: "Dagger",
//     12: "Kusarigama",
//     13: "DanceFan",
//     14: "Flag",
//     15: "MilitaryFan",
//     16: "Shield"
// }

// /** 角色模块全局事件 */
// export enum RoleEvent {
//     /** 修改职业事件 */
//     ChangeJob = "ChangeJob"
// }

// class FrameEventData {
//     //叹号 ! 是 TypeScript 中的一种语法标记，称为"非空断言"（non-null assertion）。
//     public callback!: Function;
//     public target: any;
// }

// function resolve(hostname: string, rrtype: 'AAAA'): Promise<string[]>;
// function resolve(hostname: string, rrtype: 'ANY'): Promise<AnyRecord[]>;
// function resolve(hostname: string, rrtype: 'CAA'): Promise<CaaRecord[]>;
// function resolve(hostname: string, rrtype: 'CNAME'): Promise<string[]>;
// function resolve(hostname: string, rrtype: 'MX'): Promise<MxRecord[]>;

// function setDefaultResultOrder(order: 'ipv4first' | 'verbatim'): void;

// addTrailers(headers: OutgoingHttpHeaders | ReadonlyArray<[string, string]>): void;

// getHeader(name: string): number | string | string[] | undefined;

// writeHead(statusCode: number, headers?: OutgoingHttpHeaders | OutgoingHttpHeader[]): this;

// constructor(url: string | URL | ClientRequestArgs, cb?: (res: IncomingMessage) => void);

// static TouchBarGroup: typeof TouchBarGroup;

// addListener(event: 'abort', listener: () => void): this;
// addListener(event: 'connect', listener: (response: IncomingMessage, socket: Socket, head: Buffer) => void): this;
// addListener(event: 'continue', listener: () => void): this;
// addListener(event: 'information', listener: (info: InformationEvent) => void): this;
// addListener(event: 'response', listener: (response: IncomingMessage) => void): this;
// addListener(event: 'socket', listener: (socket: Socket) => void): this;
// addListener(event: 'timeout', listener: () => void): this;
// addListener(event: 'upgrade', listener: (response: IncomingMessage, socket: Socket, head: Buffer) => void): this;
// addListener(event: 'close', listener: () => void): this;
// addListener(event: 'drain', listener: () => void): this;
// addListener(event: 'error', listener: (err: Error) => void): this;
// addListener(event: 'finish', listener: () => void): this;
// addListener(event: 'pipe', listener: (src: stream.Readable) => void): this;
// addListener(event: 'unpipe', listener: (src: stream.Readable) => void): this;
// addListener(event: string | symbol, listener: (...args: any[]) => void): this;

// emit(event: 'headers', headers: IncomingHttpHeaders & IncomingHttpStatusHeader, flags: number): boolean;

// //type 关键字还可以用来定义联合类型，将多个类型组合到一个类型中，表示该类型可以是其中的任意一个。联合类型使用竖线 | 分隔不同的类型。
// type SocketReadyState = 'opening' | 'open' | 'readOnly' | 'writeOnly' | 'closed';

// //这意味着在调用这个函数时，可以选择性地提供 util1 和 util2 参数值，也可以不提供。如果不提供参数值，
// //那么在函数内部它们将被视为 undefined。而如果提供参数值，那么它们将被用于函数的计算过程。
// (util1?: EventLoopUtilization, util2?: EventLoopUtilization) => EventLoopUtilization;


// const STATUS_CODES: {
//     [errorCode: number]: string | undefined;
//     [errorCode: string]: string | undefined;
// };

// export interface UIConfig {
//     /** 远程包名 */
//     bundle?: string;
//     /** 窗口层级 */
//     layer: LayerType;
//     /** 预制资源相对路径 */
//     prefab: string;
// }

// /** 打开界面方式的配置数据 */
// export var UIConfigData: { [key: number]: UIConfig } = {
//     [UIID.Loading]: { layer: LayerType.UI, prefab: "loading/prefab/loading", bundle: "resources" },
//     [UIID.Netinstable]: { layer: LayerType.PopUp, prefab: "common/prefab/netinstable" },
//     [UIID.Window]: { layer: LayerType.Dialog, prefab: "common/prefab/window" }
// }

// function request(url: string | URL, options: RequestOptions, callback?: (res: IncomingMessage) => void): ClientRequest;

// export type PathLike = string | Buffer | URL;
// export type PathOrFileDescriptor = PathLike | number;
// export function rename(oldPath: PathLike, newPath: PathLike, callback: NoParamCallback): void;

// interface Uint16Array extends RelativeIndexable<number> {}

// export class RoleNumericDecorator {
//     /** 属性类型 */
//     attribute: RoleAttributeType = null!;
//     /** 属性数值 */
//     value: number = 0;
// }

// export class RoleNumericMap {

//     /** 攻击行为完成 */
//     onAttackComplete: Function = null!;
//     RoleModel!: RoleModelComp;

//     var uit = this.node.parent!.getComponent(UITransform)!;

//     /** 敏捷 */
//     private _agile: number = 0;
//     public get agile(): number {
//         return this._agile;
//     }
//     public set agile(value: number) {
//         this._agile = value;
//         this.ent.get(RoleModelComp).attributes.get(RoleAttributeType.agile).base = value;
//         this.vm[RoleAttributeType.agile] = value;
//     }

//     /** 角色属性 */
//     private attributes: Map<RoleAttributeType, RoleNumeric> = new Map();

//     forEach(callbackfn: (value: RoleNumeric, key: RoleAttributeType, map: Map<RoleAttributeType, RoleNumeric>) => void, thisArg?: any): void {
//         this.attributes.forEach(callbackfn, thisArg);
//     }
// }