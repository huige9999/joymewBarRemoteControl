import store from '@/store/index';
import request from '@/utils/request';
import requestWWW from '@/utils/requestWWW';

// 获取聊天记录
export function getChatMessage() {
  return request.get(
    `wxScan/getMsgInfo?splid=${store.state.liveId}&num=1&size=30`,
  );
}

// 获取礼物列表
export function getGiftList() {
  return request.post('hmGiftController/listGift7', {
    splid: store.state.liveId,
  });
}

/**
 * 发送指令给大屏
 * @param {'game_control'|'router_jump'|'global_control'} type 指令大类 (必要参数)
 * @param {string} action 具体参数 (必要参数)
 * @param {object} param 指令参数（可选）
 * @returns {Promise}
 */
export const sendInstrunction = ({ type, action, param }) => {
  const paramForAPI = {
    type,
    action,
  };
  if (param !== undefined) {
    paramForAPI.param = param;
  }
  // 固定注入uniqueId
  paramForAPI.uniqueId = Date.now();
  const paramForAPIStr = JSON.stringify(paramForAPI);
  return request.post('sendMsgController/toScreen', {
    splid: store.state.liveId,
    ykq_info: paramForAPIStr,
  });
};

// 重新发送礼物
export function resendGift({ miaoId, miaoLiwuId, splid = store.state.liveId }) {
  return requestWWW.post('huoDongHm/sendMsgToWs', {
    miaoId,
    miaoLiwuId,
    splid,
    token: store.state.token,
  });
}

// 新增：重新发送礼物消息到WS
/**
 * 重新发送礼物消息到WS
 * @param {Object} params
 * @param {string} params.splid 活动ID，默认取store.state.liveId
 * @param {string} params.userId 用户ID
 * @param {string} params.giftid 礼物ID
 * @param {string} params.miaoContent 礼物内容
 * @returns {Promise}
 */
export function resendGiftMsgToWs({ splid = store.state.liveId, userId, giftid, miaoContent }) {
  return requestWWW.get('huoDongHm/sendGiftMsgToWs', {
    params: {
      splid,
      userId,
      giftid,
      miaoContent,
      token: store.state.token,
    },
  });
}

// 重新发送超级弹幕
export function resendSuperDanmu({ heartWallId, splid = store.state.liveId }) {
  return requestWWW.post('huoDongHm/sendSuperMsgToWs', {
    heart_wall_id: heartWallId,
    splid,
    token: store.state.token,
  });
}

// 获取签到排行榜
export function getSignRankList() {
  return request.post('hmGiftController/findGiftRankListAll', {
    splid: store.state.liveId,
  });
}

/**
 * 获取活动信息（余额和人数）
 */
export function getSplInfoNe() {
  return requestWWW.get('newHuoDongHm/getSplInfoNe', {
    params: {
      splid: store.state.liveId,
      token: store.state.token,
    },
  });
}

/**
 * 拉黑用户
 * @param {Object} params
 * @param {string} params.splid 活动ID，默认取store.state.liveId
 * @param {'1'|'0'} params.type 拉黑类型，'1'为拉黑，'0'为取消拉黑
 * @param {string} params.userId 用户ID
 * @returns {Promise}
 */
export function addBlackList({ splid = store.state.liveId, type, userId }) {
  return requestWWW.post('zhongJiang/addBlackList', {
    splid,
    type,
    userId,
    token: store.state.token,
  });
}
