import { generateMenuFromRouteMain } from '../../utils';

// 根据一级菜单id查找menu
export const getMenuInfoByfLevelId = (pId, userRoutes) => {
  let targetObj = null;
  const menu = generateMenuFromRouteMain(userRoutes);
  const menuLen = menu.length;
  for (let i = 0; i < menuLen; i += 1) {
    if (pId === menu[i].id) {
      targetObj = {
        id: menu[i].id,
        name: menu[i].name,
        icon: menu[i].icon,
        bg: menu[i].bg,
        subMenus: menu[i].subMenus,
      };
      return targetObj;
    }
    const submenLen = menu[i].subMenus.length;
    for (let j = 0; j < submenLen; j += 1) {
      if (menu[i].subMenus[j].id === pId) {
        targetObj = {
          id: menu[i].subMenus[j].id,
          name: menu[i].subMenus[j].name,
          icon: menu[i].icon,
          bg: menu[i].bg,
          subMenus: menu[i].subMenus,
        };
        return targetObj;
      }
    }
  }
  return targetObj;
};

/** 发送给大屏的控制指令，在进行遥控器相关功能重构后，所有游戏操作均使用这里的指令，如非必要请勿添加新的指令 */
export const CONTROL_CODE = {
  /** 路由跳转 */
  ROUTER_JUMP: 'router_jump',
  /** 游戏开始 */
  GAME_START: 'game_start',
  /** 游戏结束 */
  GAME_END: 'game_end',
  /** 游戏重玩 */
  GAME_REPLAY: 'game_replay',
  /** 游戏控制，临时设立用于处理不属于开始、结束、重玩的情况 */
  GAME_CONTROL: 'game_control',
  /** 大屏切换游戏 */
  ON_GAME_CHANGE: 'on_game_change',
  /** 其他控制指令 */
  OTHERS: 'others',
};

// export const ON_CLICK_HOME_MENU_ITEM = 'on_click_home_menu_item';

// export const HOME_MENU_ITEM = {
//   /** 签到 */
//   SIGN: 'sign',
//   /** 幸运夺宝 */
//   LUCKY_TREASURE: 'luckyTreasure',
//   /** 红包雨 */
//   RED_PACKET_RAIN: 'redPacketRain',
//   /** 摇一摇 */
//   SHAKE: 'shake',
//   /** 划一划 */
//   SWIPE: 'swipe',
//   /** 开宝 */
//   OPEN_TREASURE: 'openTreasure',
//   /** 抽奖 */
//   LOTTERY: 'lottery',
//   /** 小游戏 */
//   MINI_GAME: 'miniGame',
// };

