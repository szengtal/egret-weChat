module uniLib {
    /**
    * 资源加载管理(单例)
    */
    export class ResLoadMgr extends egret.EventDispatcher {
        private static _self: ResLoadMgr = null;
        /**
         * 加载进度界面
         */
        //private _loadingUI: LoadingUI = null;
        private _loadingMap: any;

        private _loadingClass: any;
        private _loadSucc: any;
        private _loadError: any;
   /**
             * 当前正在加载的资源组
             */
          private curLoadingGrp = "";

        private _autoHide: boolean = true;
        private _thisObj: any;
        private _curLoadingId: number = 0;

        public static get instance(): ResLoadMgr {
            if (this._self == null) {
                this._self = new ResLoadMgr();
                this._self.initLoadingUI();
            }
            return this._self;
        }

        private initLoadingUI(): void {
            this._loadingMap = {};
            this._thisObj = {};
            this._loadSucc = {};
            this._loadError = {};
        }

        public loadGrps(grpNames, loadSucc, loadError, thisObj, loadIngClass, autoHideLoadUI, isprocess, mustResList){
                if (autoHideLoadUI === void 0) { autoHideLoadUI = true; }
            if (isprocess === void 0) { isprocess = true; }
            if (this.curLoadingGrp != "") {
                console.warn("资源组 [" + this.curLoadingGrp + "] 正在加载,请等待后台加载完成");
                return;
            }
            var grpName = "merge_" + grpNames.toString();
            RES.createGroup(grpName, grpNames, true);
            ResLoadMgr.instance.load(grpName, function (event) {
                uniLib.ResUtils.removeGroup(grpName);
                if (loadSucc) {
                    loadSucc.call(thisObj, event);
                }
            }, function (e) {
                uniLib.ResUtils.removeGroup(grpName);
                if (loadError) {
                    loadError.call(thisObj, e);
                }
            }, thisObj, loadIngClass, autoHideLoadUI, isprocess, mustResList);
            return grpName;
        }

        /**
         * 加载资源组
         */
        public load(groupName: string, loadSucc?: Function, loadError?: Function, thisObj?: any, loadIngClass?: any, autoHideLoadUI: boolean = true, isprocess: boolean = true, mustResList?: any): void {
            if (!isprocess || isprocess == null) {
                isprocess = true;
            }
            if (loadIngClass) {
                this._loadingClass = loadIngClass;
                if (isprocess) {
                    uniLib.UIMgr.instance.showProcessBar(loadIngClass);
                } else {
                    uniLib.UIMgr.instance.showLoadingTimeout(loadIngClass);
                }
            }
            else {
                this._loadingClass = UIMgr.instance.commonLoadUI;
            }

            if (mustResList) {
                ResUtils.setMustRes(mustResList);
            }

            // if (this._loadSucc)
            //     this._loadSucc = null;
            // if (this._loadError)
            //     this._loadError = null;
            // if (this._thisObj)
            //     this._thisObj = null;
            if (loadSucc)
                this._loadSucc[groupName] = loadSucc;
            if (loadError)
                this._loadError[groupName] = loadError;
            if (thisObj)
                this._thisObj[groupName] = thisObj;
            this._autoHide = autoHideLoadUI;

            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onUniLibResLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onUniLibResLoadError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onUniLibResProgress, this);

            RES.loadGroup(groupName);
        }


        private _currentLoadIndex: number = 0;


        ///**
        // * 加载资源组
        // */
        //public load(groupname: string, gameId?: number): void {
        //    if (gameId)
        //        this._curLoadingId = gameId;
        //    //this._loadingUI.show();
        //    RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        //    RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        //    RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        //    RES.loadGroup(groupname);
        //}

        /**
         * 资源组加载完成
         */
        private onUniLibResLoadComplete(event: RES.ResourceEvent): void {
            var grpName: string = event.groupName;
            if (event.groupName) {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onUniLibResLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onUniLibResLoadError, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onUniLibResProgress, this);
            }

            if (this._loadingClass && this._autoHide == true)
                uniLib.UIMgr.instance.hideLoading(this._loadingClass);
            if (this._loadingClass)
                this._loadingClass = null;
            if (this._loadSucc[grpName]) {
                this._loadSucc[grpName].call(this._thisObj[grpName], event);
            }
            this.removeLoadDic(grpName);
        }
        /**
        * 资源组加载出错
        */
        private onUniLibResLoadError(event: RES.ResourceEvent): void {
            //TODO
            var grpName: string = event.groupName;
            console.warn("Group:" + event.groupName + " has failed to load");
            //忽略加载失败的项目
            if (event.groupName) {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onUniLibResLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onUniLibResLoadError, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onUniLibResProgress, this);
                if (this._loadError[grpName])
                    this._loadError[grpName].call(this._thisObj[grpName], event);
                // this.removeRefrence();
                this.removeLoadDic(grpName);
            }
        }

        private removeLoadDic(grpName: string): void {
            this._loadError[grpName] = null;
            delete this._loadError[grpName];
            this._thisObj[grpName] = null;
            delete this._thisObj[grpName];
            this._loadSucc[grpName] = null;
            delete this._loadSucc[grpName];
        }

        /**
         * 资源组加载进度
         */
        private onUniLibResProgress(event: RES.ResourceEvent): void {
            //this._loadingUI.setProgress(event.groupName, event.itemsLoaded, event.itemsTotal);
            if (this._loadingClass)
                uniLib.UIMgr.instance.showProcessBar(this._loadingClass, event.itemsLoaded, event.itemsTotal, "", event.groupName);
        }

        private removeRefrence(): void {
            if (this._loadSucc)
                this._loadSucc = null;
            if (this._loadingClass)
                this._loadingClass = null;
            if (this._loadError)
                this._loadSucc = null;
            if (this._thisObj)
                this._thisObj = null;
        }
    }
}
