/**eui组件的父类 */

module weChat {
    export interface EuiSkinInt {

    }
    export class BaseEuiPanel extends eui.Component implements EuiSkinInt {
        protected _panelBg: eui.Image;
        constructor() {
            super();
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this.init();
            this.addEvent();

        }

        //初始化
        protected init(): void {
            if (this._panelBg) {
                this._panelBg.scale9Grid = new egret.Rectangle(160, 150, 960, 502);
                // this._panelBg.height = uniLib.Global.screenHeight;
            }

        }
        /**事件监听 */
        protected addEvent(): void {

        }

        protected removeEvent(): void {

        }

        protected destory(): void {
            this.removeEvent();

        }

    }

}