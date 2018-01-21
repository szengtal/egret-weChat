module weChat {
	/**
	 * 游戏主界面，
	 */
	export class MJLobbyVc extends LobbyBaseVc {

		private bg: egret.Bitmap;

		private _mainGameLayer: LobbyMainGameLayer;
		private _standardGameLayer: LobbyStandardGameLayer;
		private _timeStamp: number;

		public constructor() {
			super();
		}
		public destory(): void {
			super.destory();
			uniLib.DragonUtils.removeFastDragonbyContainer(this);
			weChat.variableCommon.getInstance().removeRedPoint();
			weChat.variableCommon.getInstance().redPointBtnMap.clear();
			this.removeMainGameLayer(true);
			this.removeStandardGameLayer(true);
			if (this._timeStamp) {
				egret.clearTimeout(this._timeStamp)
			}
		}


		public initUI(): void {
			this.bg = LobbyResUtil.createBitmapByName("Lobbybg_jpg");
			this.bg.height =1280// uniLib.Global.screenHeight;
			this.bg.width = 720 + 3;

        // // else
			this.bg.x = -3

			this.addChild(this.bg);
			this.bg.blendMode = egret.BitmapFillMode.SCALE;

			this.showMainGameLayer();
			this.createStandardGameLayer();
			//兼容有时消息过来，游戏还未完成构建
		}

		/**显示主界面 */
		private showMainGameLayer(): void {
			if (!this._mainGameLayer) {
				this._mainGameLayer = new LobbyMainGameLayer;
				BC.addEvent(this, this._mainGameLayer, LobbyUIEventConsts.ENTER_STANDARD, this.onStandardGameClicked);
				BC.addEvent(this, this._mainGameLayer, LobbyUIEventConsts.LOBBY_SHOW_HELP, this.onStandardGameClicked);
				this.addChild(this._mainGameLayer);

			}
			if (this._mainGameLayer) {
				this._mainGameLayer.visible = true;
			}
		}

	

		/**移除主界面 */
		private removeMainGameLayer(isDestory: boolean = false): void {
			if (this._mainGameLayer && isDestory) {
				this._mainGameLayer.destory();
				BC.removeEvent(this, this._mainGameLayer);
				this._mainGameLayer = null;
			}
			else if (this._mainGameLayer) {
				this._mainGameLayer.visible = false;
			}
		}

		/**点进入新手场 */
		private onStandardGameClicked(e: egret.Event): void {
			this.removeMainGameLayer();
			this.showStandardGameLayer();
			variableCommon.getInstance().LobbyPopArray.push({ _this: this, fun: "returnFromStandardGame" })
		}

		/**从新手场返回到主界面 */
		private returnFromStandardGame(e: egret.Event): void {
			variableCommon.getInstance().removeOne("returnFromStandardGame", this)
			this.removeStandardGameLayer();
			this.showMainGameLayer();
		}

		/**
		 *  @author garr
		 * 第一次进入游戏就创建，后面的游戏和新手场切换用visible 来控制 */
		private createStandardGameLayer() {
			if (!this._standardGameLayer) {
				this._standardGameLayer = new LobbyStandardGameLayer;
				BC.addEvent(this, this._standardGameLayer, LobbyUIEventConsts.BACK_MAINSCENE, this.returnFromStandardGame);
				this.addChild(this._standardGameLayer);
			}
			this._standardGameLayer.Covervisible = false;
		}


		/**
		 * @author garr
		 * 显示新手场 用visible控制，经测试可以提高一倍的帧数 */
		private showStandardGameLayer(): void {
			if (!this._standardGameLayer) {
				this.createStandardGameLayer();
			}
			this._standardGameLayer.Covervisible = true;
		}

		/**移除新手场  正常切换只设置visible
		 * @param {boolean} isDestory 销毁游戏时候传true
		*/
		private removeStandardGameLayer(isDestory: boolean = false): void {
			if (this._standardGameLayer && isDestory) {
				this._standardGameLayer.destory();
				BC.removeEvent(this, this._standardGameLayer);
				this._standardGameLayer = null;
			}
			else if (this._standardGameLayer) {
				this._standardGameLayer.Covervisible = false;
			}
			else {
				console.error("新手场界面对象不存在");
			}
		}


		/**
		 * 更新游戏顶部的个人信息
		 */
		public updateMainGameLayerUser() {
			if (this._mainGameLayer) {
				this._mainGameLayer.initData();
			}
			if (this._standardGameLayer) {
				this._standardGameLayer.initData();
			}
			if (weChat.variableCommon.getInstance()._popLayer) {
				weChat.variableCommon.getInstance()._popLayer.updateData();
			}
		}
		/**更新红点信息，所有需要红点的按钮要手动根据约定索引添加到Map */
		public RedPointControl(data: any) {
			weChat.variableCommon.getInstance().redPointBtnMap.forEach(C => {
				C.skin["redPoint"].visible = false;
			});
			if (Array.isArray(data)) {
				data.forEach((c) => {
					// console.error("(c.msgType)", c.msgType, "//0", weChat.variableCommon.getInstance().redPointBtnMap.get(c.msgType).skin["redPoint"], "//0");
					if (weChat.variableCommon.getInstance().redPointBtnMap.get(c.msgType)) {
						weChat.variableCommon.getInstance().redPointBtnMap.get(c.msgType).skin["redPoint"].visible = true;
					}
				})
			}
		}


	}

}