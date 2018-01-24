/**
 * 背景
 */
module gameMain {
	export class BgContent extends egret.DisplayObjectContainer {
		public constructor() {
			super();
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.Init, this)
		}

		bgbitmap1: egret.Bitmap;
		bgbitmap2: egret.Bitmap;

		bgSpeed: number;

		public Init(): void {
			this.bgSpeed = 5;
			var bg = RES.getRes("background_png");
			this.bgbitmap1 = new egret.Bitmap(bg);
			this.bgbitmap1.width = weChat.GameManager.stageW;
			this.bgbitmap1.height = weChat.GameManager.stageH+ 10;
			this.addChild(this.bgbitmap1)
			this.bgbitmap2 = new egret.Bitmap(bg);
			this.bgbitmap2.width = weChat.GameManager.stageW;
			this.bgbitmap2.height = weChat.GameManager.stageH;
			this.addChild(this.bgbitmap2)
			this.bgbitmap1.x = 0;
			this.bgbitmap1.y = 0;
			this.bgbitmap2.x = 0;
			this.bgbitmap2.y = weChat.GameManager.stageH + 10;
			this.touchEnabled = true;
			this.Run();

		}

		/**
		 * 开始滚动背景图
		 */
		public Run() {
			this.addEventListener(egret.Event.ENTER_FRAME, () => {
				this.bgbitmap1.y -= this.bgSpeed;
				if (this.bgbitmap1.y < -weChat.GameManager.stageH) {
					this.bgbitmap1.y = (0)

				}
				this.bgbitmap2.y -= this.bgSpeed;
				if (this.bgbitmap2.y < 0) {
					this.bgbitmap2.y = (0 + weChat.GameManager.stageH)

				}

			}, this)
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