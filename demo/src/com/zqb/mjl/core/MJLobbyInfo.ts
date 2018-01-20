module weChat {
	/**
	 * 游戏显示信息
	 */
	export class MJLobbyInfo {
		public static main: egret.DisplayObjectContainer;
        public static stage:egret.Stage;
		public static mainUILayer: egret.DisplayObjectContainer;
        public static uiLayer: egret.DisplayObjectContainer;
        public static topLayer: egret.DisplayObjectContainer;
		public static userId:number;
		public constructor() {
		}
		public static destory():void{
			this.main=null;
			this.stage=null;
			this.mainUILayer=null;
			this.uiLayer=null;
			this.topLayer=null;
		}
	}
}