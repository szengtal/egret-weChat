import * as fs from 'fs';
import * as path from 'path';
export class WxgamePlugin implements plugins.Command {

    constructor() {
    }
    async onFile(file: plugins.File) {
        if (file.extname == '.js') {
            const filename = file.origin;
            if (filename == "libs/modules/promise/promise.js" || filename == 'libs/modules/promise/promise.min.js') {
                return null;
            }
            if (filename == 'libs/modules/egret/egret.js' || filename == 'libs/modules/egret/egret.min.js') {
                let content = file.contents.toString();
                content += `;window.egret = egret;`;
                content = content.replace(/definition = __global/, "definition = window");
                file.contents = new Buffer(content);
            }
            else {
                let content = file.contents.toString();
                if (
                    filename == "libs/modules/res/res.js" ||
                    filename == 'libs/modules/res/res.min.js' ||
                    filename == 'libs/modules/assetsmanager/assetsmanager.min.js' ||
                    filename == 'libs/modules/assetsmanager/assetsmanager.js'
                ) {
                    content += ";window.RES = RES;"
                }
                if (filename == "libs/modules/eui/eui.js" || filename == 'libs/modules/eui/eui.min.js') {
                    content += ";window.eui = eui;"
                }
                // if (filename == "libs/modules/physics/physics.js" || filename == 'libs/modules/physics/physics.min.js') {
                //     content += ";window.p2 = physics;"
                // }

//                 if (filename.indexOf("physics") >= 0) {
//                     content = content.replace(/window.p2={};/gi, "var p2 = {};");
//                     content = content.replace(/window.p2/gi, "p2");
//                     // content += ";window.pako = pako;"
//                     content += ";window.p2 = p2;";
// console.log("window.p2 = p2;");

//                 }

                // if (filename.indexOf("physics") >= 0) {
                //     content += "\n;window.p2 = p2;";
                // }


                if (filename == 'libs/modules/dragonBones/dragonBones.js' || filename == 'libs/modules/dragonBones/dragonBones.min.js') {
                    content += ';window.dragonBones = dragonBones';
                }
                content = "var egret = window.egret;" + content;
                if (filename == 'main.js') {
                    content += ";window.Main = Main;"
                }
                file.contents = new Buffer(content);
            }
        }
        return file;
    }
    async onFinish(pluginContext) {
        const fielurl = path.join(pluginContext.projectRoot, "scripts/wxgame/egret.wxgame.js");
        let content = fs.readFileSync(fielurl, 'utf-8');
        content = content.replace(/var egret;/gi, "");
        pluginContext.createFile("libs/modules/egret/egret.wxgame.js", new Buffer(content))

    }
}