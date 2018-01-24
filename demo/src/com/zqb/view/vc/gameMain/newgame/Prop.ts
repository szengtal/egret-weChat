module weChat {

    export
        class Prop extends egret.Sprite {

        public mcDataFactory: egret.MovieClipDataFactory;
        public heroMC: egret.MovieClip;

        public constructor(type: number) {
            super();
            this.init(type);
        }

        private init(type: number) {
            var sprite = new egret.Bitmap();

            switch (type) {
                case 1:
                    sprite.texture = RES.getRes("flow2__png");//忍者
                    this.anchorOffsetX = sprite.width / 2;
                    this.anchorOffsetY = sprite.height / 2;
                    this.addChild(sprite);
                    break;
                case 2:
                    sprite.texture = RES.getRes("flow1__png");//龙卷风
                    this.anchorOffsetX = sprite.width / 2;
                    this.anchorOffsetY = sprite.height / 2;
                    this.addChild(sprite);
                    break;
                case 3:
                    sprite.texture = RES.getRes("prop1_png");//弹簧
                    this.anchorOffsetX = sprite.width / 2;
                    this.anchorOffsetY = sprite.height / 2;
                    this.addChild(sprite);
                    break;
                case 4:
                    sprite.texture = RES.getRes("prop0_png");//导弹
                    this.anchorOffsetX = sprite.width / 2;
                    this.anchorOffsetY = sprite.height / 2;
                    this.addChild(sprite);
                    break;
                case 5:
                    //敌人
                    var data = RES.getRes("enemyMC_json");
                    var texture = RES.getRes("enemyMC_png");
                    this.mcDataFactory = new egret.MovieClipDataFactory(data, texture);
                    this.heroMC = new egret.MovieClip();
                    this.addChild(this.heroMC);
                    this.heroMC.addEventListener(egret.Event.ENTER_FRAME, this.completemc, this);
                    this.heroMC.anchorOffsetX = -this.heroMC.width / 2;
                    this.heroMC.anchorOffsetY = -this.heroMC.height / 2;
                    break;
            }

        }

        //播放左攻击动画
        public playLeftAttack() {
            this.heroMC.movieClipData = this.mcDataFactory.generateMovieClipData("leftAttack");
            this.heroMC.play(1);
        }
        //播放右攻击动画
        public playRightAttack() {
            this.heroMC.movieClipData = this.mcDataFactory.generateMovieClipData("rightAttack");
            this.heroMC.play(1);
        }
        //播放站立动画
        public playStand() {
            this.heroMC.movieClipData = this.mcDataFactory.generateMovieClipData("stand");
            this.heroMC.play(-1);
        }

        private completemc(evt: egret.Event): void {
            if (this.heroMC.currentFrameLabel == "end") {
                this.playStand();
            }
        }
    }
}