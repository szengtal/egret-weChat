module gameMain {
export  class EnemyPlane extends egret.DisplayObjectContainer {
	_enemy: egret.Bitmap;
	_timer: egret.Timer;
	_speed: number = 4;
	_tyle: EnemyType = EnemyType.SMALL;
	/**
	 * enemy
	 */
	_enemyOpenFireEvent: OpenFireEvent;
	/**
	 * 是否使用 表示是否在当前屏幕内作为存在
	 */
	public IsUse: boolean = false;
	_main: weChat.LobbyMainGameLayer;
	public constructor(main: weChat.LobbyMainGameLayer, type: EnemyType) {
		super();
		this._main = main;
		this._tyle = type;
		this._enemy = new egret.Bitmap();
		this.addChild(this._enemy);
		this._timer = new egret.Timer(1000)
		this._timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this)
		this._timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerCom, this)
		this._enemyOpenFireEvent = new OpenFireEvent(OpenFireEvent.EventString);
		this._enemyOpenFireEvent.Btype = IdentityType.ENEMY;

	}
	public Fly(x: number, y: number) {
		this.x = x;
		this.y = y;
	}


	/**
	 * 使用
	 */
	public Use() {
		this.IsUse = true;
		this._timer.start();
		//判断类型
		this.y =GameConfig.SceneH// this.height; //初始化飞机的位置为屏幕外
		this._main.addChildAt(this, 10)
		this.addEventListener(egret.Event.ENTER_FRAME, this.frame, this)

	}

	timerFunc(): void {
		this.dispatchEvent(this._enemyOpenFireEvent);


	}
	timerCom(): void {

	}
	/**
	 * 回收
	 */
	public Recycle() {

		this._timer.stop();
		this.IsUse = false;
		if (this.parent) {
			this._main.removeChild(this);
		}
		this.removeEventListener(egret.Event.ENTER_FRAME, this.frame, this)


	}
	frame() {
		// console.log("EnemyPlane Frame")
		if (this.IsUse) {
			this.y -= this._speed;
			if (this.y <= 0) {
				//从父节点中移除
				if (this.parent) {
					this.Recycle();
				}
			}
		}

	}


}

/**
 * 平台类型
 */
export enum EnemyType {
	/**
	 * 普通
	 */
	BIG = 1,
	/**
	 * 消失
	 */
	SMALL = 0,

	/**
	 * 伤人
	 */
	VERSCHWINDENDSMALL = 2
}
}