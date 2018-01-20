module weChat {

    /**进入新手场的界面 */
    //游戏更多麻将UI
    export class LobbyStandardGameItem extends eui.ItemRenderer {
        private ItemBg: eui.Image;

        private roomType: number

        constructor() {
            super();
            this.skinName = "LobbyStandardItemSkin";
        }

        protected childrenCreated() {
            super.childrenCreated();
            BC.addOnceEvent(this, this, egret.Event.REMOVED_FROM_STAGE, this.destory)
        }

        protected dataChanged() {
            super.dataChanged();
            var _data: weChat.TableCoinHundredConfig = this.data;
            this.ItemBg.source = "sz_Lobby_Item" + _data.roomType;
        }

        private destory() {
            BC.removeEvent(this);
        }
    }

}
