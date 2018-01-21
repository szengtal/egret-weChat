module gameMain {
export  class BulletObject extends egret.DisplayObjectContainer {

	_bullet: egret.Bitmap;
	public btype: IdentityType = IdentityType.OTHER;
	/**
	 * 是否使用
	 */
	public IsUse: boolean = false;
	_main: weChat.LobbyMainGameLayer;
	_speed = 8;
	public constructor(main: weChat.LobbyMainGameLayer) {
		super();
		this.width = 9;
		this.height = 21;
		this._main = main;
		this._bullet = new egret.Bitmap();
		this.addChild(this._bullet)
	}
	frame() {
		// console.log("Bullet Frame")
		try {
			if (this.IsUse) {
				if (this.btype == IdentityType.ENEMY) {
					this.y += this._speed;
					if (this.y >= GameConfig.SceneH) {
						//从父节点中移除
						this.Recycle();
					}
				}
				if (this.btype == IdentityType.HERO) {
					this.y -= this._speed;
					if (this.y <= 0) {


						this.Recycle();
					}
				}

			}

		} catch (error) {
			console.log("这里出错了:" + error)

		}
	}
	/**
	 * 使用
	 */
	public Use(type: IdentityType, x: number, y: number) {
		this.IsUse = true;
		this.x = x;
		this.y = y;
		this.btype = type;
		if (type == IdentityType.ENEMY) {
			this._bullet.texture = RES.getRes("bullet1_png")
		}
		else {
			this._bullet.texture = RES.getRes("bullet2_png")
		}
		this._main.addChild(this)
		this.addEventListener(egret.Event.ENTER_FRAME, this.frame, this)

	}
	/**
	 * 回收
	 */
	public Recycle() {
		// console.log("收回Ing")
		this.IsUse = false;
		this._main.removeChild(this);
		this.removeEventListener(egret.Event.ENTER_FRAME, this.frame, this)
		// console.log("回收：剩余"+BulletFactory.GetCount())
		

	}
}


/**
 * 子弹类型
 */
export enum IdentityType {
	/**
	 * 敌人
	 */
	ENEMY,
	/**
	 * 主角
	 */
	HERO,

	OTHER
}
}