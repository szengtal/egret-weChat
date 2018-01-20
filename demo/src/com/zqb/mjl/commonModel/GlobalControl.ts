module weChat {
	/**
	 * 全局控制
	 */
	export class GlobalControl {
		private _hasExit: boolean;
		private static _instance: GlobalControl;
		public constructor() {
		}
		public static getInstance(): GlobalControl {
			if (!GlobalControl._instance) {
				GlobalControl._instance = new GlobalControl()
			}
			return GlobalControl._instance;
		}
	

		private onRestart(evt: egret.Event): void {
			uniLib.Utils.restart("更新完成,点击确定重启", "确定");
		}
	
		private onCancel(): void {
			this._hasExit = false;
		}
	}
}