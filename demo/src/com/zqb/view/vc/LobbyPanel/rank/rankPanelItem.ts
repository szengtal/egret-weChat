module weChat {

    /**进入标准场的界面 */
    //大厅更多麻将UI
    export class rankPanelItem extends eui.ItemRenderer {

        private rankItemBg: eui.Image;
        private rankRanking: eui.Label;
        private rankName: eui.Label;
        private rankChips: eui.Label;
        private rankHead: eui.Image;


        constructor() {
            super();
            this.skinName = "RankPanelItemSkin"
        }

        protected childrenCreated() {
            super.childrenCreated();
        }

        protected dataChanged() {
            super.dataChanged();


        }

    }



}
