import store from '@/store';
import * as multipleScreen from '@/utils/multipleScreenResolve';

const REPLYCODE = {
  ON_CARD_ANSWER: '5080',
  ON_HBYSET: '5007',
  ON_HBY: '5009',
  ON_CLICKHBSET: '5010',
  ON_SHOUTHBSET: '5093',
  ON_ALLHBYSET: '5091',
  ON_MINIGAMEANS: '5052',
  ON_QSDS: '5050',
  ON_ZFDMCHOOSE: '5066',
  ON_KBXCHOOSE: '5022',
  ON_KBXWAIT: '5024',
  ON_KBX: '5025',
  ON_KBXRANK: '5026',
  ON_KBXOPENED: '5027',
  ON_HBWALLCHOOSE: '5028', // 新增红包墙类型选择
  ON_HBWALLWAIT: '5030', // 红包墙等待页面
  ON_HBWALL: '5031', // 红包墙游戏页面
  ON_HBWALLRANK: '5032', // 红包墙排行榜
  ON_NEXTSONG: '5090',
  ON_VIDEOPLAY: '5074', // 视频播放页面
  ON_FIXEDSCREEN: '5075', // 定屏播放页面
  OTHERS: 'others',
  ON_XIEMUFAIL: '5059', // 谢幕打开失败
};

const HBY_SET_CODES = [
  REPLYCODE.ON_HBYSET,
  REPLYCODE.ON_CLICKHBSET,
  REPLYCODE.ON_SHOUTHBSET,
  REPLYCODE.ON_ALLHBYSET,
];

// 处理红包口袋充值消息
function handleRedkdMessage(message) {
  const miaoChiGold = message?.data?.miaoChiGold;
  if (miaoChiGold) {
    store.commit('live/SET_BALANCE', Number(miaoChiGold));
  }
}

// 处理数据传输的消息
function handleDataTransfer(miaoYkqCode) {
  if (miaoYkqCode.action === 'MusicPlayer') {
    // 音乐播放器数据传输
    store.commit('setMusicPlayerData', JSON.parse(miaoYkqCode.param));
  } else if (miaoYkqCode.action === 'moneyTreeShake') {
    store.commit('game/SET_MONEY_TREE_SHAKE_CHOOSE_MODE', miaoYkqCode.param === 'chooseMode');
  }
}

// 处理雀神大赛页面消息
function handleQsdsMessage(miaoYkqCode, store) {
  if (miaoYkqCode.param) {
    multipleScreen.setFromScreen(false);
  } else {
    multipleScreen.setFromScreen(true);
  }
  multipleScreen.setDifficulty(miaoYkqCode.param);
  store.commit('game/SET_TRIGGER_INIT_MAHJONG_PAGE', true);
}

// 处理遥控器消息
function handleYaokongqiMessage(message, bus) {
  const miaoYkqCodeRaw = message?.data?.miaoYkqCode;
  if (miaoYkqCodeRaw) {
    const miaoYkqCode = JSON.parse(miaoYkqCodeRaw);
    if (miaoYkqCode.type === 'message') {
      bus.$toast(miaoYkqCode.action);
    } else if (miaoYkqCode.type === 'dataTransfer') {
      handleDataTransfer(miaoYkqCode);
    } else if (miaoYkqCode.code === REPLYCODE.ON_CARD_ANSWER) {
      store.commit('updateCardAnswer', miaoYkqCode.param);
    } else if (HBY_SET_CODES.includes(miaoYkqCode.code)) {
      store.commit('setHbyStep', 0); // 设置红包雨为设置阶段
    } else if (miaoYkqCode.code === REPLYCODE.ON_HBY) {
      store.commit('setHbyStep', 1); // 设置红包雨为游戏阶段
    } else if (miaoYkqCode.code === REPLYCODE.ON_MINIGAMEANS) {
      store.commit('updateCurrentMiniGameAnswer', miaoYkqCode.param);
    } else if (miaoYkqCode.code === REPLYCODE.ON_ZFDMCHOOSE) {
      store.commit('setZfdmList', JSON.parse(miaoYkqCode.param));
    } else if (miaoYkqCode.code === REPLYCODE.OTHERS) {
      if (miaoYkqCode.param.type === 'GestureRiddleCategoryList') {
        store.commit('game/SET_CATEGORY_LIST', miaoYkqCode.param.data);
      }
    } else if (miaoYkqCode.code === REPLYCODE.ON_QSDS) {
      handleQsdsMessage(miaoYkqCode, store);
    } else if (miaoYkqCode.code === REPLYCODE.ON_KBXCHOOSE) {
      // 处理开宝箱类型选择页面
      const kbxTypeList = JSON.parse(miaoYkqCode.param);
      store.commit('game/SET_KBX_TYPE_LIST', kbxTypeList);
      store.commit('setKbxStep', 0);
    } else if (miaoYkqCode.code === REPLYCODE.ON_KBXWAIT) {
      store.commit('setKbxStep', 1);
    } else if (miaoYkqCode.code === REPLYCODE.ON_KBX) {
      store.commit('setKbxStep', 2);
    } else if (miaoYkqCode.code === REPLYCODE.ON_KBXRANK) {
      store.commit('setKbxStep', 3);
    } else if (miaoYkqCode.code === REPLYCODE.ON_HBWALLCHOOSE) {
      const hbwallTypeList = JSON.parse(miaoYkqCode.param);
      store.commit('game/SET_HBWALL_TYPE_LIST', hbwallTypeList);
      store.commit('setHbwallStep', 0);
    } else if (miaoYkqCode.code === REPLYCODE.ON_HBWALLWAIT) {
      store.commit('setHbwallStep', 1);
    } else if (miaoYkqCode.code === REPLYCODE.ON_HBWALL) {
      store.commit('setHbwallStep', 2);
    } else if (miaoYkqCode.code === REPLYCODE.ON_HBWALLRANK) {
      store.commit('setHbwallStep', 3);
    } else if (miaoYkqCode.code === REPLYCODE.ON_NEXTSONG) {
      store.commit('setCurrentSongId', miaoYkqCode.param);
    } else if (
      miaoYkqCode.code === REPLYCODE.ON_VIDEOPLAY
      || miaoYkqCode.code === REPLYCODE.ON_FIXEDSCREEN
    ) {
      store.commit('setMediaList', JSON.parse(miaoYkqCode.param));
    } else if (miaoYkqCode.code === REPLYCODE.ON_XIEMUFAIL) {
      bus.$toast('后台未设置谢幕信息!');
    }
  }
}

// handleRemoteControlMessage 事件名规则：必须以 remote- 开头
// 主ws消息处理
const handleRemoteControlMessage = (message, bus) => {
  // 远控消息处理逻辑
  console.log('handleRemoteControlMessage', message);
  try {
    if (message.type === 'redkd') {
      handleRedkdMessage(message);
    } else if (message.type === 'yaokongqi') {
      handleYaokongqiMessage(message, bus);
    }
  } catch (e) {
    console.error('解析miaoYkqCode失败', e);
  }
};
export default handleRemoteControlMessage;
