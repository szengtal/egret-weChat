module weChat {
	/**
	 *
	 * @author 
	 *
	 */
    export class LobbyResUtil {
        private static initParams: any;
        public constructor() {
        }
		/**
		 * 获取url参数
		 */
        public static getURLData(): any {
            if (!this.initParams) {
                this.initParams = {};
                var str: string = window.location.search;
                if (str == "") {
                    return;
                }
                if (str.charAt(0) == "?") {
                    str = str.slice(1);
                    var arr: string[] = str.split(/&/);
                    var paramArr: string[];
                    for (var i = 0; i < arr.length; i++) {
                        paramArr = arr[i].split(/=/);
                        if (paramArr.length == 2) {
                            this.initParams[paramArr[0]] = paramArr[1];
                        }
                    }
                }
            }
            return this.initParams;
        }
        /**
         * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
         * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
         */
        public static createBitmapByName(name: string, x: number = 0, y: number = 0): egret.Bitmap {
            var result: egret.Bitmap = new egret.Bitmap();
            var texture: egret.Texture = RES.getRes(name);
            result.texture = texture;
            result.smoothing = true;
            result.x = x;
            result.y = y;
            return result;
        }
        public static createTexture(name: string): egret.Texture {
            var texture: egret.Texture = RES.getRes(name);
            return texture;
        }
        public static trace(...str: any[]): void {
            uniLib.Console.log(str.join(","));
        }
        public static randRange(min: number, max: number): number {
            var num: number = max - min;
            var randomNum: number = Math.floor(Math.random() * num);
            return min + randomNum;
        }

        /**
		 * 格式化货币
		 * @param currency 货币
		 * @param num
		 * @return String
		 **/
        public static currencyFormat(num: number, len: number = -1): string {
            var str: String = Math.abs(num).toString();
            var sign: String = "";
            if (num < 0) {
                sign = "-";
            }
            var small: String = "";
            if (str.indexOf(".") > -1) {
                small = str.substring(str.indexOf("."), str.length);
                str = str.substring(0, str.indexOf("."));
            }

            if (len != -1) {
                while (str.length < len) {
                    str = "0" + str;
                }
            }

            var ary: Array<any> = str.split("");
            var leng: number = ary.length;
            var index: number = 1;
            for (var i: number = leng - 1; i > 0; i-- , index++) {
                if ((index / 3) == 1) {
                    index = 0;
                    ary[i] = "," + ary[i];
                }
            }
            return sign + ary.join("") + small;
        }
        public static backToNumber(numStr: String): number {
            var num: Number;
            //            numStr=numStr.replace(SystemConsts.CURRENCY,"");
            var pattern: RegExp = /,/g
            numStr = numStr.replace(pattern, "");
            return Math.round(Number(numStr));
        }
        //字符串长度
        public static getCharLength(txt: string): number {
            var byte: egret.ByteArray = new egret.ByteArray();
            byte.writeUTF(txt);
            byte.position = 0;
            return byte.bytesAvailable;
        }
        /**
          通过json png  
          创建MovieClip
        */
        public static createMovieClip(name, jsons, png): egret.MovieClip {
            var mc: egret.MovieClip;
            var data = RES.getRes(jsons);
            var txtr = RES.getRes(png);
            var mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
            mc = new egret.MovieClip(mcFactory.generateMovieClipData(name));
            mc.gotoAndStop(1);
            mc.name = name;
            return mc;
        }
        public static createTextFeild(color: number, align: string, text: string, size: number, x: number = 0, y: number = 0, width: number = -1, isBold: boolean = false): egret.TextField {
            var tf: egret.TextField = new egret.TextField();
            if (width != -1) {
                tf.width = width;
            }
            tf.fontFamily = "微软雅黑";
            tf.bold = isBold;
            tf.textColor = color;
            tf.textAlign = align;
            tf.text = text;
            tf.size = size;
            tf.x = x;
            tf.y = y;
            tf.multiline = false;
            return tf;
        }
        public static createFontText(text: string, x: number = 0, y: number = 0, width: number = -1, font?: egret.BitmapFont): egret.BitmapText {
            if (!font) {
                font = RES.getRes("betTipText_fnt");
            }
            var tf: egret.BitmapText = new egret.BitmapText();
            if (width != -1) {
                tf.width = width;
            }
            tf.font = font;
            tf.text = text;
            tf.x = x;
            tf.y = y;
            return tf;
        }
        public static createScroll(content: egret.DisplayObject, w: number, h: number, x: number = 0, y: number = 0): egret.ScrollView {
            var scrollView: egret.ScrollView = new egret.ScrollView();
            scrollView.width = w;
            scrollView.height = h;
            scrollView.x = x;
            scrollView.y = y;
            scrollView.setContent(content);
            return scrollView;
        }
        /**
	* 从父级中移除显示对象（如显示对象为影片剪辑则停止） 
	* @param dis
	* 
	*/
        public static removeFromParent(dis: egret.DisplayObject): void {
            if (dis && dis.parent) {
                dis.parent.removeChild(dis);
            }
        }

        /**
        * 移除显示容器中的所有子集但不包括自己 
        * @paramisContainer
        */
        public static removeAllChildren(disContainer: egret.DisplayObjectContainer): void {
            while (disContainer.numChildren > 0) {
                this.removeFromParent(disContainer.getChildAt(0));
            }
        }
        public static getTimeStr2(): String {
            var date: Date = new Date();
            var str: String = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " >>> ";
            return str;
        }
        public static numFormat(num: number, decimal: number = 0): string {
            var str: string;
            var tempStr: string = "";
            var sign: string = "";
            if (num < 0) {
                num = -num;
                sign = "-";
            }
            var numArr: Array<number>;
            var uArr: Array<string>;
            numArr = [1000000000, 1000000, 1000];
            uArr = ["B", "M", "K"];
            str = String(num);
            for (var j = 0; j < numArr.length; j++) {
                if (num >= numArr[j]) {
                    tempStr = uArr[j];
                    if (decimal == -1) {
                        str = String(num / numArr[j]);
                    } else {
                        str = String(this.setDot(num / numArr[j], decimal));
                    }
                    break;
                }
            }


            if (str.indexOf(".") != -1) {
                //如果小数点为0直接去掉
                for (var i = 0; i < decimal; i++) {
                    if (Number(str.charAt(str.length - 1)) == 0) {
                        if (i + 1 == decimal)
                            str = str.slice(0, str.length - 2);
                        else
                            str = str.slice(0, str.length - 1);
                    }
                }

                if (str.charAt(str.length - 1) == ".")
                    str = str.slice(0, str.length - 1);

            }
            return sign + str.concat(tempStr);
        }
        /**
         * 格式化数字
         */
        public static numFormat2(num: number, decimal: number = 0): string {
            var str: string;
            var tempStr: string = "";
            var sign: string = "";
            if (num < 0) {
                num = -num;
                sign = "-";
            }
            var numArr: Array<number>;
            var uArr: Array<string>;
            numArr = [100000000, 10000, 1000];
            uArr = ["亿", "万", "千"];
            str = String(num);
            for (var j = 0; j < numArr.length; j++) {
                if (num >= numArr[j]) {
                    tempStr = uArr[j];
                    if (decimal == -1) {
                        str = String(num / numArr[j]);
                    } else {
                        str = String(this.setDot(num / numArr[j], decimal));
                    }
                    break;
                }
            }


            if (str.indexOf(".") != -1) {
                //如果小数点为0直接去掉
                for (var i = 0; i < decimal; i++) {
                    if (Number(str.charAt(str.length - 1)) == 0) {
                        if (i + 1 == decimal)
                            str = str.slice(0, str.length - 2);
                        else
                            str = str.slice(0, str.length - 1);
                    }
                }

                if (str.charAt(str.length - 1) == ".")
                    str = str.slice(0, str.length - 1);

            }
            return sign + str.concat(tempStr);
        }
        private static setDot(num: number, decimal: number = -1): Number {
            if (decimal > 0) {
                return Math.floor(num * Math.pow(10, decimal)) / Math.pow(10, decimal);
            }
            else if (decimal == 0) {
                return Math.floor(num);
            }
            return num;
        }


        /**
            超过10万，显示XX万。在大于10万，小于100万的时候，最多显示两位小数
            大于100万，小于1千万的时候，显示一位小数
            大于1千万小于1亿的时候，不显示小数。
            大于1亿小于100亿的时候显示2位小数。
            大于100亿之后不显示小数
         */

        /**麻将游戏货币规格 */
        public static numberFormat(num): string {
            let str: string;
            if (num < 1e5) {
                str = "" + num;
            } else if (num >= 1e5 && num < 1e6) {
                str = (num / 1e4).toFixed(2) + "万";
            } else if (num >= 1e6 && num < 1e7) {
                str = (num / 1e4).toFixed(1) + "万";
            } else if (num >= 1e7 && num < 1e8) {
                str = (num / 1e4).toFixed(0) + "万";
            } else if (num >= 1e8 && num < 1e10) {
                str = (num / 1e8).toFixed(2) + "亿";
            } else {
                str = (num / 1e8).toFixed(0) + "亿";
            }
            return str;
        }

        public static createMovieClicp(groupName: string, keyName?: string): egret.MovieClip {
            var data = RES.getRes(groupName + "_json");//获取动画文件的信息配置文件
            var texture = RES.getRes(groupName + "_png");//获取动画文件的图片

            var mdf = new egret.MovieClipDataFactory(data, texture);
            var mc = new egret.MovieClip(mdf.generateMovieClipData(keyName));//创建MovieClip
            return mc;
        }
    }
}
