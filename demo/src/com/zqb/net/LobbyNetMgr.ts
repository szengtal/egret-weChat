module weChat{
	export class LobbyNetMgr{
		public static sendData(obj: any): void {
            if(NetMgr.ws)
                NetMgr.tcpSend(obj);
		}
	}
}