import store from '@/store/index';
import request from '@/utils/request';

/**
 * 发送指令给大屏
 * @param {Object} pObj 请求参数
 * @param {string} pObj.code 指令码
 * @param {any} [pObj.param] 指令参数（可选）
 * @returns {Promise}
 */
const sendInstrunction = (pObj) => {
  const tmpParam = {
    code: pObj.code,
    param: pObj.param ?? '',
    uniqueId: Date.now(),
  };
  const tmpParamStr = JSON.stringify(tmpParam);
  return request.post('sendMsgController/toScreen', {
    splid: store.state.liveId,
    ykq_info: tmpParamStr,
  });
};
export default sendInstrunction;
