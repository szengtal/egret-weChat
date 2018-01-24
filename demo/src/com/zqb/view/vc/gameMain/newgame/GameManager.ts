
module weChat {

    export
        class GameManager {


        public static stageW = 720;
        public static stageH = 1280;

        private static _curScore: number = 0;

        public static setCurScore(val: number) {

            this._curScore = val;
        }

        public static getCurScore(): number {
            return this._curScore;
        }


    }
}