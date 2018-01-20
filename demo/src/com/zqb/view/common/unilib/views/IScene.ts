module uniLib {
    /**
    * 场景接口
    */
    export interface IScene extends egret.DisplayObjectContainer {

        // 面板层 如 游戏开始结束界面之类的
        uiLayer: egret.DisplayObjectContainer;
        // 弹窗层 如 设置之类的
        topLayer: egret.DisplayObjectContainer;
        // 特效层 如 飘字之类的
        effectLayer: egret.DisplayObjectContainer;
        // 主UI层 如 底部功能栏
        mainUILayer: egret.DisplayObjectContainer;
        // 遮罩层 
        maskLayer: egret.DisplayObjectContainer;
        // 旋转屏幕提示层 
        tipsLayer: egret.DisplayObjectContainer;



        /**
        * 场景启动时
        */
        awake(): void;
        /**
        * 场景开始时
        */
        start(): void;
        /**
        * 场景销毁时
        */
        destroy(): void;

        resize(): void;
    }
}