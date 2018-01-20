/**
 * 添加二级面板缓冲 延用以前淘金的
 */
class LoadSecondPanel extends egret.Sprite {

    // private quan_bmp: egret.Bitmap;
    private _armature:dragonBones.FastArmature | dragonBones.Armature;
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
        if(RES.hasRes("mjl_loading_drag_json")){
            this._armature = uniLib.DisplayUtils.createDragonBonesDisplay("mjl_loading_drag_json", "mjl_loading_json","mjl_loading_png","MovieClip");
            dragonBones.WorldClock.clock.add(this._armature);
            egret.Ticker.getInstance().register(function (frameTime: number) { dragonBones.WorldClock.clock.advanceTime(-1); }, this);
            this._armature.display.x =Math.round((weChat.LobbyDataCache.defaultWidth) / 2);
            this._armature.display.y = Math.round((weChat.LobbyDataCache.defaultHeight ) / 2-15);
            this.addChild(this._armature.display);
        }
    }
    private onAddToStageHandler(evt: egret.Event): void {
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStageHandler, this);
        if(this._armature){
            this._armature.animation.play();
        }else{
            this.init();
            // uniLib.Console.error("LoadSecondPanel onAddToStageHandler err,临时处理,等qiqiongqiong搞定,WHJ");
        }
    }

    private onRemoveFromStageHandler(evt: egret.Event): void {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStageHandler, this);
        if(this._armature){
            this._armature.animation.stop();
            dragonBones.WorldClock.clock.remove(this._armature);
            this._armature=null;
            egret.Ticker.getInstance().unregister(function (frameTime: number) { dragonBones.WorldClock.clock.advanceTime(-1); }, this);
        }
        weChat.LobbyResUtil.removeAllChildren(this);
        weChat.LobbyResUtil.removeFromParent(this);

    }
    
    public setProgress(){
    }

}
