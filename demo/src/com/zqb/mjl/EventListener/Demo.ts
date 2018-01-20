class Demo extends egret.DisplayObjectContainer {

    private dispatchSprite: egret.Sprite;
    public constructor() {
        super();
        //字典使用对象作为key引用存储数据.对象作为key实际上需要进行遍历索引，所以在同一个字典中尽量不要添加过多的key会影响性能.
        var dic: Dictionary = new Dictionary();
        var arr1: string[] = ["我是数组"];
        var obj2: any = getObj(1);// = { name: "我是对象" };
        
        //************ 性能优化方案,给对象赋值hasCode来提高数据存取效率****************************************
        //没有hasCode的对象查找需要进行队列遍历查找,字段数据量不大的话性能影响不大
        function getObj(mode: number): any {
            var obj: any;
            switch (mode) {
                case 1:
                    //方案1:如果obj对象转换为 egret.HashObject
                    obj = new egret.HashObject();
                    obj.name = "我是对象";
                    break;
                case 2:
                    //方案2:给上面的对象动态赋值hashCode
                    obj.hashCode = new egret.HashObject().hashCode;
                    break;
                case 3:
                    //方案3:直接修改引擎对象计数器,并赋值给obj对象,这种方式最优.
                    //但是是直接都用了引擎私有变量,如果引擎后面版本修改了变量名,模块也要升级的话,这里相应得调整.
                    obj.hashCode = ++egret.$hashCount;
                    break;
                default:
                    obj = { name: "我是对象" };
                    break;
            }
            return obj;
        }
        //****************************************************************************************************

        var str3: string = "我是字符";
        //添加到字典
        dic.add(arr1, arr1);
        dic.add(obj2, obj2);
        dic.add(str3, str3);
        //打印字典内部的数据
        dic.dump();

        //申明一个广播对象“dispatchSprite”,这里可以是任何继承自egret.EventDispatcher的实例对象.   
        this.dispatchSprite = new egret.Sprite();

        //添加一个自动会移除监听事件
        //上面独立声明一个是为了更容易理解,其实可以直接BC.addOnceEvent(this, this,....)自身的广播事件.
        BC.addOnceEvent(this, this.dispatchSprite, egret.Event.ENTER_FRAME, this.onEnterFrameOnce);

        //创建和监听一个Timer事件
        var timer: egret.Timer = new egret.Timer(50);
        BC.addEvent(this, timer, egret.TimerEvent.TIMER, this.onEnterTimer);
        timer.start();


    }

    /**
    * dispatchSprite的帧事件
    */
    public onEnterFrame(event: egret.Event, index: string) {
        console.log("我是函数:", index);
    }
    /**
    * 只执行一次的dispatchSprite的帧事件
    */
    public onEnterFrameOnce(event: egret.Event) {
        console.log("我只执行了一次.");
        //生成3个代理函数的监听
        for (var i: number = 0; i < 3; i++) {
            BC.addEvent(this, this.dispatchSprite, egret.Event.ENTER_FRAME, DelegateUtil.create(this, this.onEnterFrame, i + ""));
        }

        setTimeout(() => {
            //移除3个匿名代理函数
            BC.removeEvent(this, this.dispatchSprite, egret.Event.ENTER_FRAME);
            console.log("3个匿名代理函数被移除事件了.");
            //新增加一个事件，100秒后一起移除.
            BC.addEvent(this, this.dispatchSprite, egret.Event.ENTER_FRAME, DelegateUtil.create(this, this.onEnterFrame, "新来的！"));

            setTimeout(() => {
                //移除所有该类的监听
                BC.removeEvent(this);
                console.log("所有该类的监听移除了.");
            }, 100);
        }, 200);
    }
    /**
    * timer事件
    */
    public onEnterTimer(event: egret.TimerEvent) {
        console.log("我是Timer的事件.");
    }
}