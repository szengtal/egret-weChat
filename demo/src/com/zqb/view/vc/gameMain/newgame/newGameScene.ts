module weChat {

    export
        class newGameScene extends egret.Sprite {


        private gameHud: GameHud;
        private curScore: number = 0;
        public curFloor: p2.Body;// 当前的台阶
        public preFloor: p2.Body;// 前一个台阶
        public hero: Hero;
        private factor: number;
        private _isDebug: boolean = false;// debug，是否绘制物理碰撞框
        // 需要用到的数据
        private floatFloorSpeedX: number = 6;// 浮动台阶左右移动的最大速度
        private gravity: number = -10;// 重力，物体下落速度
        private jumpSpeed: number = 1;// 英雄的跳跃速度
        private gameSpeed: number = 3;// 台子上升的速度

        private stableFloor_MAX: number = 5;// 屏幕中最大的坚固台阶个数
        private stableFloor_min: number = 3;// 屏幕中最小的坚固台阶个数
        private breakableFloor_MAX: number = 4;// 屏幕中最大的易碎台阶个数
        private floatFloor_MAX: number = 3;// 屏幕中最大的浮动台阶个数

        private stageW: number;
        private stageH: number;

        private worldW: number;
        private worldH: number;

        private spritePool: SpritePool;
        public world: p2.World;// 世界
        private heroShape: p2.Shape;// 主角形状
        public heroBody: p2.Body;// 主角
        public heroBody1: p2.Body;// 主角

        private floatFloor: p2.Body[] = [];// 浮动的台阶刚体集合
        private stableFloor: p2.Body[] = [];// 坚固的台阶刚体集合
        private breakableFloor: p2.Body[] = [];// 易碎的台阶刚体集合
        private props: p2.Body[] = [];// 道具刚体集合
        private propDisplays: Prop[] = [];// 道具的显示精灵
        private posArray: number[][] = [];// 坐标集合
        private lastPosy: number = 0;// 最后添加的台阶的坐标
        private egretContain: egret.DisplayObject;//添加egret场景组件

        private _debug = false
        private debugDraw: p2DebugDraw;

        private isFall: boolean = false//是否到达顶端在下降


        public constructor() {

            super();
            this.init();

        }

        private init() {

            this.touchEnabled = true;
            this.setUI();

        }

        private createDebug(world: p2.World): void {
            //创建调试试图
            this.debugDraw = new p2DebugDraw(world);
            var sprite: egret.Sprite = new egret.Sprite();
            sprite.width = egret.MainContext.instance.stage.stageWidth
            sprite.height = egret.MainContext.instance.stage.stageHeight

            sprite.name = "debugDraw";
            this.addChild(sprite);
            this.debugDraw.setSprite(sprite);

            // egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.addOneBox, this);

        }
        /**添加egret场景组件 */
        private initView() {
            this.egretContain = new egret.DisplayObject();
            // this.addChild()

        }
        private setUI(): void {
            var stageW: number = egret.MainContext.instance.stage.stageWidth;
            var stageH: number = egret.MainContext.instance.stage.stageHeight;
            this.stageH = stageH;
            this.stageW = stageW;


            //  物理世界和真实世界的转换因子
            var factor: number = 50;
            this.factor = factor;
            //  物理世界的尺寸
            var worldW = stageW / factor;
            var worldH = stageH / factor;
            this.worldW = worldW;
            this.worldH = worldH;

            this.lastPosy = -worldH;
            //  创建world
            this.world = new p2.World();
            this.world.emitImpactEvent = false;


            this.world.sleepMode = p2.World.BODY_SLEEPING;
            // this.world.gravity = [0, this.gravity];
            ////  创建地板
            ////  下
            //var land = new p2.Body();
            //var planeShape = new p2.Plane();
            //land.addShape(planeShape);
            //land.displays = [];//  没有显示对象也要写，不然会出错
            //world.addBody(land);
            //this.planeShape = planeShape;

            ////  右，因为锚点在左下，顺时针旋转90度后需要将坐标设为屏幕右上角
            //var rightWall = new p2.Body({ angle: Math.PI / 2, position: [worldW, worldH] });
            //rightWall.addShape(planeShape);
            //rightWall.displays = [];//  没有显示对象也要写，不然会出错
            //world.addBody(rightWall);
            //
            ////  左，逆时针90度
            //var leftWall = new p2.Body({ angle: -Math.PI / 2});
            //leftWall.addShape(planeShape);
            //leftWall.displays = [];
            //world.addBody(leftWall);

            //  心跳函数
            egret.Ticker.getInstance().register(this.worldLogic, this);


            //鼠标点击移动
            //this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, click, this);
            //function click(e:egret.TouchEvent):void {
            //
            //    if(e.stageX > stageW/2){
            //        //  向右移动
            //        if(heroBody.velocity[0] < 10){
            //            heroBody.force[0] = 2 * factor;
            //        }
            //
            //    }else{
            //        //  向左移动
            //        if(heroBody.velocity[0] > -10){
            //            heroBody.force[0] = -2 * factor;
            //        }
            //    }
            //
            //}

            //  添加英雄刚体
            var hero = new Hero();
            var heroShape = new p2.Circle({ radius: hero.height * 0.35 / factor });
            heroShape.material = new p2.Material(1);
            var heroBody = new p2.Body({
                mass: 1,
                position: [stageW * 0.5 / factor, stageH * 0.5 / factor],
                type: p2.Body.DYNAMIC,   //DYNAMIC 为接收碰撞  KINEMATIC 为不接收碰撞
                fixedRotation: true,
                inertia: 1,
                dadamping: -1000,
                rerestitution: -1000,

            });


            heroBody.addShape(heroShape);
            heroBody.angularDamping = 0;//  角阻尼。取值区间[0,1]
            heroBody.damping = 0;//  限行阻尼。取值区间[0,1]
            heroBody.allowSleep = false;//  禁止休眠
            heroBody.velocity = [0, this.jumpSpeed];//  y方向的速度
            this.world.addBody(heroBody);

            if (this._isDebug) {
                var displayHero = this.createBall((<p2.Circle>heroShape).radius * factor);
                displayHero.width = (<p2.Circle>heroShape).radius * 2 * factor;
                displayHero.height = (<p2.Circle>heroShape).radius * 2 * factor;
                displayHero.anchorOffsetX = displayHero.width / 2;
                displayHero.anchorOffsetY = displayHero.height / 2;
                // heroBody.displays = [displayHero];
                // this.addChild(displayHero);

                heroBody.displays = [hero];


            } else {
                heroBody.displays = [hero];

            }


            //  将主角添加到屏幕上
            this.addChild(hero);

            //  创建4个道具显示精灵和1个敌人
            for (var i = 1; i <= 5; i++) {
                var prop = new Prop(i);
                this.propDisplays.push(prop);
                var propBody = new p2.Body();
                this.props.push(propBody);
            }


            this.hero = hero;
            weChat.variableCommon.getInstance().hero = this.hero

            this.heroBody = heroBody;
            // this.heroBody1 = heroBody1;
            this.heroShape = heroShape;
            this.world = this.world;
            this.spritePool = new SpritePool();

            // 初始游戏操作层
            this.gameHud = new GameHud(this);
            this.addChild(this.gameHud);

            this.createDebug(this.world);



            var leftTimer = new egret.Timer(500, 0);
            leftTimer.addEventListener(egret.TimerEvent.TIMER, () => {
                // this.debugDraw.drawDebug();
            }, this);
            leftTimer.start();
            //  随机添加一批台阶
            this.addSidesteps(-1, true);
            this.addSidesteps(0, true);
            this.addSidesteps(1, true);

            // 允许从下穿透台阶
            var curFloor = this.curFloor;
            var preFloor = this.preFloor;
            var curScore = this.curScore;
            var props = this.props;
            var propDisplays = this.propDisplays;
            var breakableFloor = this.breakableFloor;

            // 碰撞开始函数
            this.world.on("beginContact", function (evt) {
                //  两个都不是英雄则返回
                console.error("碰撞开始函数");

                if (evt.bodyA != heroBody && evt.bodyB != heroBody) {
                    return;
                }
                if(evt.bodyA == heroBody && breakableFloor.indexOf(evt.bodyB) == -1){
                    curFloor = evt.bodyB;
                }else if(evt.bodyB == heroBody && breakableFloor.indexOf(evt.bodyA) == -1){
                    curFloor = evt.bodyA;
                }

            }, this);


            //  碰撞结束。
            this.world.on("endContact", function (evt) {
                curFloor = null;
                // if (1) return;
                // 踩到破碎台阶后的逻辑
                var breakableIndex = breakableFloor.indexOf(evt.bodyA);
                if (breakableIndex == -1) {
                    breakableIndex = breakableFloor.indexOf(evt.bodyB);
                }
                if (breakableIndex != -1 && heroBody.position[1] > breakableFloor[breakableIndex].position[1]) {


                    var breakFloorSprite = <SideStep>breakableFloor[breakableIndex].displays[0];
                    breakFloorSprite.changeTexture(true);
                    var tw = egret.Tween.get(breakFloorSprite);
                    tw.to({ y: stageH }, 1000);
                    tw.call(function () {
                        breakFloorSprite.changeTexture(false);
                        this.spritePool.recycleObject(breakFloorSprite);
                        egret.setTimeout(function () {
                            egret.Tween.removeTweens(tw);
                        }, this, 100
                        );
                    }, this);
                    this.world.removeBody(breakableFloor.splice(breakableIndex, 1)[0]);
                }

            }, this);


            //  世界运行逻辑
            this.world.on("postStep", function () {
                //因为world.removeBody()函数在这里执行不成功，所以将相关逻辑都放在Ticker函数中了

                var hero = this.hero;
                var heroBody = this.heroBody;
                var heroShape = this.heroShape;
                var radius = (<p2.Circle>heroShape).radius;
                // console.error("radius",radius);

                heroBody.gravityScale = 1;

                // 限制最大下降速度
                if (heroBody.velocity[1] < this.gravity) {
                    heroBody.velocity[1] = 1.5 * this.gravity;
                }
                if (1) {
                    //  return
                }
                //  如果英雄超出屏幕左边，则从右边出现，如果超出右边，则从左边出现
                if (heroBody.position[0] + radius <= 0) {
                    heroBody.velocity[0] = 0;
                    heroBody.position[0] = radius

                } else if (heroBody.position[0] - radius >= worldW) {
                    heroBody.velocity[0] = 0;
                    heroBody.position[0] = worldW - radius
                }
                //限制左右最大速度
                if (heroBody.velocity[0] > 8) {
                    heroBody.velocity[0] = 8
                }
                // console.error("heroBody.velocity[0]", heroBody.velocity[0]);

                // 当英雄上升时，位置高于屏幕7/10时，不再上升
                if (heroBody.velocity[1] > 0 && heroBody.position[1] >= worldH * 0.95) {
                    //   heroBody.position[1] = worldH * 0.8;
                    //   heroBody.velocity[0]  = 0 ;
                    heroBody.velocity[1] = 1 * this.gravity;
                    if (!this.isFall) {
                        heroBody.type = p2.Body.KINEMATIC
                        egret.setTimeout(() => {
                            this.isFall = false;
                            heroBody.type = p2.Body.DYNAMIC
                        }, this, 200)
                    }
                }
                // console.error("heroBody.position[1]",heroBody.position[1]);





                // 英雄下落时，位置低于屏幕1/10时，不再下降
                if (heroBody.position[1] <= worldH * 0.1) {
                    // heroBody.position[1] = worldH * 0.7;
                    this.stopWorld();
                }
                 if (heroBody.position[1] <= worldH * 0.6) {
                    // heroBody.position[1] = worldH * 0.7;
                            heroBody.type = p2.Body.DYNAMIC
                }


                var l = this.world.bodies.length;
                for (var i: number = 0; i < l; i++) {
                    var boxBody = this.world.bodies[i];
                    if (boxBody != heroBody) {
                        boxBody.velocity[1] = this.gameSpeed;
                    }
                }

            }, this);

            if (this._isDebug) {
                //开启debug模式，使用图形绘制
                //   this.debug(world);
            }
        }

        /* 随机添加台阶
         * @num: 0：代表在当前屏幕的区域，1：代表当前屏幕上方的隐藏的一个屏幕大小的区域，2：代表1之上的另外一个隐藏区域。。。。。。
         * @param init初始化添加
         */
        private addSidesteps(dis: number, init: boolean) {
            if (init) {
                weChat.variableCommon.getInstance().pilesNum = 1
            }
            else {
                weChat.variableCommon.getInstance().pilesNum = weChat.variableCommon.getInstance().pilesNum + 1;
            }

            var world = this.world;
            var heroShape = this.heroShape;
            var factor = this.factor;
            var spritePool = this.spritePool;
            var worldW = this.worldW;
            var worldH = this.worldH;
            var props = this.props;
            var propDisplays = this.propDisplays;

            // 随机一组坐标，用来放置台阶
            var ran1 = Math.floor(Math.random() * (this.stableFloor_MAX + 1 - this.stableFloor_min) + this.stableFloor_min); // 随机砖块1的个数
            var ran2 = Math.floor(Math.random() * this.breakableFloor_MAX + 1); // 随机砖块可以碎的的个数
            var ran3 = Math.floor(Math.random() * this.floatFloor_MAX + 1); // 随机砖块浮动的的个数

            console.error(" ran1", ran1, " ran2y", ran2, "ran3", ran3);


            var floor = spritePool.getObject(1);
            var floorLength = floor.width * 0.6 / factor;
            spritePool.recycleObject(floor);

            var count = ran1 + ran2 + ran3;
            for (var i = 0; i < count; i++) {
                var x = Math.floor(Math.random() * (worldW));
                if (x + floorLength / 2 >= worldW) {
                    x = worldW - floorLength / 2;
                } else if (x - floorLength / 2 <= 0) {
                    x = floorLength / 2;
                }
                var y = this.lastPosy + weChat.variableCommon.space//Math.floor(Math.random()*3 + this.lastPosy);
                //console.log("y: " + y);
                this.lastPosy = y;
                console.error("随机添加台阶", this.lastPosy);
                this.posArray.push([x, y]);
                if (this.lastPosy > 0) {
                    break;
                }

            }

            ran1 = Math.floor((ran1 / count) * this.posArray.length)
            ran2 = Math.floor((ran2 / count) * this.posArray.length)
            ran3 = this.posArray.length - ran1 - ran2;
            // console.error(" this.posArray", this.posArray, "count", count);

            // console.error(" ran1", ran1, "ran2", ran2, "ran3", ran3);

            // debugger;
            var boxShape;
            var boxBody;
            //  碰撞材质
            var boxMaterial = new p2.Material(0);
            var proMaterial = new p2.Material(2);

            //  添加砖块1
            if (ran1 > 0) {
                for (var i = 0; i < ran1; i++) {
                    //保存敌人坐标
                    //var pos1 = this.posArray.pop();
                    let pos1 = this.posArray.splice(Math.floor(Math.random() * this.posArray.length), 1)[0];
                    // console.error("保存敌人坐标",pos1);
                    if (this.posArray.length == 0) {
                        break;
                    }
                    if (pos1[0] == 0 && pos1[1] == 0) {
                        continue
                    }
                    //添加方形刚体
                    var display = spritePool.getObject(1);
                    boxShape = new p2.Box({ width: 3.5, height: 1 });
                    boxShape.material = boxMaterial;
                    boxBody = new p2.Body({
                        mass: 0,
                        position: pos1
                    });
                    // console.error("添加砖块1", boxBody.position);

                    boxBody.addShape(boxShape);
                    boxBody.angularDamping = 0;//  角阻尼。取值区间[0,1]
                    boxBody.damping = 0;//  限行阻尼。取值区间[0,1]
                    boxBody.type = p2.Body.KINEMATIC;
                    world.addBody(boxBody);
                    this.stableFloor.push(boxBody);
                    if (this._isDebug) {

                        // var boxShape1 = new p2.Box({ width: 3.5, height: 1 });
                        // boxShape1.material = boxMaterial;
                        // var boxBody1 = new p2.Body({
                        //     mass: 0,
                        //     position: pos1
                        // });
                        // // console.error("添加砖块1", boxBody.position);

                        // boxBody1.addShape(boxShape1);
                        // boxBody1.angularDamping = 0;//  角阻尼。取值区间[0,1]
                        // boxBody1.damping = 0;//  限行阻尼。取值区间[0,1]
                        // boxBody1.type = p2.Body.KINEMATIC;
                        // world.addBody(boxBody1);


                        var display2 = this.createBox((<p2.Box>boxShape).width * factor, (<p2.Box>boxShape).height * factor, boxBody.position[1]);
                        display2.anchorOffsetX = display2.width / 2;
                        display2.anchorOffsetY = display2.height / 2;
                        boxBody.displays = [display2];
                        this.addChild(display2);

                        display.anchorOffsetX = display.width / 2;
                        display.anchorOffsetY = display.height / 2;
                        boxBody.displays = [display];
                        this.addChild(display);

                    } else {
                        display.anchorOffsetX = display.width / 2;
                        display.anchorOffsetY = display.height / 2;
                        boxBody.displays = [display];
                        this.addChild(display);

                    }
                }
            }

            //  添加砖块2
            if (ran2 > 0) {
                for (var i = 0; i < ran2; i++) {
                    //添加方形刚体
                    var display = spritePool.getObject(2);
                    boxShape = new p2.Box({ width: 3.5, height: 1 });
                    // console.error("保存敌人坐标22this.posArray",this.posArray);
                    if (this.posArray.length == 0) {
                        break;
                    }
                    let pos1 = this.posArray.splice(Math.floor(Math.random() * this.posArray.length), 1)[0];
                    // console.error("保存敌人坐标22",pos1);

                    if (pos1[0] == 0 && pos1[1] == 0) {
                        continue
                    }

                    boxShape.material = boxMaterial;
                    boxBody = new p2.Body({
                        mass: 1,
                        //position: this.posArray.pop()
                        position: pos1
                    });

                    boxBody.addShape(boxShape);
                    boxBody.angularDamping = 0;//  角阻尼。取值区间[0,1]
                    boxBody.damping = 0;//  限行阻尼。取值区间[0,1]
                    boxBody.type = p2.Body.KINEMATIC;
                    world.addBody(boxBody);
                    this.breakableFloor.push(boxBody);
                    if (this._isDebug) {
                        var display2 = this.createBox((<p2.Box>boxShape).width * factor, (<p2.Box>boxShape).height * factor, boxBody.position[1]);
                        display2.anchorOffsetX = display2.width / 2;
                        display2.anchorOffsetY = display2.height / 2;
                        boxBody.displays = [display2];
                        this.addChild(display2);
                    console.error("添加砖块2", boxBody.position);
                        
                    } else {
                        display.anchorOffsetX = display.width / 2;
                        display.anchorOffsetY = display.height / 2;
                        boxBody.displays = [display];
                        this.addChild(display);
                    }

                }
            }

            //  添加砖块3
            if (ran3 > 0) {
                for (var i = 0; i < ran3; i++) {
                    //添加方形刚体
                    var display = spritePool.getObject(3);
                    // boxShape = new p2.Line();
                    // boxShape.length = floorLength
                    boxShape = new p2.Box({ width: 3.5, height: 1 });
                    if (this.posArray.length == 0) {
                        break;
                    }
                    let pos1 = this.posArray.splice(Math.floor(Math.random() * this.posArray.length), 1)[0];
                    // console.error("添加砖块3pos1", pos1);

                    if (pos1[0] == 0 && pos1[1] == 0) {
                        continue
                    }
                    boxShape.material = boxMaterial;
                    boxBody = new p2.Body({
                        mass: 0,
                        //position: this.posArray.pop()
                        position: pos1
                    });
                    // console.error("添加砖块3", boxBody.position);


                    boxBody.addShape(boxShape);
                    boxBody.angularDamping = 0;//  角阻尼。取值区间[0,1]
                    boxBody.damping = 0;//  限行阻尼。取值区间[0,1]
                    boxBody.fixedRotation = true;
                    boxBody.type = p2.Body.KINEMATIC;
                    boxBody.velocity = [Math.floor(Math.random() * this.floatFloorSpeedX + 1), 0];
                    world.addBody(boxBody);
                    this.floatFloor.push(boxBody);
                    if (this._isDebug) {
                        var display2 = this.createBox((<p2.Box>boxShape).width * factor, (<p2.Box>boxShape).height * factor, boxBody.position[1]);
                        display2.anchorOffsetX = display2.width / 2;
                        display2.anchorOffsetY = display2.height / 2;
                        boxBody.displays = [display2];
                        this.addChild(display2);


                    } else {
                        display.anchorOffsetX = display.width / 2;
                        display.anchorOffsetY = display.height / 2;
                        boxBody.displays = [display];
                        this.addChild(display);

                    }
                }
            }

            // 随机是否放置道具

            // 添加英雄和台阶的碰撞材料
            var boxHeroCM = new p2.ContactMaterial(boxMaterial, heroShape.material);
            boxHeroCM.surfaceVelocity = 0;
            boxHeroCM.friction = 0.5;
            boxHeroCM.restitution = 0
            // boxHeroCM.stiffness = Number.MAX_VALUE;
            world.addContactMaterial(boxHeroCM);

            // 添加英雄和道具的碰撞材料
            var propHeroCM = new p2.ContactMaterial(proMaterial, heroShape.material);
            propHeroCM.restitution = 0;
            propHeroCM.stiffness = 1000;
            propHeroCM.contactSkinSize = 10000;
            world.addContactMaterial(propHeroCM);
        }

        private worldLogic(dt) {

            var world = this.world;
            var factor = this.factor;
            var stageH = this.stageH;
            var heroBody = this.heroBody;
            var floatFloor = this.floatFloor;
            var stableFloor = this.stableFloor;
            var breakableFloor = this.breakableFloor;
            var spritePool = this.spritePool;
            var props = this.props;
            var propDisplays = this.propDisplays;
            var worldW = this.worldW;
            var worldH = this.worldH;

            if (dt < 10) {
                return;
            }
            if (dt > 1000) {
                return;
            }
            //  世界执行
            world.step(dt / 1000);
            // this.debugDraw.drawDebug();

            //  更新英雄的深度值，使其一直处于屏幕最外层
            if (this.getChildIndex(this.hero) < this.numChildren - 2) {
                this.setChildIndex(this.hero, this.numChildren - 2);
            }
            // this.debugDraw.drawDebug();

            //  更新游戏操作层的深度值，使其一直处于屏幕最外层
            if (this.getChildIndex(this.gameHud) < this.numChildren - 1) {
                this.setChildIndex(this.gameHud, this.numChildren - 1);
            }

            // 当所有物体超过屏幕上方时，游戏结束
            var gameover = true;
            var l = world.bodies.length;
            for (var i: number = 0; i < l; i++) {
                var boxBody: p2.Body = world.bodies[i];
                // 判断是否失败
                if (boxBody != heroBody) {
                    if (boxBody.position[1] < heroBody.position[1] + worldH * 0.3) {
                        if (gameover) {
                            gameover = false;
                        }

                    }
                }
                //  更新精灵显示
                if (boxBody.displays) {
                    var box = boxBody.displays[0];
                    if (box) {
                        box.x = boxBody.position[0] * factor;
                        box.y = stageH - boxBody.position[1] * factor;
                        box.rotation = 360 - boxBody.angle * 180 / Math.PI;
                        if (boxBody.sleepState == p2.Body.SLEEPING) {
                            box.alpha = 0.5;
                        }
                        else {
                            box.alpha = 1;
                        }
                    }
                }

            }
            //游戏结束跳转
            if (gameover) {
                //console.log("game over!");
                // if(!this.hero.diedTimer.running){
                //     this.hero.changeDied();
                // }
            }


            // 是否创建新的台阶，当所有的台阶位置都低于屏幕的高度时才重新创建
            var newFloor = true;
            var length = (<p2.Box>(stableFloor[0].shapes[0])).width / 2;
            for (var i = 0; i < floatFloor.length; i++) {
                //  浮动台阶左右循环移动
                if (floatFloor[i].position[0] + length > worldW) {
                    floatFloor[i].position[0] = worldW - length;
                    floatFloor[i].velocity[0] = -floatFloor[i].velocity[0];
                } else if (floatFloor[i].position[0] - length < 0) {
                    floatFloor[i].position[0] = length;
                    floatFloor[i].velocity[0] = -floatFloor[i].velocity[0];
                }

                //只要有一个的位置还在屏幕下等待显示，就不添加，这里稍微比0大点
                if (floatFloor[i].position[1] < 3) {
                    newFloor = false;
                }
                //  位置高于1个屏幕高度时移除
                if (floatFloor[i].position[1] > worldH) {
                    // 回收显示对象
                    spritePool.recycleObject(<SideStep>(floatFloor[i].displays[0]));
                    // 先从集合中移除该元素，再从物理世界中移除该物体
                    world.removeBody(floatFloor.splice(i, 1)[0]);
                    // 因为集合中被删掉了一个元素，后面的元素索引要+1
                    i--;
                }
            }
            for (var i = 0; i < stableFloor.length; i++) {
                //只要有一个的位置还在屏幕下等待显示，就不添加
                if (stableFloor[i].position[1] < 0) {
                    newFloor = false;
                }
                //  位置高于1个屏幕高度时移除
                if (stableFloor[i].position[1] > worldH) {
                    spritePool.recycleObject(<SideStep>(stableFloor[i].displays[0]));
                    world.removeBody(stableFloor.splice(i, 1)[0]);
                    i--;
                }
            }

            for (var i = 0; i < breakableFloor.length; i++) {
                //只要有一个的位置还在屏幕下等待显示，就不添加，这里稍微比0大点
                if (breakableFloor[i].position[1] < 3) {
                    newFloor = false;
                }
                //  位置高于一个屏幕高度时移除
                if (breakableFloor[i].position[1] > worldH) {
                    spritePool.recycleObject(<SideStep>(breakableFloor[i].displays[0]));
                    world.removeBody(breakableFloor.splice(i, 1)[0]);
                    i--;
                }
            }
            //  在屏幕下方方1个屏幕大小区域创建备用台阶
            if (newFloor) {
                this.lastPosy = -worldH;
                console.log("在屏幕上方1个屏幕大小区域创建备用台阶: ", worldH);
                this.addSidesteps(1, false);
            }


        }
        private stopWorld() {
            egret.Ticker.getInstance().unregister(this.worldLogic, this)
            // this.hero.changeDied();
            // this.world.clear()
            weChat.variableCommon.getInstance().showReStartPanel();
        }

        public reStart() {
            egret.Ticker.getInstance().register(this.worldLogic, this)
        }
        /**
 * 创建一个方形
 */
        private createBox(width: number, height: number, testY: number): egret.Sprite {
            var contain = new egret.Sprite();
            var shape = new egret.Shape();
            shape.graphics.beginFill(0xfff000);
            shape.graphics.drawRect(0, 0, width, height);
            shape.graphics.endFill();

            var text = new egret.TextField()
            text.text = ("" + testY).substring(0, 6)
            text.x = 70

            contain.addChild(shape)
            contain.addChild(text)

            return contain;
        }

        /**
  * 创建一个圆形
  */
        private createBall(r: number): egret.Shape {
            var shape = new egret.Shape();
            shape.graphics.beginFill(0xfff000);
            shape.graphics.drawCircle(r, r, r);
            shape.graphics.endFill();
            return shape;
        }

    }


}