/**游戏主界面，刚进去 */
module weChat {

    export class LobbyMainGameLayer extends BaseEuiPanel {

        private help: eui.Image;
        private headImg: eui.Image;
        private chips: eui.Label;

        private mainSceneName: eui.Label;
        private restartGameBtn: eui.Label;


        private standardScene: eui.Image;
        private pingArr: number[];


        private _Score: number = 0;
        // private _bullets: gameMain.BulletFactory;
        private _showScore;


        constructor() {
            super();
            this.skinName = "LobbyMainSceneSkin"
        }
        public destory(): void {
            super.destory();

            uniLib.DragonUtils.removeFastDragonbyContainer(this);
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);

        }


        protected addEvent() {
            BC.addEvent(this, this.standardScene, egret.TouchEvent.TOUCH_TAP, this.enterStandard);


            BC.addEvent(this, this.help, egret.TouchEvent.TOUCH_TAP, this.showHelp);
            //  if (!weChatMsgCommand.instance.hasEventListener(LobbyUIEventConsts.DATA_CHANGE)) {
            // }

        }

        protected removeEvent() {
            BC.removeEvent(this, null, egret.TouchEvent.TOUCH_TAP, null);
            BC.removeEvent(this, uniLib.Global);
        }

        /**初始化数据 */
        public init() {


            this.initData();


        }

        public initData() {

        }

        /**全局事件监听类 */
        public dataChangeHandler(e: LobbyUIEventConsts): void {
            var rev: any = e.data.iData;
            switch (e.data.iType) {
               
            }

        }


        /**进入新手场 */
        private enterStandard() {
            console.error("进入新手场");
            this.BeginGame();
        }
        /**显示帮助 */
        private showHelp() {
            console.error("显示帮助");
            weChatMsgCommand.instance.dispatchChangeEvent(LobbyUIEventConsts.LOBBY_SHOW_HELP, null);
        }

        public BeginGame() {
           
            let bg = new gameMain.BgContent();
            this.addChild(bg)

            var layer = new newGameScene();
            egret.MainContext.instance.stage.addChild(layer);

            //移除开始界面，然后加入其它的GameObject
            // this.removeChild(this.beginScene);





            this.touchEnabled = true;

        }

        private _distance: egret.Point = new egret.Point(); //鼠标点击时，鼠标全局坐标与_bird的位置差
        private _touchStatus: boolean = false;              //当前触摸状态，按下时，值为true





        /**
    * 网络检测控制
    */
        private netControl(evt: egret.Event): void {
            console.error("网络检测控制", evt.data);
            var ping: number = evt.data;
            this.pingHandle(ping)
        }
        private pingHandle(number) {
            let isTerrible: boolean = false;
            if (!this.pingArr) {
                this.pingArr = []
            }
            this.pingArr.push(number);
            if (this.pingArr.length > 2) {
                this.pingArr.shift();
            }
            for (let i = 0; i < this.pingArr.length; i++) {
                if (this.pingArr[i] < 500) {
                    isTerrible = true
                }
            }
            if (!isTerrible) {
                if (weChat.variableCommon.getInstance().LobbyTempMap.has("网络不佳，处理中")) {
                    return;
                }
                weChat.LobbyPopupManager.showMildWarnShow("网络不佳，处理中..");
            }
        }

    }
}