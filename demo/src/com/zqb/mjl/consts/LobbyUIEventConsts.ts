module weChat {
	export class LobbyUIEventConsts extends egret.Event {
		public data: EventData;
		/**这部分是核心事件------------------------- */

		/** 数据更改*/
		public static DATA_CHANGE: string = "data_changes";
		/**------------------------- */
		/**通用关闭 */
		public static CLOSE: string = "close";

		/**进入新手场 */
		public static ENTER_STANDARD: string = "enter_standard";
		/**从新手场返回到主界面 */
		public static BACK_MAINSCENE: string = "back_mianscene";
		/**主界面显示帮助面板 */
		public static LOBBY_SHOW_HELP: string = "lobby_show_help";
	
	

		/**通用确认 */
		public static CONFIRM: string = "confirm";
	}
}
