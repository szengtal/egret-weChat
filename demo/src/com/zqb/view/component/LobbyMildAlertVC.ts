module weChat {
	/**
	 *
	 * 中度提示面板，飘文字
	 *
	 */
    export class LobbyMildAlertVC extends LobbyBaseVc {
        private _bg: egret.Bitmap;
        private _text: egret.TextField;
        public constructor() {
            super();
        }
        public initUI(): void {
            let str = "sz_Toast_png";
            if (RES.getRes("sz_Toast_png")) {
                str = "sz_Toast_png";
            } else {
                str = "mjl_tipsBg";
            }
            this._bg = LobbyResUtil.createBitmapByName(str);
            this.addChild(this._bg);
            this._bg.scale9Grid = new egret.Rectangle(332,36,194,49); 
            this._text = LobbyResUtil.createTextFeild(0xFFFFFF, egret.HorizontalAlign.CENTER, "", 32, 128, 10, 686);
            this._text.lineSpacing = 7;
            this._text.multiline = true;
            this.addChild(this._text);
        }
		/**
		 * 
		 * @param message
		 * 
		 */
        public setText(message: string): void {
            if (!message) {
                return;
            }
            this._text.text = message;
    //         message =    '<font color="#0000ff" size="22" fontFamily="Verdana">Verdana blue large</font>' +
    // '<font color="#ff7f50" size="22">果我们的类别y = 1, 而判定的hθ(x)=1，则Cost = 0，此时预测的值和真实的值完全相等，<b>代价本该为</b>小字体</font>' ;
            let strUIR = message;
            
            this._text.textFlow = (new egret.HtmlTextParser).parser(decodeURIComponent(strUIR));
            if(this._text.textWidth+22>=this._text.width){//我也不知道为什么是22, 这里是让第二行靠左吧？
                this._text.textAlign = egret.HorizontalAlign.LEFT
            }
            // this._text.y = Math.floor(this._text.height/22)*10; 
             var languages = [
                { name: "this.chat_lb.measuredHeight", fileExtension: this._text.measuredHeight },
                { name: "this._text.textheight", fileExtension: this._text.textHeight },
                { name: "this._text.Height", fileExtension: this._text.height },
                { name: "this._text.textWidth", fileExtension: this._text.textWidth },
                { name: "this._text.Width", fileExtension: this._text.width },
                { name: "this._text.x", fileExtension: this._text.x },
                { name: "this._text.size", fileExtension: this._text.height },
                { name: "this._text.y", fileExtension: this._text.y },

            ];
            // console.table(languages);
            this._bg.height = this._text.textHeight * 4;
            this._text.y = Math.floor(this._bg.height/2)  -(this._bg.height*0.26); 
            // this._text.y =  (this._text.textHeight/1)-5; 
            
            this.x = Math.round((LobbyDataCache.defaultWidth - this.width) / 2);
            this.y = Math.round((LobbyDataCache.defaultHeight - this.height) / 2) ;
            this.showDelay();
        }
        private showDelay(): void {
            egret.Tween.get(this).wait(2000).to({ alpha: 0 }, 2000, egret.Ease.circOut).call(this.destory, this);
        }

        public destory(): void {
            LobbyResUtil.removeAllChildren(this);
            LobbyResUtil.removeFromParent(this);
            this._bg = null;
            this._text = null;
        }
    }
}
