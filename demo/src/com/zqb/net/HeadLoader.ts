module weChat {
	export class HeadLoader {
		private _imageLoader:egret.ImageLoader;
		private _headUrl:string;
		private _completeFun:Function;
		private _errorFun:Function;
		private _callObj:Function;
		public constructor() {
		}
		public  load(url:string,completeFun?:Function,ioErrFun?:Function,obj?:any):void{
			this.destroy();
			this._completeFun=completeFun;
			this._errorFun=ioErrFun;
			this._callObj=obj;
			this._headUrl=url;
			var data:any=this.getHeadCache(url);
			if(data){
				if(this._completeFun){
					this._completeFun.call(this._callObj,data);
				}
			}else{
				this._imageLoader= new egret.ImageLoader();
				this._imageLoader.addEventListener(egret.Event.COMPLETE,this.loadCompleteHandler,this);
				this._imageLoader.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onIOError,this);
				// this._imageLoader.crossOrigin = "anonymous";
				this._imageLoader.load(this._headUrl);
			}
		}
		private loadCompleteHandler(event: egret.Event): void {
            this._imageLoader.removeEventListener(egret.Event.COMPLETE,this.loadCompleteHandler,this);
            this._imageLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR,this.onIOError,this);
			this.saveHeadCache(this._headUrl,this._imageLoader.data);
			if(this._completeFun){
				this._completeFun.call(this._callObj,this._imageLoader.data);
			}
        }
		private onIOError(event: egret.IOErrorEvent):void{
            this._imageLoader.removeEventListener(egret.Event.COMPLETE,this.loadCompleteHandler,this);
            this._imageLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR,this.onIOError,this);
			if(this._errorFun){
				this._errorFun.call(this._callObj);
			}
		}
		
		public destroy():void{
			if(this._imageLoader){
				this._imageLoader.removeEventListener(egret.Event.COMPLETE,this.loadCompleteHandler,this);
            	this._imageLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR,this.onIOError,this);
				this._imageLoader=null;
			}
			this._completeFun=null;
			this._errorFun=null;
			this._callObj=null;
			this._headUrl=null;
		}
		public getHeadCache(headUrl:string):any{
            if(!uniLib.Global.localCache){
				uniLib.Global.localCache={};
			}else{
				if(uniLib.Global.localCache[headUrl]){
					return uniLib.Global.localCache[headUrl];
				}
			}
			return null;
        }
        public saveHeadCache(url:string,data:any):void{
			if(!uniLib.Global.localCache){
				uniLib.Global.localCache={};
			}
			uniLib.Global.localCache[url]=data;
        }
	}
}