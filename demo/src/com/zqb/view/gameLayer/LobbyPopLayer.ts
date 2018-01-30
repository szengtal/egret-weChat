/**游戏弹框管理，所有二级界面弹出都交由此类负责 */
module weChat {
    export class LobbyPopLayer extends egret.DisplayObjectContainer {
        /**帮助面板 */
        // private _chatPanel: chesscommonlib.LobbyChatPanel;
        /**帮助面板 */
        private _helpPanel: LobbyHelpPanel;
        /**重新开始面板 */
        private _gameOver: gameOver;
    /**排行榜 */
    private rank:rankPanel
        constructor() {
            super();
            this.addEvent();
        }

        public destory(): void {
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
                 case LobbyUIEventConsts.SHOW_RESTART_PANEL:
                    this.showGameOverPanel();
                    break;
                  case LobbyUIEventConsts.SHOW_RANK:
                    this.showRankPanel();
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
             /**重新开始面板 */
        private showGameOverPanel() {
            if (!this._gameOver) {
                this._gameOver = new gameOver();
                this._gameOver.name = "gameOver";
                BC.addEvent(this, this._gameOver, LobbyUIEventConsts.CLOSE, this.closeGameOver);
                LobbyPopupManager.addPopUp(["closeGameOver", this], this._gameOver, true, true, true, 1280, 720);
            }
        }
        /**重新开始面板移除 */
        private closeGameOver() {
            if (this._gameOver) {
                BC.removeEvent(this, this._gameOver);
                LobbyPopupManager.removePopUp("closeGameOver", this._gameOver, true);
                this._gameOver.destory();
                this._gameOver = null;
            }
        }


       /**排行榜 */
        private showRankPanel() {
            if (!this.rank) {
                this.rank = new rankPanel();
                this.rank.name = "rank";
                BC.addEvent(this, this.rank, LobbyUIEventConsts.CLOSE, this.closeRank);
                LobbyPopupManager.addPopUp(["closeRank", this], this.rank, true, true, true, 1280, 720);
            }
        }
        /**排行榜面板移除 */
        private closeRank() {
            if (this.rank) {
                BC.removeEvent(this, this.rank);
                LobbyPopupManager.removePopUp("closeRank", this.rank, true);
                this.rank.destory();
                this.rank = null;
            }
        }

     
  
    }
}