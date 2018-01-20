module weChat {
	/**
	 *
	 * 基础button类
	 *
	 */
    export class LobbyGameButton extends egret.Sprite {
        private lable: egret.TextField;
        private srcArr: Array<string>;
        private _icon: egret.Bitmap;
        private _labelTxt: egret.TextField;
        private _label: string;
        private _area: egret.Sprite;
        private _autoDestory: boolean;
        private _adjective: egret.Bitmap;
        private _redPoint: egret.Bitmap;

        public constructor(arr: Array<string>, label: string = null, autoDestory: boolean = true) {
            super();
            this.srcArr = arr;
            this._label = label;
            this._autoDestory = autoDestory;
            this.initUI();
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
        }
        public addAdjective(name: string, x: number, y: number) {
            if (!this._adjective) {
                this._adjective = LobbyResUtil.createBitmapByName(name);
                this.addChild(this._adjective);
                this._adjective.x = x;
                this._adjective.y = y
            }
        }
        private onRemove(evt: egret.Event): void {
            if (this._autoDestory) {
                this.destory();
            }
        }
        private initUI(): void {
            var src: string;
            src = this.srcArr[0]
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            if (!this._icon) {
                this._icon = LobbyResUtil.createBitmapByName(src);
                this._icon.name = "icon"
                this.addChild(this._icon);
            } else {
                this._icon.texture = LobbyResUtil.createTexture(src);
            }
            if (this._label) {
                this._labelTxt = LobbyResUtil.createTextFeild(0xFFFFFF, egret.HorizontalAlign.CENTER, this._label, 20, 0, 10, this._icon.width);
                this.addChild(this._labelTxt);
            }
            this.anchorOffsetX = this._icon.width/2;
            this.anchorOffsetY = this._icon.height/2;
            
        }
        /**增加未读小红点,x,y为在目前基础上需要偏移的量
         * @param {string} res,小红点资源
         * @param {number} x,y,需要偏移的量，调整红点位置
         */
        public redPoint(res, x: number = 0, y: number = 0, scaleX?: number, scaleY?: number) {
            if (!RES.hasRes(res)) return;
            if (!this._redPoint) {
                this._redPoint = LobbyResUtil.createBitmapByName(res);
                this.addChild(this._redPoint);
            }
            this._redPoint.x = this._icon.width - (this._redPoint.width) + x;
            this._redPoint.y = this.height - this._icon.height + y;
            this._redPoint.touchEnabled = false;

        }
        /**移除小红点
        * @param 
        */
        public removeRedPoint() {
            if (this._redPoint) {
                LobbyResUtil.removeFromParent(this._redPoint);
                this._redPoint = null;
            }

        }
        private onTouchBegin(evt: egret.TouchEvent): void {
            if (RES.hasRes(this.srcArr[1])) {
                this._icon.texture = LobbyResUtil.createTexture(this.srcArr[1]);
            }
            this.scaleX = 1.1;
            this.scaleY = 1.1;
            if (RES.hasRes("buttonClick_mp3")) {
                uniLib.SoundMgr.instance.playSound("buttonClick_mp3");
            }
            this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.stage.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
        }
        private onTouchEnd(evt: egret.TouchEvent): void {
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            if (RES.hasRes(this.srcArr[1])) {
                this._icon.texture = LobbyResUtil.createTexture(this.srcArr[0]);
            }
            this.scaleX = 1;
            this.scaleY = 1;
        }
        public addClickArea(num: number): void {
            if (!this._area) {
                this._area = new egret.Sprite();
                this._area.touchEnabled = true;
                this.addChild(this._area)
            }
            this._area.graphics.clear();
            this._area.graphics.beginFill(0xff0000, 0);
            this._area.graphics.drawRect(-num, -num, this._icon.width + num * 2, this._icon.height + num * 2);
            this._area.graphics.endFill();
        }
        public destory(): void {
            this.touchEnabled = false;
            if (this.stage) {
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
            }
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            LobbyResUtil.removeFromParent(this);
            LobbyResUtil.removeAllChildren(this);
            this._area = null;
            this._icon = null;
            this._label = null;
            this._labelTxt = null;
            this._redPoint = null;

        }
    }
}
