
/**一些全局变量,
 * 
 * @9.14 新增弹窗控制
 * @author garr
 */
module weChat {

    export class variableCommon {
        private static instance: variableCommon;
        /**用于管理所有二级弹出面板,key由创建面板时自己指定，value保存面板的引用对象 */
        public LobbyPopMap: Map<string, any>;
        /**用于管理所有二级弹出面板的顺序,目前用于监听手机返回键的事件 */
        public LobbyPopArray: Array<any>;
        public _popLayer: LobbyPopLayer;
        /**用于储存楼梯位置数据 */
        public LobbyTempMap: Map<string, any>;
        /**储存英雄引用 */
        public hero: Hero;

        private _pilesNum: number = 0 //层数

        /**缩放 */
        public sclaeNum: number = uniLib.Global.screenHeight / 720;
        public constructor() {
            this.init();
        }
        public static getInstance(): variableCommon {
            if (!this.instance) {
                this.instance = new variableCommon();
            }
            return this.instance;
        }

        private init() {
            this.LobbyPopMap = new Map();
            this.LobbyTempMap = new Map();
            this.LobbyPopArray = [];
            this._popLayer = new LobbyPopLayer;
        }
        /**统一销毁所有的二级弹出面板 */
        public destoryPopPanel() {
            this.LobbyPopMap.forEach((c, key) => {
                c[key]()
            })
            this.LobbyPopMap.clear();

        }

        /**移除制定面板 
         * @param {key}
        */
        public removeOncPanel(key: string) {
            let _this = this.LobbyPopMap.get(key);
            _this[key]()
        }


        public removeOne(funName: any, _this: any) {
            let len = this.LobbyPopArray.length;
            console.error("removeOne-funName", funName);
            for (let i = 0; i < len; i++) {
                let item = this.LobbyPopArray[i];
                if (item["fun"] == funName && item["_this"] == _this) {
                    this.LobbyPopArray.splice(i, 1);
                    break;
                }
                if (item["fun"] == funName && funName == "onMsgClose") {
                    this.LobbyPopArray.splice(i, 1);
                    break;
                }
            }
            // console.error("removeOne", this.LobbyPopArray);

        }


        public playButtonSound() {
            if (RES.hasRes("buttonClick_mp3")) {
                uniLib.SoundMgr.instance.playSound("buttonClick_mp3");
            }
        }

        public set pilesNum(num: number) {
            this._pilesNum = num;
            weChatMsgCommand.instance.dispatchChangeEvent(LobbyUIEventConsts.PILES_CHANGE, null);
        }
        public get pilesNum(): number {
            return this._pilesNum;
        }

        public testCae(str: string = "(101)test<1>gfrg<2>rggs<3>gr<4>") {
            var _loadingMc1 = weChat.LobbyResUtil.createMovieClicp("sz_Lobby_Loading", "loadingMc1");
            _loadingMc1.x = (weChat.LobbyDataCache.defaultWidth) / 2 - 300;
            _loadingMc1.y = (weChat.LobbyDataCache.defaultHeight) / 2 - 150;
            _loadingMc1.play(-1);
            egret.MainContext.instance.stage.addChild(_loadingMc1)

        }

        public showReStartPanel(){
            weChatMsgCommand.instance.dispatchChangeEvent(LobbyUIEventConsts.SHOW_RESTART_PANEL, null);
            
        }







    }






}
