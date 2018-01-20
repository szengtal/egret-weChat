module uniLib {

    export class DisplayUtils {
        /**
         * 创建资源
         */
        public static createBitmapByName(keyName: string): egret.Bitmap {
            var result: egret.Bitmap = new egret.Bitmap();
            var texture: egret.Texture = RES.getRes(keyName);
            result.texture = texture;
            return result;
        }

        /**
         * 创建动画
         * @param groupName
         * @param keyName
         */
        public static createMovieClicp(groupName: string, keyName?: string): egret.MovieClip {
            var data = RES.getRes(groupName + "_json");//获取动画文件的信息配置文件
            var texture = RES.getRes(groupName + "_png");//获取动画文件的图片
            var mdf = new egret.MovieClipDataFactory(data, texture);
            var mc = new egret.MovieClip(mdf.generateMovieClipData(keyName));//创建MovieClip
            return mc;
        }

        /**
         * 创建矩形
         * @param alpha
         * @param w
         * @param h
         * @param color
         */
        public static createMask(alpha: number = 0.3, w?: number, h?: number, color: number = 0x000000): egret.Sprite {
            var sp: egret.Sprite = new egret.Sprite();
            sp.graphics.clear();
            sp.graphics.beginFill(color, alpha);
            sp.graphics.drawRect(0, 0, w ? w : uniLib.Global.screenWidth, h ? h : uniLib.Global.screenHeight);
            sp.graphics.endFill();
            return sp;
        }

        /**
         * 创建矩形
         * @param alpha
         * @param w
         * @param h
         * @param color
         */
        public static createShape(alpha: number = 0.3, w?: number, h?: number, color: number = 0x000000): egret.Shape {
            var sp: egret.Shape = new egret.Shape();
            sp.graphics.clear();
            sp.graphics.beginFill(color, alpha);
            sp.graphics.drawRect(0, 0, w ? w : uniLib.Global.screenWidth, h ? h : uniLib.Global.screenHeight);
            sp.graphics.endFill();
            return sp;
        }
        /**
         * 创建圆形
         */
        public static createCircle(alpha: number = 0.3, r?: number, color: number = 0x000000): egret.Sprite {
            var sp: egret.Sprite = new egret.Sprite();
            sp.graphics.clear();
            sp.graphics.beginFill(color, alpha);
            sp.graphics.drawCircle(0, 0, r);
            sp.graphics.endFill();
            return sp;
        }


        /**
         * 创建DragonBones显示对象
         */
        public static createDragonBonesDisplay(dragonJson: string, json: string, png?: string, bones?: string, cache?: number): any {
            var dragonbonesData = RES.getRes(dragonJson);
            if (png && png != null) {
                var textureData = RES.getRes(json);
                var texture = RES.getRes(png);
            } else {
                var textureData = RES.getRes(json + "_json");
                var texture = RES.getRes(json + "_png");
            }



            if (bones == null || bones.length == 0)
                bones = "armature";

            var armature: any;
            if (dragonBones) {
                var dragonbonesFactory: any = new dragonBones["EgretFactory"]();
                dragonbonesFactory.addDragonBonesData(dragonBones["DataParser"].parseDragonBonesData(dragonbonesData));
                dragonbonesFactory.addTextureAtlas(new dragonBones["EgretTextureAtlas"](texture, textureData));
                if (cache) {
                    armature = dragonbonesFactory.buildFastArmature(bones);
                    armature.enableAnimationCache(cache);
                } else
                    armature = dragonbonesFactory.buildArmature(bones);
            }
            return armature;
        }

        private static ticketStarted: boolean = false;
        /**
         * 运行龙骨动画
         * @param animationName {string} 指定播放的动画名称.
         * @param playTimes {number} 动画播放次数(0:循环播放, >=1:播放次数, NaN:使用动画数据中的播放时间), 默认值：NaN
         * @returns {AnimationState} 动画播放状态实例
         * 
         */
        public static runDragonBonesArmature(armature: any, animationName: string, playTimes?: number, isPlay: boolean = true) {
            if (armature == null) {
                console.error("armature不能为空");
                return;
            }
            dragonBones["WorldClock"].clock.add(armature);
            if (isPlay) {
                armature.animation.gotoAndPlay(animationName, 0, -1, playTimes, 0);
            }
            else {
                armature.animation.gotoAndStop(animationName, 0);
            }
        }

        /**
         * 删除龙骨动画
         */
        public static destoryDragonBonesArmature(armature: any, animationName: string) {
            if (armature == null) {
                console.error("armature不能为空");
                return;
            }
            dragonBones["WorldClock"].clock.remove(armature);
            armature.animation.stop();
            //egret.stopTick(this.onTicker,this);
            armature.dispose();
        }
        /**
         * 文本资源
         */
        public static createTextLabel(color: number = 0x000000, align: string = "left", txt: string = "none", size: number = 0, width: number = 0, height: number = 0, strokeColor: number = 0, stroke: number = 0, x: number = 0, y: number = 0, rotation: number = 0, skewX: number = 0): egret.TextField {
            var text = new egret.TextField();
            text.textColor = color;
            text.textAlign = align;
            text.fontFamily = "微软雅黑";
            text.text = txt;
            text.size = size;
            if (0 != width)
                text.width = width;
            if (height != 0)
                text.height = height;
            if (strokeColor != 0 && strokeColor != stroke) {
                text.strokeColor = strokeColor;
                text.stroke = stroke;
            }
            text.rotation = rotation;
            if (skewX != 0)
                text.skewX = skewX
            text.x = x;
            text.y = y;
            return text;
        }

        /**
         * 从父移除
         * @param obj
         */
        public static removeFromParent(obj: egret.DisplayObject): void {
            if (obj && obj.parent) {
                obj.parent.removeChild(obj);
            }
        }
        /**
    	* 移除显示容器中的所有子集但不包括自己 
    	* @param disContainer
    	*/
        public static removeAllChildren(disContainer: egret.DisplayObjectContainer): void {
            while (disContainer && disContainer.numChildren && disContainer.numChildren > 0) {
                this.removeFromParent(disContainer.getChildAt(0));
            }
        }

        /**
         * 截屏
         * @param obj
         * @param rect
         */
        public static catchScreen(obj: egret.DisplayObject, rect?: egret.Rectangle): string {
            var renderTexture: egret.RenderTexture = new egret.RenderTexture();
            renderTexture.drawToTexture(obj);
            return renderTexture.toDataURL("image/png", rect ? rect : new egret.Rectangle(0, 0, obj.width, obj.height));
        }

        /**
         * 截屏
         * @param obj
         * @param rect
         */
        public static catchScreenToTex(obj: egret.DisplayObject, rect?: egret.Rectangle, scale?: number): egret.RenderTexture {
            var renderTexture: egret.RenderTexture = new egret.RenderTexture();
            renderTexture.drawToTexture(obj, rect, scale);
            return renderTexture;
        }

        public static lightArea(area: egret.DisplayObject, maskAlpha: number = 0.8): egret.Bitmap {
            var container: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
            var mask: egret.Shape = uniLib.DisplayUtils.createShape(maskAlpha, uniLib.Global.screenWidth, uniLib.Global.screenHeight);
            container.addChild(mask);
            container.addChild(area);

            area.blendMode = egret.BlendMode.ERASE;


            var renderTexture: egret.RenderTexture = new egret.RenderTexture();
            renderTexture.drawToTexture(container);

            var bitmap: egret.Bitmap = new egret.Bitmap();
            bitmap.texture = renderTexture;
            return bitmap;
        }

    }
}
