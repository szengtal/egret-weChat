/**
 * 添加二级面板缓冲 延用以前淘金的
 */
class HaoCaiTipLoading extends egret.Sprite {

    // private quan_bmp: egret.Bitmap;
    private _loadingMc1: egret.MovieClip;

    // private _armature:dragonBones.FastArmature | dragonBones.Armature;
    constructor() {
        super();
        this.init();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStageHandler, this);
    }

    private init() {
        weChat.LobbyResUtil.removeAllChildren(this);
        var bg: eui.Rect = new eui.Rect(weChat.LobbyDataCache.defaultWidth, weChat.LobbyDataCache.defaultHeight, 0x000000);
        bg.alpha = 0.45;
        this.addChildAt(bg, 0);
        

    }

    private onAddToStageHandler(evt: egret.Event): void {
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStageHandler, this);
      
        this._loadingMc1 = weChat.LobbyResUtil.createMovieClicp("sz_Lobby_Loading", "loadingMc1");
        this._loadingMc1.x = (weChat.LobbyDataCache.defaultWidth) / 2;
        this._loadingMc1.y = (weChat.LobbyDataCache.defaultHeight) / 2 - 15;
        this._loadingMc1.play(-1);
        egret.MainContext.instance.stage.addChild(this._loadingMc1)
        this.addChild(this._loadingMc1);  

        
      
    }

    private onRemoveFromStageHandler(evt: egret.Event): void {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStageHandler, this);
        uniLib.DragonUtils.removeFastDragonbyContainer(this);
        if (this._loadingMc1) {
            this._loadingMc1.stop();
            uniLib.DisplayUtils.removeFromParent(this._loadingMc1);
        }
        this._loadingMc1 = null;
        
        weChat.LobbyResUtil.removeFromParent(this);

    }

    public setProgress() {
    }

}
