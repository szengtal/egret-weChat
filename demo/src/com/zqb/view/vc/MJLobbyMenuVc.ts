module weChat {
	/**
	 * 底部导航栏
	 */
	export class MJLobbyMenuVc extends BaseEuiPanel {

		// private isLoading: boolean = false;
		private resetMan: weChat.BaseButton;
		private _left: weChat.BaseButton;
		private _right: weChat.BaseButton;


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
			BC.addEvent(this, this.resetMan, egret.TouchEvent.TOUCH_TAP, this.resetManHandle);



			BC.addEvent(this, this._left, egret.TouchEvent.TOUCH_BEGIN, this.leftHandle);
			BC.addEvent(this, this._left, egret.TouchEvent.TOUCH_END, this.leftHandle);
			BC.addEvent(this, this._left, egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.leftHandle);

			BC.addEvent(this, this._right, egret.TouchEvent.TOUCH_BEGIN, this.rightHandle);
			BC.addEvent(this, this._right, egret.TouchEvent.TOUCH_END, this.rightHandle);
			BC.addEvent(this, this._right, egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.rightHandle);
			

		}

		protected removeEvent() {
			BC.removeEvent(this, null, egret.TouchEvent.TOUCH_TAP, null);
			BC.removeEvent(this);

		}

		private resetManHandle() {
			weChatMsgCommand.instance.dispatchChangeEvent(LobbyUIEventConsts.RESET_MAN_POSITION, null);

		}

		private leftHandle(evt: egret.TouchEvent) {
			weChatMsgCommand.instance.dispatchChangeEvent(LobbyUIEventConsts.TURN_LEFT, evt);

		}

		private rightHandle(evt: egret.TouchEvent) {
			weChatMsgCommand.instance.dispatchChangeEvent(LobbyUIEventConsts.TURN_RIGHT, evt);

		}


	}
}