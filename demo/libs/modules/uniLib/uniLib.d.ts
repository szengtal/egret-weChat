/*!
 * uniLib - d.ts for Description
 * @licence uniLib - v0.1.0 (2018-01-19)
 * qq:93749937 | Licence: helojo
 */
declare class md5 {
    constructor();
    private hexcase;
    private b64pad;
    hex_md5(s: any): string;
    private b64_md5(s);
    private any_md5(s, e);
    private hex_hmac_md5(k, d);
    private b64_hmac_md5(k, d);
    private any_hmac_md5(k, d, e);
    private md5_vm_test();
    private rstr_md5(s);
    private rstr_hmac_md5(key, data);
    private rstr2hex(input);
    private rstr2b64(input);
    private rstr2any(input, encoding);
    private str2rstr_utf8(input);
    private str2rstr_utf16le(input);
    private str2rstr_utf16be(input);
    private rstr2binl(input);
    private binl2rstr(input);
    private binl_md5(x, len);
    private md5_cmn(q, a, b, x, s, t);
    private md5_ff(a, b, c, d, x, s, t);
    private md5_gg(a, b, c, d, x, s, t);
    private md5_hh(a, b, c, d, x, s, t);
    private md5_ii(a, b, c, d, x, s, t);
    private safe_add(x, y);
    private bit_rol(num, cnt);
}

declare module Pmd {
    enum ChatType {
        ChatType_Map = 2,
    }
    class Chat {
        GetType(): string;
    }
    module Chat {
        enum Param {
            CommonChatUserPmd_CS = 1,
            GMCommandChatUserPmd_C = 2,
            GMCommandListChatUserPmd_S = 4,
            PrivateChatUserPmd_CS = 5,
        }
    }
    class CommonChatUserPmd_CS {
        id: number;
        name: string;
        sexman: boolean;
        chatpos: number;
        chattype: number;
        info: string;
        /**
         * 增加时间戳
         */
        time: number;
        GetType(): string;
    }
    module CommonChatUserPmd_CS {
        enum ChatType {
            /**
             * 世界聊天
             */
            ChatType_None = 0,
            /**
             * 大厅聊天
             */
            ChatType_Lobby = 1,
            /**
             * 房间聊天
             */
            ChatType_Room = 2,
            /**
             * 机器人聊天
             */
            ChatType_Robot = 4,
        }
    }
    module CommonChatUserPmd_CS {
        enum ChatPos {
            /**
             * 普通聊天输出
             */
            ChatPos_None = 0,
            /**
             * 普通聊天输出
             */
            ChatPos_Normal = 1,
            /**
             * 系统提示输出
             */
            ChatPos_Sys = 2,
            /**
             * 冒泡提示
             */
            ChatPos_Tips = 4,
            /**
             * 右下角弹出
             */
            ChatPos_Pop = 8,
            /**
             * 私聊输出
             */
            ChatPos_Private = 16,
            /**
             * 重要信息，屏幕中央输出(电视)
             */
            ChatPos_Important = 32,
            /**
             * 荣耀信息
             */
            ChatPos_Honor = 64,
            /**
             * GM系统公告输出位置
             */
            ChatPos_Gm = 128,
            /**
             * VIP
             */
            ChatPos_GmVip = 144,
            /**
             * 固定显
             */
            ChatPos_ImportantDown = 160,
        }
    }
    class GMCommandChatUserPmd_C {
        charid: number;
        charname: string;
        method: string;
        params: string;
        GetType(): string;
    }
    class GMHelpInfo {
        method: string;
        example: string;
        GetType(): string;
    }
    class GMCommandListChatUserPmd_S {
        /**
         * [packed=true]
         */
        list: GMHelpInfo[];
        GetType(): string;
    }
    class PrivateChatUserPmd_CS {
        id: number;
        name: string;
        sexman: boolean;
        info: string;
        /**
         * 增加时间戳
         */
        time: number;
        GetType(): string;
    }
}

declare module Pmd {
    class Forward {
        GetType(): string;
    }
    module Forward {
        enum Param {
            UserJsMessageForwardUserPmd_CS = 1,
            /**
             * LoginLobbyRes							= 3;
             */
            WebSocketForwardUserPmd_C = 4,
            WebSocketForwardUserPmd_S = 5,
        }
    }
    /**
     * 长连接时玩家跟区服务器的通信是通过网关转发的,统一用这个消息互相传递
     */
    class UserJsMessageForwardUserPmd_CS {
        /**
         * json消息内容
         */
        msg: string;
        /**
         * json消息用bytes
         */
        msgbytes: any;
        /**
         * 按字符串格式序列化的proto协议
         */
        proto: string;
        GetType(): string;
    }
    /**
     * HTTP请求切换到websocket链接
     */
    class WebSocketForwardUserPmd_C {
        /**
         * accountid和平台返回给客户端的uid:string是完全不同的两个概念。如果没有在别处提供accountid，此处可临时将uid强转为uint64使用
         */
        accountid: number;
        GetType(): string;
    }
    class WebSocketForwardUserPmd_S {
        accountid: number;
        jsongatewayurl: string;
        tokenid: number;
        logintempid: number;
        gatewayurl: string;
        gatewayurltcp: string;
        GetType(): string;
    }
}

declare module Pmd {
    /**
     * 区服务器状态
     */
    enum ZoneState {
        /**
         * 关闭状态ZoneState_Shutdown
         */
        Shutdown = 0,
        /**
         * 正常运行ZoneState_Normal
         */
        Normal = 1,
        /**
         * 爆满ZoneState_Fullly
         */
        Fullly = 2,
        /**
         * 正在启动ZoneState_Starting
         */
        Starting = 3,
    }
    class ServerShutDownLoginUserPmd_S {
        /**
         * 服务器当前时间,uniixtime
         */
        servertime: number;
        /**
         * 倒计时时间
         */
        lefttime: number;
        /**
         * 停机原因
         */
        desc: string;
        /**
         * 20161202添加，后面为gm需要字段
         */
        gameid: number;
        zoneid: number;
        gmid: number;
        clientid: number;
        /**
         * 0成功，其他失败
         */
        retcode: number;
        /**
         * 失败描述
         */
        retdesc: string;
        GetType(): string;
    }
    class OnlineStateLoginUserPmd_CS {
        /**
         * OnlineState
         */
        state: number;
        /**
         * 账号id,如果是自己,可以不填
         */
        accid: number;
        GetType(): string;
    }
    enum LoginReturnFailReason {
        /**
         * 密码错误
         */
        Password = 1,
        /**
         * 区服务器已关闭
         */
        ServerShutdown = 2,
        /**
         * 客户端游戏版本号太低
         */
        VersionTooLow = 3,
        /**
         * 没有找到登录token,需要重新平台验证
         */
        UserTokenFind = 4,
        /**
         * token错误
         */
        UserTokenTempId = 5,
        /**
         * token已过期
         */
        UserTokenTimeOut = 6,
        /**
         * 重复登录
         */
        LoginDulicate = 7,
        /**
         * 没有可用网关
         */
        NoGatewaytDown = 8,
        /**
         * 账号正在使用中
         */
        AccountUsing = 9,
        /**
         * 网关人数满
         */
        GatewayUserMax = 10,
        /**
         * 外挂惩罚
         */
        WaiGuaPunish = 11,
        /**
         * 未到开服时间
         */
        ServerStartTime = 12,
    }
    enum ZoneInfoBitMask {
        ZoneInfoBitMask_None = 0,
        /**
         * 正常运营
         */
        ZoneInfoBitMask_Normal = 1,
        /**
         * 支持沙箱模式
         */
        ZoneInfoBitMask_SandBox = 2,
        /**
         * 暂未开放
         */
        ZoneInfoBitMask_NoOpen = 4,
    }
    /**
     * 平台枚举
     */
    enum PlatType {
        /**
         * 本平台
         */
        PlatType_Normal = 0,
        /**
         * UC平台
         */
        PlatType_UC = 4,
        /**
         * 手上活
         */
        PlatType_LeZhuan = 67,
        /**
         * 微信
         */
        PlatType_WeChat = 68,
        /**
         * play68
         */
        PlatType_Play68 = 69,
        /**
         * 爱贝云
         */
        PlatType_AiBei = 70,
        /**
         * Facebook
         */
        PlatType_Facebook = 71,
        /**
         * GooglePlay
         */
        PlatType_GooglePlay = 72,
        /**
         * 性之助（就叫这个名字）
         */
        PlatType_XingZhiZhu = 73,
        /**
         * 火舞
         */
        PlatType_HuoWu = 74,
        /**
         * 彩果
         */
        PlatType_CaiGuo = 77,
        /**
         * 1758
         */
        PlatType_1758 = 79,
        /**
         * 达派手机助手
         */
        PlatType_DAPAI = 80,
        /**
         * 嗨乐app
         */
        PlatType_HILE = 82,
        /**
         * 爱爱游
         */
        PlatType_AAY = 86,
        /**
         * 微游联盟
         */
        PlatType_WEIYOU = 90,
        /**
         * 万游在线
         */
        PlatType_9g = 99,
        /**
         * 手机
         */
        PlatType_MOBILE = 129,
        /**
         * 雪池
         */
        PlatType_XueChi = 133,
        /**
         * 白鹭开放平台
         */
        PlatType_Egret = 134,
        /**
         * 鎏信
         */
        PlatType_AoXin = 140,
        /**
         * 火速,云游平台
         */
        PlatType_HUOSU = 145,
        /**
         * 荣强网络
         */
        PlatType_RONGQIANG = 151,
        /**
         * AAAapp
         */
        PlatType_WXApp = 152,
        /**
         * 荣强app
         */
        PlatType_RongQiangApp = 153,
    }
    /**
     * 玩家在线状态
     */
    enum OnlineState {
        /**
         * 离线
         */
        OnlineState_Offline = 0,
        /**
         * 在线
         */
        OnlineState_Online = 1,
        /**
         * 网络差
         */
        OnlineState_Slow = 2,
        /**
         * 离开,切后台
         */
        OnlineState_Leave = 3,
        /**
         * 电话中
         */
        OnlineState_Calling = 4,
    }
    /**
     * 区服务器信息
     */
    class ZoneInfo {
        /**
         * 区编号
         */
        zoneid: number;
        /**
         * 区名称
         */
        zonename: string;
        state: ZoneState;
        opentime: string;
        /**
         * 大厅服务器使用，MMO无视,为了兼容，不能修改尖
         */
        gameid: number;
        /**
         * 大厅服务器使用，MMO无视,为了兼容，不能修改尖
         */
        iconurl: string;
        /**
         * 掩码模式,ZoneInfoBitMask
         */
        bitmask: number;
        /**
         * 大厅服务器使用，MMO无视,为了兼容，不能修改尖
         */
        gamename: string;
        /**
         * 合区使用
         */
        newzoneid: number;
        /**
         * 在线人数
         */
        onlinenum: number;
        /**
         * 在线人数
         */
        nextopentime: string;
        GetType(): string;
    }
    /**
     * 区服务器信息列表,选区列表
     */
    class ZoneInfoListLoginUserPmd_S {
        /**
         * 游戏名称,(区别与区名)
         */
        gamename: string;
        /**
         * 游戏编号
         */
        gameid: number;
        zonelist: ZoneInfo[];
        /**
         * 大厅服务器使用，MMO无视,为了兼容，不能修改尖
         */
        zoneid: number;
        /**
         * 人数最少的，而且是在线的区
         */
        bestzoneid: number;
        GetType(): string;
    }
    /**
     * 请求区服务器信息列表,选区列表
     */
    class RequestZoneInfoListLoginUserPmd_C {
        /**
         * 游戏编号
         */
        gameid: number;
        GetType(): string;
    }
    /**
     * 请求玩有在所有区的角色信息，及区在线信息
     */
    class RequestUserZoneInfoLoginUserPmd_C {
        /**
         * 游戏编号
         */
        gameid: number;
        GetType(): string;
    }
    class UserZoneInfo {
        /**
         * 角色信息，如果为&quot;&quot;说明在这个区里没有角色
         */
        charname: string;
        zoneinfo: ZoneInfo;
        /**
         * 在线人数
         */
        onlinenum: number;
        GetType(): string;
    }
    class RequestUserZoneInfoLoginUserPmd_S {
        /**
         * 玩家在各个区里的角色信息及区在线信息
         */
        userzoneinfo: UserZoneInfo[];
        GetType(): string;
    }
    /**
     * 客户端发到登录服务器
     */
    class MobileRegistRequestRandCodeLoginUserPmd_C {
        /**
         * 客户端填写的手机号
         */
        mobilenum: string;
        /**
         * 游戏id
         */
        gameid: number;
        GetType(): string;
    }
    class MobileRegistReturnRandCodeLoginUserPmd_S {
        /**
         * 0表示成功,1表示手机号码填写有误,2表示请求发送短信速度过快,3表示短信服务器未开
         */
        retcode: number;
        /**
         * 错误描述
         */
        desc: string;
        /**
         * 超时时间
         */
        timeout: number;
        GetType(): string;
    }
    /**
     * 客户端发到登录服务器,如果创建成功,直接登录
     */
    class MobileRegistRequestCreateAccountLoginUserPmd_C {
        /**
         * 手机号
         */
        mobilenum: string;
        /**
         * 随机码
         */
        randcode: string;
        /**
         * 密码
         */
        password: string;
        /**
         * 游戏id
         */
        gameid: number;
        /**
         * 邀请者uid
         */
        parent: number;
        /**
         * 0代表注册，1代表重置，重置一定需要已经有帐号
         */
        optype: number;
        GetType(): string;
    }
    /**
     * 手机注册失败返回, 当成功后，返回UserRequestPlatTokenLoginOkLoginUserPmd_S协议，客户端直接选区
     */
    class MobileRegistReturnCreateAccountFailLoginUserPmd_S {
        /**
         * 0表示成功,1表示手机号码填写有误,2表示数日频率过快,3表示验证码错误
         */
        retcode: number;
        /**
         * 错误描述
         */
        desc: string;
        GetType(): string;
    }
    /**
     * 请求邮箱注册//客户端发到登录服务器
     */
    class EmailRegistRequestCreateAccountLoginUserPmd_C {
        /**
         * 客户端填写的email url
         */
        email: string;
        /**
         * 密码
         */
        password: string;
        /**
         * 游戏id
         */
        gameid: number;
        /**
         * 是否以游客模式绑定？
         */
        isbind: boolean;
        /**
         * 需要替换绑定的uid
         */
        uid: number;
        /**
         * 邀请者uid
         */
        parent: number;
        /**
         * 手机号
         */
        mobilenum: string;
        GetType(): string;
    }
    /**
     * 当邮箱注册失败后，会返回，当成功后，返回UserRequestPlatTokenLoginOkLoginUserPmd_S协议，客户端直接选区 //客户端发到登录服务器
     */
    class EmailRegistReturnCreateAccountLoginUserPmd_S {
        /**
         * 0表示成功，1表示失败
         */
        retcode: number;
        /**
         * 原因描述
         */
        desc: string;
        /**
         * 分配的uid
         */
        uid: number;
        GetType(): string;
    }
    /**
     * 玩家使用密码登录验证请求
     */
    class UserRequestPlatTokenByPasswordLoginUserPmd_C {
        /**
         * 游戏id
         */
        gameid: number;
        /**
         * 平台id, 手机号注册登录：129
         */
        platid: number;
        /**
         * 账户信息，手机号注册为用户手机号
         */
        account: string;
        /**
         * 密码
         */
        password: string;
        GetType(): string;
    }
    /**
     * 玩家第三方验证登录请求
     */
    class UserRequestPlatTokenByThirdLoginUserPmd_C {
        /**
         * 平台用户信息
         */
        platinfo: PlatInfo;
        /**
         * 游戏编号
         */
        gameid: number;
        GetType(): string;
    }
    /**
     * 玩家请求登录成功返回
     */
    class UserRequestPlatTokenLoginOkLoginUserPmd_S {
        /**
         * 平台分配的uid
         */
        uid: number;
        /**
         * 平台登录密钥，用于上行消息URL签名
         */
        platkey: string;
        /**
         * 平台登录token，用于上行消息
         */
        platlogin: string;
        /**
         * 平台登录token从现在开始多少秒后过期，过期后或服务器返回HttpReturnCode_SignError时客户端需要重新走登录流程
         */
        platloginlife: number;
        /**
         * 时区的名字
         */
        timezonename: string;
        /**
         * 服务器时区相对于UTC的时间偏移量,单位是秒
         */
        timezoneoffset: number;
        /**
         * 平台验证后的反悔的信息
         */
        platinfo: PlatInfo;
        GetType(): string;
    }
    /**
     * 玩家请求登录失败返回
     */
    class UserRequestPlatTokenLoginFailLoginUserPmd_S {
        retcode: number;
        /**
         * 验证失败描述信息
         */
        desc: string;
        GetType(): string;
    }
    /**
     * 请求登录某个区,发给LoginServer
     */
    class UserLoginRequestLoginUserPmd_C {
        /**
         * 游戏编号
         */
        gameid: number;
        /**
         * 区编号
         */
        zoneid: number;
        /**
         * 客户端游戏版本号Version_Game
         */
        gameversion: number;
        /**
         * 机器码
         */
        mid: string;
        GetType(): string;
    }
    /**
     * 登录某个区的错误返回,LoginServer返回
     */
    class UserLoginReturnFailLoginUserPmd_S {
        retcode: LoginReturnFailReason;
        /**
         * 错误描述
         */
        desc: string;
        GetType(): string;
    }
    /**
     * 登录某个区正确时的返回,LoginServer返回
     */
    class UserLoginReturnOkLoginUserPmd_S {
        /**
         * 账号
         */
        accountid: number;
        /**
         * 生成一个临时编号,用于校验,登录网关时传上去
         */
        logintempid: number;
        /**
         * 随机token
         */
        tokenid: number;
        /**
         * 登录的网关地址,接下来断开连接后马上登录这个地址
         */
        gatewayurl: string;
        /**
         * 游戏编号
         */
        gameid: number;
        /**
         * 区编号
         */
        zoneid: number;
        separatezoneuid: boolean;
        zoneuid: string;
        /**
         * 登录的网关地址tcp,
         */
        gatewayurltcp: string;
        /**
         * 登录的网关ws,
         */
        gatewayurlws: string;
        /**
         * config.json的md5
         */
        configmd5: string;
        /**
         * config.json的url
         */
        configurl: string;
        /**
         * 能支持的最小版本号,低于这个客户端就必须更新
         */
        minversion: string;
        GetType(): string;
    }
    /**
     *  发给网关的登录消息,这个消息也可以指定是否尝试断线重连
     *  只有在游戏中断开时
     */
    class UserLoginTokenLoginUserPmd_C {
        gameid: number;
        zoneid: number;
        accountid: number;
        logintempid: number;
        /**
         * 客户端时间戳
         */
        timestamp: number;
        /**
         * md5(string(accountid) + string(logintempid) + string(timestamp) + string(PlatTokenLoginReturn.unigame_plat_key))
         */
        tokenmd5: string;
        /**
         * 压缩算法
         */
        compress: string;
        /**
         * 加密算法
         */
        encrypt: string;
        /**
         * 加密key
         */
        encryptkey: string;
        /**
         * 客户端版本号
         */
        version: number;
        /**
         * 最小压缩字节数,低于这个数的不压缩
         */
        compressmin: number;
        /**
         * 0表示不支持断线重连登录,非0表示支持断线重连,并且指定最后一个收到并且确定处理的消息序列号,服务器会尝试从这个消息号后全部重发一遍,失败的话还是走登录流程
         */
        lastseq: number;
        /**
         * 断线重连时可以直接指定用哪个角色登录
         */
        charid: number;
        /**
         * 当前的客户端包id
         */
        bundleid: number;
        /**
         * 客户端代码zip包md5
         */
        zipmd5: string;
        /**
         * config.josn的md5
         */
        configmd5: string;
        /**
         * 当前的客户端包名bundleid_version mj_1.0.1
         */
        bundlename: string;
        /**
         * gameGatewayUrl,尽量让玩家跟房主一个url,防止被攻击
         */
        url: string;
        GetType(): string;
    }
    /**
     * 发给网关的断线重连消息
     */
    class UserLoginReconnectLoginUserPmd_C {
        accountid: number;
        /**
         * 客户端时间戳
         */
        timestamp: number;
        /**
         * md5(string(accountid) + string(logintempid) + string(timestamp) + string(PlatTokenLoginReturn.unigame_plat_key))
         */
        tokenmd5: string;
        /**
         * 端游用
         */
        logintempid: number;
        /**
         * 游戏Id
         */
        gameid: number;
        /**
         * 区Id
         */
        zoneid: number;
        /**
         * 压缩算法
         */
        compress: string;
        /**
         * 加密算法
         */
        encrypt: string;
        /**
         * 加密key
         */
        encryptkey: string;
        /**
         * 客户端版本号
         */
        version: number;
        /**
         * 最小压缩字节数,低于这个数的不压缩
         */
        compressmin: number;
        /**
         * 0表示登录,非0表示断线重连,并且指定最后一个收到并且确定处理的消息序列号,服务器会尝试从这个消息号后全部重发一遍,失败的话还是走登录流程
         */
        lastseq: number;
        /**
         * 断线重连时可以直接指定用哪个角色登录
         */
        charid: number;
        /**
         * 当前的客户端包id
         */
        bundleid: number;
        /**
         * 客户端代码zip包md5
         */
        zipmd5: string;
        /**
         * config.josn的md5
         */
        configmd5: string;
        /**
         * 当前的客户端包名bundleid_version mj_1.0.1
         */
        bundlename: string;
        /**
         * gameGatewayUrl,尽量让玩家跟房主一个url,防止被攻击
         */
        url: string;
        GetType(): string;
    }
    /**
     * 通知客户端发送日志的地址和日志级别
     */
    class ClientLogUrlLoginUserPmd_S {
        /**
         * 日志几遍,Debug,Info,Error
         */
        loglevel: string;
        /**
         * 日志地址
         */
        logurl: string;
        /**
         * 相同日志信息的日志只发一遍
         */
        distinct: boolean;
        GetType(): string;
    }
    class MessageBoxLoginUserPmd_S {
        btnleft: string;
        btnmiddle: string;
        btnright: string;
        info: string;
        GetType(): string;
    }
    /**
     * 请求注册帐号
     */
    class RequestAccountRegisterLoginUserPmd_C {
        /**
         * 账号
         */
        account: string;
        /**
         * 密码
         */
        password: string;
        /**
         * 验证码
         */
        code: string;
        GetType(): string;
    }
    /**
     * 请求注册帐号
     */
    class ReturnAccountRegisterLoginUserPmd_S {
        /**
         * 账号
         */
        account: string;
        /**
         * 账号ID
         */
        accountid: number;
        GetType(): string;
    }
    /**
     * 发给网关的主动退出消息
     */
    class UserLogoutTokenLoginUserPmd_C {
        GetType(): string;
    }
    /**
     * 如果是重连成功需要给老的客户度发送踢下线消息，否则会永远抢下去
     */
    class ReconnectKickoutLoginUserPmd_S {
        /**
         * 描述
         */
        desc: string;
        GetType(): string;
    }
    class ReconnectErrorLoginUserPmd_S {
        /**
         * 描述
         */
        desc: string;
        GetType(): string;
    }
    /**
     * 服务器主动踢玩家下线
     */
    class ServerKickoutLoginUserPmd_S {
        /**
         * 踢下线的玩家
         */
        accountid: number;
        /**
         * 描述
         */
        desc: string;
        GetType(): string;
    }
    /**
     * 平台用户信息
     */
    class PlatInfo {
        /**
         * 用户账号。platid为PlatType_Normal时，account可以缺省为客户端机器码
         */
        account: string;
        /**
         * 平台id 从PlatType改成int类型
         */
        platid: number;
        email: string;
        /**
         * 性别
         */
        gender: string;
        /**
         * 昵称
         */
        nickname: string;
        /**
         * 时间戳
         */
        timestamp: string;
        /**
         * 平台签名串
         */
        sign: string;
        /**
         * 平台头像
         */
        faceurl: string;
        /**
         * 增加一个扩展字段，特殊平台自行组装json
         */
        extdata: string;
        /**
         * 平台id(兼容老的处理方式)
         */
        uid: string;
        /**
         * 客户端机器码
         */
        imei: string;
        /**
         * 系统名称
         */
        osname: string;
        /**
         * 为了支持多个公众号
         */
        platappid: string;
        GetType(): string;
    }
    /**
     * 第三方平台登录
     */
    class ThirdPlatLoginUserPmd_C {
        /**
         * 平台用户信息
         */
        platinfo: PlatInfo;
        /**
         * 游戏编号
         */
        gameid: number;
        /**
         * 签名id
         */
        sid: string;
        /**
         * 用户ID
         */
        uid: string;
        GetType(): string;
    }
    /**
     * 客户端请求得到自己的IP
     */
    class RequestClientIPLoginUserPmd_C {
        GetType(): string;
    }
    /**
     * 返回客户端IP
     */
    class ReturnClientIPLoginUserPmd_S {
        pstrip: string;
        GetType(): string;
    }
    class CheckVersionLoginUserPmd_C {
        /**
         * 保留字段
         */
        default_charid: number;
        version: number;
        GetType(): string;
    }
    /**
     * 返回客户端配置config
     */
    class ClientConfigUpdateLoginUserPmd_S {
        /**
         * 配置地址
         */
        config: string;
        /**
         * game_crc.zip
         */
        zipmd5: string;
        GetType(): string;
    }
}

