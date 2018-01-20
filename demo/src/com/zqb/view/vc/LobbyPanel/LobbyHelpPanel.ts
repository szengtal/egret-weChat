module weChat {
    /**游戏帮助面板 */
    export class LobbyHelpPanel extends BaseEuiPanel {

        private hundredBtn: eui.ToggleSwitch;
        private standardBtn: eui.ToggleSwitch;
        private helpClose: eui.Image;
        private toggleArr: Array<eui.ToggleButton> = [];
        private helpScroll: eui.Scroller;
        private helpContent1: eui.Image;
        private helpContent2: eui.Image;


        private helpGroup: eui.Group;



        constructor() {
            super();
            this.skinName = "LobbyHelpPanelSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            //通过显示列表控制显示，保证不同规则的contentHeight适应
            this.helpContent2.parent.removeChild(this.helpContent2);
        }

        protected init() {
            this.toggleArr = [this.hundredBtn, this.standardBtn];
        }

        protected addEvent() {
            BC.addEvent(this, this.helpClose, egret.TouchEvent.TOUCH_TAP, this.helpCloseHander);
            BC.addEvent(this, this.hundredBtn, eui.UIEvent.CHANGE, this.toggleChangeHandler);
            BC.addEvent(this, this.standardBtn, eui.UIEvent.CHANGE, this.toggleChangeHandler);

        }
        protected removeEvent() {
            BC.removeEvent(this, null, egret.TouchEvent.TOUCH_TAP, null);
        }

        /**关闭当前面板 */
        private helpCloseHander() {
            this.dispatchEventWith(LobbyUIEventConsts.CLOSE);
        }

        /**帮助切换 */
        private toggleChangeHandler(evt: eui.UIEvent) {
            for (var i: number = 0; i < this.toggleArr.length; i++) {
                var btn: eui.ToggleButton = this.toggleArr[i];
                btn.selected = (btn == evt.target);
            }
            uniLib.SoundMgr.instance.playSound("buttonSwitch_mp3");
            this.switchContent(evt.target.name);
        }
        /**切换帮助内容 */
        private switchContent(name: string) {
            this.helpScroll.stopAnimation();
            switch (name) {
                case "standard":
                    if (this.helpContent2.parent) {
                        this.helpContent2.parent.removeChild(this.helpContent2);
                    }
                    this.helpGroup.addChild(this.helpContent1);
                    break;
                case "hundred":
                    if (this.helpContent1.parent) {
                        this.helpContent1.parent.removeChild(this.helpContent1);
                    }
                    this.helpGroup.addChild(this.helpContent2);
                    break;
            }
            this.helpScroll.viewport.scrollV = 0;
        }



        public destory() {
            super.destory();
        }

    }
}