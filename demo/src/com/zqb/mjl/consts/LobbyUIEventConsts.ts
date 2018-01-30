module weChat {
	export class LobbyUIEventConsts extends egret.Event {
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
	
	
	/**重置人物 */
		public static RESET_MAN_POSITION: string = "reset_man_position";
		/**人物向左*/
		public static TURN_LEFT: string = "turn_left";

		/**人物向右 */
		public static TURN_RIGHT: string = "turn_right";
		/**层数变化 */
		public static PILES_CHANGE: string = "piles_change";
		/**重新开始 */
		public static RE_START: string = "re_start";
			/**显示重玩面板 */
		public static SHOW_RESTART_PANEL: string = "show_restart_panel";
				/**显示排行 */
		public static SHOW_RANK: string = "show_rank";
		/**通用确认 */
		public static CONFIRM: string = "confirm";
	}
}