declare module Pmd {
    class JsonCompressKey {
        key: string;
        /**
         * 嵌套描述
         */
        json: JsonCompressKey[];
        GetType(): string;
    }
    class TickRequestNullUserPmd_CS {
        /**
         * 当前请求消息的本地时间,秒
         */
        requesttime: number;
        GetType(): string;
    }
    class TickReturnNullUserPmd_CS {
        /**
         * 对方的请求时间原封返回
         */
        requesttime: number;
        /**
         * 当前应答的本地时间,秒,必须填,用来防止加速
         */
        mytime: number;
        GetType(): string;
    }
    class SetPingTimeNullUserPmd_CS {
        /**
         * 当前ping值,毫秒
         */
        pingmsec: number;
        /**
         * 玩家id,不填表示自己
         */
        accid: number;
        GetType(): string;
    }
    /**
     * 设置心跳超时检测时间,每个游戏可能会不一样,这个时间也决定了ping值得刷新时间
     */
    class SetTickTimeoutNullUserPmd_CS {
        sec: number;
        /**
         * 连续探测超过几次就断开
         */
        times: number;
        GetType(): string;
    }
    /**
     * json压缩约定消息
     */
    class JsonCompressNullUserPmd_CS {
        key: string;
        json: JsonCompressKey[];
        /**
         * 0表示不省略,1表示省略,默认不省略,default省略,{} ,&quot;&quot;,0
         */
        omit: number;
        /**
         * 0表示重置,1表示添加
         */
        add: number;
        /**
         * 消息列表
         */
        msglist: string[];
        GetType(): string;
    }
}

declare module Pmd {
    /**
     * HTTP请求错误返回定义
     */
    enum HttpReturnCode {
        /**
         * 无错误
         */
        HttpReturnCode_Null = 0,
        /**
         * 数据库出错
         */
        HttpReturnCode_DbError = 2,
        /**
         * lua脚本错误
         */
        HttpReturnCode_LuaScriptError = 4,
        /**
         * 找不到游戏区列表
         */
        HttpReturnCode_GameZoneListError = 5,
        /**
         * 签名检查错误，需要重新登录
         */
        HttpReturnCode_SignError = 11,
        /**
         * 服务器未开
         */
        HttpReturnCode_ServerShutDown = 12,
        /**
         * Json语法格式错误
         */
        HttpReturnCode_JsonSyntaxError = 13,
        /**
         * Json消息格式错误
         */
        HttpReturnCode_JsonMessageError = 14,
        /**
         * tokenvalue为空
         */
        HttpReturnCode_TokenValueError = 15,
        /**
         * uid与登录uid不同
         */
        HttpReturnCode_WaiGuaUidError = 16,
        /**
         * [过期字段]
         */
        HttpReturnCode_NoGatewaytDown = 17,
        /**
         * 没有可用网关
         */
        HttpReturnCode_NoGatewayDown = 17,
        /**
         * 没有可用Sdk服务器
         */
        HttpReturnCode_NoSdkServer = 18,
        /**
         * 签名错误
         */
        HttpReturnCode_SdkCheckSignErr = 19,
        /**
         * 第三方服务器验证错误
         */
        HttpReturnCode_Sdk3PartyServerErr = 20,
        /**
         * proto解析错误
         */
        HttpReturnCode_ProtobufErr = 21,
        /**
         * 网关错误
         */
        HttpReturnCode_GatewayErr = 22,
        /**
         * 响应超时,目前设置为20秒
         */
        HttpReturnCode_Timeout = 23,
        /**
         * 账号正在使用中
         */
        HttpReturnCode_AccountUsing = 24,
        /**
         * 线上时，platid＝0被限制
         */
        HttpReturnCode_OnlinePlatidErr = 25,
    }
    /**
     * 游戏类型信息,以后可能会扩充
     */
    class GameZoneInfo {
        /**
         * 游戏编号
         */
        gameid: number;
        /**
         * 区编号
         */
        zoneid: number;
        /**
         * 游戏名称
         */
        gamename: string;
        /**
         * 区名称
         */
        zonename: string;
        /**
         * MySQL数据库,不填表示从配置文件读取
         */
        mysql: string;
        /**
         * Redis数据库,不填表示从配置文件读取
         */
        redis: string;
        /**
         * RethinkDB数据库,不填表示从配置文件读取
         */
        rethink: string;
        /**
         * MongoDB数据库,不填表示从配置文件读取
         */
        mongo: string;
        /**
         * 当前区服状态0表示关闭,1表示正常,2表示无权限
         */
        zonestate: number;
        /**
         * 是否以区为单位分uid，方便合区
         */
        separatezoneuid: boolean;
        /**
         * 大厅服务器配置,如果是大厅服务器,则用这个url监听,如果是unilight,则用来连大厅
         */
        lobby: string;
        /**
         * 区类型，0标识正式区，1标识沙盒测试区，2标识其他测试区
         */
        zonetype: number;
        /**
         * 开服时间
         */
        opentime: string;
        /**
         * 大厅服务器配置,用来监听unilight的链接进来
         */
        listenaslobby: string;
        /**
         * 通过配置，区可以连上dbserver
         */
        dbserverurl: string;
        GetType(): string;
    }
}

declare module Pmd {
    /**
     *  代理通知游戏服有玩家充值
     *  对于协议里面的部分字段，比如玩家ID，商品ID等字段需要看平台充值协议，可能平台只能提供一个订单ID参数。
     *  这时候就在平台上实现内部订单号生成，通过订单号来查找这些信息。
     *  平台回调sdk后通知游戏,AS2PSRechargeCommand
     */
    class NotifyRechargeRequestSdkPmd_S {
        /**
         * 玩家登录平台的基础信息
         */
        data: PlatBaseData;
        /**
         * 平台订单号
         */
        platorder: string;
        /**
         * 游戏订单号
         */
        gameorder: string;
        /**
         * 用户在游戏内部游戏服上的角色ID
         */
        roleid: number;
        /**
         * 原价(格式:0.00),购买时应用传入的单价*总数,总原价
         */
        originalmoney: number;
        /**
         * 实际价格(格式:0.00),购买时应用传入的单价*总数,总实际 价格
         */
        ordermoney: number;
        /**
         * 用户买了什么商品
         */
        goodid: number;
        /**
         * 用户买了多少个
         */
        goodnum: number;
        /**
         * 购买状态, 1, 处理中;2 支付成功;3支付失败,4登录失效,5表示金额是查询的余额
         */
        result: number;
        /**
         * 扩展数据长度
         */
        extdata: string;
        /**
         * 充值类型，0玩家充值，1沙箱充值（非rmb充值）,2玩家补偿
         */
        type: number;
        /**
         * 角色等级，游戏转发给monitor的时候加上角色等级
         */
        rolelevel: number;
        GetType(): string;
    }
    /**
     * 平台回调sdk后通知游戏平台,PS2ASRechargeCommand
     */
    class NotifyRechargeReturnSdkPmd_C {
        /**
         * 玩家登录平台的基础信息
         */
        data: PlatBaseData;
        /**
         * 平台订单号
         */
        platorder: string;
        /**
         * 游戏订单号
         */
        gameorder: string;
        /**
         * 用户在游戏内部游戏服上的角色ID
         */
        roleid: number;
        /**
         * 购买状态, 0, 支付成功, 1, 处理中;2 支付成功(兼容老版本);3支付失败
         */
        result: number;
        /**
         * 扩展数据长度
         */
        extdata: string;
        GetType(): string;
    }
    /**
     * 玩家登录平台的基础信息
     */
    class PlatBaseData {
        /**
         * 游戏类型
         */
        gamezone: Pmd.GameZoneInfo;
        /**
         * 这个需要在后面的返回中原样返回，用于游戏平台查找对应的客户端连接,登录验证时充当logintempid
         */
        myaccid: number;
        /**
         * 平台编号
         */
        platid: number;
        /**
         * 子平台编号
         */
        subplatid: number;
        /**
         * 需要回传给游戏客户端，渠道相关的信息都在这个字段，账号信息,如果是ID，也需要转换成字符串，如果是id和account都有，就需要&quot;id|account&quot;链接
         */
        plataccount: string;
        /**
         * 需要回传给游戏客户端,玩家SESSION，或者创建订单时的签名,部分平台有这个
         */
        session: string;
        /**
         * 扩展数据长度
         */
        extdata: string;
        /**
         * 扩展数据长度
         */
        extdata1: string;
        /**
         * 此账号是游客账号转正式账号时的游客账号，只有第一转的时候有用；@20160628现用于存储unionid
         */
        oldplataccount: string;
        /**
         * 平台昵称
         */
        nickname: string;
        /**
         * 平台头像
         */
        faceurl: string;
        /**
         * sdk服务器临时编号
         */
        sdkserverid: number;
        /**
         * @20160628如果当前是通过微信移动授权，则该字段返回相应的微信公众号授权的platid
         */
        oldplatid: number;
        /**
         * 客户端类型，http：0， 1为新的http tcp:为2
         */
        clienttype: number;
        /**
         * 机型号相关imei
         */
        imei: string;
        /**
         * 系统名称
         */
        osname: string;
        /**
         * 游戏属性，根据需要存取，json字符串{&quot;inviterid&quot;:20982032},{&quot;roomid&quot;:&quot;3001_100506&quot;}
         */
        gameprops: string;
        /**
         * 性别，1男，2女， 0未知
         */
        gender: number;
        GetType(): string;
    }
    /**
     * 创建订单号，有些需要于第三方沟通，有的不需要
     */
    class CreatePlatOrderRequestSdkPmd_C {
        /**
         * 玩家登录平台的基础信息
         */
        data: PlatBaseData;
        /**
         * 游戏订单号
         */
        gameorder: string;
        /**
         * 用户在游戏内部游戏服上的角色ID
         */
        roleid: number;
        /**
         * 用户在游戏内部游戏服上的角色名称
         */
        rolename: string;
        /**
         * 原价(格式:0.00),购买时应用传入的单价*总数,总原价
         */
        originalmoney: number;
        /**
         * 实际价格(格式:0.00),购买时应用传入的单价*总数,总实际 价格
         */
        ordermoney: number;
        /**
         * 用户买了什么商品
         */
        goodid: number;
        /**
         * 用户买了多少个
         */
        goodnum: number;
        /**
         * 商品名称
         */
        goodname: string;
        /**
         * 商品描述
         */
        gooddesc: string;
        /**
         * 客户端跳转url
         */
        redirecturl: string;
        /**
         * 支付平台id
         */
        payplatid: number;
        /**
         * 做了兼容，方便以后别的平台有特殊需求
         */
        extdata: string;
        /**
         * 渠道上配置的商品ID
         */
        appgoodid: string;
        /**
         * 角色等级，add at 20161102
         */
        rolelevel: number;
        GetType(): string;
    }
    /**
     * 创建订单号，有些需要于第三方沟通，有的不需要
     */
    class CreatePlatOrderReturnSdkPmd_S {
        /**
         * 玩家登录平台的基础信息
         */
        data: PlatBaseData;
        /**
         * 游戏订单号
         */
        gameorder: string;
        /**
         * 用户在游戏内部游戏服上的角色ID
         */
        roleid: number;
        /**
         * 原价(格式:0.00),购买时应用传入的单价*总数,总原价
         */
        originalmoney: number;
        /**
         * 实际价格(格式:0.00),购买时应用传入的单价*总数,总实际 价格
         */
        ordermoney: number;
        /**
         * 需要回传给客户端，实际的游戏内加的道具id,0表示货币
         */
        goodid: number;
        /**
         * 实际的游戏内加的道具数量,实际上是游戏货币的数量
         */
        goodnum: number;
        /**
         * 返回值,0表示成功,1表示失败
         */
        result: number;
        /**
         * 需要回传给客户端，回调通知url,sdk回调地址
         */
        noticeurl: string;
        /**
         * 渠道订单号
         */
        platorder: string;
        /**
         * 需要回传给客户端，客户端传给第三方支付时所需签名
         */
        sign: string;
        /**
         * 客户端跳转url
         */
        redirecturl: string;
        /**
         * 支付平台id
         */
        payplatid: number;
        /**
         * 做了兼容，方便以后别的平台有特殊需求
         */
        extdata: string;
        /**
         * 需要回传给客户端，用户买了什么商品,苹果商店等配置的id,客户端用
         */
        appgoodid: string;
        /**
         * 已废弃,兼容使用
         */
        gamemoneyold: string;
        /**
         * 用户买的商品,能换多少游戏币,只用来客户端显示,棋牌游戏为筹码
         */
        gamemoney: number;
        /**
         * 需要回传给客户端，订单创建时间，用字符串兼容所有格式的时间
         */
        createtime: string;
        rolelevel: number;
        GetType(): string;
    }
    /**
     * ISO用，玩家请求充值后通知sdk服务器去苹果服务器查询,PS2ASRechargeQueryCommand
     */
    class RechargeQueryRequestIOSSdkPmd_C {
        /**
         * 玩家登录平台的基础信息
         */
        data: PlatBaseData;
        /**
         * 游戏订单号
         */
        gameorder: string;
        /**
         * 用户在游戏内部游戏服上的角色ID
         */
        roleid: number;
        /**
         * 原价(格式:0.00),购买时应用传入的单价*总数,总原价
         */
        originalmoney: number;
        /**
         * 实际价格(格式:0.00),购买时应用传入的单价*总数,总实际 价格
         */
        ordermoney: number;
        /**
         * 查询凭证
         */
        token: string;
        /**
         * 扩展数据长度
         */
        extdata: string;
        /**
         * 支付平台
         */
        payplatid: number;
        GetType(): string;
    }
}

