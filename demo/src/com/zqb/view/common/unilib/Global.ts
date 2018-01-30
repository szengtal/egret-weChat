module uniLib {

    export class initOptions {
        /**
         * 游戏名称
         */
        title: string;
        /**
         * 游戏介绍
         */
        desc: string;
        /**
         * 游戏ICON
         */
        iconUrl: string;
        /**
         * 分享数据
         */
        shareData: any;

        /**
         * 日志级别
         */
        logLevel: number = 7;
        /**
         * 大厅模式
         */
        lobbyMode: boolean = false;
        /**
        * appId
        */
        appId: string;

        debug: boolean;

        scaleMode: string = "fixedWidth";

        nativeStorage: any;

        reLoginUrl: string;

        platId: number;

        designWidth: number;
        designHeight: number;
     
    }
    /**
    * 初始化库
    * @method uniLib.init
    * @param debugMode {boolen} 是否开启调试模式
    * @param payMode {boolen} 是否支付模块
    * @param payMode {boolen} 是否支付模块
    */
    export function init(param?: any, callBack?: any, thisObj?: any, scaleMode: string = "fixedWidth", lobbyMode: boolean = false): void {

        if (param instanceof Object || typeof (callBack) == "function") {
            if (param.designWidth) {
                Global.designWidth = param.designWidth;
            }

            if (param.designHeight) {
                Global.designHeight = param.designHeight;
            }

            if (uniLib["ScreenUtils"])
                uniLib["ScreenUtils"].init(param.scaleMode);
          
            Global.lobbyMode = param.lobbyMode;

            if (param.nativeStorage) {
                Global.nativeStorage = param.nativeStorage;
            }



            if (param.reLoginUrl) {
                Global.reLoginUrl = param.reLoginUrl;
            }

            if (param.platId) {
                Global.platId = param.platId;
            }

            if (param.appId)
                Global.appId = param.appId;
           
            else {
                if (callBack)
                    callBack.call(thisObj);
            }
        } else {
            //Global.initPlatInfo();
            if (uniLib["ScreenUtils"])
                uniLib["ScreenUtils"].init(scaleMode);
            if (thisObj) {
            }
            Global.lobbyMode = lobbyMode;
        }
        if (uniLib["ResUtils"]) {
            uniLib["ResUtils"].init();
        }
        // Set URL of your WebSocketMain.swf here:
        //window["WEB_SOCKET_SWF_LOCATION"] = "WebSocketMain.swf";
        //window["WEB_SOCKET_DEBUG"] = true;
        if (uniLib["ZQGameSdk"]) {
            uniLib["ZQGameSdk"].getCallStatus(Global.PhoneCallStatus, Global);
        }

    }

    //export function initLoginInfo(token:string):void{
    //    Global.token = token;
    //}

    //export function initPlatInfo(platinfo?: Pmd.PlatInfo): void {
    //    if (platinfo) {
    //        Global.platInfo = platinfo;
    //    } else {
    //        var platstr: string = Utils.getLocalStorage("platStr");
    //        if (!StringUtils.stringIsNullOrEmpty(platstr)) {
    //            this.platInfo = BrowersUtils.GetRequests(platstr);
    //            if (this.platInfo["debug"] != null) {
    //                delete this.platInfo["debug"];
    //            }
    //        } else {
    //            this.platInfo = new Pmd.PlatInfo();
    //            this.platInfo.account = BrowersUtils.GetRequest("account");
    //            this.platInfo.email = BrowersUtils.GetRequest("email");
    //            this.platInfo.platid = BrowersUtils.GetRequest("platid");
    //            this.platInfo.gender = BrowersUtils.GetRequest("gender");
    //            this.platInfo.nickname = BrowersUtils.GetRequest("nickname");
    //            this.platInfo.timestamp = BrowersUtils.GetRequest("timestamp");
    //            if (BrowersUtils.GetRequest("gameid"))
    //                this.platInfo["gameid"] = BrowersUtils.GetRequest("gameid");
    //            if (BrowersUtils.GetRequest("uid"))
    //                this.platInfo["uid"] = BrowersUtils.GetRequest("uid");
    //            this.platInfo.sign = BrowersUtils.GetRequest("sign");
    //        }
    //    }
    //}

    export function cloneObj(obj) {
        var newobj, str;
        if (typeof obj !== 'object') {
            return;
        } else {
            for (var i in obj) {
                newobj[i] = typeof obj[i] === 'object' ?
                    cloneObj(obj[i]) : obj[i];
            }
        }
        return newobj;
    }

    export class Global {
        public static PhoneCallStatus(msg: any): void {
            if (msg.data.callState == "callDisconnected") {
       
            }
        }
        //JSON字典压缩
        public static Compress(msg: any): any {
            if (!Global.jsonCompress) {
                for (var i = 0; i < Global.jsonCompress.msglist.length; i++) {
                    if (Global.jsonCompress.msglist[i] == msg["do"]) {
                        msg["do"] = i + 1;
                    }
                }
                return msg;
            }
            return msg;
        }
        //JSON字典解压
        public static DeCompress(msg: any): any {
            for (var i = 0; i < Global.jsonCompress.msglist.length; i++) {
                if (i + 1 == msg["do"]) {
                    msg["do"] = Global.jsonCompress.msglist[i];
                }
            }
            return msg;
        }
        public static DeCompressDefult(msg: any): any {
            for (var i = 0; i < Global.jsonCompressDefault.msglist.length; i++) {
                if (i + 1 == msg["do"]) {
                    msg["do"] = Global.jsonCompressDefault.msglist[i];
                }
            }
            return msg;
        }

        public static isH5: boolean =false;
        public static isActive: boolean = true;

        /**
        * 本地存储
        */
        public static nativeStorage: any;
        public static jsonCompress: any; //JSON压缩字典
        public static jsonCompressDefault: any; //JSON压缩字典,只是用来比较,不能直接使用

        public static debugLevel: number = 0;
        /**
         * 屏幕高度
         */
        public static screenHeight: number;
        public static version: number = 161128235600;


        public static compressMin: number = 0;

        /**
         * 屏幕宽度
         */
        public static screenWidth: number;
        /**
         * 素材宽度
         */
        public static designWidth: number = 1280;

        /**
         * 素材高度
         */
        public static designHeight: number = 720;

        public static isRestarting: boolean = false;

        /**
         * 当前游戏接入平台id
         */
        //public static platId: number;

        public static gameId: number = 0;
        public static lobbyGameId: number = 0;

        public static stage: any;

        public static is_sandbox: number = 0;

        //public static socketLoginSuc: Function;
        //public static socketLoginFail: Function;
        //public static socketLoginObj: Function;

        //public static wechatAppId: string = "wx0e52b1eba8f9fb14";
        public static appId: string = "wx0e52b1eba8f9fb14";

        public static thirdPlatDir: string = "thirdPlatDir/";

        //全局字体颜色表--可以扩展
        public static TextColors = {
            white: 0xFFFFFF,//白色
            milkWhite: 0xfbf1af,//乳白色 
            grayWhite: 0xceb6a2,//灰白色
            yellow: 0xffff00,//金黄色 
            lightYellow: 0xffd375,//淡黄色
            orangeYellow: 0xff9900,//橘黄色//道具名称 //玩家姓名
            red: 0xf11300,//红色
            green: 0x00e500,//绿色 
            blue: 0x1a94d7,//蓝色 
            grayBlue: 0x2f5177,//墨蓝色 
            purple: 0xe938f2,//紫色 
            pink: 0xFF3030,//粉色 
            black: 0x2e2d2d,//黑色
            golden: 0xFFD700 //金色
        }

        //public static currentGame:


        //public static getLoginExtData(): any {
        //    if (uniLib.BrowersUtils.GetRequest("extdata")) {
        //        var ext: any = JSON.parse(uniLib.BrowersUtils.GetRequest("extdata"));
        //        if (ext) {
        //            return ext;
        //        }
        //    }
        //    return null;
        //}

        //public static LobbyPlatInfo: Pmd.PlatTokenLoginReturn;
        public static LobbyPlatInfo: any;

        private static _lobbyMode: boolean = false;

        public static isInGame: boolean = false;

        public static reLoginUrl: string = "";

        //public static platId: number=0;

        public static payPlatId: number = 0;

        /**
        * 苹果bundleId
        */
        public static bundleId: string = "";

        /**
        * config uniLib.DefaultConfig 兼容
        */
        public static defaultConfig: any;
        public static gameConfig: any;
        /**
        * 是否大厅模式
        */
        public static get lobbyMode(): boolean {
            //if (uniLib["GameModuleUtils"])
            //    return uniLib["GameModuleUtils"].isLobbyMode();
            return this._lobbyMode;
        }

        public static set lobbyMode(b: boolean) {
            this._lobbyMode = b;
        }

        /**
        * 登陆场景
        */
        public static LoginScene: any;

        /**
        * 是否缓存token
        */
        public static isCacheToken: boolean = true;

        /**
        * 日志地址
        */
        public static logUrl: string = "http://server.login.bwgame.com.cn:8020/logger/clientlog";

        /**
        * GM等级
        */
        public static gmlevel: number = 0;


        

    



        public static token: string = "";


        /**
        * 内存缓存 暂时用于存储头像数据
        */
        public static localCache: any;

        /**
        * 资源版本
        */
        public static get resVersion(): string {
            var vs: string = "";
            if (uniLib.Global.isH5) {
                var elm = document.querySelector('meta[name="res-version"]');
                if (elm != null)
                    vs = elm.getAttribute('content');
                if (vs != null && vs != "") {
                    vs = "_" + vs;
                }
            }
            return vs;
        }

        /**
        * 皮肤版本
        */
        public static get thmVersion(): string {
            var vs: string = "";
            if (uniLib.Global.isH5) {
                var elm = document.querySelector('meta[name="thm-version"]');
                if (elm != null)
                    vs = elm.getAttribute('content');
                if (vs != null && vs != "") {
                    vs = "_" + vs;
                }
            }
            return vs;
        }

         public static getPlatId(): number {
             return 0
         }

        public static platId: number = 0;
        public static zoneId: number = 0;
        public static logintempid: number;//大厅和游戏用同一个网关,这里缓存下,只要大厅登录成功,游戏就不用再登录

        public static setPlatInfo(str: string, platId?: number, gameId?: number): void {
            Utils.setLocalStorage(gameId + "|" + platId + "|platToken", str);
        }

        public static setPlatToken(str: string, platId?: number, gameId?: number): void {
            Global.platId = platId;
            Global.gameId = gameId;
            Utils.setLocalStorage(gameId + "|" + platId + "|platToken", str);
        }

        /**
         * 打开代理系统地址
         * @param agentUrl
         * @param code
         * @param uid
         */
        public static openAgent(agentUrl: string, code: string, platid: number, gameid: number, model?: number): void {
            var url = agentUrl + "?code=" + code + "&platid=" + platid + "&gameid=" + gameid;// + "&zoneid=" + this.zoneId;
            if (uniLib["ZQGameSdk"]) {
                uniLib["ZQGameSdk"].openWeb(url, model);
            }
        }




    }
}




//delete testh5;
