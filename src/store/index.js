import Vue from 'vue';
import Vuex from 'vuex';
import instructions from './modules/instructions/index';

Vue.use(Vuex);

const state = {
  liveId: '',
  token: '',
  currentSongId: '',
};

const mutations = {
  initLiveId(currentState, liveId) {
    currentState.liveId = liveId;
  },
  initToken(currentState, token) {
    currentState.token = token;
  },
  setCurrentSongId(currentState, songId) {
    currentState.currentSongId = songId || '';
  },
};

const actions = {};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    instructions,
  },
});
