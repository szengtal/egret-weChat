module weChat {
	export class MvcData {
		private _evt:egret.Event
		public constructor(evt:egret.Event) {
			this._evt=evt;
		}
		public getName():string{
			return this._evt.type;
		}
		public getBody():any{
			return this._evt.data;
		}
	}
}