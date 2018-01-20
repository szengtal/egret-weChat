module weChat {
	export class MahJongLobbyFacadeConsts {
		public static STARTUP:string                                  = "STARTUP";
		public static SEND_DATA:string                                = "sendData"; 
		public static ENTER_LOBBY:string                                ="ENTER_LOBBY";
	

		public static DESTORY: string									="DESTORY";  //销毁
		public static SHOW_LOBBY: string									="SHOW_LOBBY";  //显示游戏
		public static LOBBY_RECONNECTION: string									="LOBBY_RECONNECTION";  //游戏断线重连



		public static CONFIG_LOADED:string							="CONFIG_LOADED";//游戏配置加载成功

		public static RED_POINT:string							="CONTINUE";//红点

	
		
	
	
	
		public constructor() {
		}
	}
}
