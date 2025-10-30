//  TODO 正逐步迁移到 src/modules/screenMessenger，迁移完成后删除此文件
import { tellScreenStatus } from '@/modules/screenStatusJudge';
import * as multipleScreen from '@/utils/multipleScreenResolve';
import { CONTROL_CODE } from '../../assets/constant/index';
import app from '../../main';
import router from '../../router';
import store from '../../store/index';
// 解决多个大屏问题雀神大赛
/** 遥控器接收到的控制指令 */
const CONTROL_CODE_TO_REMOTE = {
  ROUTER_JUMP: 'router_jump',
  OTHERS: 'others',
};

// 5001~9999为大屏发送给遥控器的指令
export const REPLYCODE = {
  ON_3DSIGN: '5001', // 在3D签到页面
  ON_SIGNBOOK: '5002', // 在签到簿页面
  ON_BUBBLESIGN: '5003', // 在手写签到页面
  ON_HOME: '5004', // 在首页
  ON_XYDB: '5005', // 在幸运夺宝页面(转一转)
  ON_NYN: '5006', // 在扭一扭页面
  ON_HBYSET: '5007', // 在红包雨设置金额页面
  ON_HBYSETFAIL: '5008', // 红包雨设置错误
  ON_HBY: '5009', // 在红包雨游戏界面
  ON_CLICKHBSET: '5010', // 在点红包设置页面
  ON_SHAKE: '5011', // 在默认摇一摇页面
  ON_SHAKE_MONKEY: '5012', // 在猴子爬树页面
  ON_SHAKE_SWIM: '5013', // 在游泳摇一摇页面
  ON_SHAKE_CITYCAR: '5014', // 在都市赛车页面
  ON_SHAKE_CATTLE: '5015', // 在谁最牛页面
  ON_SHAKE_ZXN: '5016', // 在追新娘页面
  ON_SHAKE_WEDCAR: '5017', // 在婚车摇一摇页面
  ON_SHAKE_DRADONBOAT: '5018', // 在赛龙舟页面
  ON_DRAGONFAIL: '5019', // 赛龙舟进入失败
  ON_COUNTMONEY: '5020', // 在数钞票页面
  ON_CUTFRUIT: '5021', // 在切水果页面
  ON_KBXCHOOSE: '5022', // 在开宝箱类型选择页面
  ON_KBXCHOOSEFAIL: '5023', // 开宝箱类型选择出错
  ON_KBXWAIT: '5024', // 开宝箱等待页面
  ON_KBX: '5025', // 开宝箱游戏页面
  ON_KBXRANK: '5026', // 开宝箱排行榜页面
  ON_KBXOPENED: '5027', // 当前宝箱已经开启
  ON_HBWALLCHOOSE: '5028', // 在红包墙类型选择页面
  ON_HBWALLCHOOSEFAIL: '5029', // 红包墙类型选择出错
  ON_HBWALLWAIT: '5030', // 红包墙等待页面
  ON_HBWALL: '5031', // 红包墙游戏页面
  ON_HBWALLRANK: '5032', // 红包墙排行榜页面
  ON_HBWALLOPENED: '5033', // 当前红包已经开启
  ON_3DLOTTERY: '5034', // 在3D抽奖页面
  ON_3DLOTTERYSHOWENDBTN: '5034-01', // 3D抽奖页面出现结束抽奖的按钮
  ON_3DLOTTERYINANI: '5034-02', // 抽奖执行动画中
  ON_3DLOTTERYENDANI: '5034-03', // 抽奖动画结束
  ON_3DLOTTERYNOMOREPRIZE: '5035', // 3D抽奖显示没有更多奖项了
  ON_3DLOTTERYNOMOREDATA: '5036', // 3D抽奖显示没有更多数据了
  ON_SHEETLOTTERY: '5037', // 在名单抽奖页面
  ON_SHEETLOTTERY_PARTICLE: '5037-01', // 在新名单抽奖页面
  ON_DANMULOTTERY: '5038-01', // 在弹幕抽奖页面
  ON_SCREENLOTTERY: '5038', // 在巨幕抽奖页面
  ON_LOTTERYFAIL: '5039', // 抽奖人数不够
  ON_SHEETLOTTERYUPLOADTIP: '5040', // 名单抽奖 没有上传名单提示
  ON_MINIGAME: '5041', // 在小游戏页面
  ON_GXCMX: '5042', // 在搞笑猜明星页面
  ON_CMX: '5043', // 在猜明星页面
  ON_KXCCY: '5044', // 在开心猜成语页面
  ON_CCY: '5045', // 在猜成语页面
  ON_VOTE: '5046', // 在投票页面
  ON_CYX: '5047', // 在猜英雄页面
  ON_CGM: '5048', // 在猜歌名页面
  ON_HYJJ: '5049', // 在火眼金睛页面
  ON_QSDS: '5050', // 在雀神大赛页面
  ON_SCDT: '5051', // 在诗词答题页面
  ON_MINIGAMEANS: '5052', // 小游戏答案
  ON_JUMPBONE: '5053', // 在跳一跳页面
  ON_GIVEMARK: '5054', // 在评分页面
  ON_GUESSHBWAIT: '5055', // 在猜红包等待页面
  ON_GUESSHBUNRECHARGE: '5056', // 猜红包未充值
  ON_GUESSHBON: '5057', // 猜红包游戏界面
  ON_XIEMU: '5058', // 在谢幕界面
  ON_XIEMUFAIL: '5059', // 谢幕打开失败
  ON_PIGOUT: '5060', // 在狼吞虎咽页面
  ON_SPHERE_LOTTERY: '5061', // 在球形抽奖页面
  ON_SHAKE_SEDANCHAIR: '5062', // 在抬花轿页面
  ON_SHAKE_TIGER: '5063', // 在虎年滑雪页面
  ON_CLICKTIGER: '5064', // 在武松打虎页面
  ON_PICTURE_LOTTERY: '5065', // 在照片抽奖页面
  ON_ZFDMCHOOSE: '5066', // 在争分夺秒类型选择页面
  ON_ZFDMCHOOSEFAIL: '5067', // 争分夺秒类型选择出错
  ON_ZFDMGAME: '5068', // 争分夺秒游戏页面
  ON_ZFDMRANK: '5069', // 争分夺秒排行榜页面
  ON_ZFDMWAIT: '5070', // 争分夺秒等待页面
  ON_SZFGAME: '5071', // 送祝福游戏页面
  ON_SZFRANK: '5072', // 送祝福排行榜页面
  ON_SZFCHOOSE: '5073', // 送祝福选择时间页面
  ON_VIDEOPLAY: '5074', // 视频播放页面
  ON_FIXEDSCREEN: '5075', // 定屏播放页面
  ON_PLAYFOOTBALL: '5076', // 在谁是射手王页面
  ON_SHAKE_RUBBIT: '5077', // 在兔飞猛进页面
  ON_LUCKY_WHEEL: '5078', // 在幸运小转盘页面
  ON_CARD_LOTTER: '5079', // 在卡牌抽奖页面
  ON_CARD_ANSWER: '5080', // 卡牌抽奖答案
  ON_STARTRITE: '5081', // 在启动仪式页面
  ON_AOTEMAN: '5083', // 在猜奥特曼页面
  ON_ORDERSONG: '5082', // 在点歌页面
  ON_CWZYS: '5084', // 在猜文字颜色页面
  ON_GUESSGENERALITY: '5085', // 在猜电影页面
  ON_GIVEMARKOLD: '5086', // 在评分页面(旧版)
  ON_QSDSNEW: '5087', // 进入雀神大赛（新版）
  ON_HANZI: '5088', // 进入神奇汉字
  ON_HAPPYQA: '5089', // 进入开心问答
  ON_NEXTSONG: '5090', // 点歌切换歌曲
  ON_ALLHBYSET: '5091', // 点红包设置金额页面
  ON_GUESSSPEECH: '5092', // 在猜台词页面
  ON_SHOUTHBSET: '5093', // 在大喊红包页面，遥控器此时进入输入红包数
  ON_GOLDENSNAKE: '5094', // 在金蛇纳福页面
  ON_LUCKYSNAKE: '5095', // 在福蛇贺岁页面
  ON_GUESSANI: '5096', // 在猜动画页面中
  ON_PLAYPOKER: '5097', // 在扑克残局游戏页面
  ON_PLAYPOKER_RESTART: '5098', // 扑克残局游戏重新开始时
  ON_PLYAPOKER_PRODUCED: '5099', // 扑克残局游戏出牌结束后
  ON_BOXLOTTERY: '5100', // 在抽奖箱抽奖页面
  ON_MONEYTREESHAKE: '5101', // 在摇钱树页面
};

