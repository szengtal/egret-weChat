class ArrayUtil {
		/**
		 *  合并数组 并返回新数组 [ arrA[0], arrB[0] ]; 
		 * @param arrA
		 * @param arrB
		 * @return 
		 * 
		 */		
	public static mergeArray(arrA: Array<any>, arrB: Array<any>) {
       //用spread操作符
       //var a = [1,2]
       //var b= [3,4]
       //var c = [...a,...b]
    }
    /**
     删除某数据 
     arr 指定数组（可以是Array,也可以是Vector）
     value
    */
    public static removeByValue(arr:any, value:any):any{
        if(!arr || !(arr instanceof Array)){
            return [];
        }
        var len:number = arr.length;
        for(var i:number = 0; i<len; i++){
			if (arr[i] == value) {
                arr.splice(i, 1);
                return arr;
			}
        }
        if(arr){
            return arr;
        }else{
            return [];
        }
    }
    /**
     * 倒序删除
     */
    public static removeValue(arr:any, value:any):any{
        if(!arr || !(arr instanceof Array)){
            return [];
        }
         var len:number = arr.length;
            for(var i:number = len-1; i>=0; i--){
                if (arr[i] == value || (arr[i].cardId && arr[i].cardId == value)) { //这里为了兼容jiangxi-ningdu
                    arr.splice(i, 1);
                    return arr;
                }
            }
	    if(arr){
		    return arr;
	    }else{
		    return [];
	    }
    }
    /**		
     元素是否在数组中
    */
     public static isInArray(element:any,arr: Array<any>): boolean {
        var bool: boolean = false;
        if(!arr || !(arr instanceof Array)){
            return bool;
        }
        for (var i: number = 0; i < arr.length; i++) {
            if (arr[i] == element) {
                return true
            }
        }
        return bool;
    }

    /***
     * 根据数据中的其中一个属性 删除该数据
     */

     public static numberResolveToArray(value:number,arr:Array<number>):Array<number>{
         var result: Array<number> = [];
         var index: number = 0;
         for(var i: number = 0;i < arr.length;i++) {
             while(value >= arr[i]) {
                 result.push(arr[i]);
                 value = value - arr[i];
             }

             if(value == 0) {
                 break;
             }
         }

         return result;
     }
     
    /**深度复制数组*/
     public static deepcopy(obj: any[]) {
         var out = [],i = 0,len = obj.length;
         for(;i < len;i++) {
             if(obj[i] instanceof Array) {
                 out[i] = this.deepcopy(obj[i]);
             }
             else out[i] = obj[i];
         }
         return out;
     }
     
     /**翻转一个数组，但不影响原数组*/
     public static reverse(source:any[]):any[]{
         var arr:any[] = [];
         var len:number = source.length;
         for(var i:number = 0 ; i< len;i++){
             arr.unshift(source[i]);
         }
         return arr;
     }
}
