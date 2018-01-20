module weChat {
	/**
	 * 数据加载动画
	 */
	export class DataLoading  extends egret.DisplayObjectContainer{
		private _loadingImg:egret.Bitmap;
		private _timer:egret.Timer;
		public constructor() {
			super();
			this.initUI();
		}
		public initUI():void{
			this._loadingImg=LobbyResUtil.createBitmapByName("mjl_dataLoading");
			this._loadingImg.x=-this._loadingImg.width/2;
			this._loadingImg.y=-this._loadingImg.height/2;
			this.addChild(this._loadingImg);
		}
		public play():void{
			this.stopTimer();
			this._timer=new egret.Timer(50,0);
			this._timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
			this._timer.start();
		}
		public destory():void{
			LobbyResUtil.removeAllChildren(this);
			LobbyResUtil.removeFromParent(this);
			this.stopTimer();
			this._loadingImg=null;
		}
		private stopTimer():void{
			if(this._timer){
				this._timer.removeEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
				this._timer.stop();
				this._timer=null;
			}
		}
		private onTimer(evt:egret.TouchEvent):void{
			this.rotation=this.rotation-10;
		}
	}
}