// 0000~5000为遥控器向大屏发送的指令
export const CODE = {
  SIGN: '0000', // 签到(默认签到)
  HOME: '0001', // 首页
  QRCODE: '0002', // 二维码
  AUDIO: '0003', // 音乐
  DANMU: '0004', // 弹幕
  MSGWALL: '0005', // 祝福榜
  SIGNBOOK: '0006', // 签到簿
  SIGNBUBBLE: '0007', // 手写签到
  XYDB: '0008', // 幸运夺宝(默认转一转)
  ZYZSTARTGAME: '0009', // 转一转开始游戏
  ZYZENDGAME: '0010', // 转一转结束游戏
  ZYZREPLAY: '0011', // 转一转再玩一次
  NYN: '0012', // 扭一扭
  NYNSTARTGAME: '0013', // 扭一扭开始游戏
  NYNENDGAME: '0014', // 扭一扭结束游戏
  NYNREPLAY: '0015', // 扭一扭再玩一次
  HBY: '0016', // 红包雨(摇红包)
  HBYSET: '0017', // 红包雨设置金额和个数
  HBYSTARTGAME: '0018', // 红包雨开始游戏
  HBYENDGAME: '0019', // 红包雨结束游戏
  HBYREPLAY: '0020', // 红包雨再玩一次
  CLICKHB: '0021', // 点红包
  SHAKE: '0022', // 摇一摇
  SHAKESTARTGAME: '0023', // 摇一摇开始游戏
  SHAKEENDGAME: '0024', // 摇一摇结束游戏
  SHAKEREPLAY: '0025', // 摇一摇再玩一次
  HYH: '0026', // 划一划(默认数钞票)
  HYHSTARTGAME: '0027', // 划一划开始游戏
  HYHENDGAME: '0028', // 划一划结束游戏
  HYHREPLAY: '0029', // 划一划再玩一次
  CUTFRUIT: '0030', // 切水果
  KBX: '0031', // 开宝(默认开宝箱)
  KBXCHOOSETYPE: '0032', // 开宝箱选择类型
  KBXSTARTGAME: '0033', // 开宝箱开始游戏
  KBXBREAKALL: '0034', // 开宝箱一键打开
  KBXCHOOSEBOX: '0035', // 开宝箱选择开某一个宝箱
  KBXREPLAY: '0036', // 开宝箱再玩一次
  KBXENDGAME: '0037', // 开宝箱结束
  HBWALL: '0038', // 红包墙
  HBWALLCHOOSETYPE: '0039', // 红包墙选择类型
  HBWALLSTARTGAME: '0040', // 红包墙开始游戏
  HBWALLBREAKALL: '0041', // 红包墙一键打开
  HBWALLCHOOSEHB: '0042', // 红包墙选择开某一个红包
  HBWALLREPLAY: '0043', // 红包墙再玩一次
  HBWALLENDGAME: '0044', // 红包墙结束
  LOTTERY: '0045', // 抽奖(默认3D抽奖)
  LOTTERYPREV: '0046', // 3D抽奖 上一个奖项
  LOTTERYNEXT: '0047', // 3D抽奖 下一个奖项
  LOTTERYNUN: '0048', // 3D抽奖 一次抽取人数
  LOTTERYSTART: '0049', // 3D抽奖 开始抽奖
  LOTTERYRESET: '0050', // 3D抽奖 重置抽奖
  LOTTERYSTOP: '0051', // 3D抽奖 停止抽奖
  LOTTERYPRIZEPREV: '0052', // 3D抽奖 获奖名单上一页
  LOTTERYPRIZENEXT: '0053', // 3D抽奖 获奖名单下一页
  LOTTERYISPERSON: '0054', // 3D抽奖 手动停止抽奖
  LOTTERYSHEETCLOSE: '0055', // 名单抽奖 关闭中奖名单或中奖结果
  LOTTERYSHEETOPEN: '0056', // 名单抽奖 打开名单
  MINIGAME: '0057', // 小游戏
  MINIGAME_GXCMX: '0058', // 搞笑猜明星
  MINIGAME_CMX: '0059', // 猜明星
  MINIGAME_KXCCY: '0060', // 开心猜成语
  MINIGAME_CCY: '0061', // 猜成语
  MINIGAME_VOTE: '0062', // 投票
  MINIGAME_CYX: '0063', // 猜英雄
  MINIGAME_CGM: '0064', // 猜歌名
  MINIGAME_HYJJ: '0065', // 火眼金睛
  MINIGAME_QSDS: '0066', // 雀神大赛
  MINIGAME_SCDT: '0067', // 诗词答题
  MINIGAME_PREV: '0068', // 小游戏上一题
  MINIGAME_NEXT: '0069', // 小游戏下一题
  MINIGAME_TIP: '0070', // 小游戏提示
  MINIGAME_ANS: '0071', // 小游戏答案
  MINIGAME_START: '0072', // 小游戏开始
  VOTE_CLEAR: '0073', // 投票清空上一轮
  VOTE_SAVE: '0074', // 投票保留上一轮
  VOTE_END: '0075', // 投票结束游戏
  QRCODEWIDTH: '0076', // 二维码设置宽度
  QRCODEHEIGHT: '0077', // 二维码设置高度
  QRCODEX: '0078', // 二维码设置x坐标
  QRCODEY: '0079', // 二维码设置y坐标
  AUTODISPLAY: '0080', // 大屏自动展示功能
  AUTODISPLAYEND: '0081', // 大屏停止自动展示功能
  JUMPBONE: '0082', // 跳一跳
  GIVEMARK: '0083', // 评分
  GIVEMARK_SAVEPREV: '0084', // 保存上一轮数据
  GIVEMARK_CLEARPREV: '0085', // 清空上一轮数据
  GIVEMARK_TONEXT: '0086', // 下一位
  GUESSHB: '0087', // 猜红包
  GUESSHB_STARTGAME: '0088', // 猜红包开始游戏
  GUESSHB_NEXT: '0089', // 猜红包下一轮/揭晓
  GUESSHB_END: '0090', // 猜红包结束
  HYH2: '0091', // 数钞票新
  XIEMU: '0092', // 打开谢幕
  // 93- 96 进场特效
  PIGOUT: '0097', // 狼吞虎咽
  CLICKTIGER: '0098', // 武松打虎
  ZFDM: '0099', // 争分夺秒
  ZFDMCHOOSETYPE: '0100', // 争分夺秒选择类型
  ZFDMENDGAME: '0101', // 争分夺秒结束游戏
  ZFDMREPLAYGAME: '0102', // 争分夺秒再玩一次
  ZFDMSTARTGAME: '0103', // 争分夺秒开始游戏
  SZF: '0104', // 送祝福
  SZFCHOOSETIME: '0105', // 送祝福选择时间
  SZFENDGAME: '0106', // 送祝福结束游戏
  SZFREPLAYGAME: '0107', // 送祝福再玩一次
  VIDEOPLAYOPEN: '0108', // 打开视频播放
  FIXEDSCREENOPEN: '0109', // 打开定屏
  MULTIMEDIAPLAY: '0110', // 播放某一个视频/定屏
  PLAYFOOTBALL: '0111', // 谁是射手王
  LUCKYWHEEL: '0112', // 幸运小转盘
  LUCKYWHEELSTARTGAME: '0113', // 幸运小转盘开始游戏
  LUCKYWHEELENDGAME: '0114', // 幸运小转盘结束游戏
  LUCKYWHEELREPLAY: '0115', // 幸运小转盘再玩一次
  CARDANSWER: '0116', // 卡牌抽奖答案
  STARTRITE: '0117', // 启动仪式
  STARTRITESTARTGAME: '0118', // 启动仪式开始游戏
  STARTRITEENDGAME: '0119', // 启动仪式结束游戏
  STARTRITEREPLAY: '0120', // 启动仪式再玩一次
  ORDERSONG: '0121', // 点歌
  ORDERSONGUPDATE: '0122', // 点歌更新数据
  ENTERAOTEMAN: '0123', // 进入奥特曼页面
  MINIGAME_CWZYS: '0124', // 猜文字颜色
  GUESSGENERALITY: '0125', // 进入猜电影页面
  GIVEMARK_TOPREV: '0126', // 评分上一位
  GIVEMARK_STARTGIVEMARK: '0127', // 查看评分
  GIVEMARK_CHECKSUMSCORE: '0128', // 查看评分的总分
  MINIGAME_QSDSNEW: '0129', // 打开雀神大赛新版
  MINIGAME_QSDSNEW_NEXT: '0130', // 雀神大赛新版下一题
  MINIGAME_HANZI: '0131', // 打开神奇的汉字
  MINIGAME_HAPPYQA: '0132', // 打开开心问答
  ALLHBY: '0133', // 全民红包雨(摇红包)
  GUESSSPEECH: '0134', // 进入猜台词页面
  MINIGAME_QSDS_ANSWER_NUM: '0135', // 设置大屏下一道题目的答案张数
  SHOUTHB_EXPOSE_NEXT: '0136', // 喊红包揭晓、下一个控制
  MINIGAME_QSDS_SEND_QUESTION: '0137', // 设置雀神大赛大屏下一道题目的内容
  MINIGAME_CWZYS_SEND_QUESTION: '0138', // 设置说文字颜色的下一道题目的内容
  GOLDENSNAkE: '0139', // 金蛇纳福
  LUCKYSNAKE: '0140', // 福蛇贺岁
  MINIGAME_PLAYPOKER: '0141', // 打开扑克残局
  MINIGAME_PLAYPOKER_START: '0142', // 开始或重新开始扑克游戏
  MINIGAME_PLAYPOKER_PRODUCE: '0143', // 扑克游戏遥控器准备出牌
  MINIGAME_PLAYPOKER_YAOBUQI: '0144', // 扑克游戏遥控器要不起
};