declare module Pmd {
    class HttpPackage {
        /**
         * 消息类型
         */
        do: string;
        /**
         * required any data = 2;						// 应用层消息内容
         *  游戏ID
         */
        gameid: number;
        /**
         * 如果客户端发，服务器照样返回
         */
        zoneid: number;
        /**
         * 可唯一代表一个用户身份的ID，由平台统一生成
         */
        uid: string;
        /**
         * 组合字段：&lt;平台id&gt;::&lt;平台账户&gt;
         */
        sid: string;
        /**
         * 由PlatTokenLoginReturn返回
         */
        unigame_plat_login: string;
        /**
         * 客户端当前UNIX时间戳，单位秒
         */
        unigame_plat_timestamp: number;
        GetType(): string;
    }
    class HttpPackageReturn {
        /**
         * 消息类型
         */
        do: string;
        /**
         * required any data = 2;						// 应用层消息内容
         *  游戏ID
         */
        gameid: number;
        /**
         * 如果客户端发，服务器照样返回
         */
        zoneid: number;
        err_no: Pmd.HttpReturnCode;
        GetType(): string;
    }
    /**
     *  请求区列表【不需要签名】【无时序要求】
     *  返回的内容是ZoneInfoListLoginUserPmd_S的内容，但消息类型标注还是&quot;RequestZoneList&quot;
     *  本消息中的字段均拷贝自ZoneInfoListLoginUserPmd_S，用于接收下行数据，上行请求无须填写
     */
    class RequestZoneList {
        /**
         * 游戏名称,(区别与区名)
         */
        gamename: string;
        /**
         * 游戏编号
         */
        gameid: number;
        zonelist: Pmd.ZoneInfo[];
        GetType(): string;
    }
    /**
     * 选区【必须签名】
     */
    class RequestSelectZone {
        GetType(): string;
    }
    class RequestSelectZoneReturn {
        /**
         * 游戏逻辑服务器的http网关地址
         */
        gatewayurl: string;
        separatezoneuid: boolean;
        uid: number;
        GetType(): string;
    }
    /**
     * 平台登录【不需要签名】
     */
    class PlatTokenLogin {
        /**
         * 平台用户信息
         */
        platinfo: Pmd.PlatInfo;
        GetType(): string;
    }
    class PlatTokenLoginReturn {
        /**
         * 平台用户信息
         */
        platinfo: Pmd.PlatInfo;
        /**
         * 可唯一代表一个用户身份的ID，由平台统一生成
         */
        uid: string;
        /**
         * 组合字段：&lt;平台id&gt;::&lt;平台账户&gt;
         */
        sid: string;
        /**
         * 平台登录密钥，用于上行消息URL签名
         */
        unigame_plat_key: string;
        /**
         * 平台登录token，用于上行消息
         */
        unigame_plat_login: string;
        /**
         * 平台登录token从现在开始多少秒后过期，过期后或服务器返回HttpReturnCode_SignError时客户端需要重新走登录流程
         */
        unigame_plat_login_life: number;
        /**
         * 时区的名字
         */
        timezone_name: string;
        /**
         * unilight服务器时区相对于UTC的时间偏移量，单位秒
         */
        timezone_offset: number;
        GetType(): string;
    }
}

declare module uniLib {
    /**
     * 反射
     */
    class Reflect {
        constructor(obj: any);
        parse(obj: any): void;
    }
}

declare module pako {
}
declare module uniLib {
    class initOptions {
        /**
         * 游戏名称
         */
        title: string;
        /**
         * 游戏介绍
         */
        desc: string;
        /**
         * 游戏ICON
         */
        iconUrl: string;
        /**
         * 分享数据
         */
        shareData: any;
        /**
         * 压缩方式
         */
        compressType: CompressType;
        /**
         * 日志级别
         */
        logLevel: number;
        /**
         * 大厅模式
         */
        lobbyMode: boolean;
        /**
        * appId
        */
        appId: string;
        debug: boolean;
        scaleMode: string;
        nativeStorage: any;
        reLoginUrl: string;
        platId: number;
        /**
        * 网关url
        */
        gateWayUrl: string;
        designWidth: number;
        designHeight: number;
        /**
         * 公共需要重载的定义
         */
        reloadDefine: any;
        /**
         * 大厅和游戏公用的资源组
         */
        lobbyCommonResGrps: string[];
        /**
         * 大厅资源配置文件路径,用户管理大厅和游戏之间切换时资源的销毁和加载
         */
        lobbyResConfigUrl: string;
        /**
         * 需要后台静默加载的资源组,lib选择在空闲时异步加载
         */
        backgroundGrps: string[];
        /**
         * cdn域名组
         */
        CdnDomains: string[];
        /**
         * 游戏加载远程路径
         */
        gameRemotePaths: string[];
        /**
         * 消息发出超时时间
         */
        msgTimeOutSec: number;
    }
    /**
    * 初始化库
    * @method uniLib.init
    * @param debugMode {boolen} 是否开启调试模式
    * @param payMode {boolen} 是否支付模块
    * @param payMode {boolen} 是否支付模块
    */
    function init(param?: any, callBack?: any, thisObj?: any, scaleMode?: string, lobbyMode?: boolean): void;
    function cloneObj(obj: any): any;
    class Global {
        static PhoneCallStatus(msg: any): void;
        static Event(type: string, obj?: any, bubbles?: boolean, cancelable?: boolean): ZqEvent;
        static dispatchEvent(type: string, obj?: any, bubbles?: boolean, cancelable?: boolean): void;
        static hasEventListener(type: string): boolean;
        static addEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number): void;
        static removeEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean): void;
        static Compress(msg: any): any;
        static DeCompress(msg: any): any;
        static DeCompressDefult(msg: any): any;
        static isH5: boolean;
        static isActive: boolean;
        /**
        * 本地存储
        */
        static nativeStorage: any;
        static jsonCompress: any;
        static jsonCompressDefault: any;
        static debugLevel: number;
        /**
         * 屏幕高度
         */
        static screenHeight: number;
        static version: number;
        static compressType: CompressType;
        static compressMin: number;
        static msgTimeOutSec: number;
        /**
         * 屏幕宽度
         */
        static screenWidth: number;
        /**
         * 素材宽度
         */
        static designWidth: number;
        /**
         * 素材高度
         */
        static designHeight: number;
        static reloadDefine: any;
        static isRestarting: boolean;
        static PLAT_TOKEN_KEY: string;
        static initOpt: initOptions;
        /**
         * 当前游戏接入平台id
         */
        static gameId: number;
        static lobbyGameId: number;
        static stage: any;
        static is_sandbox: number;
        static appId: string;
        static thirdPlatDir: string;
        static TextColors: {
            white: number;
            milkWhite: number;
            grayWhite: number;
            yellow: number;
            lightYellow: number;
            orangeYellow: number;
            red: number;
            green: number;
            blue: number;
            grayBlue: number;
            purple: number;
            pink: number;
            black: number;
            golden: number;
        };
        static LobbyPlatInfo: any;
        private static _lobbyMode;
        static isInGame: boolean;
        static reLoginUrl: string;
        static CdnDomains: string[];
        static payPlatId: number;
        /**
        * 苹果bundleId
        */
        static bundleId: string;
        static zipmd5: string;
        static configmd5: string;
        /**
        * config uniLib.DefaultConfig 兼容
        */
        static defaultConfig: any;
        static gameConfig: any;
        /**
        * 是否大厅模式
        */
        static lobbyMode: boolean;
        /**
        * 登陆场景
        */
        static LoginScene: any;
        /**
        * 是否缓存token
        */
        static isCacheToken: boolean;
        /**
        * 日志地址
        */
        static logUrl: string;
        /**
         * 获取IP地址服务器
         */
        static ipUrl: string;
        /**
        * GM等级
        */
        static gmlevel: number;
        static zoneList: Pmd.ZoneInfo[];
        static getZoneInfo(gameId: number): Pmd.ZoneInfo;
        /**
        * 分享数据
        */
        static shareData: ShareData;
        static token: string;
        static platInfo: Pmd.PlatInfo;
        /**
        * 内存缓存 暂时用于存储头像数据
        */
        static localCache: any;
        /**
         * 是否测试服
         */
        static isTestServer(): boolean;
        /**
        * 资源版本
        */
        static readonly resVersion: string;
        /**
        * 皮肤版本
        */
        static readonly thmVersion: string;
        static initPlatInfo(platinfo?: Pmd.PlatInfo, callBack?: Function, thisObj?: any): Pmd.PlatInfo;
        /**
         * 判断是否微信小游戏
         */
        static isWxGame(): boolean;
        static platId: number;
        static zoneId: number;
        static logintempid: number;
        static setPlatInfo(str: string, platId?: number, gameId?: number): void;
        static setPlatToken(str: any, platId?: number, gameId?: number): void;
        static getPlatToken(onGetCached?: Function, thisObj?: any): any;
        /**
         * 打开代理系统地址
         * @param agentUrl
         * @param code
         * @param uid
         */
        static openAgent(agentUrl: string, code: string, platid: number, gameid: number, model?: number): void;
        static getPlatId(): number;
    }
}
declare var testh5: () => boolean;

declare module uniLib {
    class BitmapBlink extends egret.EventDispatcher {
        private _target;
        private _time;
        private _currTime;
        /*** @param target 目标位图
        * @param time 闪啊闪的时间
        * @isAuto 是否立即执行，默认是ture，也可以设置false，外部调用start方法
        */
        constructor(target: egret.Bitmap, time: number, isAuto?: boolean);
        start(): void;
        private runDown(e);
        private runUp(e);
        private checkOver();
        private destroy();
    }
}

declare module uniLib {
}

declare module uniLib {
    /**
    * 图片button类
    */
    class CommonButton extends egret.DisplayObjectContainer {
        constructor(nomalRes: any, selectedRes?: string, disableRes?: string, w?: number, h?: number, txt?: string, fontSize?: number, color?: number, s9_n?: egret.Rectangle, s9_u?: egret.Rectangle, s9_d?: egret.Rectangle);
        protected _lable: egret.TextField;
        protected _nomal_bg: egret.Bitmap;
        protected _selected_bg: egret.Bitmap;
        protected _disable_bg: egret.Bitmap;
        protected init(nomalRes: any, selectedRes?: string, disableRes?: string, w?: number, h?: number, txt?: string, fontSize?: number, color?: number, s9_n?: egret.Rectangle, s9_u?: egret.Rectangle, s9_d?: egret.Rectangle): void;
        fontFamily: string;
        private _lableNomalColor;
        private _lableSelectedColor;
        fontSelectedColor: number;
        private isSelected;
        select: boolean;
        selected(): void;
        text: string;
        unselected(): void;
        protected onbuttonBegin(e: any): void;
        liveSelected: boolean;
        protected onbuttonEnd(e: any): void;
        private _disable;
        disable: boolean;
        /**
         * icon下方添加文字
         */
        setBottomLabel(txt: string, color: number, size: number, x: number, width: number, gap: number): void;
        toggle: boolean;
        destroy(): void;
    }
}

declare module uniLib {
    class DebugView extends egret.Sprite {
        close_btn: CommonButton;
        ignore_btn: CommonButton;
        clear_btn: CommonButton;
        private downPoint;
        private messageSprite;
        private isMove;
        private ChatHeight;
        private message;
        private isFriend;
        private _touchBg;
        private _rect;
        private _isShow;
        private isInStage;
        private static _self;
        static readonly Instance: DebugView;
        constructor(rect: egret.Rectangle);
        resize(): void;
        add(): void;
        private onTouchClose(e);
        private onTouchHideNever(e);
        private onTouchClear(e);
        check(): void;
        clear(): void;
        show(): void;
        hide(): void;
        /**
         * 添加聊天消息
         * txt 文本内容
         * uid 用户id 0表示系统消息
         * name 用户昵称  f9d546  e712fa
         */
        addLog(txt: string): void;
        addTxt(container: egret.Sprite, txt: egret.DisplayObject, d: any): void;
        onMessageSpriteDown(a: any): void;
        onTouchMove(a: any): void;
        onChatTouchUp(a: any): void;
    }
}

declare module uniLib {
    /**
 *
 * 新手引导
 *
 */
    class GameGuide extends egret.Sprite {
        constructor(handBit: egret.Bitmap, circleBit: egret.Bitmap);
        private handPanel;
        private cirPanel;
        private tips;
        private circle;
        private guideHand;
        initStatus(isBet: Boolean): void;
        /**
       * 显示滑动引导
       */
        onShowSlipGuide(): void;
        /**
         * 显示下注引导
         */
        onShowBetGuide(): void;
        /**
         * 创建场景
         */
        private createBaseScene();
        /**
        * 创建下注引导
        */
        private createBetScene();
        /**
         * 创建向右滑动引导
         */
        private createSlipScene();
        /**
            创建监听
          */
        private addListener();
        private removeListener();
        private onHideSlipHandler();
        private createGuideHand(x, y, ro?, scale?);
        private addCircleEffect(x, y);
        private betGuideEffect();
        private leftSlipGuideEffect();
        private rightSlipGuideEffect();
        private createTextField(txt, x, y, color, size);
        private disposeScene();
        dispose(): void;
    }
}

declare module uniLib {
    class MsgBox extends eui.Panel {
        static exml: string;
        private contentText;
        private okButton;
        private cacelButton;
        private _okCall;
        private _cacelCall;
        private _callObj;
        constructor(txt: string, title?: string, okTxt?: string, confirmCall?: Function, cacelTxt?: string, cacelCall?: Function, callObj?: any, skin?: string);
        static setDefaultSkin(skin: any): void;
        private onTouch(e);
    }
}

declare module uniLib {
    /**
     * 对象工厂
     */
    class ObjectFactory {
        m_FishFactory: any;
        _prexKey: string;
        _minCount: number;
        _maxCount: number;
        constructor(key: string, min?: number, max?: number);
        free(obj: any): void;
        setCount(_min: number, _max?: number): void;
        active(cls: any): any;
        isNew(): boolean;
        empty(): void;
        private createArray(key);
        private key(b);
        getKey(): string;
    }
}

declare module uniLib {
    /**
     * 对象工厂管理器
     */
    class ObjectFactoryGroup {
        private vector;
        private subKey;
        private _clazz;
        private _mainKey;
        private _min;
        private _max;
        constructor(cls: any, min?: number, max?: number);
        free(obj: any, key: any): void;
        active(key: any): any;
        isNew(key: any): boolean;
        setCount(key: any, _min: number, _max?: number): void;
        empty(key: any): void;
        setAllCount(_min: number, _max?: number): void;
        private getFactory(_key);
        private key(_key);
        private createFactory(key, min, max?);
    }
}

declare module uniLib {
    class PageGroup extends egret.Sprite {
        private pages;
        private startTouchX;
        private selectIndex;
        private childNum;
        private currentPage;
        private currentPageX;
        private leftPage;
        private rightPage;
        private pageWidth;
        private btnGroup;
        constructor(mask: egret.Rectangle);
        addPage(page: egret.DisplayObject): void;
        reset(): void;
        private onTouchBegin(event);
        private onTouchMove(event);
        private onTouchEnd(event);
        private showCurrentPageEnd();
        private showLeftPageEnd();
        private showRightPageEnd();
        setSelectIndex(value: number): void;
        getSelectIndex(): number;
        private updateBtnGroupSelected();
        setChildNum(value: number): void;
        getChildNum(): number;
        private removePage(page);
    }
}


declare module uniLib {
    class SlideBar {
        constructor(center: egret.Sprite, left: egret.Sprite, right: egret.Sprite, stage: egret.Stage);
        private stage;
        private center;
        private left;
        private right;
        private canShowBar;
        private curDir;
        private startTouchPoint;
        /**
          创建监听
        */
        private addListener();
        private removeListener();
        /**
         * 恢复到初始居中状态
         */
        initStatus(): void;
        /**
         * 显示左边框
         */
        showLeftBar(): void;
        private onTouchBegin(event);
        private onTouchMove(event);
        private onTouchEnd(event);
        private onTrunRight();
        private onTrunLeft();
        private onTrunCenter();
        private disposeLeftBar();
        private disposeRightBar();
        private disposeTween(param);
        dispose(): void;
    }
}

