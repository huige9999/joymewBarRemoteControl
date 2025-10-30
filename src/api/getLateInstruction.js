import store from '@/store/index';
import request from '@/utils/request';

/**
 * 获取最后一次从大屏接收到的指令
 * 用于在遥控器端重新进入后还原状态
 */
const getLateInstruction = () => {
  return request.post('sendMsgController/duxin_late', {
    splid: store.state.liveId,
  });
};
export default getLateInstruction;
