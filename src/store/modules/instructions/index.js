import { sendInstrunction } from '@/api/indexV2';

const state = {};

const mutations = {};

const actions = {
  /**
 * 发送指令到大屏幕
 * @param {Object} payload - 指令参数
 * @param {'game_control'|'router_jump'|'global_control'} payload.type - 指令大类
 * @param {string} payload.action - 具体操作
 * @param {Object} [payload.param] - 可选参数
 * @returns {Promise}
 */
  sendInstruction(_context, payload) {
    const { type, action, param } = payload;
    return sendInstrunction({ type, action, param });
  },
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