export const handleActionMessage = (action) => {
  if (!action) return;
  const actionObj = JSON.parse(action);
  if (actionObj.code === CONTROL_CODE_TO_REMOTE.ROUTER_JUMP) {
    router.push({ name: actionObj.param.routeName });
    return;
  }
  //   console.log( 'actionObj.code', actionObj.code, 'actionObj.param', actionObj.param)
  switch (actionObj.code) {
    // 切换游戏通用情况
    case CONTROL_CODE.ON_GAME_CHANGE:
      app.$store.commit('setCurrentMenuId', actionObj.param.id);

      app.$router.replace({
        path: '/main',
      });
      break;
    case REPLYCODE.ON_3DSIGN: // 大屏打开3D签到
      app.$store.commit('setCurrentMenuId', '0-1');

      break;
    case REPLYCODE.ON_SIGNBOOK: // 大屏打开签到簿
      app.$store.commit('setCurrentMenuId', '0-2');

      break;
    case REPLYCODE.ON_BUBBLESIGN: // 大屏打开手写签到
      app.$store.commit('setCurrentMenuId', '0-3');

      break;
    case REPLYCODE.ON_STARTRITE: // 大屏打开启动仪式
      app.$store.commit('setCurrentMenuId', '0-4');

      break;
    case REPLYCODE.ON_HOME: // 大屏打开首页
      console.log('大屏打开首页!');
      app.$store.commit('setCurrentMenuId', '');
      app.$router.replace({
        path: '/controllerV2',
      });
      break;
    case REPLYCODE.ON_XYDB: // 大屏打开幸运夺宝(转一转)
      app.$store.commit('setCurrentMenuId', '1-1');

      break;
    case REPLYCODE.ON_NYN: // 大屏打开扭一扭
      app.$store.commit('setCurrentMenuId', '1-2');

      break;
    case REPLYCODE.ON_LUCKY_WHEEL: // 大屏打开幸运小转盘
      app.$store.commit('setCurrentMenuId', '1-6');

      break;
    case REPLYCODE.ON_GUESSHBWAIT: // 大屏打开猜红包
      app.$store.commit('setCurrentMenuId', '1-3');
      app.$store.commit('updateGuessHbStatus', 0);

      break;
    case REPLYCODE.ON_HBYSET: // 大屏打开红包雨(摇红包)设置金额页面
      app.$store.commit('setCurrentMenuId', '2-2');
      app.$store.commit('setHbyStep', 0);

      break;
    case REPLYCODE.ON_ALLHBYSET: // 大屏打开全民红包雨(摇红包)设置金额页面
      app.$store.commit('setCurrentMenuId', '2-3');
      app.$store.commit('setHbyStep', 0);

      break;
    case REPLYCODE.ON_SHOUTHBSET: // 大屏打开大喊红包
      app.$store.commit('setCurrentMenuId', '2-4');
      app.$store.commit('setHbyStep', 0);
      break;
    case REPLYCODE.ON_HBYSETFAIL: // 大屏设置红包雨出错
      if (actionObj.param === '0') {
        app.$toast.fail('请输入正确的金额');
      } else if (actionObj.param === '1') {
        app.$toast.fail('金额错误,请先至后台进行充值');
      } else if (actionObj.param === '2') {
        app.$toast.fail('请输入正确的个数');
      } else if (actionObj.param === '3') {
        app.$toast.fail('单个红包金额必须大于0.3元！');
      }
      break;
    case REPLYCODE.ON_HBY:
      app.$store.commit('setHbyStep', 1);
      break;
    case REPLYCODE.ON_CLICKHBSET: // 大屏打开点红包设置金额页面
      app.$store.commit('setCurrentMenuId', '2-1');

      app.$store.commit('setHbyStep', 0);
      break;
    case REPLYCODE.ON_SHAKE: // 大屏打开默认摇一摇
      app.$store.commit('setCurrentMenuId', '3-1');

      break;
    case REPLYCODE.ON_SHAKE_MONKEY: // 大屏打开猴子爬树
      app.$store.commit('setCurrentMenuId', '3-2');

      break;
    case REPLYCODE.ON_SHAKE_SWIM: // 大屏打开游泳摇一摇
      app.$store.commit('setCurrentMenuId', '3-3');

      break;
    case REPLYCODE.ON_SHAKE_CITYCAR: // 大屏打开都市赛车
      app.$store.commit('setCurrentMenuId', '3-4');

      break;
    case REPLYCODE.ON_SHAKE_CATTLE: // 大屏打开谁最牛
      app.$store.commit('setCurrentMenuId', '3-5');

      break;
    case REPLYCODE.ON_SHAKE_ZXN: // 大屏打开追新娘
      app.$store.commit('setCurrentMenuId', '3-6');

      break;
    case REPLYCODE.ON_SHAKE_WEDCAR: // 大屏打开婚车摇一摇
      app.$store.commit('setCurrentMenuId', '3-7');

      break;
    case REPLYCODE.ON_SHAKE_DRADONBOAT: // 大屏打开赛龙舟
      app.$store.commit('setCurrentMenuId', '3-8');

      break;
    case REPLYCODE.ON_DRAGONFAIL: // 赛龙舟进入失败
      app.$toast.fail('需要去后台创建至少两支队伍才能开始游戏！');
      break;
    case REPLYCODE.ON_COUNTMONEY: // 大屏打开数钞票
      app.$store.commit('setCurrentMenuId', '4-2');

      break;
    case REPLYCODE.ON_PIGOUT: // 大屏打开狼吞虎咽
      app.$store.commit('setCurrentMenuId', '4-4');

      break;
    case REPLYCODE.ON_CLICKTIGER: // 大屏打开武松打虎
      app.$store.commit('setCurrentMenuId', '4-5');
      break;
    case REPLYCODE.ON_GOLDENSNAKE: // 大屏打开金蛇纳福
      // alert('大屏打开金蛇纳福');
      app.$store.commit('setCurrentMenuId', '4-9');
      break;
    case REPLYCODE.ON_LUCKYSNAKE:
      app.$store.commit('setCurrentMenuId', '3-12');
      break;
    case REPLYCODE.ON_MONEYTREESHAKE:
      app.$store.commit('setCurrentMenuId', '3-13');
      break;
    case REPLYCODE.ON_PLAYFOOTBALL: // 大屏打开谁是射手王
      console.log('大屏打开谁是射手王');
      app.$store.commit('setCurrentMenuId', '4-6');

      break;
    case REPLYCODE.ON_SHAKE_SEDANCHAIR: // 大屏打开抬花轿
      app.$store.commit('setCurrentMenuId', '3-9');

      break;
    case REPLYCODE.ON_SHAKE_TIGER: // 大屏打开虎年滑雪
      app.$store.commit('setCurrentMenuId', '3-10');

      break;
    case REPLYCODE.ON_SHAKE_RUBBIT: // 大屏打开兔飞猛进
      app.$store.commit('setCurrentMenuId', '3-11');

      break;
    case REPLYCODE.ON_CUTFRUIT: // 大屏打开切水果
      app.$store.commit('setCurrentMenuId', '4-1');

      break;
    case REPLYCODE.ON_KBXCHOOSE: // 大屏打开开宝箱类型选择页面
      app.$store.commit('setCurrentMenuId', '5-2');
      app.$store.commit('setKbxStep', 0);

      break;
    case REPLYCODE.ON_KBXCHOOSEFAIL: // 开宝箱选择类型出错
      app.$toast.fail(`红包口袋不足${actionObj.param}元,开始失败!`);
      break;
    case REPLYCODE.ON_KBXWAIT: // 开宝箱等待页面
      app.$store.commit('setKbxStep', 1);
      break;
    case REPLYCODE.ON_KBX: // 开宝箱游戏页面
      app.$store.commit('setKbxStep', 2);
      break;
    case REPLYCODE.ON_KBXRANK: // 开宝箱排行榜页面
      app.$store.commit('setKbxStep', 3);
      break;
    case REPLYCODE.ON_KBXOPENED: // 开宝箱某个宝箱已经开启
      actionObj.param = actionObj.param === '0' ? 0 : actionObj.param;
      app.$store.commit('updateOpenedBox', actionObj.param);
      break;
    case REPLYCODE.ON_HBWALLCHOOSE: // 大屏打开开红包墙类型选择页面
      app.$store.commit('setCurrentMenuId', '5-1');
      app.$store.commit('setHbwallStep', 0);

      break;
    case REPLYCODE.ON_HBWALLCHOOSEFAIL: // 红包墙选择类型出错
      app.$toast.fail(`红包口袋不足${actionObj.param}元,开始失败!`);
      break;
    case REPLYCODE.ON_HBWALLWAIT: // 红包墙等待页面
      app.$store.commit('setHbwallStep', 1);
      break;
    case REPLYCODE.ON_HBWALL: // 红包墙游戏页面
      app.$store.commit('setHbwallStep', 2);
      break;
    case REPLYCODE.ON_HBWALLRANK: // 红包墙排行榜页面
      app.$store.commit('setHbwallStep', 3);
      break;
    case REPLYCODE.ON_HBWALLOPENED: // 红包墙某个某个红包已经开启
      actionObj.param = actionObj.param === '0' ? 0 : actionObj.param;
      app.$store.commit('updateOpenedHb', actionObj.param);
      break;
    case REPLYCODE.ON_3DLOTTERY: // 大屏打开3D抽奖页面
      console.log('大屏打开3D抽奖页面');
      app.$store.commit('updateSheetChoosePeople', 'reset');
      app.$store.commit('setCurrentMenuId', '6-1');
      app.$store.commit('setLotteryType', '3d');
      // app.$store.commit('setLotteryPrizeInfo', actionObj.param)
      break;
    case REPLYCODE.ON_BOXLOTTERY: // 大屏打开抽奖箱抽奖页面
      app.$store.commit('updateSheetChoosePeople', 'reset');
      app.$store.commit('setCurrentMenuId', '6-10');
      app.$store.commit('setLotteryType', 'box');
      break;
    case REPLYCODE.ON_3DLOTTERYNOMOREPRIZE: // 3D抽奖显示没有更多奖项了
      app.$toast.fail('没有更多奖项啦!');
      break;
    case REPLYCODE.ON_3DLOTTERYNOMOREDATA: // 3D抽奖显示没有更多数据了
      app.$toast.fail('没有更多数据啦!');
      break;
    case REPLYCODE.ON_LOTTERYFAIL: // 抽奖人数不够提示
      app.$toast.fail('抽奖人数不够!');
      if (actionObj.param) {
        app.$store.commit('updateSheetChoosePeople', actionObj.param);
      }
      break;
    case REPLYCODE.ON_3DLOTTERYSHOWENDBTN: // 3D抽奖显示结束按钮
      app.$store.commit('updatePersonStopBtnVisible', true);
      break;
    case REPLYCODE.ON_3DLOTTERYINANI: // 抽奖动画执行中
      app.$store.commit('updateLottyerInAni', true);
      break;
    case REPLYCODE.ON_3DLOTTERYENDANI: // 抽奖动画结束
      app.$store.commit('updateLottyerInAni', false);
      break;
    case REPLYCODE.ON_SHEETLOTTERY: // 大屏打开名单抽奖页面
      app.$store.commit('updateSheetChoosePeople', 'reset');
      app.$store.commit('updateIsSheetLotteryNoUpload', false);
      app.$store.commit('setCurrentMenuId', '6-2');
      app.$store.commit('setLotteryType', 'sheet');
      app.$store.commit('updateSheetLotteryStatus', actionObj.param);

      break;
    case REPLYCODE.ON_SHEETLOTTERY_PARTICLE: // 大屏打开新名单抽奖页面
      app.$store.commit('updateSheetChoosePeople', 'reset');
      app.$store.commit('updateIsSheetLotteryNoUpload', false);
      app.$store.commit('setCurrentMenuId', '6-8');
      app.$store.commit('setLotteryType', 'sheet');
      app.$store.commit('updateSheetLotteryStatus', actionObj.param);
      break;
    case REPLYCODE.ON_DANMULOTTERY: // 大屏打开弹幕抽奖页面
      app.$store.commit('updateSheetChoosePeople', 'reset');
      app.$store.commit('updateIsSheetLotteryNoUpload', false);
      app.$store.commit('setCurrentMenuId', '6-9');
      app.$store.commit('setLotteryType', 'danmu');
      console.log('actionObj.param', actionObj.param);
      app.$store.commit('updateDanmuLotteryStatus', actionObj.param);
      break;
    case REPLYCODE.ON_SCREENLOTTERY: // 大屏打开巨幕抽奖页面
      app.$store.commit('updateSheetChoosePeople', 'reset');
      app.$store.commit('setCurrentMenuId', '6-3');
      app.$store.commit('setLotteryType', 'screen');
      app.$store.commit('updateScreenLotteryStatus', actionObj.param);

      break;
    case REPLYCODE.ON_SPHERE_LOTTERY: // 大屏打开地球抽奖页面
      app.$store.commit('updateSheetChoosePeople', 'reset');
      app.$store.commit('updateIsSheetLotteryNoUpload', false);
      app.$store.commit('setCurrentMenuId', '6-4');
      app.$store.commit('setLotteryType', 'earth');
      app.$store.commit('updateEarthLotteryStatus', actionObj.param);

      break;
    case REPLYCODE.ON_CARD_LOTTER: // 大屏打开卡牌抽奖页面
      app.$store.commit('setCurrentMenuId', '6-6');
      app.$store.commit('setLotteryType', 'card');
      app.$store.commit('updatecardLotteryStatus', actionObj.param);

      break;
    case REPLYCODE.ON_PICTURE_LOTTERY: // 大屏打开图片抽奖页面
      app.$store.commit('updateSheetChoosePeople', 'reset');
      app.$store.commit('setCurrentMenuId', '6-5');
      app.$store.commit('setLotteryType', 'picture');
      app.$store.commit('updatePictureLotteryStatus', actionObj.param);

      break;
    case REPLYCODE.ON_SHEETLOTTERYUPLOADTIP: // 名单抽奖 没有上传名单提示
      app.$store.commit('updateIsSheetLotteryNoUpload', true);
      break;
    case REPLYCODE.ON_MINIGAME: // 小游戏页面
      app.$store.commit('setCurrentMenuId', '7');

      break;
    case REPLYCODE.ON_GXCMX: // 大屏在搞笑猜明星页面
      app.$store.commit('setCurrentMenuId', '7-1');

      break;
    case REPLYCODE.ON_CMX: // 大屏在猜明星页面
      app.$store.commit('setCurrentMenuId', '7-2');

      break;
    case REPLYCODE.ON_KXCCY: // 大屏在开心猜成语页面
      app.$store.commit('setCurrentMenuId', '7-3');

      break;
    case REPLYCODE.ON_CCY: // 大屏在猜成语页面
      app.$store.commit('setCurrentMenuId', '7-4');

      break;
    case REPLYCODE.ON_VOTE: // 大屏在投票页面
      app.$store.commit('setCurrentMenuId', '7-5');

      break;
    case REPLYCODE.ON_CYX: // 大屏在猜英雄页面
      app.$store.commit('setCurrentMenuId', '7-6');

      break;
    case REPLYCODE.ON_CGM: // 大屏在猜歌名页面
      app.$store.commit('setCurrentMenuId', '7-7');

      break;
    case REPLYCODE.ON_AOTEMAN: // 大屏在猜奥特曼页面
      app.$store.commit('setCurrentMenuId', '7-14');

      break;
    case REPLYCODE.ON_HANZI: // 大屏在神奇的汉字页面
      app.$store.commit('setCurrentMenuId', '7-16');

      break;
    case REPLYCODE.ON_GUESSGENERALITY: // 大屏在猜电影页面
      app.$store.commit('setCurrentMenuId', '7-15');
      break;
    case REPLYCODE.ON_GUESSANI: // 大屏在猜动画页面
      app.$store.commit('setCurrentMenuId', '7-24');
      break;
    case REPLYCODE.ON_GUESSSPEECH: // 大屏在猜台词页面
      app.$store.commit('setCurrentMenuId', '7-21');
      break;
    case REPLYCODE.ON_HYJJ: // 大屏在火眼金睛页面
      app.$store.commit('setCurrentMenuId', '7-8');

      break;
    case REPLYCODE.ON_QSDS: // 大屏在雀神大赛页面
      if (multipleScreen.canIExe()) {
        console.log('执行了方法');
        /**
         * 如果有值说明是大屏要求遥控器生成题目
         */
        if (actionObj.param) {
          multipleScreen.setFromScreen(false);
        } else {
          multipleScreen.setFromScreen(true);
        }
        multipleScreen.setDifficulty(actionObj.param);
        app.$store.commit('setCurrentMenuId', '7-18');
      } else console.log('没有执行方法');

      break;
    case REPLYCODE.ON_QSDSNEW: // 大屏在互动雀神大赛
      // 清除之前的答案
      app.$store.commit('updateCurrentMiniGameAnswer', '');
      app.$store.commit('setCurrentMenuId', '7-9');

      break;
    case REPLYCODE.ON_SCDT: // 大屏在诗词答题页面
      app.$store.commit('setCurrentMenuId', '7-10');

      break;
    case REPLYCODE.ON_MINIGAMEANS: // 小游戏答案
      app.$store.commit('updateCurrentMiniGameAnswer', actionObj.param);
      break;
    case REPLYCODE.ON_CARD_ANSWER:
      app.$store.commit('updateCardAnswer', actionObj.param);
      break;
    case REPLYCODE.ON_JUMPBONE: // 大屏打开跳一跳
      app.$store.commit('setCurrentMenuId', '7-11');

      break;
    case REPLYCODE.ON_CWZYS: // 大屏打开猜文字游戏
      app.$store.commit('setCurrentMenuId', '7-13');
      break;
    case REPLYCODE.ON_CWZYS_TIMESTAMP: // 猜文字游戏时间戳
      multipleScreen.setCwzTimeStamp(parseInt(actionObj.param, 10));
      break;
    case REPLYCODE.ON_GIVEMARK: // 大屏打开评分(新版)
      app.$store.commit('setCurrentMenuId', '7-12');

      app.$store.commit('setGiveMarkVersion', 'new');
      break;
    case REPLYCODE.ON_GIVEMARKOLD: // 大屏打开评分(旧版)
      app.$store.commit('setCurrentMenuId', '7-12');

      app.$store.commit('setGiveMarkVersion', 'old');
      break;
    case REPLYCODE.ON_GUESSHBUNRECHARGE: // 猜红包未充值
      app.$toast.fail('尚未充值红包!游戏开启失败!');
      break;
    case REPLYCODE.ON_GUESSHBON: // 猜红包游戏界面
      app.$store.commit('setCurrentMenuId', '1-3');
      app.$store.commit('updateGuessHbStatus', 1);
      break;
    case REPLYCODE.ON_XIEMU: // 谢幕界面
      app.$store.commit('setCurrentMenuId', '8-6');
      break;
    case REPLYCODE.ON_XIEMUFAIL: // 谢幕打开失败
      app.$toast.fail('后台设置好谢幕信息后重新进入大屏!');
      break;
    case REPLYCODE.ON_ZFDMCHOOSE: // 在争分夺秒类型选择页面
      app.$store.commit('setCurrentMenuId', '1-4');
      app.$store.commit('setZfdmStep', 0);
      app.$store.commit('setZfdmList', JSON.parse(actionObj.param));
      break;
    case REPLYCODE.ON_ZFDMCHOOSEFAIL: // 争分夺秒选择类型出错
      app.$toast.fail(`红包口袋不足${actionObj.param}元,开始失败!`);
      break;
    case REPLYCODE.ON_ZFDMGAME: // 争分夺秒游戏页面
      app.$store.commit('setZfdmStep', 2);
      break;
    case REPLYCODE.ON_ZFDMRANK: // 争分夺秒排行榜页面
      app.$store.commit('setZfdmStep', 3);
      break;
    case REPLYCODE.ON_ZFDMWAIT: // 争分夺秒等待页面
      app.$store.commit('setZfdmStep', 1);
      break;
    case REPLYCODE.ON_SZFGAME: // 在送祝福游戏页面
      app.$store.commit('setSzfStep', 1);
      break;
    case REPLYCODE.ON_SZFRANK: // 在送祝福排行榜页面
      app.$store.commit('setSzfStep', 2);
      break;
    case REPLYCODE.ON_SZFCHOOSE:
      app.$store.commit('setCurrentMenuId', '1-5');
      app.$store.commit('setSzfStep', 0);
      break;
    case REPLYCODE.ON_VIDEOPLAY:
      app.$store.commit('setMediaList', JSON.parse(actionObj.param));
      break;
    case REPLYCODE.ON_FIXEDSCREEN:
      app.$store.commit('setMediaList', JSON.parse(actionObj.param));
      break;
    case REPLYCODE.ON_ORDERSONG: // 大屏打开点歌
      app.$router.replace({
        path: '/chooseSongMain',
      });
      break;
    case REPLYCODE.ON_HAPPYQA: // 大屏在开心问答页面
      app.$store.commit('setCurrentMenuId', '7-17');

      break;
    case REPLYCODE.ON_NEXTSONG: // 点歌切歌
      app.$store.commit('setCurrentSongId', actionObj.param);
      break;
    case REPLYCODE.ON_PLAYPOKER: // 大屏在扑克游戏页面
      app.$store.commit('setCurrentMenuId', '7-25');
      break;
    case REPLYCODE.ON_PLAYPOKER_RESTART: // 大屏扑克游戏发牌结束
      app.$store.commit('setNewPokerData', actionObj.param);
      break;
    case REPLYCODE.ON_PLYAPOKER_PRODUCED: // 大屏扑克游戏出牌结束
      console.log('ON_PLYAPOKER_PRODUCED');
      app.$store.commit('setNewPokerData', actionObj.param);
      break;
    default:
      console.log('switch参数异常!', actionObj);
  }
};

/**
 * 全局消息处理函数
 * @param {*} message
 * @returns
 */
export const globalHandleMessage = (message) => {
  if (message.type !== 'yaokongqi') return;
  const logStyle = 'background: #39C5BB; padding: 2px 4px; border-radius: 2px;';
  console.log('%c 消息:', logStyle, message);
  tellScreenStatus(message.data);
  if (message.data.type === 'gameInit' && message.data?.data?.gameId) {
    store.commit('setCurrentMenuId', message.data.data.gameId);
    return;
  }

  // 针对非游戏初始化发送的消息，以及也非旧形式的消息，进行处理
  const miaoYkqCodeObj = JSON.parse(message.data.miaoYkqCode);
  if (!miaoYkqCodeObj?.code && miaoYkqCodeObj?.param?.gameId) {
    store.commit('setCurrentMenuId', miaoYkqCodeObj.param.gameId);
    return;
  }

  // 旧的消息处理方式
  handleActionMessage(message?.data?.miaoYkqCode);
};
