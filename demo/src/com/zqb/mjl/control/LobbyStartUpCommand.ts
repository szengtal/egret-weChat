module weChat {
    /**
     * 名字 ffe097
     * 内容 f9e3ff
     * 金币 ffd200
     * 启动命令
     */
    export class LobbyStartUpCommand extends Command {

        public constructor() {
            super();
        }
        public init(): void {
            MJLobbyEventListener.getInstance().addEventListener(MahJongLobbyFacadeConsts.STARTUP, this.onEventHandle, this);
            MJLobbyEventListener.getInstance().addEventListener(MahJongLobbyFacadeConsts.SHOW_LOBBY, this.onEventHandle, this);
        }
        public destory(): void {
            MJLobbyEventListener.getInstance().removeEventListener(MahJongLobbyFacadeConsts.STARTUP, this.onEventHandle, this);
            MJLobbyEventListener.getInstance().removeEventListener(MahJongLobbyFacadeConsts.SHOW_LOBBY, this.onEventHandle, this);
        }

        private onEventHandle(evt: egret.Event): void {
            switch (evt.type) {
                case MahJongLobbyFacadeConsts.STARTUP:
                    this.initController();
                    // this.initProxy();
                    // if (MJLobbyData.getInstance().myBaseInfo) {//返回游戏时直接实现游戏，刚进入房间是如果有默认房间直接进房间，无需显示游戏
                    //     this.initMediator();
                    // }
                    this.initMediator();
                    // this.sendNotification(MahJongLobbyFacadeConsts.SEND_DATA, null, LobbyDataRequestCommand.CONNECT_GAME_SERVER);
                    MessageQueue.Instance.call();
                    break;
                case MahJongLobbyFacadeConsts.SHOW_LOBBY:
                    this.initMediator();
                    break;
            }
        }
      
   
        public execute(notification: any): void {
            var rootView: egret.DisplayObjectContainer = notification.getBody();
            this.initController();
            this.initProxy();
            this.initMediator();
        }
        private initController(): void {
            // this.facade.registerCommand(MahJongLobbyFacadeConsts.SEND_DATA,LobbyDataRequestCommand);
            // this.facade.registerCommand(MahJongLobbyFacadeConsts.DESTORY,LobbyRemoveCommand);
            MahJongLobbyFacade.getLobbyInstance().registerCommand(MahJongLobbyFacadeConsts.SEND_DATA, new LobbyDataRequestCommand());
            MahJongLobbyFacade.getLobbyInstance().registerCommand(MahJongLobbyFacadeConsts.DESTORY, new LobbyRemoveCommand());
        }
        private initMediator(): void {
            // var main:MJLobbyVc=new MJLobbyVc();
            // MJLobbyInfo.mainUILayer.addChild(main);
            var mainMediator: any = uniLib.getDefinitionByName(ViewConfig.mainMediatorName);
            ViewConfig.mainMediator = new mainMediator();
            MahJongLobbyFacade.getLobbyInstance().registerMediator(ViewConfig.mainMediator);
        }
        private initProxy(): void {
            MahJongLobbyFacade.getLobbyInstance().registerProxy(new LobbyServerMJProxy())
        }


 
    }
}
