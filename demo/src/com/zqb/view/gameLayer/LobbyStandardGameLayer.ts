

/**进入新手场的界面 */
module weChat {
    //游戏更多麻将UI
    export class LobbyStandardGameLayer extends BaseEuiPanel {
        private roomList: eui.List;
        private backToMain: eui.Image;
        private standardChips: eui.Label;
        private standheadImg: eui.Image;
        private standardScroller: eui.Scroller;


        private standSceneName: eui.Label;


        private arrCol: eui.ArrayCollection;
        private mailInfo: weChat.TableCoinHundredConfig[][];

        constructor() {
            super();
            this.skinName = "LobbyStandardSceneSkin"
        }
        public destory(): void {
            super.destory();

          
       
            // uniLib.DragonUtils.removeFastDragonbyContainer(this);
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        }
        protected childrenCreated(): void {
            super.childrenCreated();
            this.mailInfo = [];

            this.mailInfo = RES.getRes("TableCoinHundredConfig_json");
            this.roomList.itemRenderer = LobbyStandardGameItem;
            this.arrCol = new eui.ArrayCollection(this.mailInfo);
            this.roomList.dataProvider = this.arrCol;
            this.roomList.allowMultipleSelection = true;
            this.initData();
        }

        /**初始化 */
        public init() {
        
        }
        /**初始化数据 */
        public initData() {
            this.updateNum();
        }

        private updateNum() {
            this.arrCol.refresh();
        }


        protected addEvent() {
            BC.addEvent(this, this.backToMain, egret.TouchEvent.TOUCH_TAP, this.backToMainScene);

        }

        protected removeEvent() {
            console.error("游戏新手场，removeEvent");
            BC.removeEvent(this, null, egret.TouchEvent.TOUCH_TAP, null);
                        BC.removeEvent(this, uniLib.Global);
        }

       

        /**游戏新手场切换设置 */
        public set Covervisible(boo) {
            this.visible = boo;
            this.standardScroller.viewport.scrollH = 0;
        }



        private backToMainScene() {
            this.dispatchEventWith(LobbyUIEventConsts.BACK_MAINSCENE);
        }

    }
}