import store from '@/store/index';
import request from '@/utils/request';
import requestWWW from '@/utils/requestWWW';

export const reqGetRouterList = () => {
  return requestWWW.post('/sheZhi/getSplInfo', {
    token: store.state.token,
    splid: store.state.liveId,
  });
};

// 生成猜红包二维码
export function generateGuessHbQrcode() {
  return requestWWW.post('question/getQrUrl', {
    url: `https://www.hudongmiao.com/hb/method1?splid=${store.state.liveId}`,
    type: 'question',
  });
}
// 获取猜红包充值状态
export function getGuessHbStatus() {
  return requestWWW.post('hb/getPhotoUserInfo', {
    splid: store.state.liveId,
    token: store.state.token,
  });
}
// 设置猜红包模式
export function setGuessHbMod(pObj) {
  return requestWWW.post('hb/setGuessMoney', {
    splid: store.state.liveId,
    token: store.state.token,
    type: pObj.type,
    guess_money: pObj.guessMoney,
  });
}

// 获取h5接口调用token
export function getTokenH5() {
  return requestWWW.post('host/getSiyiToken', {
    token: store.state.token,
  });
}

// 获取礼物列表
export function getGiftList() {
  return request.post('hmGiftController/listGift7', {
    splid: store.state.liveId,
  });
}

// 发礼物广播
export function sendGiftMessage({
  miaoColor = '',
  sendType = '',
  giftId = '',
}) {
  return request.post('sendMsgController/liwuGo6', {
    splid: store.state.liveId,
    liwuId: giftId,
    content: '',
    miaoColor,
    send_type: sendType,
  });
}

// 编辑点歌
export function editMusicStatus({
  sort,
  heartWallId,
}) {
  return request.post('hmGiftController/editMusicStatus', {
    splid: store.state.liveId,
    heartWallId,
    sort,
  });
}

// 获取点歌列表
export function getMusicList() {
  return request.post('hmGiftController/getMusicList', {
    splid: store.state.liveId,
  });
}

/** 获取雀神大赛当前轮次剩余时间 */
export const getMajiangRoundInfo = () => {
  return request.post('newPlay/mjEnterGame', {
    splid: store.state.liveId,
  });
};

/** 获取活动信息
 * @param {String} key 要查询的信息的key
 */
export const reqGetActivityDetail = (key) => requestWWW.post('/sheZhi/getActivityDetail', {
  token: store.state.token,
  splid: store.state.liveId,
  key,
});

/** 开关内定抽奖测试
 * @param {boolean} isSwitchOn 开关状态
 */
export const reqSwitchArrangedLotteryTest = (isSwitchOn) => {
  return requestWWW.post(
    'sheZhi/switchArrangedLotteryTest',
    {
      token: store.state.token,
      splid: store.state.liveId,
      isSwitchOnArrangedLotteryTest: isSwitchOn ? '1' : '0',
    },
  );
};
