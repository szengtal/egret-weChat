module weChat {
	export class BaseImage extends eui.Image{
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