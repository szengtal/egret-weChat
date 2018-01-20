
module uniLib {

    export class Utils {

        public static setLocalStorage(ky: string, info: any): void {
            if (Global.nativeStorage) {
                Global.nativeStorage.save({
                    key: ky,
                    id: ky,
                    rawData: info,
                    expires: null
                });
            } else if (window["localStorage"]) {
                localStorage.setItem(ky, info);
            } else if (window["document"] && window["document"].cookie) {
            } else if (egret) {
                egret.localStorage.setItem(ky, info);
            }
        }

        public static getLocalStorage(ky: string, onGetCallBack?: Function): any {
            if (Global.nativeStorage) {
                Global.nativeStorage.load({
                    key: ky,
                    id: ky,
                    autoSync: true,
                    syncInBackground: true
                }).then(ret => {
                    //如果找到数据，则在then方法中返回
                    onGetCallBack(ret);
                }).catch(err => {
                    onGetCallBack(null);
                });
            } else if (window["localStorage"]) {
                if (onGetCallBack) {
                    onGetCallBack(localStorage.getItem(ky));
                } else {
                    return localStorage.getItem(ky);
                }
            } else if (window["document"] && window["document"].cookie) {
              
            } else if (egret) {
                if (onGetCallBack) {
                    onGetCallBack(egret.localStorage.getItem(ky));
                } else {
                    return egret.localStorage.getItem(ky);
                }
            } else {
                if (onGetCallBack) {
                    onGetCallBack(null);
                } else {
                    return null;
                }
            }
        }

        public static clearLocalStorage(ky?: string): void {
            try {
                if (Global.lobbyMode == true && Global.isInGame == true) {
                    return;
                }
                if (ky) {
                    if (Global.nativeStorage) {
                        Global.nativeStorage.remove({
                            key: ky
                            //id: ky,
                        });
                    } else if (window["localStorage"]) {
                        localStorage.removeItem(ky);
                    } else if (window["document"] && window["document"].cookie) {
                    } else if (egret) {
                        egret.localStorage.removeItem(ky);
                    }
                }
                else {
                    if (Global.nativeStorage) {
                        Global.nativeStorage.clearMap();
                    } else if (window["localStorage"]) {
                        localStorage.clear();
                    } else if (window["document"] && window["document"].cookie) {
                    } else if (egret) {
                        egret.localStorage.clear();
                    }
                }
            } catch (e) {
            }
        }

        public static isIOS(): boolean {
            if (uniLib.Global.isH5 == false && egret.Capabilities.os == "iOS")
                return true;
            return false;
        }

        public static isAndroid(): boolean {
            if (uniLib.Global.isH5 == false && egret.Capabilities.os == "Android")
                return true;
            return false;
        }

        public static isrebooting: boolean = false;
        public static restart(str?: any, yes?: string, no?: string): void {
            var self = this;
            var old = self.isrebooting;
            self.isrebooting = true;
            if (Global.isH5 == true) {
                var r = confirm(str);
                if (r == true) {
                    if (Global.reLoginUrl != "") {
                    } else {
                    }
                }
                else {
                    self.isrebooting = false;
                    alert("取消重启");
                }

            } else {
                if (!old) {
                }
                //ZQGameSdk.restart(str, confirm);
            }
        }

  

        private static EARTH_RADIUS = 6378137;

        /**
         * 获取两个经纬度之间的距离
         * @param lat1 纬度1
         * @param lng1 经度1
         * @param lat2 纬度2
         * @param lng2 经度2
         */
        public static getDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
            if ((Math.abs(lat1) > 90) || (Math.abs(lat2) > 90)) {
                return 0;
            }
            if ((Math.abs(lng1) > 180) || (Math.abs(lng2) > 180)) {
                return 0;
            }
            var radLat1 = this.rad(lat1);
            var radLat2 = this.rad(lat2);
            var a = radLat1 - radLat2;
            var b = this.rad(lng1) - this.rad(lng2);
            var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
                Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
            s = s * this.EARTH_RADIUS;
            s = Math.round(s * 10000) / 10000;
            return s;
        }

        public static rad(d: number): number {
            return d * Math.PI / 180.0;
        }

        //public static checkUpdate(v: string,): void {
        //    function onGetCfg(data: any): void {
        //        if (data) {
        //            if (data.version == v) {
        //                if (data.action) {
        //                    switch (data.action) {
        //                        case "restart":
        //                            if (uniLib.Global.isH5 == true) {
        //                                uniLib.BrowersUtils.reload();
        //                            } else
        //                                uniLib.ZQGameSdk.restart();
        //                            break;
        //                    }
        //                }
        //            }
        //        }
        //    }

        //    RES.getResByUrl("http://h5.publish.bwgame.com.cn/TaoJin_App/taojin_native_release/version.json", onGetCfg, this, RES.ResourceItem.TYPE_JSON);
        //}
        //public static initRequestString(): void {
        //    var platstr: string = Utils.getLocalStorage("platStr");
        //    if (!StringUtils.stringIsNullOrEmpty(platstr)) {
        //        this.platInfo = BrowersUtils.GetRequests(platstr);
        //        if (this.platInfo["debug"] != null) {
        //            delete this.platInfo["debug"];
        //        }
        //    } else {
        //        this.platInfo = new Pmd.PlatInfo();
        //        this.platInfo.account = BrowersUtils.GetRequest("account");
        //        this.platInfo.email = BrowersUtils.GetRequest("email");
        //        this.platInfo.platid = BrowersUtils.GetRequest("platid");
        //        this.platInfo.gender = BrowersUtils.GetRequest("gender");
        //        this.platInfo.nickname = BrowersUtils.GetRequest("nickname");
        //        this.platInfo.timestamp = BrowersUtils.GetRequest("timestamp");
        //        if (BrowersUtils.GetRequest("gameid"))
        //            this.platInfo["gameid"] = BrowersUtils.GetRequest("gameid");
        //        if (BrowersUtils.GetRequest("uid"))
        //            this.platInfo["uid"] = BrowersUtils.GetRequest("uid");
        //        this.platInfo.sign = BrowersUtils.GetRequest("sign");
        //    }
        //}

        //public static

    }
}
