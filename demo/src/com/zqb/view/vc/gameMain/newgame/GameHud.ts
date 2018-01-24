module weChat {

    export
        class GameHud extends egret.Sprite {

        private stageW: number;
        private stageH: number;
        public scoreLabel: egret.TextField;
        private timeBarBg: egret.Bitmap;
        private timeBar: egret.Bitmap;
        private factor: number = 50;
        private leftTimer: egret.Timer;
        private rightTimer: egret.Timer;
        private heroStayTimer: egret.Timer;//英雄停留计时器
        private timeBarTimer: egret.Timer;//进度条计时器
        private stayTime: number = 0;
        private preScore: number = 0;
        private curScore: number = 0;

        private hero: Hero;
        private heroBody: p2.Body;

        public constructor(gameScene: newGameScene) {

            super();
            this.init(gameScene);

        }

        private init(gameScene: newGameScene): void {

            this.stageH = egret.MainContext.instance.stage.stageHeight;
            this.stageW = egret.MainContext.instance.stage.stageWidth;

            this.hero = gameScene.hero;
            this.heroBody = gameScene.heroBody;

            this.setUI();
            this.addevent();
        }

        private addevent() {
            BC.addEvent(this, weChatMsgCommand.instance, LobbyUIEventConsts.DATA_CHANGE, this.dataChangeHandler);

        }

        /**全局事件监听类 */
        public dataChangeHandler(e: LobbyUIEventConsts): void {
            var rev: any = e.data.iData;

            switch (e.data.iType) {
                case LobbyUIEventConsts.RESET_MAN_POSITION:
                    this.heroStay();
                    break;

                case LobbyUIEventConsts.TURN_LEFT:
                    this.leftBtnCallback(rev);
                    break;
                case LobbyUIEventConsts.TURN_RIGHT:
                    this.rightBtnCallback(rev);
                    break;
            }

        }

        // 设置界面
        private setUI(): void {
            var stageW = this.stageW;
            var stageH = this.stageH;

            // 初始分数标签
            var scoreLabel = new egret.TextField();
            this.addChild(scoreLabel);
            scoreLabel.anchorOffsetX = scoreLabel.width / 2;
            scoreLabel.anchorOffsetY = scoreLabel.height / 2;
            scoreLabel.x = stageW * 0.85;
            scoreLabel.y = stageH * 0.05;
            scoreLabel.size = 30;
            scoreLabel.textAlign = "center";
            scoreLabel.text = "0";
            scoreLabel.textColor = 0xffffff;
            scoreLabel.fontFamily = "Arial";
            scoreLabel.italic = true;
            this.scoreLabel = scoreLabel;

            //  添加时间进度条
            //  底部
            var timeBarBg = new egret.Bitmap();
            timeBarBg.texture = RES.getRes("time_png");
            this.addChild(timeBarBg);
            timeBarBg.anchorOffsetX = 0;
            timeBarBg.anchorOffsetY = 0;
            timeBarBg.x = stageW * 0.9;
            timeBarBg.y = stageH * 0.4;
            timeBarBg.visible = false;
            this.timeBarBg = timeBarBg;
            //  上部
            var timeBar = new egret.Bitmap();
            timeBar.texture = RES.getRes("time2_png");
            this.addChild(timeBar);
            timeBar.anchorOffsetX = 0;
            timeBar.anchorOffsetY = 0;
            timeBar.x = timeBarBg.x;
            timeBar.y = timeBarBg.y;
            timeBar.mask = new egret.Rectangle(0, 0, timeBar.width, timeBar.height);//设置遮罩，初始亮条全显
            timeBar.visible = false;
            this.timeBar = timeBar;



            this.leftTimer = new egret.Timer(1000 / 60, 0);
            this.leftTimer.addEventListener(egret.TimerEvent.TIMER, this.leftMove, this);

            this.rightTimer = new egret.Timer(1000 / 60, 0);
            this.rightTimer.addEventListener(egret.TimerEvent.TIMER, this.rightMove, this);

        }

        public updateScore(score: number) {

            this.curScore = score;
            this.scoreLabel.text = "" + score;
        }


        //  左按钮回调
        private leftBtnCallback(evt: egret.TouchEvent): void {

            if (evt.type == egret.TouchEvent.TOUCH_BEGIN) {
                //console.log("touch begin");
                this.leftTimer.start();

            }
            else if (evt.type == egret.TouchEvent.TOUCH_END) {
                //console.log("touch ended");
                this.leftTimer.reset();
            }
            else if (evt.type == egret.TouchEvent.TOUCH_RELEASE_OUTSIDE) {
                //console.log("touch cancel");
            }

        }

        //  右按钮回调
        private rightBtnCallback(evt: egret.TouchEvent): void {

            if (evt.type == egret.TouchEvent.TOUCH_BEGIN) {
                //console.log("touch begin");

                this.rightTimer.start();
            } else if (evt.type == egret.TouchEvent.TOUCH_END) {
                //console.log("touch ended");
                //  水平速度归零
                //heroBody.velocity[0] = 1;
                this.rightTimer.reset();

            } else if (evt.type == egret.TouchEvent.TOUCH_RELEASE_OUTSIDE) {
                //console.log("touch cancel");
                evt.currentTarget.scaleX = 1.0;
                evt.currentTarget.scaleY = 1.0;
            }

        }

        private leftMove() {
            var heroBody = this.heroBody;
            //  向左移动
            if (heroBody.velocity[0] > -7) {
                heroBody.force[0] = -0.7 * this.factor;
            } else {
                heroBody.velocity[0] = -7;
            }
        }

        private rightMove() {
            var heroBody = this.heroBody;
            //  向右移动
            if (heroBody.velocity[0] < 7) {
                heroBody.force[0] = 0.7 * this.factor;
            } else {
                heroBody.velocity[0] = 7;
            }
        }

        private heroStay() {
            var heroBody = this.heroBody;

            heroBody.position[1] = 12
            heroBody.position[0] = 5
        }

        private timeBarCallback() {

            var timeBar = this.timeBar;

            // 如果得分的话就暂停倒计时
            if (this.curScore > this.preScore) {
                this.timeBarBg.visible = false;
                timeBar.visible = false;
                timeBar.mask = new egret.Rectangle(0, 0, timeBar.width, timeBar.height);
                this.timeBarTimer.reset();
                this.heroStayTimer.start();
            } else {
                var h = (timeBar.height / 10) * this.timeBarTimer.currentCount;
                timeBar.mask = new egret.Rectangle(0, h, timeBar.width, timeBar.height - h);
                if (this.timeBarTimer.currentCount >= 10) {
                    this.timeBarTimer.reset();
                    // 游戏结束
                    this.hero.changeDied();
                }
            }


        }

    }
}