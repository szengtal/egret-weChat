module weChat {

    export
        class SideStep extends egret.Sprite {

        public sprite: egret.Bitmap;
        public type: number;
        public constructor(type: number) {

            super();
            this.init(type);
        }

        private init(type: number) {

            this.type = type;
            var sprite = new egret.Bitmap();
            if (type == 1 || type == 3) {
                sprite.texture = RES.getRes("enemy2_png");
            } else if (type == 2) {
                sprite.texture = RES.getRes("line1_png");
            }
            this.anchorOffsetX = sprite.width / 2;
            this.anchorOffsetY = 0;
            this.addChild(sprite);
            this.sprite = sprite;

        }

        public changeTexture(change: boolean) {
            if (change) {
                this.sprite.texture = RES.getRes("line3_png");
            } else {
                this.sprite.texture = RES.getRes("line1_png");
            }

        }
    }
}