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
            BC.addEvent(this, uniLib.Global, uniLib.ZqEvent.NATIVE_TO_EGERET, this.onNativeMessage);
            BC.addEvent(this, uniLib.StatistcsMgr.instance, uniLib.StatistcsMgr.PING, this.netControl);

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


      
        /**进入新手场 */
        private enterStandard() {
            console.error("进入新手场");
            weChat.variableCommon.getInstance().playButtonSound();
            this.dispatchEventWith(LobbyUIEventConsts.ENTER_STANDARD);
        }
        /**显示帮助 */
        private showHelp() {
            console.error("显示帮助");
            weChatMsgCommand.instance.dispatchChangeEvent(LobbyUIEventConsts.LOBBY_SHOW_HELP, null);
        }

     
        /**获取信号类型 */
        private onNativeMessage(evt: uniLib.ZqEvent) {
            if (evt.param.cmd == uniLib.ZQGameSdk.NETSTATE && evt.param.code == 0) {
                if (evt.param.data[uniLib.ZQGameSdk.NETSTATE] == uniLib.NetState.NO_SIGNAL) {
                    LobbyPopupManager.showMildWarnShow("网络不佳，处理中");
                }
            }

        }

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