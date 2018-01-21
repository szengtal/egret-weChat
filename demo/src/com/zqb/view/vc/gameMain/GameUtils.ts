module gameMain {
export class GameUtils {
	/**
     * 生成范围随机数
     * @Min 最小值
     * @Max 最大值
     */
	public static GetRandomNum(Min: number, Max: number): number {
		var Range = Max - Min;
		var Rand = Math.random();
		return (Min + Math.round(Rand * Range));
	}

	/**基于矩形的碰撞检测
	 * @param testContain 测试用结构
	*/
	public static hitTest(obj1: egret.DisplayObject, obj2: egret.DisplayObject,testContain?:egret.Sprite): boolean {
		if (obj1 == undefined) { 
			return false; 
		}
		if (obj2 == undefined) { return false; }
		uniLib.DisplayUtils.removeAllChildren(testContain)


		var rect1: egret.Rectangle = obj1.getBounds();
		var rect2: egret.Rectangle = obj2.getBounds();
		// console.log("基于矩形的碰撞检测1",rect1);
		// console.log("基于矩形的碰撞检测1",obj1.x);
		// console.log("基于矩形的碰撞检测1",obj1.y);
		if(obj1.x < obj2.x){
			return false
		}


	// console.log("基于矩形的碰撞检测1",obj2.x);
		// console.log("基于矩形的碰撞检测22",obj2.y);

		//      var shp:egret.Shape = new egret.Shape();
        // shp.graphics.beginFill( 0xff0000, 0.5);
        // shp.graphics.drawRect( obj1.x, obj1.y, rect1.width, rect1.height );
        // shp.graphics.endFill();
        // testContain.addChild( shp );

		//   var shp1:egret.Shape = new egret.Shape();
        // shp1.graphics.beginFill( 0xfcc0c0, 0.5);
        // shp1.graphics.drawRect( obj2.x, obj2.y, rect2.width, rect2.height );
        // shp1.graphics.endFill();
        // testContain.addChild( shp1 );
		
		// console.log("基于矩形的碰撞检测2",rect2);
		
		rect1.x = obj1.x;
		rect1.y = obj1.y;
		rect2.x = obj2.x;
		rect2.y = obj2.y;
		return rect1.intersects(rect2);
	}

}
}