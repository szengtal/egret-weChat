module weChat {
    /**
     * 数据缓存
     */
	export class LobbyDataCache {
        public static langObj: any;//语言数据
        public static stageHight: number;
        public static stageWidth: number;
        public static defaultWidth:number=720;//默认设计尺寸
        public static defaultHeight: number = 1280;//默认设计尺寸
        public static imei: string;//设备码
        public static version:string="1.0.0";//版本号
        public static gameID:number;
        public static shareNLast:number=0;//分享次数
		public constructor() {
		}
	}
}