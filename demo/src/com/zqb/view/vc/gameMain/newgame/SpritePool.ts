module weChat {

    export
class SpritePool {



    public _pool1:SideStep[];// 存放砖块1，正常静止状态
    public _pool2:SideStep[];// 存放砖块2，踩了以后会碎掉
    public _pool3:SideStep[];// 存放砖块3，会左右移动

    public constructor(){
        this.init();
    }

    private init() {
        this._pool1 = [];
        this._pool2 = [];
        this._pool3 = [];
    }

    //  获取对象
    public getObject(type:number):SideStep{

        if(type == 1){
            if(this._pool1.length > 0){
                //console.log("pool1 length: " + this._pool1.length);
                return this._pool1.pop();
            }
            else{
                return new SideStep(1);
            }
        }
        else if(type == 2){
            if(this._pool2.length > 0){
                //console.log("pool2 length: " + this._pool2.length);
                return this._pool2.pop();
            }
            else{
                return new SideStep(2);
            }
        }
        else if(type == 3){
            if(this._pool3.length > 0){
                //console.log("pool3 length: " + this._pool3.length);
                return this._pool3.pop();
            }
            else{
                return new SideStep(3);
            }
        }

    }
    //  回收对象
    public recycleObject(unused:SideStep){
        // 根据类型放入到对应的对象池中

        if(unused.type == 1){
            this._pool1.push(unused);
            //console.log("pool1 length: " + this._pool1.length);
        }else if(unused.type == 2){
            this._pool2.push(unused);
            //console.log("pool2 length: " + this._pool2.length);
        }else if(unused.type == 3){
            this._pool3.push(unused);
            //console.log("pool3 length: " + this._pool3.length);
        }
        // 从父节点移除掉
        if(unused&&unused.parent){
            unused.parent.removeChild(unused);
        }

    }

}
}