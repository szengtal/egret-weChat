

// http://14.17.104.12:9000/httplogin
// http://login.publish.bwgame.com.cn:9000/httplogin
// 资源配置，您可以访问
// https://github.com/egret-labs/resourcemanager/tree/master/docs
// 了解更多细节 
// @RES.mapConfig("config.json",()=>"resource",path => {
//     var ext = path.substr(path.lastIndexOf(".") + 1);
//     var typeMap = {
//         "jpg": "image",
//         "png": "image",
//         "webp": "image",
//         "json": "json",
//         "fnt": "font",
//         "pvr": "pvr",
//         "mp3": "sound"
//     }
//     var type = typeMap[ext];
//     if (type == "json") {
//         if (path.indexOf("sheet") >= 0) {
//             type = "sheet";
//         } else if (path.indexOf("movieclip") >= 0) {
//             type = "movieclip";
//         };
//     }
//     return type;
// })
class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView: LoadingUI;
    private bundleId: string;
    private version: string;
    private bundleInfo: any;
    private _hasExit: boolean;

    public constructor(params?: any) {
        super();
        // uniLib.Global.is_sandbox = 1;
        // weChat.ViewConfig.loginPanelName = uniLib.getQualifiedClassName(weChat.LobbyLoginPanel_new);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.start, this);
        RES.setMaxLoadingThread(4);
        egret.ImageLoader.crossOrigin = "anonymous";
        // if (egret && uniLib.BrowersUtils.GetRequest("debug") != "true") {
        //     egret.MainContext.instance.stage.addEventListener(egret.Event.DEACTIVATE, this.onDeActive, this);
        // }
    }

    public onDeActive(e: egret.Event): void {
        // uniLib.ZQGameSdk.speakerActive();
    }

    public start(e: egret.Event = null): void {
        // uniLib.Global.is_sandbox = 0;
        var assetAdapter = new AssetAdapter();
        this.stage.registerImplementation("eui.IAssetAdapter", assetAdapter);
        this.stage.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        var a = {};

        var initData: uniLib.initOptions = <uniLib.initOptions>{};
        initData.lobbyMode = true;
        initData.designWidth = 720;
        initData.designHeight = 1280;
        initData.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
        initData.debug = true;
        // initData.msgTimeOutSec = 3;
        uniLib.init(initData);
        uniLib.Global.lobbyMode = true;
        uniLib.UIMgr.instance.showLoadingTimeout(TJLoadingUI, "", 0);
        uniLib.UIMgr.instance.commonLoadUI = PublicLoadingView// ;
        uniLib.UIMgr.instance.tipsLoadUI = HaoCaiTipLoading;
    
        this.loadResConfig();

        egret.lifecycle.addLifecycleListener((context) => {
        })
        egret.lifecycle.onPause = () => {
            console.error("游戏被暂停了哦");
            if (uniLib.Global.isH5 == true) {
              
                    egret.ticker.pause();
            } else {
                if (RELEASE)
                    egret.ticker.pause();
            }
        }
        egret.lifecycle.onResume = () => {
            console.error("游戏被恢复了哦");
            if (uniLib.Global.isH5 == true) {
              
                    egret.ticker.resume();
            } else {
                if (RELEASE)
                    egret.ticker.resume();
            }
        }


        //     uniLib.ZQGameSdk.init(this.onInitZQGameSkd, this);

    }

    private loadResConfig(): void {
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/weChat.res.json", "resource/");
    }

    private onConfigComplete(event: RES.ResourceEvent): void {
        var theme = new eui.Theme("resource/weChat.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onThemeLoadComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        uniLib.UIMgr.instance.hideLoading(TJLoadingUI);
        // this.preloadGame();
        var preloadStr: string = "sz_preload";
        uniLib.ResLoadMgr.instance.load(preloadStr, this.onResourceLoadComplete, this.onResourceLoadError, this, uniLib.GameScene);
    }
    /**
    * preload资源组加载完成
    * Preload resource group is loaded
    */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        // if (event.groupName == "preLoadAll") {
            this.preLoadEnd();
        // } else {
        //     this.preloadGame();
        // }
    }
    public preLoadEnd(): void {
        // weChat.variableCommon.getInstance().playBgMusic();
        BC.removeEvent(this, egret.MainContext.instance.stage, egret.Event.ACTIVATE, this.onGameActivateHandler);
        BC.addEvent(this, egret.MainContext.instance.stage, egret.Event.ACTIVATE, this.onGameActivateHandler);
        // uniLib.UIMgr.instance.hideLoading(PublicLoadingView);

        uniLib.UIMgr.instance.hideLoading();
        this.showLogin();
    }

 
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent): void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent): void {
        //TODO
        weChat.LobbyResUtil.trace("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event: RES.ResourceEvent): void {
        if (event.groupName == "sz_preload") {
            this.loadingView.onProgress(event.itemsLoaded, event.itemsTotal);
        }
    }
    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene(): void {
        			window["weChat"] = weChat;

                    var gameScene = new weChat.MJLobbyScene();
                    this.addChild(gameScene)
        // uniLib.SceneMgr.instance.changeScene(weChat.MJLobbyScene);
        console.error("创建游戏场景");

    }

 
    private showLogin(): void {
        var gameId: number;
        var data: any = RES.getRes("lobbyConfig_json");
        console.error("showLogin" + data);

        this.loadRes();

    }

    public onLogout(): void {
        console.log("注销游戏进入" + uniLib.Global.gameId + ":" + uniLib.Global.getPlatId());
        uniLib.SceneMgr.instance.changeScene(weChat.MJLobbyScene);
    }

  

    private loadRes() {
        var strArr: Array<string> = [];
        strArr = ["sz_assets", "sz_table", "CommonUI", "sz_sound"];
        if (uniLib.Global.is_sandbox != 1) {
            //strArr.push("mjl_other");
        }
        weChat.LobbyResUtil.trace("onGameConfigComplete:" + strArr);
        // RES.createGroup("preLoadAll", strArr);
        var arr: Array<any> = RES.getRes("");
        uniLib.ResLoadMgr.instance.loadGrps(strArr, this.createGameScene, this.onResourceLoadError, this, PublicLoadingView, false, null, arr);

    }

    private onResGrpComplete(event: RES.ResourceEvent): void {
        this.preLoadEnd();
    }

    private onGameActivateHandler(evt: egret.Event): void {
        if (evt.type == egret.Event.ACTIVATE) {
            weChat.variableCommon.getInstance().removeVirtual();
        }
        if (egret.ticker) {
            egret.ticker.resume();
        }
    }

    public destory(): void {
    }

}



