module uniLib {

    export class LobbyScene extends egret.DisplayObjectContainer implements uniLib.IScene {

        // 游戏界面层
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
        /**
         * 游戏层
         */
        public gameLayer: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();

        public currentGame: any;

        private _bgMask: egret.Sprite;

        //构造方法
        public constructor(param?: any) {
            super();
            SceneMgr.instance.init(this);
            this.initBaseLayers();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.start, this);
        }

        //初始化场景类
        public initBaseLayers(): void {
            this.addChild(this.uiLayer);
            this.addChild(this.topLayer);
            //this.addChild(this.gameLayer);
            this.addChild(this.effectLayer);
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
            //super.$onAddToStage();
        }

        public resize(): void {

        }

        /**
        * 场景销毁时
        */
        public destroy(): void {
        }

        public addGame(game: any): void {
            this.currentGame = game;
            if (this._bgMask == null) {
                this._bgMask = new egret.Sprite();
                this._bgMask.graphics.clear();
                this._bgMask.graphics.beginFill(0x000000, 0);
                this._bgMask.graphics.drawRect(0, 0, uniLib.Global.screenWidth, uniLib.Global.screenHeight);
                this._bgMask.graphics.endFill();
                this._bgMask.width = uniLib.Global.screenWidth;
                this._bgMask.height = uniLib.Global.screenHeight;
                this._bgMask.touchEnabled = true;
                //egret.Tween.get(this._bgMask).to({ alpha: 1 }, 100);
                this._bgMask.visible = true;

            }
            this.gameLayer.addChild(this._bgMask);
            //this.gameLayer.visible = true;
            this.gameLayer.addChild(game);
            this.addChildAt(this.gameLayer, 1);
            //game.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeGame, this);
        }

        public removeGame(e: egret.Event = null): void {
            //this.currentGame.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeGame, this);
            var curGameScene: GameScene = (<LobbyScene>SceneMgr.instance.currentScene).currentGame;
            //console.error(curGameScene);
            if (curGameScene) {
                if (curGameScene.parent)
                    curGameScene.parent.removeChild(curGameScene);
                curGameScene.destroy();
                curGameScene = null;
            }

            DisplayUtils.removeFromParent(this.gameLayer);
            this.gameLayer.removeChildren();

            //if (this.currentGame.parent)
            //    this.currentGame.parent.removeChild(this.currentGame);
            //if (this.currentGame && this.currentGame.destroy) {
            //    this.currentGame.destroy();
            //}

            this.currentGame = null;
            //this.gameLayer.visible = false;
            // uniLib.GameModuleUtils.removeGameJs();
            //if (uniLib.Global.isH5) {

            //}
        }
    }


}
