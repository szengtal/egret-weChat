module weChat {

    export
class FailedLayer extends egret.Sprite{


    public constructor(){
        super();
        this.init();
    }

    private init(){

        this.setUI();
    }

    private setUI(){

        var stageH = egret.MainContext.instance.stage.stageHeight;
        var stageW = egret.MainContext.instance.stage.stageWidth;
        //  获取当前分数
        var curScore = GameManager.getCurScore();

        //  绘制背景
        var shp:egret.Shape = new egret.Shape();
        shp.graphics.beginFill( 0x000000, 0.6);
        shp.graphics.drawRect( 0, 0, stageW, stageH );
        shp.graphics.endFill();
        this.addChild( shp );

        // 背景
        var bg = new egret.Bitmap();
        bg.texture = RES.getRes("uiback_png");
        this.addChild(bg);
        bg.anchorOffsetX = bg.width/2;
        bg.anchorOffsetY = bg.height/2;
        bg.x = stageW/2;
        bg.y = stageH/2;

        // 失败标题
        var title = new egret.Bitmap();
        title.texture = RES.getRes("title_end_png");
        this.addChild(title);
        title.anchorOffsetX = title.width / 2;
        title.anchorOffsetY = title.height / 2;
        
        title.x = bg.x;
        title.y = bg.y - bg.height/2;

        // 添加成绩背景
        var scoreBg = new egret.Bitmap();
        scoreBg.texture = RES.getRes("myscore_png");
        scoreBg.anchorOffsetX = scoreBg.width / 2;
        scoreBg.anchorOffsetY = scoreBg.height / 2;
        scoreBg.x = bg.x;
        scoreBg.y = bg.y - bg.height/4;
        this.addChild(scoreBg);

        // 添加当前分数标签
        var curScoreLabel = new egret.TextField();
        
        curScoreLabel.x = scoreBg.x + scoreBg.width*0.1;
        curScoreLabel.y = scoreBg.y;
        curScoreLabel.size = 36;
        curScoreLabel.textAlign = "center";
        curScoreLabel.anchorOffsetX = curScoreLabel.width / 2;
        curScoreLabel.anchorOffsetY = curScoreLabel.height / 2;
        curScoreLabel.textColor = 0xffffff;
        curScoreLabel.text = ""+curScore;
        this.addChild(curScoreLabel);

        // 添加最佳分数背景
        var maxScoreBg = new egret.Bitmap();
        maxScoreBg.texture = RES.getRes("hightscore_png");
        maxScoreBg.anchorOffsetX = maxScoreBg.width / 2;
        maxScoreBg.anchorOffsetY = maxScoreBg.height / 2;
        maxScoreBg.x = bg.x;
        maxScoreBg.y = bg.y;
        this.addChild(maxScoreBg);

        // 添加最佳分数标签
        var maxScoreLabel = new egret.TextField();
        
        maxScoreLabel.x = curScoreLabel.x;
        maxScoreLabel.y = maxScoreBg.y;
        maxScoreLabel.size = 36;
        maxScoreLabel.textAlign = "center";
        maxScoreLabel.anchorOffsetX = maxScoreLabel.width / 2;
        maxScoreLabel.anchorOffsetY = maxScoreLabel.height / 2;
        maxScoreLabel.textColor = 0xffffff;
        this.addChild(maxScoreLabel);
        //  先获取存档分数
        var maxScoreStr = egret.localStorage.getItem("maxScore");
        var maxScore = Number(maxScoreStr);
        if(maxScore < curScore){
            maxScore = curScore;
            egret.localStorage.setItem("maxScore",""+maxScore);
        }
        maxScoreLabel.text = ""+maxScore;

        // 添加重玩按钮
        var restartBtn = new egret.Bitmap();
        restartBtn.texture = RES.getRes("again_png");
        this.addChild(restartBtn);
        restartBtn.anchorOffsetX = restartBtn.width / 2;
        restartBtn.anchorOffsetY = restartBtn.height / 2;
        restartBtn.x = bg.x - bg.width/5;
        restartBtn.y = bg.y + bg.height/4;
        restartBtn.touchEnabled = true;
        restartBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.restartBtnCallback, this);
        restartBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.restartBtnCallback, this);
        restartBtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.restartBtnCallback, this);

        // 添加分享按钮
        var shareBtn = new egret.Bitmap();
        shareBtn.texture = RES.getRes("shareBtn_png");
        this.addChild(shareBtn);
        shareBtn.anchorOffsetX = shareBtn.width / 2;
        shareBtn.anchorOffsetY = shareBtn.height / 2;
        shareBtn.x = bg.x + bg.width/5;
        shareBtn.y = bg.y + bg.height/4;
        shareBtn.touchEnabled = true;
        shareBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.shareBtnCallback, this);
        shareBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.shareBtnCallback, this);
        shareBtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.shareBtnCallback, this);

      
    }

    //  重玩按钮回调
    private restartBtnCallback(evt:egret.TouchEvent):void {

        if(evt.type == egret.TouchEvent.TOUCH_BEGIN){
            //console.log("touch begin");
            evt.currentTarget.scaleX = 1.05;
            evt.currentTarget.scaleY = 1.05;
        }else if(evt.type == egret.TouchEvent.TOUCH_END){
            //console.log("touch ended");
            evt.currentTarget.scaleX = 1.0;
            evt.currentTarget.scaleY = 1.0;
            //  添加游戏界面，删除失败界面
            (<newGameScene>this.parent).world.clear();
            egret.MainContext.instance.stage.removeChildren();
            var layer = new newGameScene();
            egret.MainContext.instance.stage.addChild(layer);

        }else if(evt.type == egret.TouchEvent.TOUCH_RELEASE_OUTSIDE){
            //console.log("touch cancel");
            evt.currentTarget.scaleX = 1.0;
            evt.currentTarget.scaleY = 1.0;
        }

    }

    //  分享按钮回调
    private shareBtnCallback(evt:egret.TouchEvent):void {

        if(evt.type == egret.TouchEvent.TOUCH_BEGIN){
            //console.log("touch begin");
            evt.currentTarget.scaleX = 1.05;
            evt.currentTarget.scaleY = 1.05;
        }else if(evt.type == egret.TouchEvent.TOUCH_END){
            //console.log("touch ended");
            evt.currentTarget.scaleX = 1.0;
            evt.currentTarget.scaleY = 1.0;
//            this.addChild(this.shareTips);          
            window.open("http://pipigo.wsq.umeng.com");

        }else if(evt.type == egret.TouchEvent.TOUCH_RELEASE_OUTSIDE){
            //console.log("touch cancel");
            evt.currentTarget.scaleX = 1.0;
            evt.currentTarget.scaleY = 1.0;
        }

    }

}
}