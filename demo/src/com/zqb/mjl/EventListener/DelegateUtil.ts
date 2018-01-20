/**
* 函数代理，方便传递参数和函数执行空间地址，包含原始参数和附加参数。
* @author 交流联系方式 442924754@qq.com 梦之神仔
**/
class DelegateUtil{
	/**
		* 函数代理，方便传递参数和函数执行空间地址，包含原始参数和附加参数。
		* @param thisArg 函数执行空间地址
		* @param fun 被代理的函数
		* @param funParameters 传递给被代理函数的参数
		* @return 代理函数
		* @throws "没有可代理的函数."
		*/
	public static create(thisArg:any,fun:Function, ... funParameters):Function{
		if(!fun)throw "没有可代理的函数."
		var tempFun:Function=function tempFun(...e):any{
			fun.apply(thisArg, e.concat(funParameters));
			thisArg = null;
		};
		return tempFun;
	}
	/**
		* 函数代理，方便传递参数和函数执行空间地址，仅包含附加参数。
		* @param thisArg 函数执行空间地址
		* @param fun 被代理的函数
		* @param funParameters 传递给被代理函数的参数
		* @return 代理函数
		* @throws "没有可代理的函数."
		*/
	public static createFilterOriginalParameters(thisArg:any,fun:Function, ... funParameters):Function{
		if(!fun)throw "没有可代理的函数."
		var tempFun:Function=function tempFun(...e):any{
			fun.apply(thisArg, funParameters);
		};
		return tempFun;
	}
}
