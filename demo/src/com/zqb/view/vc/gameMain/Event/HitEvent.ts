module gameMain {
export class HitEvent extends egret.Event {

	public static EventString = "Hit";

	

	public htype: HitType = HitType.OTHER;

	public enemy:EnemyPlane = null;

	public constructor(type: string, bubbles: boolean = false, cancelable: boolean = false) {
		super(type, bubbles, cancelable);
	}
}
export enum HitType {
	HERO_TO_ENEMY = 0,
	ENEMY_TO_HERO = 1,
	OTHER = 2,
	NOT_HIT = 3
}
}