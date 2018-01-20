module uniLib {

    export class GameScene extends egret.DisplayObjectContainer implements uniLib.IScene {

        // 游戏界面层 游戏资源需要添加到这一层 否则会覆盖loading的显示
        public uiLayer: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
        // 弹窗层 如 设置之类的
        public topLayer: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
        // 特效层 如 飘字之类的
        public effectLayer: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
        // 主UI层 如 底部功能栏
        public mainUILayer: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
        // 通讯遮罩层 
        public maskLayer: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
        // 旋转屏幕提示层 
        public tipsLayer: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
        //构造方法
        public constructor(param?: any) {
            super();
            this.initBaseLayers();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.start, this);
        }

        //初始化场景类
        public initBaseLayers(): void {
            this.addChild(this.uiLayer);
            this.addChild(this.effectLayer);
            this.addChild(this.topLayer);
            this.addChild(this.mainUILayer);
            this.addChild(this.maskLayer);
            this.addChild(this.tipsLayer);
            this.awake();
        }

        /**
         * 场景构造完成
         */
        public awake(): void {

        }

        /**
         * 场景初始化完成并添加到舞台
         */
        public start(e: egret.Event = null): void {

        }

        public resize(): void {

        }

        /**
        * 场景销毁时
        */
        public destroy(): void {
        }

    }


}
