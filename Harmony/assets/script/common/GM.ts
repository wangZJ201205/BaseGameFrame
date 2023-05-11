/**
 * gm命令处理文件
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class GM {

    static GMTable = {};

    static init()
    {
        this.GMTable['test'] = this.testFunc;
    }

    static useGm(data)
    {
        if( this.GMTable[data[0]] )
        {
            this.GMTable[data[0]](data);
        }
    }

    static testFunc(data)
    {
        console.info(">>>>>test gm" + data[1]);
    }

    
    
}
