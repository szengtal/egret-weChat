module gameMain {
export class BulletFactory extends egret.DisplayObjectContainer {

	_bullet: BulletObject[] = [];
	_p: EnemyPlane[] = [];
	_main: weChat.LobbyMainGameLayer;
	static _bullets: BulletFactory = null;
	public constructor() {
		super();
	}
	static Init(): BulletFactory {
		if (this._bullets == null) {
			this._bullets = new BulletFactory();
		}
		return this._bullets;

	}
	/**
 * 初始化对象池
 */
	InitPool(main: weChat.LobbyMainGameLayer) {
		this._main = main;
		for (var i = 0; i < 100; i++) {
			var bullet = new BulletObject(main);
			this._bullet.push(bullet)
		}
		for (var i = 0; i < 20; i++) {
			if (i < 15) {
				var p = new SmallEnemyPlane(main)
				this._p.push(p)
			}

		}

	}

	public GetCount(): number {
		let count = 0;
		for (var i = 0; i < this._bullet.length; i++) {
			if (this._bullet[i].IsUse == false) {
				count += 1;
			}
		}
		return count;
	}

	/**
 * 从对象池获取一个Bullet
 */
	public GetBullet(): BulletObject {
		for (var i = 0; i < this._bullet.length; i++) {
			if (this._bullet[i].IsUse == false) {
				return this._bullet[i];
			}
		}
		console.log("对象池已经用光了，可能是没有回收")
	}

	public IsHit(e: egret.DisplayObjectContainer): boolean {

		let arr = EnemyFactory.Init().GetIsUsePlane(); //1.从敌机对象池中取出已经在使用的飞机

		let isHit = false;
		let hitevent = new HitEvent(HitEvent.EventString);
		for (var i = 0; i < this._bullet.length; i++) {
			if (this._bullet[i].IsUse == true) {  //2.循环遍历子弹对象池，使用IsUse状态为true的子弹
				if (this._bullet[i].btype == IdentityType.ENEMY) {  //3.判断子弹类型，如果是敌机发射的，那么就和主角进行碰撞检测
					isHit = GameUtils.hitTest(e, this._bullet[i])
					hitevent.htype = HitType.ENEMY_TO_HERO;
				}

				if (this._bullet[i].btype == IdentityType.HERO) { //4.如果是主角发射的。那么就和第一步的取出来的数组进行碰撞检测
					for (var j = 0; j < arr.length; j++) {
						if (arr[j].IsUse) {
							isHit = GameUtils.hitTest(arr[j], this._bullet[i])
							//console.log("检测：" + isHit)
							hitevent.enemy = arr[j];
							hitevent.htype = HitType.HERO_TO_ENEMY;
						}
					}
				}
				if (isHit) {  //如果碰撞检测为true，那么触发HitEvent事件回收当前子弹，并传递检测结果
					this._bullet[i].Recycle();
					this.dispatchEvent(hitevent);

				}
			}
		}
		return isHit;

	}
	GetHeroBullet(): EnemyPlane[] {
		let p = [];
		for (var i = 0; i < this._bullet.length; i++) {
			if (this._bullet[i].IsUse == true && this._bullet[i].btype == IdentityType.HERO) {
				p.push(this._bullet[i]);
			}
		}
		return p;


	}



}
}