module gameMain {
export class SmallEnemyPlane extends gameMain.EnemyPlane {
	public constructor(main: weChat.LobbyMainGameLayer) {
		super(main, EnemyType.SMALL);
		this.width = 69;
		this.height = 89;

		this._enemy.texture = RES.getRes("enemy2_png");
		this.addEventListener(egret.Event.ADDED_TO_STAGE, () => {
		}, this)
	}
}
}