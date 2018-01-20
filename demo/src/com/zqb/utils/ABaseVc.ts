module weChat {
	/**
	 * 基础显示类
	 */
	export class LobbyBaseVc extends egret.DisplayObjectContainer{
		private _dataLoading:DataLoading;
		public constructor() {
			super();
			this.initUI()
		}
		public initUI():void{
		}
		public showDataLoading(x?:number,y?:number):void{
			if(this._dataLoading){
				return;
			}
			this._dataLoading = new DataLoading();
			if (x) {
				this._dataLoading.x = x;
			} else {
				this._dataLoading.x = Math.round(this.width / 2);
			}
			if (y) {
				this._dataLoading.y = y;
			} else {
				this._dataLoading.y = Math.round(this.height / 2);
			}
			
			this.addChild(this._dataLoading);
			this._dataLoading.play();
		}
		public removeLoading(): void {
			if (this._dataLoading) {
				this._dataLoading.destory();
				this._dataLoading = null;
			}
		}
		public destory():void{
			LobbyResUtil.removeFromParent(this);
			LobbyResUtil.removeAllChildren(this);
			this.removeLoading();
		}
	}
}