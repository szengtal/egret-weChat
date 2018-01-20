module weChat {
	export class Proxy extends MvcSender{
		private _name:string
		public constructor(name?:string) {
			super();
			this._name=name;
		}
		public get name():string{
			return this._name;
		}
		public onRemove():void{
			
		}
	}
}