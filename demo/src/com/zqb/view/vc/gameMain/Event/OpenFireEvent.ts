module gameMain {
export class OpenFireEvent extends egret.Event {
	public static EventString = "开火";
	/**
	 * 事件类型默认是Hero
	 */
	public Btype: IdentityType = IdentityType.HERO;
	public constructor(type: string, bubbles: boolean = false, cancelable: boolean = false) {
		super(type, bubbles, cancelable);
	}
}
}