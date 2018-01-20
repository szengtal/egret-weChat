/**JavaScript类型处理
 * @author szengtal
 */
module weChat {
    export class TypeUtil {
        /**获取JavaScript类型 */
        public static getType(o: any) {
            var _toString = Object.prototype.toString;
            //获取对象原型的toString引用
            //列举常用类型
            var _type = {
                "undefined": "undefined",
                "number": "number",
                "boolean": "boolean",
                "string": "string",
                "[object Function]": "function",
                "[object RegExp]": "regexp",
                "[object Array]": "array",
                "[object Date]": "date",
                "[object error]": "error",
                "[object Boolean]": "boolean",
                "[object String]": "string",
                "[object Number]": "number"
            }

            var jsType = _type[typeof o] || _type[_toString.call(o)] || (o ? "object" : "null");

            if (jsType === "number") {
                o = +o;     //该方法效率比自带快
                if (o !== o) {
                    return "NaN"
                }
            }

            
            return jsType;
        }

    }
}
