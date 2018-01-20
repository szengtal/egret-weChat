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
           
        }

        public loginOut(): void {
        }
		/**
         * http平台登录完成
         */
        private onHttpInitSucc(obj: any): void {
            egret.clearTimeout(this._timeOutId);
            //下面可以通过uniLib.NetMgr.httpSend发送http消息了
        }

        private onHttpInitFail(): boolean {
            egret.clearTimeout(this._timeOutId);
           return false
            // }
        }

        // private updateConfig(): void {
        //     this.updatedConfig = true;
        //     // uniLib.ZQGameSdk.pullCfg(this.onDown, this);
        //     uniLib.ZQGameSdk.getConfig("当前客户端版本过低,点击确定重启更新。","","确定");
        // }

        private onDown(msg: any): void {
       
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
  


        private getRemoteConfig(): void {

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

            uniLib.UIMgr.instance.showProcessBar(PublicLoadingView, 96, 100, "正在进入游戏服务器...", "", true);
        }
    }
}