declare module uniLib {
    class StatusBtn extends egret.Sprite {
        private normalTexture;
        private selectedTexture;
        private normalBitmap;
        private selectedBitmap;
        index: number;
        private _selected;
        constructor(normalTexture: egret.Texture, selectedTexture: egret.Texture);
        selected: boolean;
    }
}

declare module uniLib {
    class StatusBtnGroup extends egret.Sprite {
        private selectIndex;
        private childNum;
        private btns;
        private currentSelecedBtn;
        private normalTexture;
        private selectedTexture;
        private gap;
        constructor(normalTexture?: egret.Texture, selectedTexture?: egret.Texture, gap?: number);
        setSelectIndex(value: number): void;
        getSelectIndex(): number;
        setChildNum(value: number): void;
        getChildNum(): number;
        private resetChildren();
        private getNewBtn();
        private init();
    }
}

/**
* 资源常量
*/
declare class CommonConsts {
    /**
    * 是否在游戏中 标示
    */
    static LOBBY_LASTGAME: string;
    static UNI_LAST_PLAT_INFO: string;
}

declare module uniLib {
    class Dispatcher {
        private _funcMap;
        constructor();
        dispatch($noticeType: any, data?: any): boolean;
        addListener(noticeType: any, listener: Function, thisObj: any): void;
        hasListener(noticeType: string): boolean;
        removeListener(noticeType: any, listener: Function, thisObj: any): void;
        private getNoticeIndex(noticeType, listener, thisObj);
    }
}


declare module uniLib {
    /**
     * 自定义事件类
     */
    enum UserInfoEnum {
        /**
         * 筹码
         */
        CHIPS = 0,
        /**
         * 体验币
         */
        FREECHIPS = 1,
        /**
         * 第三方货币
         */
        PLAT_POINT = 2,
        /**
        * 银行存款
        */
        BANK_CHIPS = 3,
        /**
        * 昵称
        */
        NICKNAME = 4,
        /**
        *
        */
        GIFTCOUPON = 5,
        /**
         * 头像
         */
        HEADURL = 6,
        /**
         * 捕鱼大厅金币
         */
        GOLDCHIPS = 7,
        /**
        * 房卡
        */
        FANGKA = 8,
        /**
         * 钻石
         */
        DIAMOND = 9,
    }
}

declare module uniLib {
    /**
     * 自定义事件类
     */
    class ZqEvent {
        /**
         * 房间聊天事件
         */
        static CHAT_ROOM: string;
        /**
         * 私聊事件
         */
        static CHAT_PRIVATE: string;
        /**
         * 系统公告
         */
        static CHAT_SYSTEM: string;
        /**
         * 系统紧急公告
         */
        static CHAT_IMPORTANT: string;
        /**
         * 大厅发给房间 通知后台公告
         */
        static EVENT_L2G_NOTICE: string;
        /**
         * GM消息
         */
        static CHAT_GM: string;
        static GM_BEFORE: string;
        static GM_END: string;
        /**
         * 用户喇叭
         */
        static CHAT_HORN: string;
        /**
        * 用户信息
        */
        static USER_INFO: string;
        /**
         * 百人长跑马灯
         */
        static CHAT_HUNDRED: string;
        /**
         * 普通场跑马灯
         */
        static CHAT_COMMONGAME: string;
        /**
         * 大厅跑马灯
         */
        static CHAT_LOBBY: string;
        /**
         * 退出游戏 大厅请求刷新用户信息
         */
        static UPDATE_USER_INFO: string;
        static CHECK_VERSION_UPDATE: string;
        /**
        * 公用模块
        */
        static COMMON_MODEL: string;
        /**
        * 公用模块
        */
        /**
        * 大厅发送给游戏
        */
        static EVENT_L2G: string;
        /**
        * 游戏发送给大厅
        */
        static EVENT_G2L: string;
        static EVENT_ACTIVE_SOCKET_CACHE_OK: string;
        static EVENT_SERVER_SHUTDOWN: string;
        static EVENT_SERVER_DEBUG_LEVEL: string;
        /**
        * GM命令事件
        */
        static GM_INFO: string;
        static KICK_OUT: string;
        /**
        * 断线重连成功
        */
        static ON_RECONNEC: string;
        static ON_SERVER_SHUTDOWN: string;
        static ON_GETZONEINFO: string;
        /**
        * 通知重启事件
        */
        static ON_RESTART: string;
        /**
        * 网络异常
        */
        static NET_ERRER: string;
        static SHARE: string;
        static TASK_EVENT: string;
        /**
        * 在线用户数量事件
        */
        static ONLINE_NUM: string;
        static HIDE_SLIP_GAME_GUIDE: string;
        /**
         * 舞台大小发生变化
         */
        CLASS_NAME: string;
        /**
         * 底层向egret层发送消息事件
         */
        static NATIVE_TO_EGERET: string;
        private _obj;
        constructor(type: string, obj?: any, bubbles?: boolean, cancelable?: boolean);
        clone(obj?: any): ZqEvent;
        toString(): void;
        /**
         * 传参获取
         * @returns {Object}
         */
        readonly param: any;
        type: string;
    }
}

declare module uniLib {
    /**
     * 全局侦听类及消息处理
     */
    class ZqListener {
        CLASS_NAME: string;
        private static _instance;
        private _dispatcher;
        private isInit;
        constructor();
        static getInstance(): ZqListener;
        addEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number): void;
        hasEventListener(type: string): boolean;
        removeEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean): void;
        dispatchEvent(event: ZqEvent): boolean;
        toString(): string;
    }
}

declare module uniLib {
    interface DefaultConfig {
        login_url: string;
        login_url_test: string;
        config_url: string;
        upLoad_url: string;
        down_url: string;
        is_sandbox: number;
        platid: number;
        gameid: number;
        zoneid: number;
        log_level: number;
        yunva_appid: number;
        yunva_isTest: number;
        version: string;
        clientVersion: string;
        weixin: any;
        notice: any;
        title: string;
        desc: string;
        icon: string;
        pay_platid: string;
        reLoginUrl: string;
        qrcode_url: string;
    }
}

/**
 * 扩展组件接口
 */
declare module uniLib {
    interface IComponent {
    }
}

declare module uniLib {
    class RoomInfo {
        gameid: number;
        roomid: number;
        globalRoomId: number;
    }
    class IGameConfig extends Reflect {
        id: number;
        /**
         * 游戏ID
         */
        gameId: number;
        /**
         * 游戏文档类
         */
        gameDoc: string;
        /**
        * 游戏状态
        */
        status: number;
        /**
         * 游戏资源配置文件
         */
        gameResConfigUrl: string;
        /**
         * 游戏资源根目录
         */
        gameResRoot: string;
        /**
         * 游戏预加载组
         */
        preLoad: string;
        /**
         * 游戏名称
         */
        gameName: string;
        /**
         * 游戏介绍
         */
        gameDes: string;
        /**
         * 游戏代码URL
         */
        gameCodeUrl: string;
        /**
         * 游戏在大厅图标
         */
        gameIconUrl: string;
        /**
         * 游戏分享地址
         */
        gameShareUrl: string;
        /**
         * 游戏图标上的mark
         */
        markIconUrl: string;
        /**
        * 是否有选场
        */
        selectScene: number;
        /**
        * 皮肤配置
        */
        gameTheme: string;
        /**
        * 扩展字段
        */
        extData: any;
        /**
         * 是否显示返回按钮
         */
        showBack: boolean;
        /**
        * 游戏默认朝向
        */
        defaultOrientation: string;
        /**
         * 游戏是否为横屏模式
         */
        isLandscape: boolean;
        zoneInfo: Pmd.ZoneInfo;
        /**
         * 加载游戏使用的Loading
         */
        preloadUI: any;
        /**
         * 自动隐藏加载loading
         */
        preloadUIAutoHide: boolean;
        /**
        * 退出时是否销毁资源
        */
        destroyResOnExit: boolean;
        /**
         * 退出时需要销毁的资源
         */
        candestroyGrps: string[];
        /**
        * 是否体验币模式 true有体验币 false无体验币
        */
        hasTestChips: boolean;
        /**
        * 游戏分类 麻将游戏/扑克游戏
        */
        category: number;
        /**
        * 游戏状态分类 0直接进游戏场景 1只有选场  2即有选场又有选桌
        */
        gameType: number;
        /**
        * 带入的房间信息
        */
        roomInfo: RoomInfo;
        /**
        * 游戏进入所需的最小资源组
        */
        minResGroup: string;
        /**
        * 货币比例
        */
        currencyNum: number;
        /**
        * 货币单位
        */
        currency: string;
        /**
        * 是否允许充值,用户控制游戏支付界面的显示和隐藏
        */
        rechargeEnable: boolean;
        /**
         * 网关地址传递给游戏,使游戏不需要选区
         */
        gateWayUrl: string;
        /**
         * 游戏默认场景
         */
        defaultScene: string;
    }
}

declare module uniLib {
    /**
    * 场景接口
    */
    interface IGameDoc extends egret.DisplayObjectContainer {
        uiLayer: egret.DisplayObjectContainer;
        topLayer: egret.DisplayObjectContainer;
        effectLayer: egret.DisplayObjectContainer;
        mainUILayer: egret.DisplayObjectContainer;
        maskLayer: egret.DisplayObjectContainer;
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
        /**
         * 游戏预加载完成
         */
        preLoadEnd(): void;
        destroy(): void;
        resize(): void;
    }
}

declare module uniLib {
    /**
    * 单个资源加载项目
    */
    interface ILoadRes {
        /**
        * 资源组名称
        */
        groupName: string;
        /**
        * 资源组描述,在加载资源是显示
        */
        groupDes: string;
    }
}

declare module uniLib {
    /**
    * 场景接口
    */
    interface ILoading {
        /**
        * 设置加载进度
        */
        setProgress(loaded: any, total: any, desc?: any, resourceName?: any, force?: any): void;
        /**
         * 销毁操作
         */
        destroy(): void;
    }
}

declare module uniLib {
    interface IOrderInfo {
        /**
         * 第三方平台订单号
         */
        platOrder: string;
        /**
         * 游戏订单号
         */
        gameOrder: string;
        /**
         * 支付签名
         */
        sign: string;
        /**
         * 货币名称
         */
        currencyName: string;
        /**
         * 商品名称
         */
        goodName: string;
        /**
         * 商品单价
         */
        price: number;
        /**
         * 商品数量
         */
        count: number;
        /**
         * 充值游戏币数量
         */
        currency: number;
        /**
         * 第三方支付地址
         */
        payUrl: string;
        /**
        * 支付回调地址
        */
        noticeurl: string;
        /**
        * 商品ID(可选项,9g平台使用)
        */
        goodId: string;
        /**
         * 用户ID
         */
        uid: string;
        creatTime: number;
        payplatid: string;
    }
}

declare module uniLib {
    /**
    * 场景接口
    */
    interface IScene extends egret.DisplayObjectContainer {
        uiLayer: egret.DisplayObjectContainer;
        topLayer: egret.DisplayObjectContainer;
        effectLayer: egret.DisplayObjectContainer;
        mainUILayer: egret.DisplayObjectContainer;
        maskLayer: egret.DisplayObjectContainer;
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
        /**
         * 舞台大小变化时
         */
        resize(): void;
    }
}

declare module uniLib {
    /**
    * 任务事件
    */
    interface ITaskData {
        /**
        * 操作 uniLib.TaskEventEnum
        */
        action: number;
        /**
        * 限制条件
        */
        limit: number;
    }
}

declare module uniLib {
    /**
    * UI接口
    */
    interface IUI {
        /**
        * 更新UI数据
        */
        updateUIData(data?: any): void;
        /**
        * UI销毁方法
        */
        destroy(): void;
        /**
         * resize方法
         */
        resize(): void;
    }
}

declare module uniLib {
    /**
     * 自定义事件类
     */
    interface IUserEventData {
        /**
        * 事件子类型
        */
        tp: string;
        /**
        * 事件数据
        */
        data: any;
    }
}

declare module uniLib {
    class IUserInfo {
        uid: number;
        headUrl: string;
        nickName: string;
        gender: string;
        remainder: number;
        platId: number;
        subPlatId: string;
        bankChips: number;
        sumRecharge: number;
    }
}

interface WechatSignPackage {
    appid: string;
    nonceStr: string;
    timestamp: number;
    signature: string;
    url: string;
}

declare module uniLib {
    class CommonModelMgr {
        private static _self;
        constructor();
        static readonly Instance: CommonModelMgr;
        private _models;
        private addEvents();
        registerCommonModel(modelId: number, model: any, loadGroupName?: string): void;
        openCommonModel(modelId: number, openType?: number, param?: any, openFunc?: Function, thisObj?: any): any;
        showCommonUI(UIId: number, data?: any): any;
        getCommonUI(UIId: number, data?: any): any;
    }
}

declare module uniLib {
    /**
    * 网络管理
    */
    class NetMgr {
        static UID: number;
        static ZoneUID: string;
        static SID: string;
        static PlatUID: string;
        static PlatSession: string;
        static PlatToken: string;
        static PlatKey: string;
        static platTokenTimeOut: number;
        static LoginUrl: string;
        static http: HttpClient;
        static ws: JsonSocket;
        /**
         * 查询游戏区列表
         * @method uniLib.NetMgr.init
         * @param url {string} 登陆URL
         * @param gameID {Number} 游戏ID
         * @param zoneId {Number} 区服ID
         * @param onGetZoneList {Function} 登陆成功回调
         * @param onGetZoneListError {Function} 登陆失败回调
         * @param thisObj  当前对象。永远都this
         */
        static reQuestZoneList(gameID?: number, url?: string, onGetZoneList?: (zoneList: Pmd.ZoneInfoListLoginUserPmd_S) => void, onGetZoneListError?: Function, thisObj?: any): void;
        /**
         * 初始化平台网络连接
         * @method uniLib.NetMgr.init
         * @param url {string} 登陆URL
         * @param gameID {number} 游戏ID
         * @param zoneId {number} 区服ID null:自动选区 -1:不自动选区
         * 后续参数可选,推荐先初始化再使用h5platLogin进行登录
         * @param callBack {function} 登陆成功回调
         * @param loginFail {function} 登陆失败回调
         * @param thisObj  当前对象。永远都this
         */
        static init(url: string, gameID?: number, zoneId?: number, callBack?: Function, loginFail?: Function, thisObj?: any, gateway?: string): void;
        /**
         * 获取是否已经有token本地数据, TODO:待加入zoneid信息到token的获取
         * @param onGetToken
         * @param thisObj
         * @param platid
         * @param gameId
         * @param zoneid
         */
        static getPlatToken(onGetToken: Function, thisObj?: any, platid?: number, gameId?: number, zoneid?: number): void;
        /**
         * 登录游戏
         * @param zoneId
         * @param callBack
         * @param loginFail
         * @param thisObj
         */
        static h5platLogin(zoneId?: number, callBack?: Function, loginFail?: Function, thisObj?: any): void;
        /**
         * 初始化平台socket连接
         * @method uniLib.NetMgr.initSocket
         * @param onLogin {Function} 连接ws成功回调
         * @param onLoginFail {Function} 连接ws失败回调
         * @param chatMessage {Function} 聊天消息接收函数
         * @param thisObj  当前对象。永远都this
         * @param compress  数据压缩类型,当前支持3种:CompressUtils.FLATE, CompressUtils.GZIP, CompressUtils.ZLIB
         * @param encrypt 数据加密类型,当前支持2种：aes
         */
        static initSocket(onLogin?: Function, onLoginFail?: Function, thisObj?: any, compress?: string, encrypt?: string, encryptKey?: string, islobby?: boolean, reconnect_seq?: boolean, gatewayurl?: string): void;
        /**
         * 用户第三方平台uid
         */
        static getThirdPlatId(): any;
        static getIp(onGet: Function, thisObj: any, url?: string): void;
        static post(url: string, onBack: Function, thisObj: any): void;
        /**
         * 登出
         */
        static logout(): void;
        /**
         * 断开socket连接
         */
        static closeSocket(b?: boolean): void;
        /**
         * 发送短连接消息
         * @method uniLib.NetMgr.httpSend
         * @param msg {any} 消息内容
         * @param callback {function} 发送消息回调
         * @param compress {function} 数据压缩方式
         */
        static httpSend(msg: any, callback?: (response: any) => any, compress?: CompressType): void;
        /**
         * 发送长连接消息
         * @method uniLib.NetMgr.tcpSend
         * @param msg {any} 消息内容
         */
        static tcpSend(msg: any): void;
        static sendEcho(sec?: number): void;
        static setTickSec(sec?: number): void;
        static sendChatVo(chat: ChatMsgItemVo, pos?: number): void;
        /**
         * 发送聊天消息
         * @method uniLib.NetMgr.sendChat
         * @param txt {string} 聊天内容
         * @param name {显示名称} 聊天内容
         * @param pos {聊天位置} 公聊 私聊等
         */
        static sendChat(txt: string, name?: string, pos?: number): void;
        /**
         * 获取手机注册验证码
         * @param tel
         * @param randcode
         * @param callBack
         * @param thisObj
         * @param url
         */
        static GetPhoneCode(tel: string, randcode: string, callBack?: any, thisObj?: any, url?: string): void;
        /**
         * 手机验证码快速注册登录
         * @param tel
         * @param code
         * @param password
         * @param callBack
         * @param loginfail
         * @param thisObj
         * @param url
         * @param opType 0：注册 1:重置
         */
        static CodeLogin(tel: string, code: string, password?: string, parent?: number, opType?: number, callBack?: any, loginfail?: (response: any) => boolean, thisObj?: any, url?: string): void;
        /**
         * email快速注册登录
         */
        static emailLogin(email: string, password: string, invitees?: number, tel?: string, callBack?: any, loginfail?: (response: any) => boolean, thisObj?: any, url?: string): void;
        /**
         * 通过手机号登录
         * @param tel
         * @param pass
         * @param callBack
         * @param loginfail
         * @param thisObj
         * @param url
         */
        static LoginByTel(tel: string, pass: string, callBack?: any, loginfail?: (response: any) => boolean, thisObj?: any, url?: string): void;
        /**
         * 通过邮箱登录
         * @param tel
         * @param pass
         * @param callBack
         * @param loginfail
         * @param thisObj
         * @param url
         */
        static LoginByEmail(account: string, pass: string, callBack?: any, loginfail?: (response: any) => boolean, thisObj?: any, url?: string): void;
        static clearGateWay(): void;
        /**
         * 兼容邮箱手机登录
         */
        static LoginByAccount(account: string, pass: string, callBack?: any, loginfail?: (response: any) => boolean, thisObj?: any, url?: string): void;
        /**
         * 账号绑定
         * @param account
         * @param pass
         * @param callBack
         * @param loginfail
         * @param thisObj
         * @param url
         */
        static bindAccount(account: string, pass: string, callBack?: any, loginfail?: (response: any) => boolean, thisObj?: any, url?: string): void;
        static accountLogin(account: string, pass: string, callBack?: any, loginfail?: (response: any) => boolean, thisObj?: any, url?: string): void;
        static checkMsgTimeout(msec: number): boolean;
        static setMsgTimeout(sec: number, msg: string): boolean;
        /**
         * 获取token
         */
        static getToken(gameId?: number): any;
    }
    class ChatMsgItemVo {
        userId: string;
        type: number;
        headUrl: string;
        userName: string;
        msg: any;
    }
}

