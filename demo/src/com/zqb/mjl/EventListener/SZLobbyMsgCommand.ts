/**
 * 游戏内消息管理
 * 目前游戏内所有二级界面弹出，都由此全局消息控制，在统一的单独类中进行显示移除管理
 */
module weChat {
    export class weChatMsgCommand extends egret.EventDispatcher {

        private static _self: weChatMsgCommand = null;

        public static get instance(): weChatMsgCommand {
            if (this._self == null) {
                this._self = new weChatMsgCommand();
            }
            return this._self;
        }

        /**
         * 多个事件的派发
         * @param iType
         * @param iData
         */
        public dispatchChangeEvent(iType: string, iData: any): void {
            var evt: LobbyUIEventConsts = new LobbyUIEventConsts(LobbyUIEventConsts.DATA_CHANGE);
            var data = new EventData();
            data.iType = iType;
            data.iData = iData;
            evt.data = data;
            this.dispatchEvent(evt);
        }

        /**
         * 单个事件的派发
         * @param type
         * @param data
         */
        public dispatchEventWithData(type:string,data:any):void {
            var evt:LobbyUIEventConsts = new LobbyUIEventConsts(type);
            evt.data = data;
            this.dispatchEvent(evt);
        }
    }
}