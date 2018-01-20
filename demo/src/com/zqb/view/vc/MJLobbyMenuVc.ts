module weChat {
	/**
	 * 底部导航栏
	 */
	export class MJLobbyMenuVc extends BaseEuiPanel {

		// private isLoading: boolean = false;


		public constructor() {
			super();
			this.skinName = "LobbyMenuSkin";
		}
		public destory(): void {
			super.destory();
			uniLib.DragonUtils.removeFastDragonbyContainer(this);

		}

		protected init(): void {
			this.touchEnabled = false;
			// this.touchChildren =false;

		
		}

		protected addEvent() {


		}

		protected removeEvent() {
			BC.removeEvent(this, null, egret.TouchEvent.TOUCH_TAP, null);
			BC.removeEvent(this);
			
		}


	}
}