/// <reference path="../../../3party/includes/pay.d.ts" />
declare module uniLib {
    /**
    * 支付管理
    */
    class PayMgr {
        private static _self;
        isOpen: boolean;
        static readonly Instance: PayMgr;
        lastRechargeInfo: Pmd.CreatePlatOrderRequestSdkPmd_C;
        /**
         * 初始化支付平台
         * @param platId {number} 支付平台ID
         * @param callBack {Function} 初始化成功回调
         * @param thisObj  当前对象。永远都this
         */
        initPayPlatById(platId?: number, callBack?: any, thisObj?: any): void;
        private signPackage;
        initWechat(callBack?: any, thisObj?: any): void;
        private initWechatInfo(signTxt, callBack?, thisObj?);
        private getWeiXinConfig();
        /**
         * 打开或者跳转到平台支付
         * @param order {Cmd.RechargeChipsPlatOrderRet_S} 订单信息
         * @param callBack {Function} 支付成功回调函数
         * @param itemName {string} 商品描述
         * @param price {mumber} 商品价格
         * @param count {mumber} 购买商品数量 默认1个
         */
        pay(info: IOrderInfo, callBack?: any, thisObj?: any): void;
        private _lastOrder_S;
        payByPmd(pmd: Pmd.CreatePlatOrderReturnSdkPmd_S, callBack?: any, thisObj?: any, NetMgr?: any): void;
        private payCallBack(data);
        /**
         * 打开或者跳转到平台支付
         * @param order {Cmd.RechargeChipsPlatOrderRet_S} 订单信息
         * @param callBack {Function} 支付成功回调函数
         * @param itemName {string} 商品描述
         * @param price {mumber} 商品价格
         * @param count {mumber} 购买商品数量 默认1个
         */
        weChatPay(info: Pmd.CreatePlatOrderReturnSdkPmd_S, callBack?: any, thisObj?: any): void;
        private aibeiPay;
        private payAiBei(transId, redirecturl?, sign?, cpurl?, callBack?);
        private payWechat(sign, nonce_str, prepay_id, time);
    }
}

declare module uniLib {
    class PopUpMgr {
        static darkSpriteDic: any;
        static curPanel: any;
        private static _container;
        static popupDic: Object;
        static maskAlpha: number;
        /**
         * 弹出面板点击区域外时自动关闭
         */
        static outSideHide: boolean;
        /**
         * 初始化弹出层
         * @param container
         */
        static init(container?: egret.DisplayObjectContainer): void;
        /**
         *
         * @param panel 需要弹出的面板类或者实例
         * @param cotainer 面板所属容器,不传则会放在初始化的容器上，如果没有初始化则自动添加到当前场景的topLayer层
         * @param center 是否居中
         * @param modal 是否模态 true/false/number 为数字类型时表示遮罩的透明度
         * @param index 添加的深度 /boolean 点击区域外关闭
         * @param effectType 弹出效果
         * @param popUpWidth 弹出层宽度
         * @param popUpHeight 弹出层高度
         * @param panelParam 弹出类实例化需要传入的参数
         */
        static addPopUp(panel: any, cotainer?: egret.DisplayObjectContainer, center?: boolean, modal?: any, index?: any, effectType?: PopUpEffect, popUpWidth?: number, popUpHeight?: number, panelParam?: any): any;
        /**
        * 移除面板方法
        * @param panel       	面板
        * @param effectType     弹出效果,查询字典 PopUpEffect
        */
        static removePopUp(panel: any, effectType?: number): void;
        private static clearPopus();
        private static removePanel(panel, effectType?);
        /**
         * 是否已经弹出面板
         * @param panel
         */
        static hasPopup(panel: any): boolean;
        /**
         * 大小变化时统一通知打开的窗口大小变化
         */
        static resize(): void;
    }
    /**
   * 弹出效果
   */
    enum PopUpEffect {
        /**
        * 没有动画
        */
        NOMAL = 0,
        /**
        * 从中间轻微弹出
        */
        CENTER = 1,
        /**
        * 从中间猛烈弹出
        */
        CENTER_S = 2,
        /**
        * 从左向右
        */
        LEFT = 3,
        /**
        * 从右向左
        */
        RIGHT = 4,
        /**
        * 从上到下
        */
        TOP = 5,
        /**
        * 从下到上
        */
        BOTTOM = 6,
    }
}

declare module uniLib {
    /**
    * 资源加载管理(单例)
    */
    class ResLoadMgr extends egret.EventDispatcher {
        private static _self;
        /**
         * 加载进度界面
         */
        private _loadingMap;
        private _loadingClass;
        private _loadSucc;
        private _loadError;
        private _autoHide;
        private _thisObj;
        private _curLoadingId;
        static readonly instance: ResLoadMgr;
        private initLoadingUI();
        /**
         * 加载多个资源组
         */
        loadGrps(grpNames: string[], loadSucc?: Function, loadError?: Function, thisObj?: any, loadIngClass?: any, autoHideLoadUI?: boolean, isprocess?: boolean, mustResList?: any): string;
        /**
         * 本次是否取消加载
         */
        private _isCacelLoading;
        /**
         * 当前正在加载的资源组
         */
        curLoadingGrp: string;
        /**
         * 加载多个资源
         * @param groups
         * @param loadSucc
         * @param loadError
         * @param thisObj
         * @param loadIngClass
         */
        loadReses(resNames: string[], loadSucc?: Function, loadError?: Function, thisObj?: any, loadIngClass?: any, autoHideLoadUI?: boolean, isprocess?: boolean, mustResList?: any): string;
        /**
         * 取消加载资源
         */
        cacelLoad(grpName?: string): void;
        /**
         * 加载资源组
         */
        load(groupName: string, loadSucc?: Function, loadError?: Function, thisObj?: any, loadIngClass?: any, autoHideLoadUI?: boolean, isprocess?: boolean, mustResList?: any): void;
        private _currentLoadIndex;
        private _currentLoadArr;
        /**
         * 加载多个资源组(暂未实现完)
         * @param groups
         * @param loadSucc
         * @param loadError
         * @param thisObj
         * @param loadIngClass
         */
        loadArr(groups: ILoadRes[], loadSucc?: Function, loadError?: Function, thisObj?: any, loadIngClass?: any): void;
        /**
         * 资源组加载完成
         */
        private onUniLibResLoadComplete(event);
        /**
        * 资源组加载出错
        */
        private onUniLibResLoadError(event);
        private removeLoadDic(grpName);
        /**
         * 资源组加载进度
         */
        private onUniLibResProgress(event);
        /**
         * 加载资源配置
         */
        loadConfig(url: string, resRoot: string, callBack?: Function, thisObj?: any): void;
        private loadedCfg(data);
        private removeRefrence();
    }
}

declare module uniLib {
    /**
    * 场景管理（单例）
    */
    class SceneMgr {
        private static _self;
        private sceneLayer;
        static readonly instance: SceneMgr;
        init(scene: any): void;
        /**
         * 当前场景
         */
        private _currentScene;
        /**
         * 上一个场景
         */
        private _lastScene;
        /**
         * 改变当前场景
         *
         *
         * island 是否横屏模式
         */
        changeScene(sceneClass: any, params?: any, bMode?: boolean, island?: boolean): any;
        /**
         * 获取当前场景
         */
        readonly currentScene: IScene;
        /**
         * 新的场景加载完成后关闭上一个场景
         */
        lastSceneLeave(): void;
    }
}

declare module uniLib {
    /**
    * 音频管理
    */
    class SoundMgr {
        private static _instance;
        private _soundRes;
        private _musicVolume;
        private _soundVolume;
        private _musicOpen;
        private _soundOpen;
        constructor();
        static readonly instance: SoundMgr;
        onActive(e: egret.Event): void;
        onDeActive(e: egret.Event): void;
        private _activeSound;
        private _activeSoundLoop;
        private _soundPause;
        soundPause: boolean;
        /**
         * 播放音效
         * @param soundName
         * @param loops
         * @param position
         * @param playEndBack
         * @param thisObj
         */
        playSound(soundName: string, loops?: number, position?: number, playEndBack?: Function, thisObj?: any): egret.SoundChannel;
        stopSounds(): void;
        stopSound(soundName: string): void;
        private static isFirst;
        private loadTimeDic;
        private play(soundName, loops?, position?, asyn?, isMusic?);
        randomSounds(soundsName?: string[]): void;
        private _bgMusics;
        private _currentMusicIndex;
        private _currentMusicChanel;
        playBgMusic(musics: string[], position?: number): void;
        private onMusicEnd(e?);
        private resetCurrentMusic(channel, musicName);
        stopBgMusic(): void;
        pauseBgMusic(): void;
        resumeBgMusic(): void;
        isPlayingBgMusic(): boolean;
        isSoundPlaying(soundName: string): boolean;
        musicVolume: number;
        soundVolume: number;
        musicOpen: boolean;
        private static SOUND_TOGGLE;
        private static MUSIC_TOGGLE;
        soundOpen: boolean;
    }
}

/**
 * StatistcsMgr
 * 统计管理
 */
declare module uniLib {
    class StatistcsMgr extends egret.EventDispatcher {
        static PING: string;
        static SENDANDRECEIVE: string;
        static SENDEDANDRECEIVED: string;
        static SOCKETSTATUS: string;
        static _self: StatistcsMgr;
        sendedKb: number;
        sendB: number;
        receiveKb: number;
        receiveB: number;
        secondTimer: egret.Timer;
        constructor();
        static readonly instance: StatistcsMgr;
        init(): void;
        /**
         * 每秒流量值
         */
        private dispatchSecondEvent(evt);
        /**
         * 请求ping值
         */
        private requestPing();
        /**
         * socket连接状态
         */
        socketStatus: string;
        /**
        * 计算字符串所占的内存字节数，默认使用UTF-8的编码方式计算，也可制定为UTF-16
        * UTF-8 是一种可变长度的 Unicode 编码格式，使用一至四个字节为每个字符编码
        *
        * 000000 - 00007F(128个代码)      0zzzzzzz(00-7F)              一个字节
        * 000080 - 0007FF(1920个代码)     110yyyyy(C0-DF) 10zzzzzz(80-BF)      两个字节
        * 000800 - 00D7FF
         00E000 - 00FFFF(61440个代码)    1110xxxx(E0-EF) 10yyyyyy 10zzzzzz       三个字节
        * 010000 - 10FFFF(1048576个代码)  11110www(F0-F7) 10xxxxxx 10yyyyyy 10zzzzzz  四个字节
        *
        * 注: Unicode在范围 D800-DFFF 中不存在任何字符
        * {@link http://zh.wikipedia.org/wiki/UTF-8}
        *
        * UTF-16 大部分使用两个字节编码，编码超出 65535 的使用四个字节
        * 000000 - 00FFFF  两个字节
        * 010000 - 10FFFF  四个字节
        *
        * {@link http://zh.wikipedia.org/wiki/UTF-16}
        * @param  {String} str
        * @param  {String} charset utf-8, utf-16
        * @return {Number}
        */
        messageCharStatistics(str: string, type: string, charset?: string): void;
        destroy(): void;
    }
}
declare module Pmd {
    function OnSetPingTimeNullUserPmd_CS(rev: Pmd.SetPingTimeNullUserPmd_CS): void;
}

declare module uniLib {
    /**
    * UI管理
    */
    class UIMgr {
        private static _self;
        static readonly instance: UIMgr;
        /**
        * 默认Loading显示
        */
        defaultLoadingView: any;
        DefaultLoading: any;
        /**
        * ui字典
        */
        private _uis;
        private _loadings;
        private _effects;
        /**
         * 显示UI
         * @param ui 显示类
         * @param data 数据
         * @param cache 是否缓存
         */
        showUI(ui: any, data?: any, parent?: any, cache?: boolean, drag?: boolean, x?: number, y?: number): any;
        private startPoint;
        /**pan*/
        private _commonLoadUI;
        commonLoadUI: any;
        private _tipsLoadUI;
        tipsLoadUI: any;
        /**
         * 显示Loading
         */
        showProcessBar(loadClass?: any, loaded?: any, total?: number, desc?: string, resourceName?: string, force?: boolean, container?: egret.DisplayObjectContainer): void;
        showLoadingParam(loadClass?: any, param?: any, container?: egret.DisplayObjectContainer): void;
        showLoadingTimeout(loadClass?: any, key?: string, timeout_msec?: number, desc?: string): void;
        private showLoading(loadClass?, loaded?, total?, desc?, resourceName?, force?, uiName?, container?, loadingParam?);
        /**
         * 显示例子效果
         * @param parName {string} 粒子名称
         * @param duration {number} 播放时间
         * @param starX {number} 开始位置x
         * @param starY {number} 开始位置y
         */
        showParticle(parName: string, duration?: number, starX?: number, starY?: number): any;
        hideLoading(loadClass?: any, uiName?: string, destroy?: boolean, rm_now?: boolean): void;
        hideUI(ui: any, destroy?: boolean): void;
        destroyUI(ui: any): void;
        clearOldSceneUis(): void;
    }
}

declare module uniLib {
    interface IType {
        GetType(): string;
    }
    interface IServerError {
        errno: any;
    }
    function checkServerReturnCodeError(recv: any, errorObj?: any): boolean;
    function doServerReturnCodeError(recv: any, self?: any): boolean;
}

/// <reference path="Common.d.ts" />
declare module uniLib {
    /**
     * 基于`HTTP`的json通信
     */
    class HttpClient {
        private ZoneList;
        LoginUrl: string;
        GatewayUrl: string;
        GameID: number;
        ZoneID: number;
        Debug: boolean;
        /**
         * 消息响应函数。
         * 默认响应`Module?.OnMessage(data)`函数
         *     其中`Module`为消息所在的module，支持嵌套
         *     `Message`为消息名称
         *     data为收到消息的data字段
         * @example 可解析的消息格式类似
         * ```
         * {
         *     "do" : "echo",			// 响应消息的类型/名称
         *     "errno" : "0",			// 错误标记
         *     "data" : {				// 消息内容
         *         "message" : "hello 测试",
         *         "errno" : "0"
         *     },
         *     "gameid" : 110,
         *     "zoneid" : 300,
         *     "uid" : "514365",
         *     "st" : 1431593730
         * }
         * ```
         */
        private OnResponse;
        constructor();
        /**
         * 初始化登陆信息
         */
        init(url: string, gameID: number, zoneId?: number): void;
        initCallBack(callback?: Function, loginFail?: Function, obj?: any): void;
        private _loginCallBackFunction;
        private _loginFail;
        private _loginCallBackObj;
        private platInfo;
        /**
         * 登陆平台
         */
        h5platLogin(zoneId?: number, callback?: Function, loginFail?: Function, obj?: any): void;
        private onGetZoneList(data);
        /**
         * 登陆验证
         * @param callback: 登陆回调
         */
        private login(msg);
        private _resq;
        /**
         * 底层消息发送
         * @param url: 目标地址
         * @param method: 发送消息的`do`字段值，标识消息行为
         * @param message: 消息内容
         * @param callback: 消息响应函数，缺省采用`OnResponse`
         */
        sendTo(url: string, method: string, message: any, callback: (response: any) => boolean, compress?: CompressType): void;
        static _reconnectTimes: number;
        private onHttpComplete(msg, callback, compress?);
        reLogin(): void;
        private onHttpError(event?, data?);
        /**
         * 登陆
         * @param callback: 登陆返回
         */
        private initLogin(loginType, msg, compress?);
        private loginSuccess(data);
        /**
        * 查询区列表
        *
        **/
        requestZoneList(gameId?: number, callback?: Function, obj?: any, compress?: CompressType): void;
        reSelectZone(callBack?: Function, thisObj?: any): void;
        selectZone(zoneId?: number, callBack?: Function, thisObj?: any, compress?: CompressType): void;
        /**
         * 高级消息发送
         * @param method: 发送消息的`do`字段值，标识消息行为
         * @param message: 消息内容
         * @param callback: 消息响应函数，缺省采用`OnResponse`
         */
        sendMessage(method: string, message: any, callback?: (response: any) => boolean, compress?: CompressType, url?: string): void;
        private checkingGateWayUrl;
        /**
         * 应用层消息发送
         * @param message: protobuf生成消息
         * @param callback: 消息响应函数，缺省采用`OnResponse`对应的分发方式
         */
        send(message: IType, callback?: (recv: IType) => any, compress?: CompressType, url?: string): void;
        /**
         * 应用层消息直接发送给自己并进行响应，通常用于本地模拟或调试
         * @param message: protobuf生成消息
         * @param callback: 消息响应函数，缺省采用`OnResponse`对应的分发方式
         */
        sendToMe(message: IType, callback?: (recv: IType) => boolean): void;
        cacheLoginInfo(info: Pmd.PlatTokenLoginReturn): boolean;
        cachePhoneLoginInfo(info: Pmd.UserRequestPlatTokenLoginOkLoginUserPmd_S, platid: number): void;
        private delLocalStoryge();
        /**
         * @remark http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript/8809472#8809472
         */
        private generateUUID();
    }
}

