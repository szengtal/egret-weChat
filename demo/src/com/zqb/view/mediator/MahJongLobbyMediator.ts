module weChat {
	/**
	 * 游戏主页面mediator
	 */
	export class MahJongLobbyMediator extends Mediator {
		public static NAME: string = "MahJongLobbyMediator";
		private _main: MJLobbyVc;
		private _menuVc: MJLobbyMenuVc;
		private _menuMeditor: MJLobbyMenuMediator;

		private _gameWaterInfos: Array<any>;
		public constructor(viewComponent?: any) {
			super(MahJongLobbyMediator.NAME, viewComponent);
			this._main = new MJLobbyVc();
			egret.MainContext.instance.stage.addChild(this._main)
			// MJLobbyInfo.mainUILayer.addChild(this._main);
			this.initGame();
			this.addListener();
		}

		private addListener(): void {
		}

		private remEvent() {
			BC.removeEvent(this, this._main);
		}

		private initGame(): void {
			this._menuVc = new MJLobbyMenuVc();
			this._menuVc.y = (uniLib.Global.screenHeight - 720 > 0) ? uniLib.Global.screenHeight - 720 : 0;
			// this._menuVc.y = (uniLib.Global.screenHeight - 204 > 0) ? uniLib.Global.screenHeight - 720 : 0;
			this._menuVc.name = "_menuVc";
			// MJLobbyInfo.mainUILayer.addChild(this._menuVc);
			// this._menuMeditor = new MJLobbyMenuMediator(this._menuVc)
			egret.MainContext.instance.stage.addChild(this._menuVc)
			
			MahJongLobbyFacade.getLobbyInstance().registerMediator(this._menuMeditor);
			this.showPopLayer();
			weChat.variableCommon.getInstance().playBgMusic();
		}

		private showPopLayer() {
			if (weChat.variableCommon.getInstance()._popLayer && !weChat.variableCommon.getInstance()._popLayer.parent) {
				MJLobbyInfo.mainUILayer.addChild(weChat.variableCommon.getInstance()._popLayer);
			}
		}



		public onRemove(): void {
			super.onRemove();
			this._menuVc.destory();
			this._menuMeditor = null;
			this._gameWaterInfos = null;
			MahJongLobbyFacade.getLobbyInstance().removeMediator(MJLobbyMenuMediator.NAME);
			if (this._main) {
				this._main.destory();
				this._main = null;
			}
			// if (this._popLayer) {
			// 	this._popLayer.destory();
			// }
			if (weChat.variableCommon.getInstance()._popLayer) {
				weChat.variableCommon.getInstance()._popLayer.destory();
			}
			this.remEvent();
			// this._popLayer = null;
			console.error("MahJongLobbyMediator-destory");

		}
		public listNotificationInterests(): Array<any> {
			return [
				MahJongLobbyFacadeConsts.ENTER_LOBBY,
			]
		}

		public handleNotification(notification: MvcData): void {
			switch (notification.getName()) {
			
				
				case MahJongLobbyFacadeConsts.RED_POINT://红点消息显示
					this._main.RedPointControl(notification.getBody());
					break;

			}
		}

		/**进入新手场游戏 */
		private enterStandGame(roomtype: any) {
			var demokReq: any = {};
			demokReq.scene = roomtype;
			this.sendNotification(MahJongLobbyFacadeConsts.SEND_DATA, demokReq, LobbyDataRequestCommand.GAME_DATA);
			//uniLib.UIMgr.instance.showLoadingTimeout(HaoCaiTipLoading, "recharge");

		}

		/**进入百人场游戏 */
		private enterHundredGame() {
		
		}
	}
}


