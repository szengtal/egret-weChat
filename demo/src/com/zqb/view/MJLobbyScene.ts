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
console.error("LobbyMainGameLayer");
			
		var menu = new weChat.MJLobbyMenuVc();
		menu.y =egret.MainContext.instance.stage.stageHeight -1280
		// menu.y =-128
		egret.MainContext.instance.stage.addChild(menu)
console.error("menu",menu);
console.error("---------------menu");

			// this.scaleX = uniLib.Global.screenWidth / 1280;
			// // else
			// this.scaleY = uniLib.Global.screenHeight / 720;
			uniLib.UIMgr.instance.hideLoading(PublicLoadingView);

		}
		public destroy(): void {
		}
	}
}