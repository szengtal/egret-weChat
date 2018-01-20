// /// <reference path="../table/LobbyTaskConfig.ts" />
// /// <reference path="../table/TableGoodsConfig.ts" />


// // 对自动生成的表格代码的扩展
// /**
//  * 表格加载后立刻从引擎资源缓存中删除，避免占内存
//  */
// function loadTable(key: string): any {
//     var res = RES.getRes(key);
//     // RES.destroyRes(key);
//     return res;
// }
// //////////////////////////////////////////////////////////////////////////////////////////
// // LobbyTaskConfig
// declare module weChat {
//     module LobbyTaskConfig {
//         var $instance: weChat.LobbyTaskConfig[];
//         function instance(): weChat.LobbyTaskConfig[];
//         function signData(): weChat.LobbyTaskConfig[];

//     }
// }

// weChat.LobbyTaskConfig.instance = function (): weChat.LobbyTaskConfig[] {
//     if (weChat.LobbyTaskConfig.$instance == null) {
//         weChat.LobbyTaskConfig.$instance = loadTable("LobbyTaskConfig_json");
//     }
//     return weChat.LobbyTaskConfig.$instance;
// }

// weChat.LobbyTaskConfig.signData = function (): weChat.LobbyTaskConfig[] {
//     let signArr: weChat.LobbyTaskConfig[] = [];
//     for (let item of weChat.LobbyTaskConfig.instance()) {
//         if (item.taskType == 11) {
//             signArr.push(item)
//         }
//     }
//     return signArr
// }
// //////////////////////////////////////////////////////////////////////////////////////////
// // TableGoodsConfig
// declare module weChat {
//     module TableGoodsConfig {
//         var $instance: weChat.TableGoodsConfig[];
//         function instance(): weChat.TableGoodsConfig[];
//         function goodData(id: number): weChat.TableGoodsConfig;
//     }
// }

// weChat.TableGoodsConfig.instance = function (): weChat.TableGoodsConfig[] {
//     if (weChat.TableGoodsConfig.$instance == null) {
//         weChat.TableGoodsConfig.$instance = loadTable("TableGoodsConfig_json");
//     }
//     return weChat.TableGoodsConfig.$instance;
// }
// weChat.TableGoodsConfig.goodData = function (id: number): weChat.TableGoodsConfig {
//     let signArr: weChat.TableGoodsConfig[] = [];
//     for (let item of weChat.TableGoodsConfig.instance()) {
//         if (item.goodId == id) {
//             return item

//         }
//     }
// }



// }

