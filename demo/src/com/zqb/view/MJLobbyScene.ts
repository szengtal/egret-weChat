module weChat {
	/**
	 * 游戏场景
	 */
	export class MJLobbyScene extends egret.DisplayObjectContainer {
		public constructor() {
			super();
			this.start();
		}
		public start(e: egret.Event = null): void {
			var a = new weChat.LobbyMainGameLayer();
			this.addChild(a)
			
				var menu = new weChat.MJLobbyMenuVc();
			this.addChild(menu)

			// this.scaleX = uniLib.Global.screenWidth / 1280;
			// // else
			// this.scaleY = uniLib.Global.screenHeight / 720;
			uniLib.UIMgr.instance.hideLoading(PublicLoadingView);

		}
		public destroy(): void {
		}
	}
}