declare module uniLib {
    class HttpRequest {
        private _xhr;
        url: string;
        private _call;
        private _err;
        private _this;
        private isOriType;
        constructor(callBack?: Function, err?: Function, thisObj?: any);
        open(url: string, data?: any, isFormData?: boolean): void;
        private _dtype;
        dataFormat: string;
        private onCallBack(e?);
        private onHttpError(e?);
        /**
         * 发送数据
         * @param data
         */
        send(data?: any): void;
        destroy(): void;
    }
}

declare module uniLib {
    class LoopbackSocket {
        constructor();
    }
    class MyWebSocket {
        readonly url: string;
        private _url;
        constructor(url: string, typ?: any);
        SetBinarytype(binarytype: SockByinaryType): void;
        sockType: SockType;
        socket: any;
    }
    /**
      * 基于`WebSocket`的`json`通信
      */
    class JsonSocket {
        wsurl: string;
        logName: string;
        mysocket: MyWebSocket;
        private getSocket();
        checkNeedReconnect(): void;
        private sendCache;
        private recvCache;
        loginData: Pmd.UserLoginTokenLoginUserPmd_C;
        socketLoginSuc: Function;
        socketLoginFail: Function;
        socketLoginObj: any;
        connectingTimeout: any;
        private isOpenCompress;
        lastEchoTime: number;
        reconnectDelay: number;
        isConnected: number;
        private isConnecting;
        private needReconnect;
        sockType: SockType;
        /**
         * 断线重连尝试次数
         */
        private _reconnectTimes;
        private _maxCeconnectTimes;
        resetReconnectNum(): void;
        pauseReconnect(): void;
        /**
         * 登录socket验证
         *
         */
        login(onLogin?: Function, onLoginFail?: Function, thisObj?: any): void;
        private connect();
        private _active;
        private _active_reconnect;
        private _deactiveTime;
        private _areconnect;
        private onDeactive(e);
        /**
         * 显示Loading
         */
        private showRecnectTip();
        private onActive(e);
        private timerActive;
        private onSocketOpen();
        /**
        * 心跳检测时间
        */
        private tickSec;
        private msgTimeoutMSec;
        setTickSec(sec?: number): void;
        /**
        * 心跳检测超时次数
        */
        private tickTimes;
        private onTickActive();
        setMsgTimeout(sec: number, msg: string): boolean;
        private sockSend(data);
        private parseData(data);
        private uncompressData(data);
        lastRecvTime: number;
        private onReceiveMessage(e?);
        private onSocketClose(e?);
        private onCloseConnect();
        private onSocketError(e?);
        reConnect(): boolean;
        private lastseq;
        private gameId;
        private zoneId;
        private isLobby;
        /**
         * 平台专用socket
         *
         */
        constructor(url: string, gameId?: number, zoneId?: number, isLobby?: boolean);
        log(message?: any, ...optionalParams: any[]): void;
        error(message?: any, ...optionalParams: any[]): void;
        warn(message?: any, ...optionalParams: any[]): void;
        info(message?: any, ...optionalParams: any[]): void;
        private static GatewayWrapperName;
        private dispatch(message);
        sendTimeOut(message: any, loopback?: boolean): void;
        send(message: any, loopback?: boolean): void;
        sendPlat(message: any, loopback?: boolean): void;
        sendEcho(): void;
        close(needreconnect?: boolean): void;
    }
}
declare enum SockType {
    NORMAL = 0,
    EGRET = 1,
    LOOPBACK = 2,
}
declare enum SockByinaryType {
    STRING = 0,
    BINARY = 1,
}
declare module Pmd {
    /**
     * 聊天消息
     */
    function OnCommonChatUserPmd_CS(rev: Pmd.CommonChatUserPmd_CS): void;
    /**
     * 私聊消息
     */
    function OnPrivateChatUserPmd_CS(rev: Pmd.PrivateChatUserPmd_CS): void;
    /**
     * GM命令查询
     */
    function OnGMCommandListChatUserPmd_S(rev: Pmd.GMCommandListChatUserPmd_S): void;
    function OnMessageBoxLoginUserPmd_S(rev: Pmd.MessageBoxLoginUserPmd_S): void;
}

/**
 * 配置对象
 */
declare module uniLib {
    class AppConfig {
        login_url: string;
        config_url: string;
        is_sanbox: boolean;
        gameid: number;
        zoneid: number;
        platid: number;
        pay_platid: number;
        version: string;
        clientVersion: string;
        log_level: number;
        notice: any;
        weixin: any;
    }
}

/**
 * 扩展数据
 */
declare class ExtData {
    /**
    * 邀请者UID
    */
    inviter: string;
}

declare module uniLib {
    /**
     * 扩展数据
     */
    class ShareData {
        title: string;
        desc: string;
        imgUrl: string;
        link: string;
    }
}

declare module uniLib {
    /**
    * 用户信息
    */
    class UserInfo {
        static data: any;
        /**
         * 用户ID
         */
        static uid: number;
        /**
         * 用户ID
         */
        static nickName: string;
        /**
         * 所属平台ID
         */
        static platId: number;
        /**
         * 用户ID
         */
        static subPlatId: string;
        /**
         * 用户筹码
         */
        private static _chips;
        /**
         * 金币  ---  捕鱼大厅金币<捕鱼大厅专用>
         */
        private static _goldChips;
        /**
         * 体验币 ---  捕鱼大厅体验币<捕鱼大厅专用>
         */
        private static _freeChips;
        /**
         * 用户头像地址
         */
        private static _headUrl;
        /**
         * 性别
         */
        static gender: string;
        /**
         * email
         */
        static email: string;
        /**
        * 个性签名
        */
        static signature: string;
        /**
        * 奖券数量
        */
        static _giftCoupon: number;
        /**
         * 用户等级
         */
        static level: number;
        /**
        * 在线礼包时间 为-1时没有礼包可领
        */
        private static _ol_Time;
        /**
        * 银行存款
        */
        static _bankChips: number;
        static sumRecharge: number;
        static total_ol_Time: number;
        /**
        * 房卡
        */
        static _fangka: number;
        /**
         * 钻石
         */
        static _diamond: number;
        /**
        * 在线礼包时间
        */
        /**
        * 在线礼包时间
        */
        static ol_Time: number;
        static fangka: number;
        static diamond: number;
        /**
         * 是否显示滑动： 0:不显示; 1：右滑; 2：左滑
         */
        static slipStatus: number;
        static init(info: any, initGold?: boolean): void;
        /**
         * VIP等级
         */
        static vipLevel: number;
        static chips: number;
        /**捕鱼大厅金币 */
        /**捕鱼大厅金币 */
        static goldChips: number;
        /**
         * 体验币
         */
        /**
         * 体验币
         */
        static freeChips: number;
        /**
         * 头像
         */
        /**
        * 头像
        */
        static headUrl: string;
        /**
         * 第三方平台积分余额
         */
        private static _platPoint;
        static platPoint: number;
        static bankChips: number;
        static nickname: string;
        /**
        *获取奖券数量
        */
        static giftCoupon: number;
    }
}

declare module game {
    class WXShareBackVo {
        returnCode: number;
        constructor();
    }
}

declare module uniLib {
    class WXShareVo {
        shareWay: number;
        title: string;
        description: string;
        shareImageUrl: string;
        webpageUrl: string;
        shareImageData: string;
        constructor();
    }
}

declare module uniLib {
    /**
    * 浏览器工具
    */
    class BrowersUtils {
        /**
         * 刷新页面
         */
        static reload(): void;
        static redirect(url: string): void;
        static isLocal(): boolean;
        /**
         * 判断对象是否为Null
         */
        isNull(val: any): boolean;
        /**
         * 是否在微信中打开
         */
        static isWechat(): boolean;
        /**
         * 获取xhr
         */
        static getXHR(): any;
        /**
         * 是否PC
         */
        static isPC(): boolean;
        static isAndroid(): boolean;
        /**
         * 根据参数名获取请求get参数
         * @param name {string} 参数名
         */
        static GetRequest(name: string, str?: string): any;
        static GetRequests(s?: string): any;
        static requestFullScreen(): void;
        static exitFullscreen(): void;
        private static inExtData;
        static extData: ExtData;
        /**
         * 分享数据更新
         * @param key
         * @param value
         * @param setShare 是否立即设置分享,默认 否
         */
        static setExtData(key: string, value: any, setShare?: boolean): void;
        /**
         * 获取扩展数据字段
         * @param key
         */
        static getExtData(key?: string): any;
        /**
         * 重置分享内容
         */
        static resetShareInfo(): void;
        /**
         * 设置分享
         * @param img icon地址
         * @param title 分享标题
         * @param desc 分享描述
         * @param key 分享扩展数据字段
         * @param value 分享扩展数据内容
         */
        static setShareInfo(img?: string, title?: string, desc?: string, key?: string, value?: any): void;
        /**
         * 根据参数名获取cookie值
         * @param name {string} 参数名
         */
        static getCookie(name: any): string;
        /**
         * 根据参数名设置cookie值
         * @param name {string} 参数名
         * @param name {any} cookie过期时间
         */
        static setCookie(name: string, value: any, tm?: number): void;
        /**
         * 根据参数名清除cookie值
         * @param name {string} 参数名
         */
        static delCookie(name?: string): void;
        /**
         * 获取当前url
         */
        static getLocationUrl(): string;
        /**
         * 获取平台库目录
         */
        static getPlatLibDir(): string;
        /**
         * 跳转到目标地址
         * @param url {string} 地址
         */
        static redirectUrl(url: string): void;
        /**
         * 跳转到目标地址
         * @param url {string} 地址
         */
        static parentRedirectUrl(url: string): void;
        /**
         * 当前浏览器类型
         */
        static browersType(): string;
        /**
         * 当前平台类型
         */
        static platformType(): string;
        staticisVertical(): boolean;
        static LoadJses(arr: any[], callBack?: Function, thisObj?: any): void;
        static removeJs(id: string): void;
        private static _downTryCount;
        /**
         * 加载JS脚本
         * @param id {string} 元素id值
         * @param fileUrl {string} 文件路径
         * @param callBack {Function} 加载成功回调
         * @param obj this对象
         */
        static LoadJS(id: string, fileUrl: any, loaded?: any, loadErr?: Function, obj?: any): void;
        static loadNative(loadUrl: string, localUrl: string, loaded: any, loadErr: any, obj: any, id: any): void;
    }
}

/// <reference path="../../../3party/includes/pako.d.ts" />
declare module uniLib {
    /**
    * 压缩工具
    */
    class CompressUtil {
        static compressStr: string[];
        /**
         * 根据类型初始化压缩库 暂时不用传参数
         */
        static init(type?: CompressType, onLoaded?: Function, thisObj?: any): void;
        /**
         * 压缩方法
         * @param data {string} 需要压缩的数据
         * @param compressType {string} 压缩类型
         */
        static compressByType(data: any, compressType: CompressType): any;
        /**
         * 解压方法
         * @param data {string} 需要解压的数据
         * @param compressType {string} 解压类型
         */
        static uncompressByType(data: any, compressType: CompressType): any;
        static stringToUint(st: any): Uint8Array;
        private static uintToString(uintArray);
        private static char2buf(str);
        private static buf2char(buf);
        static Utf8ArrayToStr(array: any): any;
        static stringToArray(str: any, array: any): any;
        private static arrayLikeToArray(arrayFrom, arrayTo);
        private static stringToCodePoints(string);
        /**
         * @private
         * UTF-8 Encoding/Decoding
         */
        static encodeUTF8(str: string): Uint8Array;
        private static b64pad;
        static base64encode(input: any): string;
        static base64decode(str: any): any;
    }
    enum CompressType {
        NONE = 0,
        FLATE = 1,
        ZLIB = 2,
        GZIP = 3,
        LZW = 4,
    }
}

declare module uniLib {
    class ConfigUtils {
        private static _appConfig;
        static readonly appConfig: uniLib.AppConfig;
        static initAppConfig(cfg: any): uniLib.AppConfig;
    }
}

declare module uniLib {
    enum LOGLEVEL {
        DEBUG = 0,
        INFO = 1,
        WARN = 2,
        ERROR = 3,
        DEBUG_SERVER = 4,
        INFO_SERVER = 5,
        WARN_SERVER = 6,
        ERROR_SERVER = 7,
    }
    /**
     * 控制台打印管理
     */
    class Console {
        /**
         * 是否是开发模式
         */
        static isDevMode: boolean;
        private static err_rqst;
        private static LOG_LEVEL_STR;
        /**
         * 日志级别
         */
        private static LogLevel;
        static setLogLevel(level: LOGLEVEL): void;
        static init(b: boolean, logLevel?: LOGLEVEL): void;
        private static logToServer(level, str, ...errorMessage);
        static getLocalLevel(level: LOGLEVEL): LOGLEVEL;
        static log(message?: any, ...optionalParams: any[]): void;
        static readonly logEnable: boolean;
        static debug(message?: any, ...optionalParams: any[]): void;
        static readonly debugEnable: boolean;
        static info(message?: any, ...optionalParams: any[]): void;
        static readonly infoEnable: boolean;
        static warn(message?: any, ...optionalParams: any[]): void;
        static readonly warnEnable: boolean;
        static error(message?: any, ...optionalParams: any[]): void;
        static readonly errorEnable: boolean;
    }
}

declare module uniLib {
    function getDefinitionByName(name: string): any;
    function hasDefinition(name: string): boolean;
    function test(name: string): void;
    function delDefinitionByName(name: string): void;
    function getQualifiedSuperclassName(value: any): any;
    function getQualifiedClassName(value: any): any;
}

declare module uniLib {
    /**
     * 设备API
     */
    class DeviceUtils {
        /**
         * 调用手机震动
         * @param time 震动时间
         */
        static vibrate(time?: number): void;
        private static srcImg;
        static uploadFile(file: any): void;
        static traverseFiles(files: any): void;
        /**
         * 调用摄像头
         * @param srcImg
         */
        static fileUpload(srcImg: any): void;
        static getMic(): void;
        static getScreen(): void;
        static callPhone(telNum: number): void;
        static sendMessage(telNum: number): void;
        static getCurUrl(): string;
        static curAngle: number;
    }
}

declare module uniLib {
    class DisplayUtils {
        /**
         * 创建资源
         */
        static createBitmapByName(keyName: string): egret.Bitmap;
        /**
         * 创建动画
         * @param groupName
         * @param keyName
         */
        static createMovieClicp(groupName: string, keyName?: string): egret.MovieClip;
        /**
         * 创建矩形
         * @param alpha
         * @param w
         * @param h
         * @param color
         */
        static createMask(alpha?: number, w?: number, h?: number, color?: number): egret.Sprite;
        /**
         * 创建矩形
         * @param alpha
         * @param w
         * @param h
         * @param color
         */
        static createShape(alpha?: number, w?: number, h?: number, color?: number): egret.Shape;
        /**
         * 创建圆形
         */
        static createCircle(alpha?: number, r?: number, color?: number): egret.Sprite;
        /**
         * 创建粒子
         * @param keyName
         */
        static createParticle(keyName: string): any;
        /**
         * 创建DragonBones显示对象
         */
        static createDragonBonesDisplay(dragonJson: string, json: string, png?: string, bones?: string, cache?: number): any;
        private static ticketStarted;
        /**
         * 运行龙骨动画
         * @param animationName {string} 指定播放的动画名称.
         * @param playTimes {number} 动画播放次数(0:循环播放, >=1:播放次数, NaN:使用动画数据中的播放时间), 默认值：NaN
         * @returns {AnimationState} 动画播放状态实例
         *
         */
        static runDragonBonesArmature(armature: any, animationName: string, playTimes?: number, isPlay?: boolean): void;
        /**
         * 删除龙骨动画
         */
        static destoryDragonBonesArmature(armature: any, animationName: string): void;
        /**
         * 文本资源
         */
        static createTextLabel(color?: number, align?: string, txt?: string, size?: number, width?: number, height?: number, strokeColor?: number, stroke?: number, x?: number, y?: number, rotation?: number, skewX?: number): egret.TextField;
        /**
         * 从父移除
         * @param obj
         */
        static removeFromParent(obj: egret.DisplayObject): void;
        /**
         * 从父移除
         * @param obj
         */
        static getChildIndex(obj: egret.DisplayObject): number;
        /**
        * 移除显示容器中的所有子集但不包括自己
        * @param disContainer
        */
        static removeAllChildren(disContainer: egret.DisplayObjectContainer): void;
        /**
         * 截屏
         * @param obj
         * @param rect
         */
        static catchScreen(obj: egret.DisplayObject, rect?: egret.Rectangle): string;
        /**
         * 截屏
         * @param obj
         * @param rect
         */
        static catchScreenToTex(obj: egret.DisplayObject, rect?: egret.Rectangle, scale?: number): egret.RenderTexture;
        static lightArea(area: egret.DisplayObject, maskAlpha?: number): egret.Bitmap;
        /**
         * 播放Tween动画组,增加循环播放方式
         */
        static playTweenGroup(target: egret.tween.TweenGroup, isLoop: boolean): void;
        /**
         * 停止时还原默认不循环播放
         */
        static stopTweenGroup(target: egret.tween.TweenGroup): void;
    }
}

declare module uniLib {
    /**
     * 龙骨动画类型
     */
    class DragonType {
        static MovieClip: string;
        static ARMATURE: string;
    }
    /**
     * 管理龙骨动画工具类
     */
    class DragonUtils {
        constructor();
        private static fastDragonGroup;
        private static fastDragonKeyGroup;
        /**
         * 创建DragonBones极速模式 dragbone 5.0以上版本
         */
        static createFastDragonBones(dragoncfg: string, png?: string, bones?: string, groupName?: string, cache?: number): any;
        /**
         * @language zh_CN
         * 显示龙骨动画;
         * @param frameName 	龙骨动画组名
         * @param mcName 		动画名
         * @param armature		动画类型 DragonType.MovieClip | DragonType.ARMATURE
         * @param x 			位置 x
         * @param y 			位置 y
         * @param container 	动画添加到的显示容器
         * @param playTimes		播放次数
         * @param timeScale 	播放速度
         * @param key			动画唯一key，方便通过Key移除动画文件
         */
        static showFastDragon(frameName?: string, mcName?: string, armature?: string, x?: number, y?: number, container?: any, playTimes?: number, timeScale?: number, key?: string): dragonBones.Movie;
        /**
         * 通过容器移除龙骨动画
         * @container 	容器
         * @mcName 		动画名称
         * @key			动画唯一标示
         */
        static removeFastDragonbyContainer(container: egret.DisplayObject, mcName?: string, key?: string): void;
        /**
         * 通过龙骨动画文件移除龙骨动画
         * @frameName 	文件名
         * @mcName 		动画名称
         * @key			动画唯一标示
         */
        static removeFastDragonByDragonName(frameName?: string, mcName?: string, key?: string): void;
        /**
         * 通过key来移动龙骨
         */
        static removeFastDragonByKey(key: string): void;
        private static removeDragonFromDic(dic, mcName?, key?);
    }
}

