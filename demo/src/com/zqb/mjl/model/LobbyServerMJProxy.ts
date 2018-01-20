module weChat {
    export class LobbyServerMJProxy extends Proxy {
        private static _instance: LobbyServerMJProxy;
        public static NAME: string = "LobbyServerMJProxy";
        private updatedConfig: boolean = false;
        private httpInitFailTimes: number = 0;
        private gameId: number = 0;
        private zoneId: number = 0;
        private _timeOutId: number;
        public constructor() {
            super(LobbyServerMJProxy.NAME);
        }
        public static getInstance(): LobbyServerMJProxy {
            if (!this._instance) {
                this._instance = new LobbyServerMJProxy();
            }
            return this._instance;
        }
        public initServer(): void {
            var zoneid: number;
            var gameId: number;
            var loginUrl: string;
            if (uniLib.Global.gameConfig) {
                zoneid = uniLib.Global.gameConfig.zoneid;
                gameId = uniLib.Global.gameConfig.gameid;
                loginUrl = uniLib.Global.gameConfig.login_url;
                uniLib.Global.defaultConfig = new Object();
                uniLib.Global.defaultConfig.login_url = loginUrl;
                uniLib.Global.defaultConfig.zoneid = zoneid;
                uniLib.Global.defaultConfig.gameid = gameId;
            } else {
                var data: any = RES.getRes("lobbyConfig_json");
                var config: uniLib.DefaultConfig = data["default"]
                uniLib.Global.defaultConfig = config;
                zoneid = config.zoneid;
                gameId = config.gameid;
                LobbyDataCache.gameID = gameId;
                loginUrl = config.login_url;
            }
            if (!NetMgr.ws || !NetMgr.ws.isConnected) {
                this._timeOutId = egret.setTimeout(() => {
                    weChat.LobbyEvents.Instance.dispatchEvent(new egret.Event(LobbyEvents.NOTIFY_CONNECT_TIMEOUT));
                }, this, 10000);
                // uniLib.UIMgr.instance.showProcessBar(null, 94, 100, "正在连接服务器...", "", true);
                NetMgr.init(loginUrl, gameId, zoneid, this.onHttpInitSucc, this.onHttpInitFail, this);
                this.gameId = gameId;
                this.zoneId = zoneid;
            } else {
                //捕鱼回来走loading条 重新加载游戏资源
             
            }
        }

        public loginOut(): void {
            NetMgr.logout();
        }
		/**
         * http平台登录完成
         */
        private onHttpInitSucc(obj: any): void {
            egret.clearTimeout(this._timeOutId);
            //下面可以通过uniLib.NetMgr.httpSend发送http消息了
            var uid: number = NetMgr.UID;
           
            this._timeOutId = egret.setTimeout(() => {
                weChat.LobbyEvents.Instance.dispatchEvent(new egret.Event(LobbyEvents.NOTIFY_CONNECT_TIMEOUT));
            }, this, 10000);
            NetMgr.initSocket(this.onSockInitSucc, this.onSockInitFail, this, null, null, null, true);//初始化平台socket
            
            uniLib.UIMgr.instance.showProcessBar(PublicLoadingView, 95, 100, "正在验证登录信息...", "", true);
        }

        private onHttpInitFail(): boolean {
            egret.clearTimeout(this._timeOutId);
            if (this.httpInitFailTimes == 0) {
                this.httpInitFailTimes++;
                NetMgr.init("http://211.159.149.160:9000/httplogin", this.gameId, this.zoneId, this.onHttpInitSucc, this.onHttpInitFail, this);
                uniLib.Console.log("尝试第1次登陆重连IP:118.89.55.208");
                return true;
            } else if (this.httpInitFailTimes == 1) {
                this.httpInitFailTimes++;
                NetMgr.init("http://118.89.55.208:9000/httplogin", this.gameId, this.zoneId, this.onHttpInitSucc, this.onHttpInitFail, this);
                uniLib.Console.log("尝试第2次登陆重连IP:118.89.55.208");
                return true;
            }
            NetMgr.logout();
            // if (uniLib.Global.isH5 ==false && this.updatedConfig == false) {
            //     this.updateConfig();
            //     return true;
            // }
            // else {
            return this.onConnectFail();
            // }
        }

        // private updateConfig(): void {
        //     this.updatedConfig = true;
        //     // uniLib.ZQGameSdk.pullCfg(this.onDown, this);
        //     uniLib.ZQGameSdk.getConfig("当前客户端版本过低,点击确定重启更新。","","确定");
        // }

        private onDown(msg: any): void {
            if (!NetMgr.ws || !NetMgr.ws.isConnected) {
                uniLib.UIMgr.instance.showProcessBar(PublicLoadingView, 94, 100, "正在连接服务器...", "", true);
                NetMgr.init(uniLib.Global.gameConfig.login_url, uniLib.Global.gameConfig.gameid, uniLib.Global.gameConfig.zoneid, this.onHttpInitSucc, this.onHttpInitFail, this);
            }
        }

		/**
         * socket连接完成
         */
        private onSockInitSucc(): void {

            console.error("@@@@ ws login success");

            egret.clearTimeout(this._timeOutId);
            uniLib.UIMgr.instance.hideLoading(PublicLoadingView);
            if (uniLib.Global.isInGame == false) {
                // uniLib.CommonModelMgr.Instance.registerCommonModel(uniLib.CommonModel.USERINFO, LobbyUserInfoPanel);
                this.onLoginServer();
            }
        }
  
        private reconnct(e: uniLib.ZqEvent) {
            if (e.param && e.param == LobbyDataCache.gameID) {
                this.onSockInitSucc();
            }
        }
        public sendData(obj: any): void {
            if (NetMgr.ws)
                NetMgr.tcpSend(obj);
            //NetMgr.setMsgTimeout(8,"sendData")
        }
        private onSockInitFail(): boolean {
            console.error("@@@@ ws login fail");
            egret.clearTimeout(this._timeOutId);
            NetMgr.logout();
            // if (uniLib.Global.isH5 ==false && this.updatedConfig == false) {
            //     this.updateConfig();
            //     return true;
            // }
            // else {
            return this.onConnectFail();
            // }
            // return this.onConnectFail();
        }
        private onConnectFail(): boolean {
            if (uniLib.Global.isH5) {
                uniLib.UIMgr.instance.hideLoading(PublicLoadingView);
                weChat.LobbyPopupManager.showConfirmPanel("请检查网络状况", [""], [this.refresh], "", this);
            } else {
                uniLib.ZQGameSdk.getConfig("网络不稳定,需要重新连接", "", "确定");
                //uniLib.UIMgr.instance.hideLoading();
                //var loginPanel:any=uniLib.getDefinitionByName(ViewConfig.loginPanelName);
                //uniLib.SceneMgr.instance.changeScene(loginPanel);
                //LobbyPopupManager.showMildWarnShow("请检查网络状况");
                return true;
            }
            return true;
        }

        private getRemoteConfig(): void {

        }

        private refresh(): void {
            if (uniLib.Global.reLoginUrl != "") {
                uniLib.BrowersUtils.redirect(uniLib.Global.reLoginUrl);
            } else {
                uniLib.BrowersUtils.reload();
            }
        }
        public onRemove(): void {
            super.onRemove();
            uniLib.Global.removeEventListener(uniLib.ZqEvent.ON_RECONNEC, this.onSockInitSucc, this);
        }


        private onLoginServer() {
            var login: any = {};
            //*************把本地的配置md5给后台，用于判断是否需要发配置回 
            var lobbyGameList: Array<any> = [];
            var createRoomConfigs: Array<any> = [];
            var arr: Array<any> = RES.getRes("TableLobbyGameList_json");
            if (arr) {
                for (var i = 0; i < arr.length; i++) {
                    lobbyGameList.push(arr[i])
                }
            }
            var createConfig = RES.getRes("TableCreateConfigList_json");
            if (createConfig) {
                for (var i = 0; i < createConfig.length; i++) {
                    createRoomConfigs.push(createConfig[i])
                }
            }
            var lobbymsg: string = JSON.stringify(lobbyGameList);
            var roommsg: string = JSON.stringify(createRoomConfigs);
            login.md5Code = uniLib.StringUtils.MD5(lobbymsg) + uniLib.StringUtils.MD5(roommsg);//*/

            this.sendData(login);
            uniLib.UIMgr.instance.showProcessBar(PublicLoadingView, 96, 100, "正在进入游戏服务器...", "", true);
        }
    }
}
