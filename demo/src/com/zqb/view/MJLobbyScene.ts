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
			menu.y = egret.MainContext.instance.stage.stageHeight - 1280
			// menu.y =-128
			egret.MainContext.instance.stage.addChild(menu)
			// this.scaleX = uniLib.Global.screenWidth / 1280;
			// // else
			// this.scaleY = uniLib.Global.screenHeight / 720;
			uniLib.UIMgr.instance.hideLoading(PublicLoadingView);

			//HttpClient.sendGet("http://127.0.0.1:7001/score",this.onHttpSuccess);

		}

		public onHttpSuccess(event: egret.Event): void {
			var request = <egret.HttpRequest>event.currentTarget;
			console.error("get data : ", request.response);
		}
		public destroy(): void {
		}
	}
}