module weChat {
	export class BaseButton extends eui.Button{
        public constructor() {
            super();
            this.init();
        }
        private init() {
            BC.addEvent(this, this, egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin);
            BC.addEvent(this, this, egret.TouchEvent.TOUCH_END, this.onTouchEnd);
            BC.addEvent(this, this, egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancel);
            BC.addEvent(this, this, egret.TouchEvent.TOUCH_MOVE, this.onTouchMove);
            BC.addEvent(this, this, egret.Event.REMOVED, this.dispose);
            

            // this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            // this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            // this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancel, this);
            // this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            // this.addEventListener(egret.Event.REMOVED,this.dispose,this);
        }
        protected onTouchBegin() 
        {
            this.scaleX = 1.1;
            this.scaleY = 1.1;
            if (RES.hasRes("buttonClick_mp3")) {
                uniLib.SoundMgr.instance.playSound("buttonClick_mp3");
            }
        }
        protected onTouchEnd() {
            this.scaleX = 1;
            this.scaleY = 1;
        }
        protected onTouchCancel() {
            this.scaleX = 1;
            this.scaleY = 1;
        }
        protected onTouchMove() {
            this.scaleX = 1;
            this.scaleY = 1;
        }
        public dispose() {
             BC.removeEvent(this);
        }
    }
}