module Cmd {

    export function dispatch(cmd: string, obj?: any, type?: string): void {
        var facade: weChat.MahJongLobbyFacade = weChat.MahJongLobbyFacade.getLobbyInstance();
        facade.sendNotification(cmd, obj, type);
    }
    export function trace(rev: any, str: string = ""): void {
        console.log(str + " "/*+rev.GetType()*/, JSON.stringify(rev));
    }
    /*
     * login
     */
    export function OnUserInfoSynLobbyCmd_S(rev: Cmd.UserInfoSynLobbyCmd_S) {
        let data = {
         
        }
      
    }
  
}
module Pmd {

   
}
// onerror = function (errorMessage: any, scriptURI?: any, lineNumber?: any, columnNumber?: any, errorObj?: any) {
//     var str = "游戏异常捕获:gameid:" + uniLib.Global.gameId + ":lobbyid:" + uniLib.Global.lobbyGameId + ":" + errorMessage + "url:" + scriptURI + "line:" + lineNumber;
//     console.error(str);
//     if (uniLib["DebugView"]) {
//         uniLib["DebugView"].Instance.addLog(str);
//     }
//     //uniLib["DebugView"].Instance.show();
// }
