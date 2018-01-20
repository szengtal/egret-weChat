/**游戏弹框管理，所有二级界面弹出都交由此类负责 */
module weChat {
    export class LobbyPopLayer extends egret.DisplayObjectContainer {
        /**帮助面板 */
        // private _chatPanel: chesscommonlib.LobbyChatPanel;
        /**帮助面板 */
        private _helpPanel: LobbyHelpPanel;
    
        constructor() {
            super();
            this.addEvent();
        }

        public destory(): void {
            variableCommon.getInstance().destoryPopPanel();
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
            this.removeEvent();
          
        }

        protected addEvent() {
            if (!weChatMsgCommand.instance.hasEventListener(LobbyUIEventConsts.DATA_CHANGE)) {
                BC.addEvent(this, weChatMsgCommand.instance, LobbyUIEventConsts.DATA_CHANGE, this.dataChangeHandler);
            }
      
        }

        protected removeEvent() {
            // BC.removeEvent(this, null, LobbyUIEventConsts.CLOSE,null);
            // BC.removeEvent(this, this._userinfoPanel);
            // BC.removeEvent(this, weChatMsgCommand.instance);
            // BC.removeEvent(this, egret.MainContext.instance.stage);
        }

        /**全局事件监听类 */
        public dataChangeHandler(e: LobbyUIEventConsts): void {
            var rev: any = e.data.iData;
            switch (e.data.iType) {
                case LobbyUIEventConsts.LOBBY_SHOW_HELP:
                    this.showHelpPanel();
                    break;
            }

        }
        /**更新数据的函数统一放到这，主要是监听SELF_INFO_DATA以及GET_PLAYNUM事件  */
        public updateData() {
        }


      
        /**帮助面版 */
        private showHelpPanel() {
            if (!this._helpPanel) {
                this._helpPanel = new LobbyHelpPanel();
                this._helpPanel.name = "lobbyHelp";
                BC.addEvent(this, this._helpPanel, LobbyUIEventConsts.CLOSE, this.closeHelp);
                LobbyPopupManager.addPopUp(["closeHelp", this], this._helpPanel, true, true, true, 1280, 720);
            }
        }
        /**帮助面版移除 */
        private closeHelp() {
            if (this._helpPanel) {
                BC.removeEvent(this, this._helpPanel);
                LobbyPopupManager.removePopUp("closeHelp", this._helpPanel, true);
                this._helpPanel.destory();
                this._helpPanel = null;
            }
        }

     
  
    }
}