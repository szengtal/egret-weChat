module weChat {
	/**
	 * 创建面板里的选项按钮。
	 * 有四种形态1单选 2多选 3子选项多选 4子选项单选
	 */
	export class CreateCheckMc extends LobbyBaseVc{
		// private _check:boolean;
		private _checkIcon:egret.Bitmap;
		private _label:egret.TextField;
		private _checkBg:egret.Bitmap;
		private _assetsArr:Array<string>;
		private _checkType:number;
		private _txtbg:egret.Sprite;
		public constructor() {
			super();
		}
		public destory():void{
			super.destory();
			this._checkIcon=null;
			this._label=null;
			this._txtbg=null;
		}
		public initUI():void{
			this._checkType=0;
			this._assetsArr=["mjl_create_checkbg","mjl_create_check"];
			this._checkBg=LobbyResUtil.createBitmapByName("mjl_create_checkbg");
			this.addChild(this._checkBg);
			this._checkIcon=LobbyResUtil.createBitmapByName("mjl_create_check",0,0);
			this.addChild(this._checkIcon);
			this.check=false;
			this._label=LobbyResUtil.createTextFeild(0xffffff,egret.HorizontalAlign.LEFT,"",34,60,10);
			this._label.height=40;
			this.addChild(this._label);
		}
		public get checkType():number{
			return this._checkType;
		}
		/***
		 * 1单选 2多选 3子选项多选 4子选项单选
		 */
		public setCheckType(type:number):void{
			if(this._checkType==type){
				return;
			}
			this._checkType=type;
			switch (type) {
				case 1:
					this._assetsArr=["mjl_create_checkbg","mjl_create_check","mjl_create_checkdisable"];
					break;
				case 2:
					this._assetsArr=["mjl_multiple_bg","mjl_multiple_check","mjl_multiple_disable"];
					this._checkIcon.y=-8;
					this._checkBg.y=-8;
					break;	
				case 3:
					this._checkIcon.y=-8;
					this._checkBg.y=-8;
					this._assetsArr=["mjl_sub-multiple_bg","mjl_sub-multiple_check","mjl_sub-multiple_disable"];
					break;	
				case 4:
					this._checkIcon.y=1;
					this._checkBg.y=0;
					this._assetsArr=["mjl_checkbg_small","mjl_check_small","mjl_checkbg_smalldisable"];
					break;	
			}
			this._checkBg.texture=LobbyResUtil.createTexture(this._assetsArr[0]);
			this._checkIcon.texture=LobbyResUtil.createTexture(this._assetsArr[1]);
		}
		public setLabelSize(size:number):void{
			this._label.size=size;
		}
		public set label(str:string){
			this._label.text=str;
			if(!this._txtbg){
				this._txtbg=new egret.Sprite();
				this.addChild(this._txtbg);
			}
			this._txtbg.graphics.clear();
			this._txtbg.graphics.beginFill(0xff0000, 0);
			this._txtbg.graphics.drawRect(this._label.x-5, this._label.y-5, this._label.textWidth+10, this._label.textHeight+10);
			this._txtbg.graphics.endFill();
		}
		public set htmlLabel(str:string){
			 this._label.textFlow =(new egret.HtmlTextParser).parser(str);
		}
		public set check(boo:boolean){
			this._checkIcon.visible=boo;
		}
		public get check():boolean{
			return this._checkIcon.visible;
		}
		public setEnable(boo:boolean):void{
			this._checkIcon.visible=false;
			if(this._assetsArr[2]){
				if(boo){
					this._label.textColor=0x393f2c;
					this._checkBg.texture=LobbyResUtil.createTexture(this._assetsArr[0]);
				}else{
					this._label.textColor=0xaba292;
					this._checkBg.texture=LobbyResUtil.createTexture(this._assetsArr[2]);
				}
			}
			this.touchEnabled=boo;
			this.touchChildren=boo;
		}
		public get checkWidth():number{
			return this._label.x+this._label.width+5;
		}
	}
}