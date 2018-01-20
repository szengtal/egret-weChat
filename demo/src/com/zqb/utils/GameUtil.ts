/**
 * Created by iluspan on 2017/7/19.
 */
module weChat {
    export class GameUtil {
        /**
         * 设置显示对象屏幕X居中
         * @param node
         */
        public static setCenterX(node: any): void {
            node.x = (uniLib.Global.screenWidth - node.width) / 2;
        }

        public static setCenterY(node: any): void {
            node.y = (uniLib.Global.screenHeight - node.height) / 2;
        }


        //往数组当中添加某个元素
        public static addElement(arr: any, ele: any): boolean {
            var result: boolean = arr.some((data: any) => {
                return data == ele;
            });

            if (result) {
                return true;
            } else {
                arr.push(ele);
                return false;

            }
        }

        /**
         * 动态添加元素到数组当中，如果当前数组存在某个元素的话则删除，没有则添加
         */
        public static operationElement(arr: any, ele: any): any {
            var result: boolean = arr.some((data: any) => {
                return data == ele;
            });
            if (result) {
                arr.splice(arr.indexOf(ele), 1);
            } else {
                arr.push(ele);

            }

            return arr;
        }

        /**
         * 获取Mediator
         * @param name
         */
        public static getMediatorByName(name: string): any {
            var mediator: any = weChat.MahJongLobbyFacade.getLobbyInstance().retrieveMediator(name);
            return mediator;
        }

        /**
         * 分割字符串返回相应索引的值
         * @param str
         * @param symbo
         * @param backIndex
         * @returns {any}
         */
        public static splitStr(str: string, symbo: string, backIndex: number): any {
            var strs = new Array(); //定义一数组
            strs = str.split(symbo);
            if (strs[backIndex]) {
                return strs[backIndex];
            }
            return null;
        }


        /**
         * 获取屏幕位置的指定位置
         * @param
         */
        public static getReadyIconPos(point: egret.Point, container: egret.DisplayObjectContainer): egret.Point {
            var targetPoint: egret.Point = container.globalToLocal(point.x, point.y);
            return targetPoint;
        }

        /**
         * @garr
         * 三张的数值规则
         * 先除，然后分割小数点前后，处理小数点后面，然后再拼接
         * @param {number} 要格式化的数字
         * @returns {string} 格式化后的字符串
         */
        public static sanzhangNumFormat(num: number): string {
            if (num < 0) { return; }
            if (!(TypeUtil.getType(num) === "number")) {
                console.error("wocao,不是个数字，它是个", TypeUtil.getType(num));
                return;
            }
            if (num <= 10000) {
                return num + "";
            }
            let mod: number = 0;
            let sym: string = ""
            if (Math.abs(num) >= 10000 && Math.abs(num) < 100000000) {
                mod = 10000;
                sym = "万";
            } else {
                mod = 100000000;
                sym = "亿";
            }

            // let numStr = "" + (num / mod).toFixed(3);
            let numStr = ("" + (num / mod));
            if (numStr.lastIndexOf('.') != -1) {
                numStr = numStr.substring(0, numStr.lastIndexOf('.') + 4);
            }
            else {
                numStr = numStr.substring(0, numStr.lastIndexOf('.') + 5);
            }
            let before = numStr.split(".")[0];
            let after = numStr.split(".")[1];
            if (Number(after)) {
                let afterLength = (4 - before.length) > 0 ? 4 - before.length : 0;
                let afterArr = after.split("");
                afterArr.length = afterLength;
                after = afterArr.join("");
                let after2 = (Number("0." + after)).toString();
                after2 = Boolean(after2.split(".")[1]) ? "." + after2.toString().split(".")[1] : ""
                let final = before + after2 + sym;
                return final;
            }
            else {
                return before + sym
            }
        }

        /**
        * 字符串长度处理
        * @param {string} 
        */
        public static handleString(str: string, len: number = 6): string {
            var name = str
            var strLength: number;

            while (this.getStrRealLength(name) > len) {
                strLength = name.length;
                name = name.substr(0, strLength - 1);
            }
            return name;

        }


        /**
		 * 获取字符串实际长度
         * @param {string} 
		 */
        public static getStrRealLength(str: string): number {
            var jmz = { GetLength: null };
            jmz.GetLength = function (str) {
                return Number(str.replace(/[\u0391-\uFFE5]/g, "aa").length);  //先把中文替换成两个字节的英文，在计算长度
            };
            return jmz.GetLength(str);
        }

    	/**
		 * 两个整数间随机随机数,包含min和max
		 * @param {string} min: 最小数
		 * @param {string} max: 最大数
		 */
        public static RandomNumBoth(Min, Max) {
            var Range = Max - Min;
            var Rand = Math.random();
            var num = Min + Math.round(Rand * Range); //四舍五入
            return num;
        }
        /**时间戳转换为具体时间
         * @param {number} 要转换的时间戳
         */
        public static changeTimeToStr(num: number): string {
            if (num == null)
                return "";
            num = num.toString().length == 10 ? num * 1000 : num;
            var date: Date = new Date();
            date.setTime(num);
            var str: string = date.getFullYear() + "-" + this.getNumStr(date.getMonth() + 1) + "-" + this.getNumStr(date.getDate()) + "  " + this.getNumStr(date.getHours()) + ":" + this.getNumStr(date.getMinutes()) + ":" + this.getNumStr(date.getSeconds());
            return str;
        }

        private static getNumStr(num: number): string {
            if (num < 10) {
                return "0" + num;
            }
            return num.toString();
        }
    }
}
