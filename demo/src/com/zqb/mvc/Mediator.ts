module weChat {
	export class Mediator extends MvcSender{
		private _name:string;
		private _viewComponent;
		public constructor(name?:string,viewComponent?: any) {
			super();
			this._name=name;
			this._viewComponent = viewComponent;
			var arr:Array<any>=this.listNotificationInterests();
			for(var i=0;i<arr.length;i++){
				MJLobbyEventListener.getInstance().addEventListener(arr[i],this.onHandle,this);
			}
		}
		public get name():string{
			return this._name;
		}
		private onHandle(evt:egret.Event):void{
			var data:MvcData=new MvcData(evt);
			this.handleNotification(data);
		}
		public listNotificationInterests(): Array<any> {
			return [];
		}
		public handleNotification(evt:MvcData): void {
			return
		}
		public onRemove():void{
			var arr:Array<any>=this.listNotificationInterests();
			for(var i=0;i<arr.length;i++){
				MJLobbyEventListener.getInstance().removeEventListener(arr[i],this.onHandle,this);
			}
		}

		public getViewComponent(): any{
			return this._viewComponent;
		}

		public setViewComponent(viewComponent:any): void{
			this._viewComponent = viewComponent;
		}
	}
}