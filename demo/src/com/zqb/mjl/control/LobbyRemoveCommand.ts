module weChat {
    /**
     * 移除命令
     */
	export class LobbyRemoveCommand extends Command{
		public constructor() {
			super();
		}
		public init():void{
			MJLobbyEventListener.getInstance().addEventListener(MahJongLobbyFacadeConsts.DESTORY,this.onEventHandle,this)
			
		}
		private onEventHandle(evt:egret.TouchEvent):void{
			this.removeController();
            this.removeMediator();
            this.removeProxy();
            MJLobbyInfo.destory();;
		}
        private removeController():void{
            // this.facade.registerCommand(MahJongLobbyFacadeConsts.SEND_DATA,LobbyDataRequestCommand);
            // this.facade.registerCommand(MahJongLobbyFacadeConsts.DESTORY,LobbyRemoveCommand);
            MahJongLobbyFacade.getLobbyInstance().removeCommand(MahJongLobbyFacadeConsts.SEND_DATA);
            MahJongLobbyFacade.getLobbyInstance().removeCommand(MahJongLobbyFacadeConsts.DESTORY);
        }
        private removeMediator():void{
            if(ViewConfig.mainMediator){
                // var mainMediator:any=uniLib.getDefinitionByName(ViewConfig.mainMediatorName);
                MahJongLobbyFacade.getLobbyInstance().removeMediator("MahJongLobbyMediator");
                ViewConfig.mainMediator=null;
            }
            
        }
        private removeProxy():void{
            //  MahJongLobbyFacade.getLobbyInstance().removeProxy(LobbyServerMJProxy.NAME);
        }
        public onRemove():void{
            MJLobbyEventListener.getInstance().removeEventListener(MahJongLobbyFacadeConsts.DESTORY,this.onEventHandle,this)
        }

	}
}