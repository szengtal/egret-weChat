/**
 * 公共加载 
 */
class PublicLoadingView extends egret.Sprite {
    public constructor() {
        super();
        this.init();
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);

    }

    private onRemove(e: egret.Event): void {
        console.error("公共加载");
    }

    private backgroud_bmp: egret.Bitmap;
    private darkLine_bmp: egret.Bitmap;
    private lightLine_bmp: egret.Bitmap;
    private lightLine_bmp1: egret.Bitmap;
    private lightLine_bmp2: egret.Bitmap;

    private explain_txf: egret.TextField;
    public static explain: string = "正在加载游戏资源...";
    private _progTxt: egret.TextField;
    private _versionTxt: egret.TextField;
    private _pointArr: egret.Sprite;
    private pointNum: number[] = [1, 2, 4, 5, 7, 8, 10, 11, 13, 15, 15]

    public init(): void {
			// uniLib.Utils.restart("更新完成,点击确定重启", "确定");
	// this.scaleX = uniLib.Global.screenWidth / 1280;
    //     // else
    //         this.scaleY = uniLib.Global.screenHeight /720;
        // alert("公共加载公共加载公共加载")
        if (!this.backgroud_bmp) {
            this.backgroud_bmp = weChat.LobbyResUtil.createBitmapByName("Login_bg_jpg");
            this.backgroud_bmp.width =weChat.LobbyDataCache.defaultWidth;
            this.backgroud_bmp.height = egret.MainContext.instance.stage.stageHeight ;
            egret.MainContext.instance.stage.addChild(this.backgroud_bmp)
            // this.addChild(this.backgroud_bmp);
        }
        if (!this.darkLine_bmp) {
            this.darkLine_bmp = weChat.LobbyResUtil.createBitmapByName("Login_Progress_bg", 428, 491.5);
            this.addChild(this.darkLine_bmp);
        }
        if (!this._pointArr) {
            this._pointArr = new egret.Sprite();
            this._pointArr.x = 442.5;
            this._pointArr.y = 493;
            this.addChild(this._pointArr);
        }

        // let test = weChat.LobbyResUtil.createBitmapByName("Login_bg");
        // test.alpha = 0.5;
        // egret.MainContext.instance.stage.addChild(test);
        // egret.setTimeout(() => {
        //     uniLib.DisplayUtils.removeFromParent(test)
        // }, this, 1000)


        if (!this.lightLine_bmp) {
            this.lightLine_bmp = weChat.LobbyResUtil.createBitmapByName("Login_Brd", 594, 582.63);
            this.addChild(this.lightLine_bmp);
        }
        if (!this.lightLine_bmp1) {
            this.lightLine_bmp1 = weChat.LobbyResUtil.createBitmapByName("Login_bottom1", 26.17, 618.66);
            this.addChild(this.lightLine_bmp1);
        }
        if (!this.lightLine_bmp2) {
            this.lightLine_bmp2 = weChat.LobbyResUtil.createBitmapByName("Login_bottom2", 220, 652.98);
            this.addChild(this.lightLine_bmp2);
        }

        if (!this._progTxt) {
            this._progTxt = weChat.LobbyResUtil.createTextFeild(0xf57e27, egret.HorizontalAlign.CENTER, "", 22, 351, uniLib.Global.screenHeight - (154 ), 246);
            //  this.addChild(this._progTxt);
        }

        if (!this.explain_txf) {
            this.explain_txf = weChat.LobbyResUtil.createTextFeild(0xf57e27, egret.HorizontalAlign.CENTER, "", 24, 490, uniLib.Global.screenHeight - (180 ), 246);
            this.addChild(this.explain_txf);
        }

    }

    public setProgress(loaded: number, total: number, desc?: string, resourceName?: string, force: boolean = false): void {
        if (!this._versionTxt) {
            this._versionTxt = weChat.LobbyResUtil.createTextFeild(0x999999, egret.HorizontalAlign.RIGHT, weChat.LobbyDataCache.version, 22, 864);
            this._versionTxt.x = uniLib.Global.screenWidth - this._versionTxt.width;
            this._versionTxt.y = uniLib.Global.screenHeight - this._versionTxt.height;
            this.addChild(this._versionTxt);
            this._versionTxt.text = weChat.LobbyDataCache.version;
        }

        if (total && total != 0) {
            var num: number = Math.ceil((loaded / total) * 100);
            let pointNum = this.pointNum[Math.round(num / 10) - 1];
            if (!pointNum) { return; }
            this._pointArr.removeChildren();
            for (let i = 0; i < pointNum; i++) {
                let point = new egret.Bitmap(RES.getRes("sz_Lobby_loadingPoint"));
                point.x = i * 26.5;
                this._pointArr.addChild(point);
            }

            if (desc && desc != "") {
                this.explain_txf.text = desc;
            }
            // else {
            //     this.explain_txf.text = PublicLoadingView.explain;
            // }

            if (force == false && num > 93) {
                num = 93;
            }
            // var widthX: number = (this.darkLine_bmp.width - 0) * (num / 100);
            // this.lightLine_bmp.width = widthX;
            // if (this._progTxt) {
            //     this._progTxt.text = num + "%";
            // }
        }
        else {
            // this.explain_txf.text = desc;
        }
        // this.explain_txf.x = (weChat.LobbyDataCache.defaultWidth - this.explain_txf.width) / 2;

    }

    public destroy() {
        uniLib.DragonUtils.removeFastDragonbyContainer(this)
    }

}