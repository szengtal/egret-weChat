module weChat {
	export class LobbyEvents extends egret.EventDispatcher {
		private static _self: LobbyEvents = null;
		/**
		 * 加载完成
		 */
		public static NOTIFY_CONNECT_TIMEOUT: string = "NOTIFY_CONNECT_TIMEOUT";
		public static get Instance(): LobbyEvents {
			if (this._self == null) {
				this._self = new LobbyEvents();
			}
			return this._self;
		}
	}
}