declare module uniLib {
    class EffectUtils {
        private static rotationArr;
        static rotationEffect(obj: any, time?: number): void;
        static removeRotationEffect(obj: any): void;
        static blinkEffect(obj: any, interval?: number): void;
        static shakeObj(obj: any): void;
        static shakeScreen(panel: any, effectType?: number): void;
        /**
        * str             提示内容
        * effectType      动画类型 1：从下到上弹出 2：从左至右弹出 3：从右至左弹出 4：从中间弹出渐渐消失 5：从大变小 等等
        * isWarning       是否是警告，警告是红色
        */
        static showTips(str?: string, effectType?: number, isWarning?: boolean): void;
        private static isPlayEffectPlay;
        /**
        * 给显示对象增加特效
        * obj           对象
        * cartoonType   动画类型 1:【可爱】按下变小，放开弹大 2:按下变小，放开轻微弹大 3：按下变小，放开变大
        */
        static playEffect(obj: any, cartoonType?: number): void;
        /**
        * 给显示对象增加持续放大特效
        * obj           对象
        */
        static playScaleEffect(obj: any): void;
        /**
        * 显示对象上线浮动特效
        * obj           对象
        * time          浮动时间 毫秒
        * space         浮动高度
        * todo          多个对象跳动
        */
        static flyObj(obj: any, time: any, space?: number): void;
        /**
        * 显示对象摇头特效
        * obj           对象
        * time          浮动时间 毫秒
        * space         摇头幅度
        * todo          多个对象摇头
        * 注意：需要将对象的注册点位置：0.5,1
        */
        static rockObj(obj: any, time: any, space?: number): void;
        /**
        * 文字打字机效果
        * obj           文本对象
        * content       文字
        * interval      打字间隔 毫秒
        */
        static typerEffect(obj: any, content?: string, interval?: number): void;
    }
}

declare module uniLib {
    class FileUtils {
        static fileUploadUrl: string;
        static base64FileUploadUrl: string;
        static dataURLtoBlob(dataurl: any): Blob;
        /**
         * 通过本地图片url上传图片
         * @param fileUrl
         * @param callBack
         * @param thisObj
         */
        static upLoadFileByUrl(fileUrl: string, callBack?: Function, thisObj?: any): void;
        /**
         * 以文件格式上传base64格式的图片
         * @param dataurl base64图片
         * @param callBack
         * @param thisObj
         * @param filename
         */
        static upLoadBase64File(dataurl: string, callBack?: Function, thisObj?: any, filename?: string): void;
        /**
         * 上传base64格式的图片
         * @param dataurl base64图片
         * @param callBack
         * @param thisObj
         * @param filename
         */
        static upLoadBase64(dataurl: string, callBack?: Function, thisObj?: any, filename?: string): void;
        /**
         * 上传File
         * @param file
         * @param callBack
         * @param thisObj
         */
        static upLoadFile(file: any, callBack?: Function, thisObj?: any): void;
    }
}

declare module uniLib {
    class GameModuleUtils {
        /**
         * 检查是否加载了定义
         * @url     通过url是否加载判断
         * @docCls 检查文档类是否存在直接判断
         */
        static checkJsIsExist(url: string, docCls?: string): boolean;
        static isLobbyMode(): boolean;
        /**
         * 默认本地文件夹路径
         */
        static gameNativeFolder: string;
        /**
         * 游戏远程加载方式使用的地址
         */
        static gameRemotePaths: string[];
        /**
         * 启用远程加载
         */
        static gameLoadRemote: boolean;
        static lbscene: any;
        /**
         * 最后进入的游戏的配置
         */
        static lastGameInfo: IGameConfig;
        static lobbyResGrps: string[];
        static LoadGame(url: string, docClassStr: string, params?: IGameConfig, loadingGameUI?: any, callBack?: Function, obj?: any, autoHideLoadUI?: boolean): boolean;
        static enterGame(params?: IGameConfig, loadingGameUI?: any, callBack?: Function, obj?: any, autoHideLoadUI?: boolean): boolean;
        static loadGameTimeOut: number;
        /**
         * 游戏资源是否已经下载
         * @url 游戏代码路径
         */
        static gameDownloaded(url: string): boolean;
        /**
         * 下载游戏资源
         * @param 游戏参数
         * @loadingGameUI loadingGameUI
         * @loaded 加载回调 返回成功或者失败 true false
         * @obj this引用
         */
        static downloadGame(params?: IGameConfig, loaded?: (event: egret.Event) => void, progress?: (event: egret.Event) => void, loadErr?: (event: egret.Event) => void, obj?: any): void;
        static LoadLobby(url?: string, docClassStr?: string, params?: any, loadingGameUI?: any, callBack?: Function, obj?: any): void;
        static ExitGame(stopmusic?: boolean): void;
        static reloadGame(url: string, docClassStr: string, params?: IGameConfig, loadingGameUI?: any, callBack?: Function, obj?: any): void;
        static defaultLandscape: boolean;
        static readonly lastGame: number;
        private static LoadGameJs(url, loaded?, loadErr?, obj?);
        static getGameStage(docClassStr: any, params?: IGameConfig): any;
        static removeGameJs(): void;
        static egretLoaded(): void;
    }
}

declare module uniLib {
    class H5Upload {
        constructor();
        static mime: {
            'png': string;
            'jpg': string;
            'jpeg': string;
            'bmp': string;
        };
        static selectedHandler: Function;
        static bytesHandler: any;
        static thisRef: any;
        static MAX_HEIGHT: number;
        static selectImage(selectedFunc: Function, thisValue: any): void;
        static selectImageWX(selectedFunc: any, thisValue: any): void;
        static tmpSelectFile(evt: any): void;
        static tmpCreateImage(uri: any, file: any): void;
        static myCreateObjectURL(blob: any): any;
        static myResolveObjectURL(blob: any): void;
        static getImageData(file: any, bytesFunc: any, thisValue: any): void;
    }
}


declare module uniLib {
    /**
   * Number工具
   */
    class NumberUtils {
        /**
         * 随机值范围
         */
        static randomInt(min: number, max: number): number;
        static inRange(a: any, min: any, max: any): boolean;
        static div(n: any, d: any): number;
        static getZeroTimeStamp(): number;
        static getTimeStamp(): number;
        static getAngle(px1: any, py1: any, px2: any, py2: any): number;
        static getCurrencyUnitByLen(len: number): string;
    }
}

declare module uniLib {
    /**
   * 资源工具
   */
    class ResUtils {
        private static MAX_LOAD_LEVEL;
        private static _asynLoadLevel;
        private static _loadingDic;
        private static _needloadDic;
        private static _needLoadDicCallBack;
        private static _resRequestSoundLoadTimes;
        private static resPool;
        private static _mustResList;
        static resetSoundLoadTimes(): void;
        static setMustRes(reslist: any): void;
        private static inited;
        static init(): void;
        static onDragonBonesTick(timeStamp: number): boolean;
        static onItemLoadError(event: RES.ResourceEvent): void;
        /**
        * @language zh_CN
        * 解析素材
        * @param source 待解析的新素材标识符
        * @param compFunc 解析完成回调函数，示例：callBack(content:any,source:string):void;
        * @param thisObject callBack的 this 引用
        */
        static getRes(source: string, compFunc?: Function, thisObject?: any, type?: string): void;
        /**
         * 退出游戏时清理游戏的组和对应资源配置
         */
        static clearResConfigByConfigName(arr: string[]): void;
        /**
         * 退出游戏时清理游戏的组和对应资源配置
         */
        static clearCfgByConfigName(arr: string[], resConfig: any): any;
        /**
        * 退出游戏时通过资源组名清除资源
        * @groupArr 需要清除的资源组数组
        */
        static clearResConfigByGroupName(groupArr: string[]): void;
        /**
         * 获取图片
         * @param source
         * @param compFunc
         * @param thisObject
         * @param cache
         */
        static getBmp(source: string, compFunc?: Function, thisObject?: any, cache?: boolean): egret.Bitmap;
        /**
         * 回收图片到池
         * @param source
         * @param obj
         */
        static freeBmp(obj: egret.Bitmap, source: string): void;
        static getMovieClip(group: string, name?: string, compFunc?: Function, thisObject?: any, cache?: boolean): void;
        /**
         * 回收movieClip到池
         * @param source
         * @param obj
         */
        static freeMovieClip(obj: egret.MovieClip, group: string, name?: string): void;
        static getParticle(group: string, name?: string, compFunc?: Function, thisObject?: any): void;
        private static loadedConfig;
        static loadResConfig(configUrl: string): void;
        /**
         * 通过gameid加载资源组
         */
        static loadGameGroupReses(configUrl: string, complete?: (event: egret.Event) => void, progress?: (event: egret.Event) => void, loadError?: (event: egret.Event) => void, thisObj?: any, resourceFolder?: string): void;
        static removeGroup(grpName: string): void;
        /**
         * 资源组是否已经在资源配置中
         */
        static isGroupInConfig(grp: string): boolean;
        static getGroupDic(grpName?: string): any;
        private static objfactorys;
        /**
         * 获得对象工厂池
         * @param obj
         */
        static getObjFactoryGroup(obj: any): ObjectFactoryGroup;
    }
    enum GROUP_LOAD_STATUS {
        LOADDING = 0,
        LOADED = 1,
    }
}

declare module uniLib {
    /**
     * 屏幕工具类
     */
    class ScreenUtils {
        private static scaleMode;
        static scaleFactor: number;
        static init(scale: any): void;
        static onDeactive(e: egret.Event): void;
        static onActive(e: egret.Event): void;
        /**
         * 屏幕大小发生变化时的消息
         */
        static onResizeNotify(): void;
        private static resetScaleMode();
        private static _landscape;
        /**
        * 设置横屏
        */
        static landscape: boolean;
    }
}

declare module uniLib {
    class StringUtils {
        /**
         * 字符串是`undefined`、`null`或`""`
         */
        static stringIsNullOrEmpty(value: string): boolean;
        static MD5(message: string): string;
        static ltrim(s: string): string;
        static rtrim(s: string): string;
        static trim(s: string): string;
        static sTrim(str: string): string;
        static checkPhone(tel: string): boolean;
        static checkEmail(email: string): boolean;
        /**
         * 字符串中查找某字符出现次数的位置
         */
        static getPosition(str: string, searchfor: string, count?: number): number;
        /**
         * 远程url修正
         */
        static validNetUrl(url: string): string;
        /**
         * 格式化货币字符串
         * @param num {number} 需要格式化的数
         * @param em {string} 单位暂时支持 万
         * @param bSplit {boolean} 使用单位分隔符
         * @param sl {number} 格式化单位长度
         */
        static formatCurrency(num: number, em?: string, bSplit?: boolean, sl?: number): string;
        /**
         * IP地址解析为整型
         */
        static ip2int(ip: any): number;
        /**
         * 整型解析为IP地址
         */
        static int2ip(num: any): string;
        /**
     * 获取字符串实际长度
     */
        static getStrRealLength(str: string): number;
        /**
         * 时间转为字符串显示
         */
        static time2str(num: number): string;
        private static getNumStr(num);
        /**
         * 格式化货币，保留有效位数
         * @param num 需要格式化的数字
         * @param len 单位 最小设置单位万
         */
        static formatCurrencyToUnit(num: number, len?: number, bSplit?: boolean): string;
        /**
         * 格式化货币字符串
         * @param num {number} 需要格式化的数
         * @param bSplit {boolean} 使用单位分隔符 默认false
         * @param txtLen {number} 货币最大显示长度,通过这个值来自动设置单位
         */
        static formatCurrencyByTotalLen(num: number, bSplit?: boolean, txtLen?: number): string;
        /**
         * 货币格式转为普通字符串
         * @param str {string} 货币格式
         */
        static formatCurrencyNomal(str: string): string;
        /**
         *以"mm:ss"的格式返回时间
         * @param t
         * @return
         *
         */
        static formatMMSS(second: number): string;
        /**
         * 以"hh:mm:ss"的格式返回时间
         * @param t
         * @return
         *
         */
        static formatHHMMSS(second: number, splitTag?: string): string;
        /**
         * 是否是网络地址
         * @param url
         * @returns {boolean}
         */
        static isNetUrl(url: string): boolean;
        static formatDDHHMMSS(second: number, splitTag?: string): string;
        /**
         * 字符串键值对方式转为json
         * @param str
         */
        static getVariables(str: string): any;
        /**
         * 字符串实际长度获取方法
         * @param str
         */
        private getStrRealLngth(str);
    }
}

declare module uniLib {
    class TimerBase {
        loopLimit: number;
        last: number;
        jumped: number;
        isStart: boolean;
        delay: number;
        current: number;
        callFun: Function;
        _thisObj: any;
        begin: number;
        maxRandNum: number;
        static TIMERBASE_DELAY: number;
        static timer: egret.Timer;
        static timerNumber: number;
        static timerlists: Array<any>;
        constructor(_delay: number, call: Function, thisObj: any, loop?: number);
        stop(): void;
        start(maxrandnum?: number): void;
        remain(): number;
        needRender(): number;
        excute(): void;
        static timerHandler(): void;
    }
}

declare module uniLib {
    class TipsUtils {
        exmls: string;
        static showTipsDownToUp(str?: any, isWarning?: boolean): void;
        static showTipsLeftOrRight(str?: any, isWarning?: boolean, isFromeLeft?: boolean): void;
        static showTipsFromCenter(str?: any, isWarning?: boolean): void;
        static showTipsBigToSmall(str?: any, isWarning?: boolean): void;
    }
}

declare module uniLib {
    class Utils {
        static setLocalStorage(ky: string, info: any): void;
        static getLocalStorage(ky: string, onGetCallBack?: Function): any;
        static clearLocalStorage(ky?: string): void;
        static sortJson(old: any): any;
        static isIOS(): boolean;
        static isAndroid(): boolean;
        static isrebooting: boolean;
        static restart(str?: any, yes?: string, no?: string): void;
        static getCachedPlatInfo(onGetCached: Function, gameId: number, platid?: number, thisObj?: any): any;
        /**
         * 生成url二维码
         * @param url 需要生成二维码的url
         * @param onGet 获取到后的回调函数
         * @param logo 暂时没有支持
         */
        static getUrlQrCode(url: string, onGet: Function, logo?: string): void;
        static getShortUrl(url: string, onGet?: Function): void;
        private static EARTH_RADIUS;
        /**
         * 获取两个经纬度之间的距离
         * @param lat1 纬度1
         * @param lng1 经度1
         * @param lat2 纬度2
         * @param lng2 经度2
         */
        static getDistance(lat1: number, lng1: number, lat2: number, lng2: number): number;
        static rad(d: number): number;
    }
}

