module gameMain {
export  class BeginScene extends egret.DisplayObjectContainer {
	_main: weChat.LobbyMainGameLayer;
	public constructor(main: weChat.LobbyMainGameLayer) {
		super();
		this._main = main;
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.Init, this)
	}

	public Init() {
		let begin = new egret.TextField();
		begin.text = "点击开始"
		begin.size = 60;
		this.addChild(begin)
		begin.x = (GameConfig.SceneW - begin.width) / 2;
		begin.y = GameConfig.SceneH / 2;
		begin.touchEnabled = true;
		begin.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this._main.BeginGame();
		}, this);
	}
}
}