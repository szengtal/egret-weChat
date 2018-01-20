// module weChat {
// 		/**加载按钮 */
// 	export class LobbyGameLoading extends egret.Sprite {
// 		private _loadingText: egret.TextField;
// 		private _loadingImg: egret.Bitmap;
// 		public constructor() {
// 			super();
// 		}
// 		public init(obj?: any) {
// 			if (obj) {
// 				this.x = obj.x;
// 				this.y = obj.y;
// 				this.width = obj.width;
// 				this.height = obj.height;
// 			}
// 		}
// 		public showLoadingNumber(str: string) {
// 			if (this._loadingText) {
// 				this._loadingText.text = str;
// 			} else {
// 				this._loadingText = LobbyResUtil.createTextFeild(0xffffff, egret.HorizontalAlign.CENTER, str, 30, 0, 0, this.width);
// 				this._loadingText.x = (this.width - this._loadingText.width) / 2;
// 				this._loadingText.y = (this.height - this._loadingText.height) / 2;
// 				this.addChild(this._loadingText);
// 			}
// 		}
// 		public showLoadingImg() {
// 			if (this._loadingImg) {
// 				egret.Tween.removeTweens(this._loadingImg);
// 			}
// 			this._loadingImg = LobbyResUtil.createBitmapByName("loadingCircle_png");
// 			this._loadingImg.x = this.width / 2;
// 			this._loadingImg.y = this.height / 2;
// 			this._loadingImg.anchorOffsetX = this._loadingImg.width / 2;
// 			this._loadingImg.anchorOffsetY = this._loadingImg.height / 2;
// 			this.addChild(this._loadingImg);
// 			egret.Tween.get(this._loadingImg, { loop: true })
// 				.call(() => { this._loadingImg.rotation = 0; })
// 				.to({ rotation: 359 }, 2000);
// 		}
// 		public destory() {
// 			if (this._loadingImg) {
// 				egret.Tween.removeTweens(this._loadingImg);
// 				this._loadingImg = null;
// 			}
// 			if (this._loadingText) {
// 				this._loadingText = null;
// 			}
// 			if (this.parent) {
// 				this.parent.removeChild(this);
// 			}
// 		}
// 	}
// }