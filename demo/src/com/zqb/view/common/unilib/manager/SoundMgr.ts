module uniLib {

    class MySoundChannel {
        public isStopped: boolean = false;
        public isMusic: boolean = false;
        public name: string = "";
        public res: any;
        public position: number = 0;
        public egret_channel: egret.SoundChannel = null;
        public stop(): void {
            if (this.egret_channel) {
                //console.log("[SOUND MySoundChannel stop] " + this.egret_channel.position +":" + this.isStopped + ":" + this.egret_channel);
                this.position = this.egret_channel.position;
                this.egret_channel.stop();
                this.isStopped = true;
                this.egret_channel = null;
            }
        }
    }
    /**
    * 音频管理
    */
    export class SoundMgr {
        private static _instance: SoundMgr;
        private _soundRes: any = {};//egret.Sound

        private _musicVolume: number = 1;
        private _soundVolume: number = 1;

        private _musicOpen: boolean = true;
        private _soundOpen: boolean = true;

        public constructor() {
        }

        public static get instance(): SoundMgr {
            var self = this;
            if (this._instance == null) {
                this._instance = new SoundMgr();
              
            }
            return this._instance;
        }
    

  


        //private lastSoundName: string;
        //private lastPlayTime: number;

        private _activeSound: any = {};
        private _activeSoundLoop: any = {};

        /**
         * 播放音效
         * @param soundName
         * @param loops
         * @param position
         * @param playEndBack
         * @param thisObj
         */
        public playSound(soundName: string, loops: number = 1, position?: number, playEndBack?: Function, thisObj?: any): egret.SoundChannel {
            if (!this._soundOpen)
                return;
            var self = this;
            var channel: egret.SoundChannel;
            if (this._activeSound[soundName] && this._activeSound[soundName]["$loops"] == 0) {
                return;
            }
            if (playEndBack) {
                var onSoundEnd = function (soundName: string, channel: egret.SoundChannel) {
                    channel.stop(); //这里stop有冗余,不这样做,有可能导致内存泄露,有空再优化写法
                    self.stopSound(soundName);
                    if (playEndBack)
                        playEndBack.call(thisObj);
                }
                //this.lastPlayTime = new Date().getTime();
                channel = this.play(soundName, loops, position, [onSoundEnd], false);
            } else {
                channel = this.play(soundName, loops, position, [], false);
            }
            if (channel != null)
                this._activeSound[soundName] = channel;

            return channel;
        }

        //public onSoundEnd(soundName: string, playEnd?: Function,thisObj?:any): void {
        //    if (this._activeSound[soundName] != null && this._activeSound[soundName] != undefined) {
        //        this._activeSound[soundName].stop();
        //        this._activeSound[soundName] = null;
        //        delete this._activeSound[soundName];
        //    }
        //}

        public stopSounds(): void {
            for (var i in this._activeSound) {
                if (this._activeSound[i] != null && this._activeSound[i] != undefined) {
                    this._activeSound[i].stop();
                    this._activeSound[i] = null;
                    delete this._activeSound[i];
                }
            }
            for (var i in this._soundRes) {
                this._soundRes[i] = null;
                delete this._soundRes[i];
            }
            ResUtils.resetSoundLoadTimes();

        }

        public stopSound(soundName: string): void {
            if (this._activeSound[soundName] != null && this._activeSound[soundName] != undefined) {
                this._activeSound[soundName].stop();
                this._activeSound[soundName].dispatchEventWith(egret.Event.SOUND_COMPLETE);
                this._activeSound[soundName] = null;
                delete this._activeSound[soundName];
            }
        }

        private static isFirst: boolean = true;

        private loadTimeDic: any = {};
        private play(soundName: string, loops: number = 1, position?: number, asyn?: any, isMusic: boolean = true): egret.SoundChannel {
            //soundName = "hb_backSound_1_mp3";
            var self = this;
            var callSoundBack: Function;
            if (asyn && asyn.length > 0) {
                callSoundBack = function (e: egret.Event) {
                    var endChanel: egret.SoundChannel = e.currentTarget;
                    //console.log("[SOUND removeEventListener] " + soundName);
                    if (endChanel != null && endChanel != undefined) {
                        endChanel.removeEventListener(egret.Event.SOUND_COMPLETE, callSoundBack, self);
                        if (asyn != null && asyn != undefined) {
                            if (asyn.length > 1)
                                asyn[0].call(asyn[1], soundName, endChanel);
                            else
                                asyn[0](soundName, endChanel);
                        }
                    }
                }
            }

            var onLoadSound: Function = function (data: egret.Sound) {
                self._soundRes[soundName] = data;
                if (isMusic == true) {
                    var reset = true;
                    if (self._currentMusicChanel && self.loadTimeDic[self._currentMusicChanel.name] != null && self.loadTimeDic[soundName] != null && self.loadTimeDic[self._currentMusicChanel.name] > self.loadTimeDic[soundName]) {
                        reset = false;
                    }
                    if (reset == true) {
                        var channel = self.play(soundName, loops, position, asyn, isMusic);
                        self.resetCurrentMusic(channel, soundName);
                    }
                } else if (new Date().getTime() - self.loadTimeDic[soundName] <= 1000) {
                    self.loadTimeDic[soundName] = 0;
                    self._activeSound[soundName] = self.play(soundName, loops, position, asyn, isMusic);
                }
            }
            var lastTime = 0;
            if (this.loadTimeDic[soundName] != null) {
                lastTime = this.loadTimeDic[soundName];
            }
            this.loadTimeDic[soundName] = new Date().getTime();

            if (this._soundRes[soundName] == null || this._soundRes[soundName] == undefined) {
                if (RES.hasRes(soundName)) {
                    var res = RES.getRes(soundName);
                    if (res != null || res != undefined) {
                        onLoadSound(res);
                    } else {
                        console.log("sound声音资源没有预加载到本地,建议进行预加载:" + soundName);
                        ResUtils.getRes(soundName, onLoadSound, null, egret.URLLoaderDataFormat.SOUND);
                    }
                }
                else
                    ResUtils.getRes(soundName, onLoadSound, null, egret.URLLoaderDataFormat.SOUND);
                return null;
            }

            if (this._soundRes[soundName]) {
                if (isMusic == false && new Date().getTime() - lastTime < 30) {
                    this.loadTimeDic[soundName] = lastTime;
                    return null;
                }
                var channel: egret.SoundChannel = this._soundRes[soundName].play(position, loops);
                if (channel != null && channel != undefined) {
                    if (callSoundBack) {
                        channel.addEventListener(egret.Event.SOUND_COMPLETE, callSoundBack, self);
                    }
                    var volume: number = (isMusic == true ? this._musicVolume : this._soundVolume);
                    channel.volume = volume;
                    return channel;
                } else {
                    return null;
                }
            }
            return null;
        }

        public randomSounds(soundsName?: string[]): void {
            if (soundsName)
                this._bgMusics = soundsName;
            var idx: number = Math.floor(this._bgMusics.length * Math.random());
            this.play(this._bgMusics[idx], 0);
        }

        private _bgMusics: string[];
        private _currentMusicIndex: number = 0;
        private _currentMusicChanel: MySoundChannel = null;

        public playBgMusic(musics: string[], position?: number): void {
            var self = this;
            self._bgMusics = musics;
            if (position)
                self._currentMusicIndex = position;
            if (!self._musicOpen)
                return;
            //self.playMusic();
            if (self._bgMusics.length > 0) {
                if (self._currentMusicIndex >= self._bgMusics.length) {
                    self._currentMusicIndex = 0;
                }
                if (self._currentMusicChanel == null || self._bgMusics[self._currentMusicIndex] != self._currentMusicChanel.name) {
                    var channel = self.play(self._bgMusics[self._currentMusicIndex], 1, position, [self.onMusicEnd, self]);
                    self.resetCurrentMusic(channel, self._bgMusics[self._currentMusicIndex]);
                }

            }
        }

        private onMusicEnd(e?: any): void {
            var self = this;
            //e.currentTarget.removeEventListener(egret.Event.SOUND_COMPLETE, this.onMusicEnd, this);
            self._currentMusicIndex++;
            if (self._currentMusicIndex == self._bgMusics.length)
                self._currentMusicIndex = 0;
            if (!self._musicOpen)
                return;
            if (self._bgMusics.length > 0) {
                var channel = self.play(self._bgMusics[self._currentMusicIndex], 1, 0, [self.onMusicEnd, self]);
                self.resetCurrentMusic(channel, self._bgMusics[self._currentMusicIndex]);
            }
        }

        private resetCurrentMusic(channel: egret.SoundChannel, musicName: string): void {
            if (channel == null || channel == undefined) {
                return;
            }
            var mychannel = new MySoundChannel();
            mychannel.name = musicName;
            mychannel.isMusic = true;
            mychannel.egret_channel = channel;
            mychannel.res = this._soundRes[musicName];
            if (this._currentMusicChanel != null && this._currentMusicChanel != mychannel && this._currentMusicChanel.name != mychannel.name) {
                this.stopBgMusic();
            }
            //console.error("musicName:" + musicName);
            this._currentMusicChanel = mychannel;
            this._currentMusicChanel.isStopped = false;
            this._currentMusicChanel.egret_channel.volume = this._musicVolume;
        }

        public stopBgMusic(): void {
            if (this._currentMusicChanel) {
                this._currentMusicChanel.stop();
                this.loadTimeDic[this._currentMusicChanel.name] = 0;
                this._currentMusicChanel = null;

            }
        }

        public pauseBgMusic(): void {
            if (this._currentMusicChanel) {
                this._currentMusicChanel.stop();
            }
        }

        public resumeBgMusic(): void {
            if (!this._musicOpen || (this._currentMusicChanel && !this._currentMusicChanel.isStopped))
                return;
            var self = this;
            var position: number = 0;
            if (this._currentMusicChanel) {
                position = this._currentMusicChanel.position;
            }
            if (this._bgMusics && this._bgMusics.length > 0) {
                var channel = this.play(this._bgMusics[this._currentMusicIndex], 1, position, [self.onMusicEnd, self]);
                this.resetCurrentMusic(channel, this._bgMusics[this._currentMusicIndex]);
            }
        }

        public isPlayingBgMusic(): boolean {
            if (this._currentMusicChanel && this._currentMusicChanel.isStopped == false)
                return true;
            return false;
        }

        public isSoundPlaying(soundName: string): boolean {
            if (this._activeSound[soundName] && this._activeSound[soundName].position)
                return true;
            else
                return false;
        }

        public get musicVolume(): number {
            return this._musicVolume;
        }

        public set musicVolume(value: number) {
            this._musicVolume = value;
        }

        public get soundVolume(): number {
            return this._soundVolume;
        }

        public set soundVolume(value: number) {
            this._soundVolume = value;
        }

        public set musicOpen(b: boolean) {
            this._musicOpen = b;
            if (!b)
                this.pauseBgMusic();
            else
                this.resumeBgMusic();
        }

        private static SOUND_TOGGLE: string = "sound_toggle";
        private static MUSIC_TOGGLE: string = "music_toggle";

        public get musicOpen(): boolean {
            return this._musicOpen;
        }

        public set soundOpen(b: boolean) {
            this._soundOpen = b;
        }

        public get soundOpen(): boolean {
            return this._soundOpen;
        }
    }
}
