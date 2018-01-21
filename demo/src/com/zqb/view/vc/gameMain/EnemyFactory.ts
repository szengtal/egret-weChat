module gameMain {
	export class EnemyFactory extends egret.DisplayObjectContainer {
		_timer: egret.Timer;
		_main: weChat.LobbyMainGameLayer;

		private testContain: egret.Sprite;
		public constructor() {
			super();
		}
		_enemys: EnemyPlane[] = [];

		_giveevent: EnemyGiveEvent;
		static _enemys: EnemyFactory = null;
		static Init(): EnemyFactory {
			if (this._enemys == null) {
				this._enemys = new EnemyFactory();
			}
			return this._enemys;

		}
		/**
		 * 初始化对象池
		 */
		public InitEnemyPool(main: weChat.LobbyMainGameLayer) {
			this._main = main;
			for (var i = 0; i < 40; i++) {
				var p = new SmallEnemyPlane(this._main)
				this._enemys.push(p)
			}
			this._giveevent = new EnemyGiveEvent(EnemyGiveEvent.TAG);
			this._timer = new egret.Timer(1000);
			this._timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this)
			this._timer.start();
			this.addEventListener(EnemyGiveEvent.TAG, (e: EnemyGiveEvent) => {
				// console.log("生产Enemy +1")
				var x = GameUtils.GetRandomNum(0, 5.5) * 100;
				var small = this.GetSamllEnemyObject(EnemyType.SMALL);
				small.x = x;
				small.Use();

			}, this)
		}



		/**
	 * 定时调用
	 */
		public timerFunc() {
			this.dispatchEvent(this._giveevent);
		}

		public GetIsUsePlane(): EnemyPlane[] {
			let planes = [];
			for (var i = 0; i < this._enemys.length; i++) {
				if (this._enemys[i].IsUse) {
					planes.push(this._enemys[i])

				}
			}
			return planes;
		}

		public GetSamllEnemyObject(type: EnemyType): SmallEnemyPlane {
			for (var i = 0; i < this._enemys.length; i++) {
				if (!this._enemys[i].IsUse && this._enemys[i]._tyle == type) {
					return this._enemys[i];
				}
			}

		}

		public IsHit(e: egret.DisplayObjectContainer): boolean {

			let arr = EnemyFactory.Init().GetIsUsePlane(); //1.从对象池中取出已经在使用的平台

			if (!this.testContain) {
				this.testContain = new egret.Sprite();
				egret.MainContext.instance.stage.addChild(this.testContain)
				// this._main.addChild(this.testContain)
			}

			let isHit = false;
			let hitevent = new HitEvent(HitEvent.EventString);
			for (var i = 0; i < this._enemys.length; i++) {
				if (this._enemys[i].IsUse == true) {  //2.循环遍历平台对象池，使用IsUse状态为true的平台
					isHit = GameUtils.hitTest(e, this._enemys[i], this.testContain)
					if (isHit) {  //如果碰撞检测为true,派发个事件
						// this._enemys[i].Recycle();
						hitevent.htype = HitType.ENEMY_TO_HERO;
						this.dispatchEvent(hitevent);
						break;
					}
					else {
						hitevent.htype = HitType.NOT_HIT;
					}

				}
			}
			if (hitevent.htype == HitType.NOT_HIT) {
				this.dispatchEvent(hitevent);

			}

			return isHit;

		}
	}
}