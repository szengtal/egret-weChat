module gameMain {
	export class HeroObject extends egret.DisplayObjectContainer {
		_textures: egret.Texture[] = [];
		_hero: egret.Bitmap;
		_timer: egret.Timer;
		_speed: number = 4;
		_isStand: boolean = false
		/**
		 * 主角事件
		 */
		_heroOpenFireEvent: OpenFireEvent;
		public constructor() {
			super();
			this.addEventListener(egret.Event.ADDED_TO_STAGE, () => {
				this._textures[0] = RES.getRes("hero1_jpg");
				this._textures[1] = RES.getRes("hero2_jpg");
				this._hero = new egret.Bitmap();
				this._hero.texture = this._textures[0];
				this.width = 60;
				this.height = 60;
				this.addChild(this._hero)
				this._heroOpenFireEvent = new OpenFireEvent(OpenFireEvent.EventString);
				this._heroOpenFireEvent.Btype = IdentityType.HERO;
				this.addEventListener(egret.Event.ENTER_FRAME, this.frame, this);
				this._timer = new egret.Timer(GameConfig.HeroOpenFireTime);
				this._timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);

				this._timer.addEventListener(egret.TimerEvent.COMPLETE, this.timerComplete, this);
				this._timer.start();

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
			if (this._tag >= 30) this._tag = 0;
			if (this._tag >= 15) {
				this._hero.texture = this._textures[0];
			}
			else {
				this._hero.texture = this._textures[1];
			}
			this._tag += 1;

			if (this._isStand) {
				this.y -= this._speed;
				if (this.y <= 0) {
					//从父节点中移除
					this.y = 300;
					if (this.parent) {
						// uniLib.DisplayUtils.removeFromParent(this)
					}
				}
			}
			else {
				this.y += this._speed + 4;
			}


		}

		public timerFunc(e: egret.TimerEvent) {
			//this.dispatchEvent(this._heroOpenFireEvent);

		}
		public timerComplete(e: egret.TimerEvent) {


		}

		public reset() {
			this.x = 300;
			this.y = 400;
		}
		/**位置偏移
		 * @param boo true为左
		 */
		public sestPosition(boo: boolean) {
			if (this.x < 0 || this.x > 720) return;
			if (boo) {
				this.x = this.x - 40;
			}
			else {
				this.x = this.x + 40;
			}
		}

		private destory() {
			console.error("人被销毁了");

		}
	}
}

