module weChat {
	/**
	 * 向游戏发送的消息队列 游戏启动后执行所有消息
	 */
    export class MessageQueue {
        private static m_instance: MessageQueue;
        public static get Instance(): MessageQueue {
            if (!this.m_instance)
                this.m_instance = new MessageQueue();
            return this.m_instance;
        }
        private m_message: Array<MessageItem> = [];
        public push(message: MessageItem) {
            this.m_message.push(message);
        }
        public get message(): Array<MessageItem> {
            return this.m_message;
        }
        public clear(){
            this.m_message.splice(0,this.m_message.length);
        }
        public call() {
            for (let item of this.m_message) {
                var msgBox: LobbyMsgBox = new LobbyMsgBox(false);
                let labelArr = item.cancelCallBack == null ? ["确定"] : ["确定", "取消"];
                msgBox.setData(item.title, item.text, labelArr, [item.confirmCallBack, item.cancelCallBack], this);
                msgBox.x = Math.round((LobbyDataCache.defaultWidth - msgBox.width) / 2);
                msgBox.y = Math.round((LobbyDataCache.defaultHeight - msgBox.height) / 2);
                uniLib.PopUpMgr.addPopUp(msgBox, weChat.MJLobbyInfo.topLayer, true, false);
            }
            this.clear();
        }
    }
    export class MessageItem {
        /**
         * 标题
         */
        public title: string;
        /**
         * 文本内容
         */
        public text: string;
        /**
         * 确定回调
         */
        public confirmCallBack: () => void;
        /**
         * 取消回调
         */
        public cancelCallBack: () => void;
    }
}