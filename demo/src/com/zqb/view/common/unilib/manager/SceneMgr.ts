module uniLib {

    /**
    * 场景管理（单例）
    */
    export class SceneMgr {

        private static _self: SceneMgr = null;

        public static get instance(): SceneMgr {
            if (this._self == null) {
                this._self = new SceneMgr();
            }
            return this._self;
        }

        public init(scene: any): void {
            if (this._currentScene == null)
                this._currentScene = scene;
        }

        /**
         * 当前场景
         */
        private _currentScene: IScene = null;

        /**
         * 上一个场景
         */
        private _lastScene: IScene = null;

        /**
         * 改变当前场景
         */
        public changeScene(sceneClass: any, params?: any, bMode?: boolean): any {
            //if (params == null) {
            //    params = { "addToStage": true }
            //}
            ////这里待优化
            //if (bMode) {
            //    var currentGameScene: any = (<LobbyScene>this._currentScene).currentGame;
            //    if (currentGameScene != null) {
            //        //this._lastScene = this._currentScene;
            //        if (currentGameScene.parent) {
            //            currentGameScene.parent.removeChild(currentGameScene);
            //        }
            //        currentGameScene.destroy();
            //    }
            //    currentGameScene = new sceneClass(params);
            //    if (params.hasOwnProperty("addToStage") == true) {
            //        (<LobbyScene>this._currentScene).gameLayer.addChild(currentGameScene);
            //    }
            //    return currentGameScene;
            //}
            //if (egret.getQualifiedClassName(sceneClass) == "LobbyScene" || (egret.getQualifiedClassName(this._currentScene) != "LobbyScene")) {
            var self: any = this;
            var onAddToStage = function (e: egret.Event) {
                e.currentTarget.removeEventListener(egret.Event.ADDED_TO_STAGE, onAddToStage, this);
                if (self._lastScene) {
                    self._lastScene.destroy();
                    //self._lastScene.removeChildren();
                    self._lastScene = null;
                }
            }

            if (bMode && Global.isInGame) {
                var currentGameScene: any = (<LobbyScene>this._currentScene).currentGame;
                if (currentGameScene != null) {
                    //this._lastScene = this._currentScene;
                    if (currentGameScene.parent) {
                        currentGameScene.parent.removeChild(currentGameScene);
                    }
                    currentGameScene.destroy();
                }
                currentGameScene = new sceneClass(params);
                if (currentGameScene.width > Global.designWidth || currentGameScene.height > Global.designHeight) {
                    currentGameScene.scaleX = Global.designWidth / currentGameScene.width;
                    currentGameScene.scaleY = Global.designHeight / currentGameScene.height;
                }
                (<LobbyScene>this._currentScene).currentGame = currentGameScene;
                //if (params.hasOwnProperty("addToStage") == true) {
                (<LobbyScene>this._currentScene).gameLayer.addChild(currentGameScene);
                //}
                return currentGameScene;
            } else {
                //if (Global.isLobbyMode) {
                var newScene = new sceneClass(params);
                //xuyong 临时修改
                if (newScene.width > newScene.height) {
                    if (newScene.width > Global.designHeight && newScene.height > Global.designWidth) {
                        newScene.scaleX = 1136 / 1280;
                        newScene.scaleY = 640 / 720;
                    }
                } else {
                    if (newScene.width > Global.designWidth && newScene.height > Global.designHeight) {
                        newScene.scaleX = 640 / 720;
                        newScene.scaleY = 1136 / 1280;
                    }
                }
                // if (newScene.width > Global.designWidth && newScene.height > Global.designHeight) {
                //     if(newScene.width>newScene.height){
                //         newScene.scaleX = Global.designWidth / newScene.width;
                //         newScene.scaleY = Global.designHeight / newScene.height;
                //     }else{
                //         newScene.scaleX = Global.designHeight / newScene.width;
                //         newScene.scaleY = Global.designWidth / newScene.height;
                //     } 
                // }
                if (this._currentScene != null) {
                    this._lastScene = this._currentScene;
                    //if (this._lastScene.parent) {
                    //    this._lastScene.parent.removeChild(this._lastScene);
                    //}
                    //this._lastScene.removeChildren();
                    DisplayUtils.removeFromParent(this._lastScene);
                    //last = this._lastScene;
                    //this._lastScene.unRegisterEvent();
                }
                this._currentScene = newScene;
                //if (params.hasOwnProperty("addToStage") == true) {
                this._currentScene.addEventListener(egret.Event.ADDED_TO_STAGE, onAddToStage, this);
                egret.MainContext.instance.stage.addChild(this._currentScene);
                //this._lastScene.destroy();

                return this._currentScene;
            }

            // if (Global.isInGame == false){

            // } else {

            // }
        }

        /**
         * 获取当前场景
         */
        public get currentScene(): IScene {
            return this._currentScene;
        }

        /**
         * 新的场景加载完成后关闭上一个场景
         */
        public lastSceneLeave(): void {
            if (this._lastScene != null) {
                if (this._lastScene.parent) {
                    this._lastScene.parent.removeChild(this._lastScene);
                }
                this._lastScene.destroy();
                this._lastScene = null;
            }
        }

        /**
         * 抛出场景状态事件
         * iType: 事件类型
         * iData: 需要传递的数据
         */
        //public dispatchSceneStateEvent(iType: string, iData: any): void {
        //    var evt: SceneStateEvent = new SceneStateEvent(SceneStateEvent.EVENT_SCENE);
        //    var data = new EventData();
        //    data.iType = iType;
        //    data.iData = iData;
        //    evt.data = data;
        //    this.dispatchEvent(evt);
        //}

    }
}