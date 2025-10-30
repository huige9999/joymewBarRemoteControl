import { getSplInfoNe } from '@/api/indexV2';

const state = {
  balance: 0, // 红包口袋余额
  person: 0, // 签到人数
};

const mutations = {
  SET_BALANCE(state, balance) {
    state.balance = balance;
  },
  SET_PERSON(state, person) {
    state.person = person;
  },
};

const actions = {
  async fetchSplInfo({ commit }) {
    try {
      const res = await getSplInfoNe();
      if (res) {
        commit('SET_BALANCE', res.balance);
        commit('SET_PERSON', res.person);
      }
    } catch (error) {
      // 可以根据需要处理错误
      console.error('获取签到人数和余额失败', error);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
