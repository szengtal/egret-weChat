module weChat {
	export class MJLobbyEventListener extends egret.EventDispatcher{
		private static _instance:MJLobbyEventListener;
		public constructor() {
			super();
		}
		public static getInstance():MJLobbyEventListener{
			if(!this._instance){
				this._instance=new MJLobbyEventListener
			}
			return this._instance;
		}
	}
}