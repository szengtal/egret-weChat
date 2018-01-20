module weChat {
	/**
	 * 数据请求操作
	 */
	export class LobbyDataRequestCommand extends Command{
		public static GAME_DATA: string = "game_data";
		public static CONNECT_GAME_SERVER: string = "connect_game_server"; //连接游戏聊天服务器
		public static LOGIN_OUT:string= "loginOut";//退出登录
		
		public constructor() {
			super();
		}
		public init():void{
			MJLobbyEventListener.getInstance().addEventListener(LobbyDataRequestCommand.GAME_DATA,this.onEventHandle,this)
			MJLobbyEventListener.getInstance().addEventListener(LobbyDataRequestCommand.CONNECT_GAME_SERVER,this.onEventHandle,this)
			MJLobbyEventListener.getInstance().addEventListener(LobbyDataRequestCommand.LOGIN_OUT,this.onEventHandle,this)
		}
		private onEventHandle(evt:egret.Event):void{
			var socketProxy: weChat.LobbyServerMJProxy =LobbyServerMJProxy.getInstance();
			switch(evt.type) {
				 case LobbyDataRequestCommand.GAME_DATA:
                    socketProxy.sendData(evt.data);
                   break;
				case LobbyDataRequestCommand.CONNECT_GAME_SERVER:
                   socketProxy.initServer();
                   break;
			 }
		}
		public onRemove():void{
			MJLobbyEventListener.getInstance().removeEventListener(LobbyDataRequestCommand.GAME_DATA,this.onEventHandle,this)
			MJLobbyEventListener.getInstance().removeEventListener(LobbyDataRequestCommand.CONNECT_GAME_SERVER,this.onEventHandle,this)
			MJLobbyEventListener.getInstance().removeEventListener(LobbyDataRequestCommand.LOGIN_OUT,this.onEventHandle,this)
		}
	}
}
