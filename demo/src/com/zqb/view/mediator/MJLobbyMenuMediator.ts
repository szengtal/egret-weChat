module weChat {
	/**
	 * 顶部导航菜单
	 */
	export class MJLobbyMenuMediator extends Mediator {
		public static NAME: string = "MJLobbyMenuMediator";
		private _menuVc: MJLobbyMenuVc;

		public constructor(viewComponent?: any) {
			super(MJLobbyMenuMediator.NAME, viewComponent);
			this._menuVc = viewComponent;
			this.addListener();
		}

	private addListener() {
		}
		private remEvent() {
			BC.removeEvent(this, this._menuVc);
		}

		public onRemove(): void {
			super.onRemove();
			if (this._menuVc) {
				this._menuVc.destory();
				this._menuVc = null;
			}
			this.remEvent();
		}


		public listNotificationInterests(): Array<any> {
			return [
				MahJongLobbyFacadeConsts.RED_POINT,

			]
		}
		public handleNotification(notification: MvcData): void {
			switch (notification.getName()) {

			}
		}





	}
}