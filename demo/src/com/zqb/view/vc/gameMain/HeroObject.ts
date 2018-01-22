module gameMain {
	export class HeroObject extends egret.DisplayObjectContainer {

		_speed: number = 4;
		_isStand: boolean = false
		/**是否在跑动 */
		_isRun: boolean = false

		private _hero: egret.MovieClip;
		/**站立的data */
		private _standData: egret.MovieClipData;
		/**跑动data */
		private _runData: egret.MovieClipData;
		/**跳落的data */
		private _flyData: egret.MovieClipData;
		/**标志 */
		private timeNum: number;
		/**向左或右标志  左 = 1*/
		private _direction: number;

		private test: egret.Sprite;
		public constructor() {
			super();

			let mc: egret.MovieClip = weChat.LobbyResUtil.createMovieClicp("jumpMc", "stand");
			this._standData = mc.movieClipData;
			mc = weChat.LobbyResUtil.createMovieClicp("jumpMc", "runfast");
			this._runData = mc.movieClipData;
			mc = weChat.LobbyResUtil.createMovieClicp("jumpMc", "fly");
			this._flyData = mc.movieClipData;

			this.addEventListener(egret.Event.ADDED_TO_STAGE, () => {


				this._hero = weChat.LobbyResUtil.createMovieClicp("jumpMc", "stand");
				this._hero.play(-1);
				this.addChild(this._hero);
				this.width = 60;
				this.height = 60;
				this.addChild(this._hero)
				this.addEventListener(egret.Event.ENTER_FRAME, this.frame, this);

			}, this)
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.destory, this);
		}
		/**人物是否站在台子上 */
		public set isStand(boo: boolean) {
			this._isStand = boo
		}

		public Fly(x: number, y: number) {
			this.x = x;
			this.y = y;
		}
		_tag: number = 0;
		public frame(e: egret.Event) {



			if (this._isStand && !this._isRun) {
				this.y -= this._speed;
				this._hero.movieClipData = this._standData;
				if (this.y <= 0) {
					//从父节点中移除
					this.y = 300;
				}
			}
			else if (this._isRun) {
				this.y -= this._speed;

				if (this._direction == 0) {
					this.x += this._speed ;
				}
				else if (this._direction == 1) {
					this.x -= this._speed ;
				}
				this._hero.movieClipData = this._runData;
				this._hero.play(-1);
			}
			else {
				console.error("this.y += this._speed + 4;");

				this.y += this._speed + 4;
				this._hero.movieClipData = this._flyData;
				this._hero.play(-1);
			}

			if (this.x < 0 || this.x > 720) {
				console.error("this.x < 0 || this.x > 720");

				this.x = 300;
			}

			if (this.y < 0 || this.y > 1380) {
				console.error("this.x < 0 || this.x > 720");

				this.y = 800;
			}

			if (!this.test) {
				this.test = new egret.Sprite();
				this.addChild(this.test)
			}
			uniLib.DisplayUtils.removeAllChildren(this.test)

			// console.log("this._hero.$getContentBounds();");
			// var rec: egret.Rectangle = this._hero.$getContentBounds()
			// var shp: egret.Shape = new egret.Shape();
			// shp.graphics.beginFill(0xff0dd0, 0.5);
			// shp.graphics.drawRect(rec.x, rec.y, rec.width, rec.height);
			// shp.graphics.endFill();
			// this.test.addChild(shp);
			// console.log("this._hero.$getContentBounds();",rec.height);

		}
/**获取边界 */
		public _getContentBounds(): egret.Rectangle {
			var rec: egret.Rectangle = this._hero.$getContentBounds()
			return rec
		}


		public reset() {
			this.x = 300;
			this.y = 400;
		}
		/**位置偏移
		 * @param boo true为左
		 */
		public sestPosition(boo: boolean) {
			// if (this._isStand) {
			if (this.x < 0 || this.x > 720) return;
			if (boo) {
				this._direction = 1;
			}
			else {
				this._direction = 0;
			}
			this._isRun = true
			egret.clearTimeout(this.timeNum)
			this.timeNum = egret.setTimeout(() => {
				this._isRun = false;
				this._direction = 2;
			}, this, 500)


		}

		private destory() {
			console.error("人被销毁了");

		}
	}
}

