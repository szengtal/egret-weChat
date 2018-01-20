module weChat {
	/**
	 * 游戏场景
	 */
	export class MJLobbyScene extends uniLib.LobbyScene {
		public constructor() {
			super();
		}
		public start(e: egret.Event = null): void {
			MJLobbyInfo.uiLayer = this.uiLayer;
			MJLobbyInfo.mainUILayer = this.uiLayer;
			this.uiLayer.visible = true;
			MJLobbyInfo.topLayer = this.topLayer;
			MahJongLobbyFacade.getLobbyInstance().startUp(this);

			this.scaleX = uniLib.Global.screenWidth / 1280;
			// else
			this.scaleY = uniLib.Global.screenHeight / 720;
			uniLib.UIMgr.instance.hideLoading(PublicLoadingView);

		}
		public destroy(): void {
			super.destroy();
			weChat.MahJongLobbyFacade.getLobbyInstance().sendNotification(weChat.MahJongLobbyFacadeConsts.DESTORY);
		}
	}
}