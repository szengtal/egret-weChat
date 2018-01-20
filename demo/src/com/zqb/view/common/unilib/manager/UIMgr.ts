module uniLib {
    /**
    * UI管理
    */
    export class UIMgr {

        private static _self: UIMgr = null;

        public static get instance(): UIMgr {
            if (this._self == null) {
                this._self = new UIMgr();
            }
            return this._self;
        }

        /**
        * 默认Loading显示
        */
        public defaultLoadingView: any;

        public set DefaultLoading(view: any) {
            this.defaultLoadingView = view;
        }

        /**
        * ui字典
        */
        private _uis: Object = new Object();

        private _loadings: Object = new Object();

        private _effects: any = {};

        /**
         * 显示UI
         * @param ui 显示类
         * @param data 数据
         * @param cache 是否缓存
         */
        public showUI(ui: any, data?: any, parent?: any, cache: boolean = false, drag: boolean = false): any {
            var self: any = this;
            var uiName: string = egret.getQualifiedClassName(ui);
            var onUIRemoveFromStage = function (e: egret.Event) {
                if (self._uis[uiName] && self._uis[uiName].hasEventListener(egret.Event.REMOVED_FROM_STAGE, onUIRemoveFromStage, self))
                    self._uis[uiName].removeEventListener(egret.Event.REMOVED_FROM_STAGE, onUIRemoveFromStage, self);
                //DisplayUtils.removeFromParent(self._uis[uiName]);
                if (self._uis[uiName]["destroy"])
                    self._uis[uiName].destroy();
                if (cache == false) {
                    self._uis[uiName] = null;
                    delete self._uis[uiName];
                }
            }

            if (this._uis[uiName] == null) {
                this._uis[uiName] = new ui(data);
            } else {
                if (this._uis[uiName]["updateUIData"]) {
                    this._uis[uiName]["updateUIData"](data);
                }
            }
            if (this._uis[uiName]) {
                if (cache == false) {
                    if (!this._uis[uiName].hasEventListener(egret.Event.REMOVED_FROM_STAGE, onUIRemoveFromStage, this))
                        this._uis[uiName].addEventListener(egret.Event.REMOVED_FROM_STAGE, onUIRemoveFromStage, this);
                }
                if (this._uis[uiName].stage == null || this._uis[uiName].parent == null) {
                    //if (parent) {
                    //    parent.addChild(this._uis[uiName]);
                    //} else {
                    if (SceneMgr.instance.currentScene && SceneMgr.instance.currentScene.topLayer) {
                        //if (SceneMgr.instance.currentScene.scaleX != 1) {

                        //}
                        SceneMgr.instance.currentScene.topLayer.addChild(this._uis[uiName]);
                    }
                    else {
                        egret.MainContext.instance.stage.addChild(this._uis[uiName]);
                    }
                    //}

                }
                else {
                    //外部更新UI数据,暂时不处理
                    //this._uis[uiName]
                }

                if (drag == true) {
                    //this._uis[uiName].addEventListener(egret.Event.REMOVED_FROM_STAGE, onUIRemoveFromStage, this);
                  
                }

                return this._uis[uiName];
            }
        }

        //public getUI(ui: any, data?: any): any {
        //    var uiName: string = egret.getQualifiedClassName(ui);
        //    var obj = new ui(data);
        //    return obj 
        //}

        private startPoint: egret.Point;
      

        private _commonLoadUI: any;
        public set commonLoadUI(loadClass: any) {
            this._commonLoadUI = loadClass;
        }

        public get commonLoadUI(): any {
            return this._commonLoadUI;
        }

        private _tipsLoadUI: any;
        public set tipsLoadUI(loadClass: any) {
            this._tipsLoadUI = loadClass;
        }

        public get tipsLoadUI(): any {
            return this._tipsLoadUI;
        }

        /**
         * 显示Loading
         */
        public showProcessBar(loadClass?: any, loaded?: any, total?: number, desc?: string, resourceName?: string, force: boolean = false): void {
            return this.showLoading(loadClass, loaded, total, desc, resourceName, force);
        }

        public showLoadingTimeout(loadClass?: any, key: string = "", timeout_msec: number = 20000, desc: string = ""): void {
            this.showLoading(loadClass, null, null, desc, null, false, key);
            var self = this;
            if (timeout_msec) {
                setTimeout(function (): void {
                    self.hideLoading(loadClass, key);
                }, timeout_msec);
            }
        }

        private showLoading(loadClass?: any, loaded?: any, total?: number, desc?: string, resourceName?: string, force: boolean = false, uiName: string = ""): void {
            if (uiName == "") {
                if (loadClass && loadClass != null) {
                    uiName = egret.getQualifiedClassName(loadClass);
                } else {
                    uiName = egret.getQualifiedClassName(this._commonLoadUI);
                    loadClass = this._commonLoadUI;
                }
            } else {
                if (loadClass == null) {
                    uiName = egret.getQualifiedClassName(this._tipsLoadUI);
                    loadClass = this._tipsLoadUI;
                }
            }

            // if (uniLib.StringUtils.stringIsNullOrEmpty(uiName) || loadClass == null)
            //     return;
            if (this._loadings[uiName] == null) {
                this._loadings[uiName] = new loadClass();

            }
            if (this._loadings[uiName]["setProgress"]) {
                this._loadings[uiName].setProgress(2, 100);
            }
            if (this._loadings[uiName].stage == null) {
                if (uniLib.SceneMgr.instance.currentScene) {
                    if ((<uniLib.LobbyScene>uniLib.SceneMgr.instance.currentScene).currentGame && (<uniLib.LobbyScene>uniLib.SceneMgr.instance.currentScene).currentGame.parent) {
                        (<uniLib.LobbyScene>uniLib.SceneMgr.instance.currentScene).currentGame.addChild(this._loadings[uiName]);
                    } else if (SceneMgr.instance.currentScene.tipsLayer) {
                        SceneMgr.instance.currentScene.tipsLayer.addChild(this._loadings[uiName]);
                    }
                }
                else
                    egret.MainContext.instance.stage.addChild(this._loadings[uiName]);
            }

            if (this._loadings[uiName]["setProgress"]) {
                this._loadings[uiName].setProgress(loaded, total, desc, resourceName, force);
            }
        }


        /**
         * 显示例子效果
         * @param parName {string} 粒子名称
         * @param duration {number} 播放时间
         * @param starX {number} 开始位置x
         * @param starY {number} 开始位置y
         */
        public showParticle(parName: string, duration?: number, starX?: number, starY?: number): any {

            var parComplete: Function = function (e: egret.Event) {
                this._effects[parName].removeEventListener(egret.Event.COMPLETE, parComplete, this);
                DisplayUtils.removeFromParent(e.target);
            }
            try {
               
                if (starX)
                    this._effects[parName].emitterX = starX;
                if (starY)
                    this._effects[parName].emitterY = starY;
                if (this._effects[parName].stage == null) {
                    if (SceneMgr.instance.currentScene.effectLayer) {
                        SceneMgr.instance.currentScene.effectLayer.addChild(this._effects[parName]);
                    }
                    else
                        SceneMgr.instance.currentScene.addChild(this._effects[parName]);
                    this._effects[parName].start(duration);
                    this._effects[parName].addEventListener(egret.Event.COMPLETE, parComplete, this);
                }
                else {
                    //外部更新UI数据,暂时不处理
                    //this._uis[uiName]
                }
            } catch (e) {
                console.error("找不到粒子效果");
            }
            return this._effects[parName] || null;
        }

        public hideLoading(loadClass?: any, uiName: string = "", destroy: boolean = true): void {
            if (uiName == "") {
                if (loadClass && loadClass != null) {
                    uiName = egret.getQualifiedClassName(loadClass);
                } else {
                    uiName = egret.getQualifiedClassName(this._commonLoadUI);
                    loadClass = this._commonLoadUI;
                }
            }
            if (this._loadings[uiName] != null) {
                if (this._loadings[uiName]["setProgress"]) {
                    this._loadings[uiName].setProgress(2, 100);
                }
                DisplayUtils.removeFromParent(this._loadings[uiName]);
                if (destroy) {
                    //console.error("hideLoading:" + uiName);
                    this._loadings[uiName] = null;
                    delete this._loadings[uiName];
                }
            }
        }

        public hideUI(ui: any, destroy: boolean = true): void {
            var uiName: string = egret.getQualifiedClassName(ui);
            uniLib.DisplayUtils.removeFromParent(this._uis[uiName]);
            if (destroy) {
                this._uis[uiName] = null;
                delete this._uis[uiName];
            }
        }

        public destroyUI(ui: any): void {
            var uiName: string = egret.getQualifiedClassName(ui);
            if (this._uis[uiName] != null && this._uis[uiName] != undefined) {
                uniLib.DisplayUtils.removeFromParent(this._uis[uiName]);
                delete this._uis[uiName];
            }
        }

        public clearOldSceneUis(): void {
            //var common_uiName: string = "";
            //common_uiName = egret.getQualifiedClassName(this._commonLoadUI);
            if (this._uis) {
                for (var uiName in this._uis) {
                    var element = this._uis[uiName];
                    if (element && element.parent == null) {
                        delete this._uis[uiName];
                    }
                }
            }

            if (this._loadings) {
                for (var uiName in this._loadings) {
                    var element = this._loadings[uiName];
                    if (element && element.parent == null) {
                        delete this._loadings[uiName];
                    }
                }
            }

        }

    }
}
