module weChat {
    /**大厅公告面板 */
    export class rankPanel extends BaseEuiPanel {



        private NoticeArrCol: eui.ArrayCollection;

        private rankItemBg: eui.Image;
        private rankScroll: eui.Scroller;
        private rankList: eui.List;
        private rankBack: weChat.BaseButton;
        private labelDisplay: eui.Label;


        constructor() {
            super();
            this.skinName = "RankPanelSkin";

        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this.rankScroll.height = weChat.variableCommon.getInstance().sclaeNum - 117;
            
        }

        protected init() {
            super.init()


        }

        protected addEvent() {
            BC.addEvent(this, this.rankBack, egret.TouchEvent.TOUCH_TAP, this.noticeCloseHander);

        }
        protected removeEvent() {
            BC.removeEvent(this, null, egret.TouchEvent.TOUCH_TAP, null);
        }



        /**关闭当前面板 */
        private noticeCloseHander() {
            this.dispatchEventWith(LobbyUIEventConsts.CLOSE);
        }

        public destory() {
            super.destory();
        }

    }
}