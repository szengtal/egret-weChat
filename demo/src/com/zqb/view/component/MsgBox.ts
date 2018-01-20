module weChat {
	/**
	 * 确定面板
	 */
    export class LobbyMsgBox extends egret.Sprite {
        private yesBtn: LobbyGameButton;
        private noBtn: LobbyGameButton;
        private title: egret.TextField;
        private info: egret.TextField;
        private _backFn: Array<Function>;
        private _backObj: any;
        private _needClose: boolean;//是否需要closeBtn
        public constructor(needClose: boolean) {
            super();
            this.touchEnabled = true;
            this._needClose = needClose;
            this.initUI();
        }
        private initUI(): void {
            // weChat.LobbyPopupManager.showConfirmPanel("为了您的账号财产安全，请使用正式账号登陆充值！", ["确定"], null, "", null,0,true);
            console.error("确定面板确定面板");
            
            var bg: egret.Bitmap = LobbyResUtil.createBitmapByName("sz_Lobby_UserInfo_Nickname_Bg");
            bg.scale9Grid = new egret.Rectangle(180, 60, 90, 60);
            bg.width = 665;
            bg.height = 371;
            this.addChild(bg);
            this.title = LobbyResUtil.createTextFeild(0x3e3e49, egret.HorizontalAlign.CENTER, "", 32, 140, 18, 191);
            this.info = LobbyResUtil.createTextFeild(0xffffff, egret.HorizontalAlign.CENTER, "", 28, 40, 59, 588);
            this.info.lineSpacing = 15;
            this.addChild(this.info);
            this.addChild(this.title);

            if (this._needClose) {
                var closeBtn: LobbyGameButton = new LobbyGameButton(["sz_Lobby_help_close", "sz_Lobby_help_close"]);
                closeBtn.x = bg.width - 26;
                closeBtn.y = 20;
                closeBtn.addClickArea(20);
                closeBtn.touchEnabled = true;
                closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMsgClose, this);
                this.addChild(closeBtn);
            }
             variableCommon.getInstance().LobbyPopArray.push({ _this: this, fun: "onMsgClose" })
        }
        public onMsgClose(): void {
            egret.Tween.removeTweens(this);
            egret.Tween.get(this).to({ alpha: 0 }, 200).call(this.removeTarget, this, [this]);

        }

        private removeTarget() {
            LobbyPopupManager.removePopUp("onMsgClose", this);
            this.dispatchEventWith(LobbyUIEventConsts.CLOSE);
            this.destory();
        }
        public setData(title: string, msg: string, labelarr: Array<any> = null, backFn: Array<Function> = null, backObject: any = null, countdown: number = 0, size: number = 28, align: string = egret.HorizontalAlign.CENTER): void {
            this._backFn = backFn;
            this._backObj = backObject;
            this.info.size = size;
            this.title.text = title;
            this.info.text = msg;
            this.info.textAlign = align;
            this.info.y = 40 + Math.round((254 - this.info.textHeight) / 2);
            if (labelarr.length == 1) {
                if (!labelarr[0] || labelarr[0] == "确定"||labelarr[0] == "") {
                    labelarr[0] = "sz_Lobby_ComBtn1";
                }
                this.yesBtn = new LobbyGameButton([labelarr[0], labelarr[0]]);
                this.yesBtn.x = Math.round((this.width - this.yesBtn.width) / 2)+this.yesBtn.width/2 ;
                this.yesBtn.y = this.height - 165+this.yesBtn.height/2;
                if (labelarr[0] == "sz_Lobby_ComBtn1") {
                    let yesWord = LobbyResUtil.createBitmapByName("sz_common_sure_png", 50, 17);
                    this.yesBtn.addChild(yesWord);
                }
                this.addChild(this.yesBtn);
            } else if (labelarr.length == 2) {
                if (!labelarr[0] || labelarr[0] == "") {
                    labelarr[0] = "确定";
                }
                if (!labelarr[1] || labelarr[1] == "") {
                    labelarr[1] = "取消";
                }
                this.yesBtn = new LobbyGameButton(["sz_Lobby_ComBtn1", "sz_Lobby_ComBtn2"]);
                this.yesBtn.x = 635 / 2 - this.yesBtn.width - 10+this.yesBtn.width/2;
                this.yesBtn.y = 260 +this.yesBtn.height/2;
                if (labelarr[0] == "确定") {
                    let yesWord = LobbyResUtil.createBitmapByName("sz_common_sure_png", 50, 17);
                    this.yesBtn.addChild(yesWord);
                }
                this.addChild(this.yesBtn);
                this.noBtn = new LobbyGameButton(["sz_Lobby_ComBtn1", "sz_Lobby_ComBtn2"]);
                this.noBtn.x = 635 / 2 + 10+this.noBtn.width/2;
                this.noBtn.y = 260+this.noBtn.height/2;

                if (labelarr[1] == "取消") {
                    let noWord = LobbyResUtil.createBitmapByName("sz_common_cancel_png", 50, 17);
                    this.noBtn.addChild(noWord);
                }
                this.addChild(this.noBtn);
            }
            if (this._backFn && this._backFn[0]) {
                this.yesBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._backFn[0], this._backObj);
            }
            if (this._backFn && this._backFn[1]) {
                this.noBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._backFn[1], this._backObj);
            }
            if (this.yesBtn) {
                this.yesBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMsgClose, this);
            }
            if (this.noBtn) {
                this.noBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMsgClose, this);
            }
            this.title.x = (635 - this.title.width) / 2;
        }
        public set titleY(value: number) {
            this.title.y = value;
        }
        public set titleColor(value: number) {
            this.title.textColor = value;
        }
        public set msgColor(value: number) {
            this.info.textColor = value;
        }
        public destory(): void {
            if (this.yesBtn) {
                if (this._backFn && this._backFn[0]) {
                    this.yesBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._backFn[0], this._backObj);
                }
                this.yesBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMsgClose, this);
                this.yesBtn = null;
            }
            if (this.noBtn) {
                this.noBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMsgClose, this);
                if (this._backFn && this._backFn[1]) {
                    this.noBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._backFn[1], this._backObj);
                }
                this.noBtn = null;
            }
            this.title = null;
            this.info = null;
            this._backFn = null;
            this._backObj = null;
            LobbyResUtil.removeFromParent(this);
            LobbyResUtil.removeAllChildren(this);

        }

    }
}
