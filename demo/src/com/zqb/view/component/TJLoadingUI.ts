/**
 * 延用以前淘金的
 * 加载动画
 */

class TJLoadingUI extends egret.Sprite {
    public constructor() {
        super();
        this.init();
    }
    private back: egret.Sprite = new egret.Sprite;
    private _loadingBG: egret.Bitmap = new egret.Bitmap;
    private _loadingLogo:egret.Bitmap=new egret.Bitmap;
    private promptText: egret.TextField = new egret.TextField;
    private loadPanel:egret.Sprite = new egret.Sprite;
    private text: Array<any> = [
        "",
        "",
        ""
    ]

    private init(): void {
        this.back = uniLib.DisplayUtils.createMask(1,weChat.LobbyDataCache.defaultWidth,weChat.LobbyDataCache.defaultWidth,0x000000);
        this.back.touchEnabled = false;
        this.addChild(this.back);
            // this._loadingBG.texture = RES.getRes("preLoad_bg_png");
            // this._loadingBG.anchorOffsetX = this._loadingBG.width * 0.5;
            // this._loadingBG.anchorOffsetY = this._loadingBG.height * 0.5;
            // this._loadingBG.x = weChat.LobbyDataCache.defaultWidth / 2;
            // this._loadingBG.y = weChat.LobbyDataCache.defaultHeight / 2;
            // this.back.addChild(this._loadingBG);
            // // this.loadPanel.addChild(this._loadingLogo);
            // // this.promptText.text = this.text[Math.floor(Math.random() * 3)];
            // // this.promptText.x = (640 - this.promptText.width) / 2;
            // // this.promptText.y = (1136 - this.promptText.height) / 2 + 180;
            // // this.addChild(this.promptText);
            // egret.Tween.get(this._loadingBG,{ loop: true }).to({ rotation: 3600 },30000);

            // this._loadingLogo.texture = RES.getRes("preLoad_icon_png");
            // this._loadingLogo.anchorOffsetX = this._loadingLogo.width * 0.5;
            // this._loadingLogo.anchorOffsetY = this._loadingLogo.height * 0.5;
            // this._loadingLogo.x = weChat.LobbyDataCache.defaultWidth / 2;
            // this._loadingLogo.y = weChat.LobbyDataCache.defaultHeight / 2;
            // this.addChild(this._loadingLogo);
            this.promptText.text = this.text[Math.floor(Math.random() * 3)];
            this.promptText.x = (640 - this.promptText.width) / 2;
            this.promptText.y = (1136 - this.promptText.height) / 2 + 180;
            this.addChild(this.promptText);

    }

    private onAddToStage(e: egret.Event): void {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        egret.Tween.get(this._loadingBG,{ loop: true }).to({ rotation: 360 },600);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRemoveFromStage,this);
    }

    public setProgress(txt: any,cur: number,gpName: string) {

    }

    private onRemoveFromStage(e: egret.Event): void {
        egret.Tween.removeTweens(this._loadingBG);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRemoveFromStage,this);
    }
}
