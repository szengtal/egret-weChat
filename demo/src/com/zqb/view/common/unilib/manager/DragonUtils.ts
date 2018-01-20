module uniLib {
    /**
    * UI管理
    */
    export class DragonUtils {

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

      

        public static removeFastDragonbyContainer(container, mcName?, key?): void {
            //var common_uiName: string = "";
      
        }

    }
}
