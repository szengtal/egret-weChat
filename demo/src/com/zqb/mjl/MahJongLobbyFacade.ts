module weChat {
	export class MahJongLobbyFacade extends MvcSender{
		private static _instance:MahJongLobbyFacade;
		private static _commandArr:any;
		private static _mediatorArr:Array<Mediator>;
		private static _proxyArr:Array<Proxy>;
		public constructor() {
			super();
			// uniLib.ZQGameSdk.getLocation();
			MahJongLobbyFacade._commandArr={};
			MahJongLobbyFacade._mediatorArr=[];
			MahJongLobbyFacade._proxyArr=[];
			this.initializeController();
		}
		public static getLobbyInstance(): MahJongLobbyFacade {
            if(this._instance == null) this._instance = new MahJongLobbyFacade();
            return <MahJongLobbyFacade><any>(this._instance);
        }
		public initializeController(): void {
            // this.registerCommand(MahJongLobbyFacadeConsts.STARTUP,LobbyStartUpCommand);
			this.registerCommand(MahJongLobbyFacadeConsts.STARTUP,new LobbyStartUpCommand());
        }
		/**
		 * 启动PureMVC，在应用程序中调用此方法，并传递应用程序本身的引用
		 * @param	rootView	-	PureMVC应用程序的根视图root，包含其它所有的View Componet
		 */
		public startUp(rootView: egret.DisplayObjectContainer): void {
			MahJongLobbyFacade._commandArr = {};
			MahJongLobbyFacade._mediatorArr = [];
			MahJongLobbyFacade._proxyArr = [];
			this.sendNotification(MahJongLobbyFacadeConsts.STARTUP, rootView);
			// this.removeCommand(MahJongLobbyFacadeConsts.STARTUP); //PureMVC初始化完成，注销STARUP命令
		}
		public registerCommand(cmd: string, command: Command): void {
			command.init();
			MahJongLobbyFacade._commandArr[cmd]=command;
			
		}
		public  removeCommand(cmd:string):void{
			MahJongLobbyFacade._commandArr[cmd].onRemove();
			MahJongLobbyFacade._commandArr[cmd]=null;
		}
		public  registerMediator(mediator:Mediator):void{
			if(MahJongLobbyFacade._mediatorArr.indexOf(mediator)==-1){
				MahJongLobbyFacade._mediatorArr.push(mediator);
			}
		}

		public retrieveMediator(name: string): Mediator{
			for(var i:number=0;i<MahJongLobbyFacade._mediatorArr.length;i++){
				if(MahJongLobbyFacade._mediatorArr[i].name==name){
					return MahJongLobbyFacade._mediatorArr[i];
				}
			}
		}

		public  removeMediator(name:string):void{
			for(var i:number=0;i<MahJongLobbyFacade._mediatorArr.length;i++){
				if(MahJongLobbyFacade._mediatorArr[i].name==name){
					MahJongLobbyFacade._mediatorArr[i].onRemove();
					MahJongLobbyFacade._mediatorArr.splice(i,1);
					break;
				}
			}
		}
		public  registerProxy(proxy:Proxy):void{
			if(MahJongLobbyFacade._proxyArr.indexOf(proxy)==-1){
				MahJongLobbyFacade._proxyArr.push(proxy);
			}
		}
		public  removeProxy(name:string):void{
			for(var i:number=0;i<MahJongLobbyFacade._proxyArr.length;i++){
				if(MahJongLobbyFacade._proxyArr[i].name==name){
					MahJongLobbyFacade._proxyArr[i].onRemove();
					MahJongLobbyFacade._proxyArr.splice(i,1);
					break;
				}
			}
		}

	}
}