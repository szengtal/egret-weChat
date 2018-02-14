module weChat {
    /**
 * 自定义事件数据
 */
    export class HttpClient {
        private url: string = "";
        protected static contentType: string = "application/json";
        public static sendGet(path: string, successCallback: Function, errorCallBack?: Function) {
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.open(path, egret.HttpMethod.GET);
            request.setRequestHeader("Content-Type", HttpClient.contentType);
            request.send();
            request.addEventListener(egret.Event.COMPLETE, this.onHttpSuccess, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        }

        public static onHttpSuccess(event: egret.Event): void {
            var request = <egret.HttpRequest>event.currentTarget;
            console.error("get data : ", request.response);
        }

        public static onGetIOError(event: egret.IOErrorEvent): void {
            console.log("get error : " + event);
        }
    }
}
