module weChat {
	/**
	 * 弹出管理
	 */
	export class LobbyPopupManager {
		// private static  _popUpMask:egret.Sprite;
		private static showList: Array<LobbyMildAlertVC> = [];

		private static showListStr: Map<string,any> = new Map();;
		
		public constructor() {
		}
		/**
		 * 显示弹出框
		 * @param {key} Array 面板的key索引，
		 * key[0]为key值，名字为面板对应的销毁函数,面板对应的销毁函数要保证干净，因为在退出时候会再次统一调用全局所有的销毁函数    key[1]为创建当前面板所在的类的this.
		 * @param	target:显示对象
		 * @param	modal:是否添加遮罩
		 * @param	center:是否居中显示
		 * @param	useEffect:是否缓动
		 * @param	isTop:是否在最上层
		 */
		public static addPopUp(key: any[], target: egret.DisplayObjectContainer, modal: Boolean = false, center: Boolean = false, useEffect: Boolean = true, w: number = 0, h: number = 0, addClose: boolean = false): void {
			if (variableCommon.getInstance().LobbyPopMap.has(key[0])) {
				console.error("该面板已经存在");
				return;
			}
			else if (key[0] != "") {
				variableCommon.getInstance().LobbyPopMap.set(key[0], key[1]);
				variableCommon.getInstance().LobbyPopArray.push({ _this: key[1], fun: key[0] })
			}
			var popUpMask = new egret.Sprite();
			popUpMask.graphics.beginFill(0, 0.6);
			popUpMask.graphics.drawRect(0, 0, uniLib.Global.screenWidth, uniLib.Global.screenHeight * 1);
			popUpMask.graphics.endFill();
			popUpMask.touchEnabled = true;
			popUpMask.name = target.hashCode + "_mask";
			if (modal) {
				popUpMask.visible = true;
			} else {
				popUpMask.visible = false;
			}
			// egret.MainContext.instance.stage.addChild(target)
			// this.getContainer().addChild(popUpMask);
			this.getContainer().addChild(target);
			var targetX: number;
			var targetY: number;
			if (center) {
				if (w) {
					targetX = LobbyDataCache.defaultWidth - w >> 1;
				} else {
					targetX = LobbyDataCache.defaultWidth - target.width >> 1;
				}
				if (h) {
					targetY = (LobbyDataCache.defaultHeight  - h) / 2;
				} else {
					targetY = (LobbyDataCache.defaultHeight  - target.height) / 2;
				}
			}
			else {
				targetX = target.x;
				targetY = target.y
			}
			// target.x = targetX;
			// target.y = targetY;
				if (addClose) {
					popUpMask.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
						target.dispatchEventWith(LobbyUIEventConsts.CLOSE);
					}, this);
				}
			if (useEffect) {
				target.alpha = 0;
				target.anchorOffsetX = target.width / 2;
				target.anchorOffsetY = target.height / 2;
				target.scaleX = 0.6;
				target.scaleY = 0.6;
				target.x += target.width / 2;
				target.y += target.height / 2;
				egret.Tween.removeTweens(target);
				egret.Tween.get(target).to({ alpha: 1, scaleX: 1.1, scaleY: 1.1 }, 200, egret.Ease.backOut).
					to({ scaleX: 1, scaleY: 1 }, 100);
			}
		}
		/**
		 * 移除弹出框
		 * @param	target:显示对象
		 * @param	useEffect:是否缓动
		 * @param	removeMask:是否移除蒙版
		 */
		public static removePopUp(key, target: egret.DisplayObjectContainer, useEffect: Boolean = false, removeMask: boolean = true): void {

			variableCommon.getInstance().removeOne(key,variableCommon.getInstance().LobbyPopMap.get(key));
			
			if (variableCommon.getInstance().LobbyPopMap.has(key)) {
				variableCommon.getInstance().LobbyPopMap.delete(key);
			}

			let mask;
			if (target.parent) {
				mask = target.parent.getChildByName(target.hashCode + "_mask");
			} else {
				mask = this.getContainer().getChildByName(target.hashCode + "_mask");
			}
			if (mask) {
					egret.Tween.removeTweens(target);
					mask.removeEventListener(egret.TouchEvent.TOUCH_TAP, () => {
						target.dispatchEventWith(LobbyUIEventConsts.CLOSE);
					}, this);
				uniLib.DisplayUtils.removeFromParent(mask);
				mask = null;
			}
			if (!useEffect) {
				if (target.parent)
					target.parent.removeChild(target);
			}
			else {
				egret.Tween.removeTweens(target);
				egret.Tween.get(target).to({ alpha: 0 }, 200).call(this.removeTarget, this, [target]);
			}
		}
		private static removeTarget(target: egret.DisplayObjectContainer): void {
			target.alpha = 1.0;
			egret.Tween.removeTweens(target);
			if (target.parent) {
				target.parent.removeChild(target);
			}
		}
		/**
		 * 轻提示
		 */
		public static showMildWarnShow(msg: string): void {
			LobbyResUtil.trace("轻度提示：" + msg);
			if (!msg) {
				return
			}
		weChat.variableCommon.getInstance().LobbyTempMap.set(msg,0)
			var alert: LobbyMildAlertVC = new LobbyMildAlertVC();
			alert.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeStage, this);
			alert.setText(msg);
			egret.MainContext.instance.stage.addChild(alert)
			// this.getContainer().addChild(alert);
			if (this.showList.length > 0) {
				for (var index = 0; index < this.showList.length; index++) {
					this.showList[index].y -= alert.height;
				}
			}
			this.showList.push(alert);
		}
		private static removeStage(evt: egret.Event): void {
			var alert: LobbyMildAlertVC = evt.currentTarget as LobbyMildAlertVC;
			alert.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeStage, this);
			this.showList.splice(this.showList.indexOf(alert), 1);
		    weChat.variableCommon.getInstance().LobbyTempMap.clear()
		}
		private static getContainer(): egret.DisplayObjectContainer {
			if (MJLobbyInfo.topLayer) {
				return MJLobbyInfo.topLayer;
			}
			if (uniLib.SceneMgr.instance.currentScene && uniLib.SceneMgr.instance.currentScene.tipsLayer) {
				return uniLib.SceneMgr.instance.currentScene.tipsLayer;
			}
			return uniLib.SceneMgr.instance.currentScene
		}
		public static showConfirmPanel(msg: string, btnlables: Array<string>, backFn: Array<Function> = null, title: string = null, backObj: any, countdown: number = 0, needClose: boolean = false, size?: number, align: string = egret.HorizontalAlign.CENTER): void {
			var _msgTips: LobbyMsgBox = new LobbyMsgBox(needClose);
			if (!title) {
				title = "";
			}
			_msgTips.setData(title, msg, btnlables, backFn, backObj, countdown, size, align);
			BC.addEvent(this, _msgTips, LobbyUIEventConsts.CLOSE, this._msgTipscloseHander);
			_msgTips.x = Math.round((LobbyDataCache.defaultWidth - _msgTips.width) / 2);
			_msgTips.y = Math.round((LobbyDataCache.defaultHeight - _msgTips.height) / 2);
			this.addPopUp(["", this], _msgTips, true, true, true, 0, 0, false);
		}
		public static _msgTipscloseHander(msg: egret.Event) {

		}
	}
}