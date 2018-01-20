module weChat {
	export class MvcSender {
		public constructor() {
		}
		public sendNotification(cmd:string,vo?:any,type?:string):void{
			if(type){
				MJLobbyEventListener.getInstance().dispatchEventWith(type,false,vo);
			}else{
				MJLobbyEventListener.getInstance().dispatchEventWith(cmd,false,vo);
			}
			
		}
		public onRemove():void{
			
		}
	}
}