declare module uniLib {
    class Location {
        /**
        * 经度
        */
        lng: number;
        /**
        * 纬度
        */
        lat: number;
    }
    /**
     * 加群信息
     */
    class QQGroupInfo {
        /**
         * 群号
         */
        qun: string;
        /**
         * 一键加群的key
         */
        key: string;
    }
    class ZQGameSdk {
        static SENDTONATIVE: string;
        static SENDTOJS: string;
        private static INIT;
        private static INIT_APP_BUNDLE_INFO;
        private static LOGIN;
        private static initWX;
        private static LOGOUT;
        private static PAY;
        private static PAY_PMD;
        private static SHARE;
        static XF_SPEECH_TYPE_ISA: string;
        static XF_SPEECH_TYPE_ASR: string;
        private static LANDSCAPE;
        private static RECORD_INIT;
        private static RECORD_START;
        private static RECORD_STOP;
        private static RECORD_PLAY;
        private static RECORD_PLAY_STOP;
        private static XF_SPEECH_INIT;
        private static XF_SPEECH_START;
        private static XF_SPEECH_RESULT;
        private static XF_SPEECH_VOL;
        private static XF_SPEECH_STOP;
        private static XF_SPEECH_CACEL;
        private static XF_SPEECH_END;
        private static XF_WORDS_UP;
        private static XF_ABN_START;
        static CALL_STATE: string;
        static JOIN_QQ_GROUP: string;
        static HOT_UPDATE: string;
        static PICKPHOTO: string;
        /**
        * 退出游戏
        */
        static EXITGAME: string;
        /**
       * 重启游戏
       */
        static RESTART: string;
        /**
        * 打开游戏的退出面板
        */
        static OPENEXIT: string;
        /**
         * 打开网页
         */
        static OPENWEB: string;
        /**原生层复制功能 */
        static NATIVECOPY: string;
        /**获取剪切板 */
        static GETNATIVEBOARD: string;
        /**网络状态更新 状态见NetState枚举值*/
        static NETSTATE: string;
        static lastNetState: any;
        /**
         * 当前网络状态
         */
        static netState: NetState;
        /**手机电池电量更新 */
        static BATTERY: string;
        /**本地推送 */
        static LOCALPUSH: string;
        /**震动 */
        static VIBRATE: string;
        static SPEAKERACTIVE: string;
        /**
         * 上传登录数据到原生层
         */
        static UPDATE: string;
        static KEYDOWN: string;
        static LOCATIONINFO: string;
        /**
        * 更新zip包
        */
        static UPDATE_ZIP: string;
        /**
        * 强制更新apk
        */
        static UPDATE_APK: string;
        /**
        * 拉取config的开关
        */
        static UPDATE_CFG: string;
        /**
        * 重启拉取最新配置
        */
        static GET_CONFIG: string;
        static YM_INIT: string;
        static YM_JOIN: string;
        static YM_STAT: string;
        static YM_OPEN: string;
        static YM_CLSE: string;
        /**
         * 隐藏虚拟按键
         */
        static HIDE_VK: string;
        /**
         * talkingdata自定义事件
         */
        static TD_EVENT: string;
        /**
         * 埋点数据
         */
        static TRACK_POINT: string;
        private static _callBacks;
        static defaultWXShareVo: WXShareVo;
        static location: Location;
        private static isInited;
        constructor();
        static init(call?: Function, thisObj?: any, cfg?: any): void;
        private static onRestart(e);
        private static _callState;
        private static onNativeMessage(value);
        /**
         * 初始化微信
         */
        static wxinit(wxappid?: string): void;
        /**
         * 登录
         */
        static Login(onLogin?: Function, onLogout?: Function, thisObj?: any, loginData?: any): void;
        static Logout(): void;
        static exit(): void;
        static restart(desc?: string, confirm?: string, cancel?: string): void;
        static update(data: any): void;
        /**
         * 支付
         */
        static pay(data: uniLib.IOrderInfo, call?: Function, thisObj?: any): void;
        /**
         * 使用pmd协议直接进行支付操作
         * @param data
         * @param call
         * @param thisObj
         */
        static payByPmd(data: Pmd.CreatePlatOrderReturnSdkPmd_S, call?: Function, thisObj?: any): void;
        static share(data: WXShareVo, call?: Function, thisObj?: any): void;
        static recordInit(data: any, call?: Function, thisObj?: any): void;
        private static lastRecordTime;
        private static canRecord;
        static startRecord(call?: Function, thisObj?: any): void;
        static stopRecord(call?: Function, thisObj?: any): void;
        static playRecord(recordId: string, call?: Function, thisObj?: any): void;
        static stopPlayRecord(recordId: string, call?: Function, thisObj?: any): void;
        static xfSpeechInit(appId: string, call?: Function, thisObj?: any, data?: XFSetParam): void;
        /**
         * 上传用户词表
         */
        static xfUpdateWords(words: string, call?: Function, thisObj?: any): void;
        static xfUpLoadGrammer(): void;
        static xfSpeechStart(resultCall?: Function, endCall?: Function, thisObj?: any, data?: XFSetParam): void;
        static xfSpeechStop(call?: Function, thisObj?: any): void;
        static xfSpeechCacel(call?: Function, thisObj?: any): void;
        static landscape: boolean;
        /**
         * 打开网页
         */
        static openWeb(webUrl: string, model?: number, webHeight?: number, webWidth?: number, webX?: number, webY?: number): void;
        regListenr(): void;
        /**复制内容到剪切板 */
        static nativeCopyStr(str: string): void;
        static getConfig(desc: string, url?: string, confirm?: string, cancel?: string): void;
        /**获取剪切板的内容 */
        static getNaviveBoard(call?: Function, thisObj?: any): void;
        private static lastGetNetStateTime;
        /**获取网络连接类型 */
        static getNetStateType(call?: Function, thisObj?: any, force?: boolean): void;
        /**
         * 一键加QQ群
         */
        static joinQQGroup(data: QQGroupInfo): void;
        /**
         * 获取电话状态
         * @param call
         * @param thisObj
         */
        static getCallStatus(call?: Function, thisObj?: any): number;
        /**获取电池剩余量 */
        static getBatteryPer(call?: Function, thisObj?: any): void;
        /**
         * 本地消息推送
         * @param title
         * @param txt
         * @param time
         */
        static localPush(title: string, txt: string, time?: number): void;
        /**
         * 手机震动
         * @param sec 震动时间
         */
        static vibrate(msec: number): void;
        /**
         * 激活扬声器
         */
        static speakerActive(): void;
        /**
         * 获取经纬度
         * @param onGetLocation 回调中包含经纬度字段：经度 longitude, 纬度 latitude
         * @param thisObj
         */
        static getLocation(onGetLocation?: Function, thisObj?: any): Location;
        /**
         * 更新zip包
         * @param zipName
         * @param zipBinStr
         * @param onUpdate
         * @param thisObj
         */
        static updateZip(zipJson: ZipJson, onUpdate?: Function, thisObj?: any): void;
        /**
         * 打开手机相册
         * @param zipName
         * @param zipBinStr
         * @param onUpdate
         * @param thisObj
         * @param type  0 头像 1头像裁剪 2摄像头 3摄像头裁剪
         */
        static pickPhoto(call?: Function, thisObj?: any, type?: PICKPHOTO_TYPE): void;
        /**
         * 更新Apk包
         * @param apkJson
         * @param onUpdate
         * @param thisObj
         */
        static updateApk(apkJson: ApkJson, onUpdate?: Function, thisObj?: any): void;
        /**
         * 隐藏虚拟按键
         */
        static hideVk(): void;
        /**
         * talkingdata自定义事件
         */
        static tdEvent(data: any): void;
        /**
         * 埋点数据
         */
        static trackPoint(mark: string): void;
        /**
         * 更新native层的config
         * @param state
         * @param onUpdate
         * @param thisObj
         */
        static updateCfg(cfg: any): void;
        private static updateBundleCfg(bundleConfig);
        static pullCfg(onDown?: Function, thisObj?: any): void;
        /**
         * 游密初始化
         */
        static ymInit(appKey: string, appSecret: string): void;
        /**
         * 游密加入房间
         */
        static ymJoin(uid: number, rid: number): void;
        /**
         * 游密开始录视频
         */
        static ymStart(): void;
        /**
         * 游密打开视频窗口
         */
        static ymOpen(uid: string, x: number, y: number, w: number, h: number, place?: YM_PLACE): void;
        /**
         * 游密关闭视屏窗口
         */
        static ymClose(uid: string): void;
    }
    class ZQGameObj {
        code: number;
        cmd: string;
        data: any;
    }
    class ZipJson {
        zipName: string;
        updateUrl: string;
        zipBase64: string;
    }
    class ApkJson {
        VersionCode: string;
        VersionName: string;
        ApkUrl: string;
    }
    class XFSetParam {
        speechTimeout: string;
        vadEos: string;
        vadBos: string;
        sampleRate: string;
        language: string;
        accent: string;
        dot: boolean;
        isStreamRec: boolean;
        grammar: string;
        grammarType: GRAMMARTYPE;
        speechType: SPEECHTYPE;
    }
    enum YM_PLACE {
        TOP = 0,
        BOTTOM = 1,
    }
    enum GRAMMARTYPE {
        ONLINE = 0,
        OFFLINE = 1,
    }
    enum SPEECHTYPE {
        SPEECH = 0,
        GRAMMAR = 1,
    }
    /**
    * config操作
    */
    enum CONFIG_STATE {
        UPDATE = 0,
        DOWN = 1,
    }
    enum NetState {
        NO_SIGNAL = 0,
        WIFI = 1,
        DATA_FLOWS = 2,
        WIFI_AND_DATA = 3,
    }
    enum CallState {
        DISCONNECTED = 0,
        CONNECTED = 1,
    }
    enum WEBMODEL {
        AUTO = 0,
        EXPLORER = 1,
        LAND = 2,
    }
    enum PICKPHOTO_TYPE {
        NORMAL = 0,
        AVAR = 1,
    }
}

/**
  * 面板基类
  */
declare module uniLib {
    class BasePanel extends egret.DisplayObjectContainer {
        assets: egret.SpriteSheet;
        w: number;
        h: number;
        constructor(assetsName?: string);
        initPanel(): void;
        initData(): void;
        onEnter(): void;
        onExit(): void;
        closePanel(): void;
        getWidth(): number;
        getHeight(): number;
    }
}

declare module uniLib {
    class GMView extends eui.Component {
        private btn_send;
        private str_input;
        constructor();
        childrenCreated(): void;
        private onTuch(e);
    }
}

declare module uniLib {
    class GameDoc extends egret.DisplayObjectContainer implements uniLib.IGameDoc {
        uiLayer: egret.DisplayObjectContainer;
        topLayer: egret.DisplayObjectContainer;
        effectLayer: egret.DisplayObjectContainer;
        mainUILayer: egret.DisplayObjectContainer;
        maskLayer: egret.DisplayObjectContainer;
        tipsLayer: egret.DisplayObjectContainer;
        protected _gameInfo: IGameConfig;
        constructor(params?: any);
        initBaseLayers(): void;
        /**
         * 场景构造完成
         */
        awake(): void;
        onAddToStage(e?: egret.Event): void;
        private thmLoaded;
        private resLoaded;
        private preLoadAndInit();
        private loadedthm(event);
        private loadedCfg(data);
        start(e?: egret.Event): void;
        /**
         * 配置文件加载完成,开始预加载preload资源组。
         * configuration file loading is completed, start to pre-load the preload resource group
         */
        private cfgComplete();
        /**
         * preload资源组加载完成
         * Preload resource group is loaded
         */
        private onResComplete(event);
        preLoadEnd(): void;
        resize(): void;
        destroy(): void;
        /**
         * 资源组加载出错
         *  The resource group loading failed
         */
        private onResError(event);
        /**
         * 返回大厅
         */
        backToLobby(): void;
    }
}

declare module uniLib {
    class GameScene extends egret.DisplayObjectContainer implements uniLib.IScene {
        uiLayer: egret.DisplayObjectContainer;
        topLayer: egret.DisplayObjectContainer;
        effectLayer: egret.DisplayObjectContainer;
        mainUILayer: egret.DisplayObjectContainer;
        maskLayer: egret.DisplayObjectContainer;
        tipsLayer: egret.DisplayObjectContainer;
        constructor(param?: any);
        initBaseLayers(): void;
        /**
         * 场景构造完成
         */
        awake(): void;
        /**
         * 场景初始化完成并添加到舞台
         */
        start(e?: egret.Event): void;
        /**
         * 大小变化时
         */
        resize(): void;
        /**
        * 场景销毁时
        */
        destroy(): void;
    }
}

declare module uniLib {
    class LobbyScene extends egret.DisplayObjectContainer implements uniLib.IScene {
        uiLayer: egret.DisplayObjectContainer;
        topLayer: egret.DisplayObjectContainer;
        effectLayer: egret.DisplayObjectContainer;
        mainUILayer: egret.DisplayObjectContainer;
        maskLayer: egret.DisplayObjectContainer;
        tipsLayer: egret.DisplayObjectContainer;
        /**
         * 游戏层
         */
        gameLayer: egret.DisplayObjectContainer;
        currentGame: any;
        private _bgMask;
        constructor(param?: any);
        initBaseLayers(): void;
        /**
         * 场景构造完成
         */
        awake(): void;
        /**
         * 场景初始化完成并添加到舞台
         */
        start(e?: egret.Event): void;
        resize(): void;
        /**
        * 场景销毁时
        */
        destroy(): void;
        addGame(game: any): void;
        removeGame(e?: egret.Event): void;
    }
}


declare module uniLib {
    /**
     * 统计
     */
    class StatistcsView extends egret.DisplayObjectContainer {
        private ping;
        private socketStatus;
        private sendB;
        private recevieB;
        private sendKb;
        private recevieKb;
        constructor();
        private updataSendAndReceive(evt);
        private updataPing(evt);
        private updataSocketStatus(evt);
        private updataSendedAndReceived(evt);
        private init();
        private createTextField(str);
        private createTextFieldX();
        private destroy();
    }
}


//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
declare module wx {
  export class WxCallBack {
    success(ret): void;
    fail(ret): void;
    complete(ret): void;
  }

  export class wxAuthObj extends WxCallBack {
    scope: string;
  }

  export class wxUserInfo {
    language: string;
    nickName: string;
    avatarUrl: string;
    gender: number;
    country: string;
    province: string;
    city: string;
  }
}


declare class wx {

  /**
   * 通过config接口注入权限验证配置
   * @param bodyConfig
   */
  static config(bodyConfig: BodyConfig): void;


  /**
   * 通过ready接口处理成功验证
   * @param cbValidated 成功验证后的处理函数
   */
  static ready(cbValidated: Function): void;

  /**
   * 获取用户信息
   */
  static getUserInfo(info: any): void;


  /**
   * 微信小游戏登录
   */
  static login(obj: any): void;

  /**
   * 检测登录状态
   */
  static checkSession(obj: any): void;

  /**
   * 提前向用户发起授权请求
   */
  static authorize(obj: any): void;


  /**
   * 通过error接口处理失败验证
   * @param cbError 处理失败验证后的处理函数
   */
  static error(cbError: Function): void;


  /**
   * 判断当前客户端版本是否支持指定JS接口
   * @param bodyCheckJsAPISupport
   */
  static checkJsApi(bodyCheckJsAPISupport: BodyCheckJsAPISupport): void;


  /**
   * 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
   * @param bodyMenuShareTimeline
   */
  static onMenuShareTimeline(bodyMenuShareTimeline: BodyMenuShareTimeline): void;


  /**
   * 获取“分享给朋友”按钮点击状态及自定义分享内容接口
   * @param bodyMenuShareAppMessage
   */
  static onMenuShareAppMessage(bodyMenuShareAppMessage: BodyMenuShareAppMessage): void;


  /**
   * 获取“分享到QQ”按钮点击状态及自定义分享内容接口
   * @param bodyMenuShareQQ
   */
  static onMenuShareQQ(bodyMenuShareQQ: BodyMenuShareQQ): void;


  /**
   * 获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
   * @param bodyMenuShareWeibo
   */
  static onMenuShareWeibo(bodyMenuShareWeibo: BodyMenuShareWeibo): void;


  /// 华丽的分界线， 以下接口参数结构较简单或使用较少，均可自行查阅微信官方api文档给出适合的参数

  /**
   * 拍照或从手机相册中选图接口
   * @param bodyChooseImage
   */
  static chooseImage(body: Object): void;

  /**
   * 预览图片接口
   * @param body
   */
  static previewImage(body: Object): void;

  /**
   * 上传图片接口
   * @param body
   */
  static uploadImage(body: Object): void;

  /**
   * 下载图片接口
   * @param body
   */
  static downloadImage(body: Object): void;

  /**
    * 开始录音接口
    * @param body
    */
  static startRecord(body: Object): void;

  /**
    * 停止录音接口
    * @param body
    */
  static stopRecord(body: Object): void;

  /**
    * 监听录音自动停止接口
    * @param body
    */
  static onVoiceRecordEnd(body: Object): void;


  /**
    * 播放语音接口
    * @param body
    */
  static playVoice(body: Object): void;


  /**
    * 暂停播放接口
    * @param body
    */
  static pauseVoice(body: Object): void;


  /**
    * 停止播放接口
    * @param body
    */
  static stopVoice(body: Object): void;


  /**
    * 监听语音播放完毕接口
    * @param body
    */
  static onVoicePlayEnd(body: Object): void;

  /**
    * 上传语音接口
    * @param body
    */
  static uploadVoice(body: Object): void;


  /**
    * 下载语音接口
    * @param body
    */
  static downloadVoice(body: Object): void;


  // ---- 智能接口

  /**
    * 识别音频并返回识别结果接口
    * @param body
    */
  static translateVoice(body: Object): void;


  /// ---- 设备信息

  /**
    * 获取网络状态接口

    * @param body
    */
  static getNetworkType(body: Object): void;


  /// ---- 地理位置

  /**
    * 使用微信内置地图查看位置接口
    * @param body
    */
  static openLocation(body: Object): void;


  /**
    * 获取地理位置接口
    * @param body
    */
  static getLocation(body: Object): void;

  /// ---- 界面操作

  /**
    * 隐藏右上角菜单接口
    * @param body
    */
  static hideOptionMenu(body: Object): void;

  /**
    * 显示右上角菜单接口
    * @param body
    */
  static showOptionMenu(body: Object): void;

  /**
    * 关闭当前网页窗口接口
    * @param body
    */
  static closeWindow(body: Object): void;

  /**
    * 批量隐藏功能按钮接口
    * @param body
    */
  static hideMenuItems(body: Object): void;

  /**
    * 批量显示功能按钮接口
    * @param body
    */
  static showMenuItems(body: Object): void;

  /**
    * 隐藏所有非基础按钮接口
    * @param body
    */
  static hideAllNonBaseMenuItem(body: Object): void;

  /**
    * 显示所有功能按钮接口
    * @param body
    */
  static showAllNonBaseMenuItem(body: Object): void;

  /// ---- 微信扫一扫

  /**
    * 调起微信扫一扫接口
    * @param body
    */
  static scanQRCode(body: Object): void;


  /// ---- 微信小店

  /**
    * 跳转微信商品页接口
    * @param body
    */
  static openProductSpecificView(body: Object): void;


  /// ---- 微信卡券

  /**
    * 调起适用于门店的卡券列表并获取用户选择列表
    * @param body
    */
  static chooseCard(body: Object): void;

  /**
    * 批量添加卡券接口
    * @param body
    */
  static addCard(body: Object): void;

  /**
    * 查看微信卡包中的卡券接口
    * @param body
    */
  static openCard(body: Object): void;

  /// ---- 微信支付

  /**
    * 发起一个微信支付请求
    * @param body
    */
  static chooseWXPay(body: Object): void;

}

///////////////////////////////// 常用API的参数结构类

/**
 * config 参数结构
 * jsApiList: 所有要调用的 API
 */
declare class BodyConfig {
  debug: boolean;
  appId: string;
  timestamp: number;
  nonceStr: string;
  signature: string;
  jsApiList: Array<string>;
}

/**
 * checkJsApi 参数结构
 * jsApiList:  需要检测的JS接口列表
 */
declare class BodyCheckJsAPISupport {
  success: Function;
  jsApiList: Array<string>;
}

declare class ShareEvent {
  trigger: Function;
  success: Function;
  cancel: Function;
  fail: Function;
}
/**
 * onMenuShareTimeline 参数结构
 */
declare class BodyMenuShareTimeline extends ShareEvent {
  title: string;
  link: string;
  imgUrl: string;
}

/**
 * onMenuShareAppMessage 参数结构
 */
declare class BodyMenuShareAppMessage extends ShareEvent {
  title: string;
  desc: string;
  link: string;
  imgUrl: string;
  type: string;
  dataUrl: string;
}

/**
 * onMenuShareQQ 参数结构
 */
declare class BodyMenuShareQQ extends ShareEvent {
  title: string;
  desc: string;
  link: string;
  imgUrl: string;
  type: string;
  dataUrl: string;
  complete: Function;
}


/**
 * onMenuShareWeibo 参数结构
 */
declare class BodyMenuShareWeibo extends ShareEvent {
  title: string;
  desc: string;
  link: string;
  imgUrl: string;
  complete: Function;
}