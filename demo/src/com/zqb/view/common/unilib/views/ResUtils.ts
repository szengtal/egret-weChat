module uniLib {

    /**
   * 资源工具
   */
    export class ResUtils {

        private static MAX_LOAD_LEVEL: number = 1;
        private static _asynLoadLevel: number = 0;
        private static _loadingDic: string[] = [];

        private static _needloadDic: string[] = [];

        private static _needLoadDicCallBack: any = {};

        private static _resRequestSoundLoadTimes: any = {};


        private static _mustResList: string[] = [];

        public static resetSoundLoadTimes(): void {
            for (var i in this._resRequestSoundLoadTimes) {
                this._resRequestSoundLoadTimes[i] = null;
                delete this._resRequestSoundLoadTimes[i];
            }
        }

        public static setMustRes(reslist: any): void {
            try {
                this._mustResList = [];
                for (var key in reslist) {
                    var item = reslist[key];
                    if (item && item.resName && this._mustResList.indexOf(item.resName) == -1) {
                        this._mustResList.push(item.resName);
                    }
                }
            } catch (e) {
                console.warn("setMustRes:必须资源列表出错,请检查必须资源列表格式");
            }

        }

         public static removeGroup(grpName): void {
           var grpDic = ResUtils.getGroupDic();
            if (grpDic) {
                if (grpDic[grpName]) {
                    grpDic[grpName] = null;
                    delete grpDic[grpName];
                }
                else if (grpDic[grpName]) {
                    grpDic[grpName] = null;
                    delete grpDic[grpName];
                }
            }

        }


     public static getGroupDic = function (grpName?) {
            var resConfig = RES["configInstance"];
            var groupDic;
            if (resConfig) {
                if (resConfig["groupDic"] && resConfig["groupDic"]) {
                    if (grpName) {
                        groupDic = resConfig["groupDic"][grpName];
                    }
                    else {
                        groupDic = resConfig["groupDic"];
                    }
                }
                else if (resConfig["config"] && resConfig["config"]["groups"]) {
                    if (grpName) {
                        groupDic = resConfig["config"]["groups"][grpName];
                    }
                    else {
                        groupDic = resConfig["config"]["groups"];
                    }
                }
            }
            return groupDic;
        }

        private static inited: boolean = false;

        public static init(): void {
            if (this.inited == false) {
                this.inited = true;
                RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
                if (typeof (dragonBones) !== "undefined") {
                    egret.startTick(this.onDragonBonesTick, egret.MainContext.instance.stage);
                }
            }
        }

        public static onDragonBonesTick(timeStamp: number): boolean {
            if (typeof (dragonBones) === "undefined")
                return false;
            dragonBones["WorldClock"].clock.advanceTime(-1);
            return true;
        }

        public static onItemLoadError(event: RES.ResourceEvent): void {
            //if (event.resItem.name.indexOf("js") != -1) {
            //    uniLib.console.error("RES.ResourceEvent.ITEM_LOAD_ERROR:", event.resItem.name);
            //} else {
            //    uniLib.console.warn("RES.ResourceEvent.ITEM_LOAD_ERROR:", event.resItem.name);
            //}
            if (this._mustResList.indexOf(event.resItem.name) >= 0) {
                // uniLib.Utils.restart(event.resItem.name + "资源加载失败,请重新启动游戏", "确定");
            }
        }

        //private static mcPool: ObjectFactoryGroup = new ObjectFactoryGroup();
        /**
        * @language zh_CN
        * 解析素材
        * @param source 待解析的新素材标识符
        * @param compFunc 解析完成回调函数，示例：callBack(content:any,source:string):void;
        * @param thisObject callBack的 this 引用
        */
        public static getRes(source: string, compFunc?: Function, thisObject?: any, type?: string): void {
            var self = this;
            function onGetRes(data: any): void {
                if (self._needLoadDicCallBack[source]) {
                    while (self._needLoadDicCallBack[source].length > 0) {
                        var load = self._needLoadDicCallBack[source].shift();
                        load[0].call(load[1], data, source);
                    }
                    delete self._needLoadDicCallBack[source]
                } else {
                    if (thisObject != null) {
                        compFunc.call(thisObject, data, source);
                    } else {
                        if (compFunc)
                            compFunc(data, source);
                    }
                }

                if (self._loadingDic.indexOf(source) != -1) {
                    self._asynLoadLevel--;
                    self._loadingDic.splice(self._loadingDic.indexOf(source), 1);
                }

                if (self._needloadDic.length > 0 && this._asynLoadLevel < this.MAX_LOAD_LEVEL) {
                    var loadResName: string = self._needloadDic.shift();
                    self.getRes(loadResName, onGetRes, self);
                }
            }

            function soundLoaded(evt: egret.Event): void {
                self._resRequestSoundLoadTimes[source] = 0;
                var loader2: egret.URLLoader = <egret.URLLoader>evt.target;
                loader2.removeEventListener(egret.Event.COMPLETE, soundLoaded, self);
                loader2.removeEventListener(egret.IOErrorEvent.IO_ERROR, onSoundLoadError, self);

                var sound: egret.Sound = <egret.Sound>loader2.data;
                if (compFunc) {
                    compFunc(sound, source);
                }
            }

            function onSoundLoadError(evt: egret.Event): void {
                var loader2: egret.URLLoader = <egret.URLLoader>evt.target;
                loader2.removeEventListener(egret.Event.COMPLETE, soundLoaded, self);
                loader2.removeEventListener(egret.IOErrorEvent.IO_ERROR, onSoundLoadError, self);
                console.error("加载资源失败：" + source);
                if (self._resRequestSoundLoadTimes[source] != null) {
                    if (self._resRequestSoundLoadTimes[source] > 0) {
                        self._resRequestSoundLoadTimes[source]--;
                        var loader: egret.URLLoader = new egret.URLLoader();
                        //设置加载方式为声音
                        loader.dataFormat = egret.URLLoaderDataFormat.SOUND;
                        //添加加载完成侦听
                   
                    }
                }
            }

            if (type == egret.URLLoaderDataFormat.SOUND) {
                if (this._resRequestSoundLoadTimes[source] == null) {
                    this._resRequestSoundLoadTimes[source] = 1;
                }
                else if (this._resRequestSoundLoadTimes[source] == 0) {
                    return;
                }
                else {
                    this._resRequestSoundLoadTimes[source]++;
                    return;
                }
                var loader: egret.URLLoader = new egret.URLLoader();
                //设置加载方式为声音
                loader.dataFormat = egret.URLLoaderDataFormat.SOUND;
                //添加加载完成侦听
                loader.once(egret.Event.COMPLETE, soundLoaded, self);
                loader.once(egret.IOErrorEvent.IO_ERROR, onSoundLoadError, self);

                var resConfig: RES.ResourceConfig = RES["configInstance"];
                    console.error("找不到将要加载的资源：" + source + "\t" );
            } else {
                if (RES.hasRes(source)) {
                    var data = RES.getRes(source);
                    if (data) {
                        onGetRes(data);
                    }
                    else {
                        if (this._loadingDic.indexOf(source) >= 0) {
                            var need: any = [compFunc, thisObject];
                            if (this._needLoadDicCallBack[source] == null)
                                this._needLoadDicCallBack[source] = [];
                            this._needLoadDicCallBack[source].push(need);
                            return;
                        }
                        else {
                            if (this._asynLoadLevel < this.MAX_LOAD_LEVEL) {
                                this._loadingDic.push(source);
                                this._asynLoadLevel++;
                                RES.getResAsync(source, onGetRes, this);
                            }
                            else {
                                var need: any = [compFunc, thisObject];
                                if (this._needloadDic.indexOf(source) == -1) {
                                    this._needloadDic.push(source);
                                }
                                if (this._needLoadDicCallBack[source] == null)
                                    this._needLoadDicCallBack[source] = [];
                                this._needLoadDicCallBack[source].push(need);
                            }

                        }
                    }
                }
                else {
                    RES.getResByUrl(source, onGetRes, this);
                }
            }

        }

        /**
         * 退出游戏时清理游戏的组和对应资源配置
         */
        public static clearResConfigByConfigName(arr: string[]): void {
            var configRes = RES["configInstance"];
            for (var key in configRes.groupDic) {
                var group = configRes.groupDic[key];
                for (var keyname in group) {
                    if (arr.indexOf(keyname) >= 0) {
                        if (configRes.keyMap[group[keyname].name]) {
                            group[keyname].name = null;
                            delete group[keyname].name;
                        }
                    }
                }
                configRes.groupDic[key] = null;
                delete configRes.groupDic[key];
            }
        }


        /**
        * 退出游戏时通过资源组名清除资源
        * @groupArr 需要清除的资源组数组
        */
        public static clearResConfigByGroupName(groupArr: string[]): void {
        
        }


        /**
         * 获取图片
         * @param source
         * @param compFunc
         * @param thisObject
         * @param cache
         */
        public static getBmp(source: string, compFunc?: Function, thisObject?: any, cache: boolean = true): egret.Bitmap {
            var obj: egret.Bitmap;
        
            return obj;
        }

        /**
         * 回收图片到池
         * @param source
         * @param obj
         */
        public static freeBmp(obj: egret.Bitmap, source: string): void {
        }

        public static getMovieClip(group: string, name?: string, compFunc?: Function, thisObject?: any, cache: boolean = false): void {
            var loadNum: number = 0;
            if (name == null)
                name = "";
            var sources: string[] = [group + "_json", group + "_png"];
            function onGetMCRes(data: any, resName?: string): void {
                loadNum++;
                if (loadNum == sources.length) {
                    var mdf = new egret.MovieClipDataFactory(RES.getRes(group + "_json"), RES.getRes(group + "_png"));
                    var mc = new egret.MovieClip(mdf.generateMovieClipData(name));//创建MovieClip
                    compFunc.call(thisObject, mc);
                    return;
                }
            }

            //if (this.resPool.isNew("mc_" + group + "_" + name)) {
            for (var i in sources) {
                this.getRes(sources[i], onGetMCRes, this);
            }
            //} else {
            //    this.resPool.active("mc_" + group + "_" + name)
            //}
        }

        /**
         * 回收movieClip到池
         * @param source
         * @param obj
         */
        public static freeMovieClip(obj: egret.MovieClip, group: string, name?: string): void {
            //this.resPool.free(obj, "mc_" + group + "_" + name);
        }

      

        private static loadedConfig: any = {};

        public static loadResConfig(configUrl: string): void {

        }

        /**
         * 通过gameid加载资源组
         */
        public static loadGameGroupReses(configUrl: string, complete?: (event: egret.Event) => void, progress?: (event: egret.Event) => void, loadError?: (event: egret.Event) => void, thisObj?: any, resourceFolder: string = "resource/"): void {
            var groupLoadComplete = function (e: RES.ResourceEvent) {
                if (e.groupName == configUrl) {
                    this.loadedConfig[configUrl].status = GROUP_LOAD_STATUS.LOADED;
                    RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, groupLoadComplete, this);
                    RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, progress, this);
                    RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, loadError, this);
                    complete.call(thisObj, e);
                }

            }

            var groupLoadProgress = function (e: RES.ResourceEvent) {
                if (e.groupName == configUrl) {
                    if (progress) {
                        progress.call(thisObj, e);
                    }
                }
            }

            var groupLoadError = function (e: RES.ResourceEvent) {
                if (e.groupName == configUrl) {
                    RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, groupLoadComplete, this);
                    RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, progress, this);
                    RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, loadError, this);
                    if (loadError) {
                        loadError.call(thisObj, e);
                    }
                }
            }

            var onGetResConfig = function (e: RES.ResourceEvent) {
                RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, onGetResConfig, this);
                var groups: string[] = [];
                for (var str in e.target.resConfig.groupDic) {
                    groups.push(str);
                }
                RES.createGroup(configUrl, groups);
                RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, groupLoadComplete, this);
                RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, groupLoadProgress, this);
                RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, groupLoadError, this);
                RES.loadGroup(configUrl);
            }
            if (this.loadedConfig[configUrl] == null) {
                this.loadedConfig[configUrl] = {};
                this.loadedConfig[configUrl].status = GROUP_LOAD_STATUS.LOADDING;
                RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, onGetResConfig, this);
                RES.loadConfig(configUrl, resourceFolder);
            } else if (this.loadedConfig[configUrl].status == GROUP_LOAD_STATUS.LOADED) {
                complete.call(thisObj);
            }
        }


    }

    export enum GROUP_LOAD_STATUS {
        LOADDING,
        LOADED
    }

}
