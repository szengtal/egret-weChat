/**游戏主界面，刚进去 */
module weChat {

    export class gameOver extends BaseEuiPanel {

        private ItemBg: eui.Image;
        private backToMain: weChat.BaseButton;
        private yesBtn: weChat.BaseButton;
        private noBtn: weChat.BaseButton;
        private grade: eui.Label


        constructor() {
            super();
            this.skinName = "gameOverSkin"
        }
        public destory(): void {
            super.destory();

            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);

        }




        protected addEvent() {
            BC.addEvent(this, this.yesBtn, egret.TouchEvent.TOUCH_TAP, this.start);


            //  if (!weChatMsgCommand.instance.hasEventListener(LobbyUIEventConsts.DATA_CHANGE)) {
            // }

        }

        protected removeEvent() {
            BC.removeEvent(this, null, egret.TouchEvent.TOUCH_TAP, null);
            BC.removeEvent(this, uniLib.Global);
        }

        /**初始化数据 */
        public init() {


            this.initData();


        }

        public initData() {
            this.grade.text = "很遗憾你的成绩是第" + weChat.variableCommon.getInstance().pilesNum + "层";
        }

        /**全局事件监听类 */
        public dataChangeHandler(e: LobbyUIEventConsts): void {
            var rev: any = e.data.iData;
            switch (e.data.iType) {

            }

        }


        /**重新开始 */
        private start() {
            this.dispatchEventWith(LobbyUIEventConsts.CLOSE);
            weChatMsgCommand.instance.dispatchChangeEvent(LobbyUIEventConsts.RE_START, null);

        }








    }
}