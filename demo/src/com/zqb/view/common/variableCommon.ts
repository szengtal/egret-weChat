
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
        /**游戏签到数据 */
        public signData: weChat.LobbyTaskConfig[];
        /**游戏商品数据 */
        public goodData: weChat.TableGoodsConfig[];
        /**游戏人数数据 */
        /**用于管理需要显示红点的按钮 */
        public redPointBtnMap: Map<any, eui.Button>;
        /**用于管理需要显示红点的数据 */
        public redPointData: any;
        public _popLayer: LobbyPopLayer;
        /**用于储存临时数据 */
        public LobbyTempMap: Map<string, any>;

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
            this.redPointBtnMap = new Map();
            this.goodData = weChat.TableGoodsConfig.instance();
            Object.freeze(this.goodData)
            this._popLayer = new LobbyPopLayer;
        }
        /**统一销毁所有的二级弹出面板 */
        public destoryPopPanel() {
            this.LobbyPopMap.forEach((c, key) => {
                c[key]()
            })
            this.LobbyPopMap.clear();

        }

        public get _signData():weChat.LobbyTaskConfig[]{
            this.signData = weChat.LobbyTaskConfig.signData();
            Object.freeze(this.signData);
            return this.signData;
        }
        /**移除制定面板 
         * @param {key}
        */
        public removeOncPanel(key: string) {
            let _this = this.LobbyPopMap.get(key);
            _this[key]()
        }

        /**手机返回键控制 */
        public destroyPanelByAndroid() {
            if (variableCommon.getInstance().LobbyPopArray.length > 0) {
                let obj = variableCommon.getInstance().LobbyPopArray.pop();
                let fun = obj["fun"]
                try {
                    obj["_this"][fun]();
                    return true;
                }
                catch (e) {
                    console.error("catch(e)手机返回键控制", e);
                }
            }
            else {
                console.error("当前已经没有弹出面板了");
                if (uniLib.Global.isInGame) {
                    return false;
                }
            }

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
                if(item["fun"] == funName&&funName == "onMsgClose"){
                     this.LobbyPopArray.splice(i, 1);
                    break;
                }
            }
            // console.error("removeOne", this.LobbyPopArray);

        }
        /**隐藏虚拟按键 */
        public removeVirtual() {
            uniLib.ZQGameSdk.hideVk();
        }

        public playBgMusic() {
            if (uniLib.Utils.getLocalStorage("MusicVolime")) {
                uniLib.SoundMgr.instance.musicVolume = uniLib.Utils.getLocalStorage("MusicVolime");
            } else {
                uniLib.SoundMgr.instance.musicVolume = 0.5;
            }
            if (uniLib.Utils.getLocalStorage("SoundVolime")) {
                uniLib.SoundMgr.instance.soundVolume = uniLib.Utils.getLocalStorage("SoundVolime");
            } else {
                uniLib.SoundMgr.instance.soundVolume = 1;
            }
            if (uniLib.SoundMgr.instance.musicVolume != 0) {
           //     uniLib.SoundMgr.instance.playBgMusic(["bg2_mp3"]);
            }

        }

        public playButtonSound(){
             if (RES.hasRes("buttonClick_mp3")) {
                uniLib.SoundMgr.instance.playSound("buttonClick_mp3");
            }
        }

        public removeRedPoint() {
            weChat.variableCommon.getInstance().redPointBtnMap.forEach(C => {
                C.skin["redPoint"].visible = false;
            });
            weChat.variableCommon.getInstance().redPointData = [];
        }

        public testCae(str: string = "(101)test<1>gfrg<2>rggs<3>gr<4>") {
           var _loadingMc1 = weChat.LobbyResUtil.createMovieClicp("sz_Lobby_Loading", "loadingMc1");
         _loadingMc1.x = (weChat.LobbyDataCache.defaultWidth) / 2-300;
        _loadingMc1.y = (weChat.LobbyDataCache.defaultHeight) / 2 - 150;
        _loadingMc1.play(-1);
        egret.MainContext.instance.stage.addChild(_loadingMc1)

        }





    }







    /**KEY值为目前游戏二级面板所存的索引*/
    export enum PopMap {
        "help" = 1, //游戏帮助面板
        "noble" = 2, //游戏贵族礼包
        "freegold" = 3, //免费金币
        "notice" = 5, //公告
        "noticeDetail" = 6, //公告详情
        "rank" = 7, //排行榜
        "market" = 8, //商城
    }
    /**红点对应的按钮KEY值以及服务器发来的索引值 ,目前不会作为使用的作用*/
    export enum RedPoint_Button {
        "goldTree" = 701,        //顶部菜单->摇钱树
        "freeGold" = 5,      //底部菜单->免费金币
        "notice" = 600,        //底部菜单->公告

    }
}
