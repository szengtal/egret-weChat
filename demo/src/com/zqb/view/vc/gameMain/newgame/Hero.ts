module weChat {

    export
        class Hero extends egret.Sprite {


        public rundTimer: egret.Timer;//跑动状态的计时器


        /**站立的data */
        private _standData: egret.MovieClipData;
        /**跑动data */
        private _runData: egret.MovieClipData;
        /**跳落的data */
        private _flyData: egret.MovieClipData;

        public sprite: egret.Bitmap;
        public mcDataFactory: egret.MovieClipDataFactory;
        public _hero: egret.MovieClip;
        public stateArr = []

        public constructor() {
            super();
            this.init();
        }

        private init() {

            this.sprite = new egret.Bitmap();
            //this.addChild(this.sprite);
            this.changeNormal();

            var data = RES.getRes("heroMC_json");
            var texture = RES.getRes("heroMC_png");
            var mcDataFactory = new egret.MovieClipDataFactory(data, texture);
            var heroMC = new egret.MovieClip();
            this.mcDataFactory = mcDataFactory;

            let mc: egret.MovieClip = weChat.LobbyResUtil.createMovieClicp("jumpMc", "stand");
            this._standData = mc.movieClipData;
            mc = weChat.LobbyResUtil.createMovieClicp("jumpMc", "runfast");
            this._runData = mc.movieClipData;
            mc = weChat.LobbyResUtil.createMovieClicp("jumpMc", "fly");
            this._flyData = mc.movieClipData;

            this._hero = weChat.LobbyResUtil.createMovieClicp("jumpMc", "stand");
            this._hero.play(-1);
            this._hero.scaleX = this._hero.scaleY = 0.5
            this.addChild(this._hero);
            this.stateArr = [];
            this.stateArr.push(this._standData)
            this.stateArr.push(this._runData)
            this.stateArr.push(this._runData)
            this.stateArr.push(this._flyData)

            //每秒计时一次
            this.rundTimer = new egret.Timer(1000, 0);
            this.rundTimer.addEventListener(egret.TimerEvent.TIMER, this.changeNormal, this);

        }



        //变形为死亡状态
        public changeDied() {
            // if (this.getChildIndex(this._hero) != -1) {
            //     this.removeChild(this._hero);
            // }
            // if (this.getChildIndex(this.sprite) == -1) {
            //     this.addChild(this.sprite);
            // }
            // this.sprite.texture = RES.getRes("ball4_png");
            // this.anchorOffsetX = this.sprite.width / 2;
            // this.anchorOffsetY = this.sprite.height / 2;

        }

        //变形为正常状态
        public changeNormal() {
            if (this.getChildIndex(this._hero) != -1) {
                this.removeChild(this._hero);
            }
            if (this.getChildIndex(this.sprite) == -1) {
                this.addChild(this.sprite);
            }
            this.sprite.texture = RES.getRes("ball1_png");
            this.anchorOffsetX = this.sprite.width / 2;
            this.anchorOffsetY = this.sprite.height / 2;
        }



        // 1秒被攻击状态
        private attackedCallback() {
            //console.log("attacked time: " + this.attackedTimer.currentCount);
            if (this.rundTimer.currentCount >= 1) {
                this.rundTimer.reset();
                this.changeNormal();
            }
        }
        /**状态控制  站立=0；左跑=1；右跑2；飞=3 */
        public stateHandle(state: number) {
            if(state == 1){
            this._hero.scaleX = -0.5;

            }else{
            this._hero.scaleX = 0.5;

            }
            this._hero.movieClipData = this.stateArr[state]
            this._hero.play(-1);
        }


    }
}