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

            var display2 = this.createBox(sprite.width, sprite.height);
            display2.anchorOffsetX = display2.width / 2;
            display2.anchorOffsetY = display2.height / 2;
            // this.addChild(display2);

        }

        public changeTexture(change: boolean) {
            if (change) {
                this.sprite.texture = RES.getRes("line3_png");
            } else {
                this.sprite.texture = RES.getRes("line1_png");
            }

        }

        private createBox(width: number, height: number): egret.Sprite {
            var contain = new egret.Sprite();
            var shape = new egret.Shape();
            shape.graphics.beginFill(0xfff000);
            shape.graphics.drawRect(0, 0, width, height);
            shape.graphics.endFill();

            contain.addChild(shape)

            return contain;
        }
    }
}