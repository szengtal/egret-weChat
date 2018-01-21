module gameMain {

export class EnemyGiveEvent extends egret.Event {

	public static TAG = "生产EnemyPalne"

	public planetype: EnemyType = EnemyType.SMALL;

	public constructor(type: string, bubbles: boolean = false, cancelable: boolean = false) {
		super(type, bubbles, cancelable);
	}
}
}