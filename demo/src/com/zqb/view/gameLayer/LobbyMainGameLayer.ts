/**游戏主界面，刚进去 */
module weChat {

    export class LobbyMainGameLayer extends BaseEuiPanel {

        private help: eui.Image;
        private headImg: eui.Image;
        private chips: eui.Label;

        private mainSceneName: eui.Label;
        private restartGameBtn: eui.Label;


        private standardScene: eui.Image;
        private pingArr: number[];


        private _EnemyPool: gameMain.EnemyFactory;
        private _Score: number = 0;
        // private _bullets: gameMain.BulletFactory;
        private _showScore;

        private beginScene: gameMain.BeginScene;
        private _Hero: gameMain.HeroObject;

        constructor() {
            super();
            this.skinName = "LobbyMainSceneSkin"
        }
        public destory(): void {
            super.destory();

            uniLib.DragonUtils.removeFastDragonbyContainer(this);
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);

        }


        protected addEvent() {
            BC.addEvent(this, this.standardScene, egret.TouchEvent.TOUCH_TAP, this.enterStandard);


            BC.addEvent(this, this.help, egret.TouchEvent.TOUCH_TAP, this.showHelp);
            //  if (!weChatMsgCommand.instance.hasEventListener(LobbyUIEventConsts.DATA_CHANGE)) {
                BC.addEvent(this, weChatMsgCommand.instance, LobbyUIEventConsts.DATA_CHANGE, this.dataChangeHandler);
            // }

        }

        protected removeEvent() {
            BC.removeEvent(this, null, egret.TouchEvent.TOUCH_TAP, null);
            BC.removeEvent(this, uniLib.Global);
        }

        /**初始化数据 */
        public init() {


            this.initData();


        }

        public initData() {

        }

    /**全局事件监听类 */
        public dataChangeHandler(e: LobbyUIEventConsts): void {
            var rev: any = e.data.iData;
            switch (e.data.iType) {
                case LobbyUIEventConsts.RESET_MAN_POSITION:
                    this.resetMan();
                    break;

                  case LobbyUIEventConsts.TURN_LEFT:
                    this.setHeroPosition(true);
                    break;
                  case LobbyUIEventConsts.TURN_RIGHT:
                    this.setHeroPosition(false);
                    break;
            }

        }


        /**进入新手场 */
        private enterStandard() {
            console.error("进入新手场");
            // weChat.variableCommon.getInstance().playButtonSound();
            // this.dispatchEventWith(LobbyUIEventConsts.ENTER_STANDARD);
            this.BeginGame();
        }
        /**显示帮助 */
        private showHelp() {
            console.error("显示帮助");
            weChatMsgCommand.instance.dispatchChangeEvent(LobbyUIEventConsts.LOBBY_SHOW_HELP, null);
        }

        public BeginGame() {
            // this._bullets = gameMain.BulletFactory.Init();
            // this._bullets.InitPool(this);
            this._EnemyPool = gameMain.EnemyFactory.Init();
            this._EnemyPool.InitEnemyPool(this);
            let bg = new gameMain.BgContent();
            this.addChild(bg)

            //移除开始界面，然后加入其它的GameObject
            // this.removeChild(this.beginScene);
            //开始加入Hero
            this._Hero = new gameMain.HeroObject();

            this._Hero.Fly(300, 400)
            this.addChildAt(this._Hero, 30)
            this.addEventListener(egret.Event.ENTER_FRAME, (e) => {
                //判断Enemy子弹是否和主角碰撞
                let isHit = this._EnemyPool.IsHit(this._Hero)
                // console.log("Hit:" + isHit)

                //判断Enemy是否和主角碰撞


            }, this)
            this._EnemyPool.addEventListener(gameMain.HitEvent.EventString, (e: gameMain.HitEvent) => {
                // console.log("碰撞事件触发：" + e.htype)
                if (e.htype == gameMain.HitType.ENEMY_TO_HERO) {
                    //Hero被击中
                    // this.HeroDie();
                    this._Hero.isStand = true;
                }
                if (e.htype == gameMain.HitType.HERO_TO_ENEMY) {
                    //Enemy被击中
                    e.enemy.Recycle();
                    this._Score += 1;
                    console.log("当前分数:" + this._Score);
                }
                if(e.htype == gameMain.HitType.NOT_HIT){
                    this._Hero.isStand = false;
                       
                }

            }, this)
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (evt) => {
                this._touchStatus = true;
                this._distance.x = evt.stageX - this._Hero.x;
                this._distance.y = evt.stageY - this._Hero.y;
                this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, (e) => {
                    if (this._touchStatus) {
                        this._Hero.x = evt.stageX - this._distance.x;
                        this._Hero.y = evt.stageY - this._distance.y;
                    }
                }, this);

            }, this)
            this._Hero.addEventListener(egret.TouchEvent.TOUCH_END, (e) => {
                console.log("Mouse Up.");
                this._touchStatus = false;
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, () => { }, this);
            }, this)


        }

        public HeroDie() {
            //Hero死亡,移除帧事件
            this.removeEventListener(egret.Event.ENTER_FRAME, () => { }, this)
            this._Hero._timer.stop();
            if (this._Hero.parent) {
                this.removeChild(this._Hero)
            }
        }
        private _distance: egret.Point = new egret.Point(); //鼠标点击时，鼠标全局坐标与_bird的位置差
        private _touchStatus: boolean = false;              //当前触摸状态，按下时，值为true


private resetMan(){
    this._Hero.reset();
}

private setHeroPosition(boo:boolean){
    this._Hero.sestPosition(boo);
    
}



        /**
    * 网络检测控制
    */
        private netControl(evt: egret.Event): void {
            console.error("网络检测控制", evt.data);
            var ping: number = evt.data;
            this.pingHandle(ping)
        }
        private pingHandle(number) {
            let isTerrible: boolean = false;
            if (!this.pingArr) {
                this.pingArr = []
            }
            this.pingArr.push(number);
            if (this.pingArr.length > 2) {
                this.pingArr.shift();
            }
            for (let i = 0; i < this.pingArr.length; i++) {
                if (this.pingArr[i] < 500) {
                    isTerrible = true
                }
            }
            if (!isTerrible) {
                if (weChat.variableCommon.getInstance().LobbyTempMap.has("网络不佳，处理中")) {
                    return;
                }
                weChat.LobbyPopupManager.showMildWarnShow("网络不佳，处理中..");
            }
        }

    }
}