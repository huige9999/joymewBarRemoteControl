// src/store/modules/menu/index.js
// 开启命名空间的 Vuex 模块骨架
import pageInteractionMenu from '@/assets/constant/pageInteractionMenu';
import globalControlMenu from '@/assets/constant/globalControlMenu';
import { reqGetRouterList } from '@/api/index';
import { convertControlModeToMenu, filterMenuByConverted } from './helper';

const state = {
  menu: [],
  selectedLeafMenu: null,
  globalMenu: [],
  isKeyboardVisible: false, // 键盘是否可见
};

const mutations = {
  setMenu(state, menu) {
    state.menu = menu;
  },
  setSelectedLeafMenu(state, menuObj) {
    state.selectedLeafMenu = menuObj;
    console.log('selectedLeafMenu', state.selectedLeafMenu);
  },
  setGlobalMenu(state, menu) {
    state.globalMenu = menu;
  },
  setKeyboardVisible(state, visible) {
    state.isKeyboardVisible = visible;
  },
};

const actions = {
  async initMenu({ commit }) {
    try {
      const res = await reqGetRouterList();
      if (!res?.isHasVal) {
        commit('setMenu', pageInteractionMenu);
        commit('setGlobalMenu', globalControlMenu);
        return;
      }
      const { remoteControlFuncs } = JSON.parse(res.data);
      const convertedMenu = convertControlModeToMenu(remoteControlFuncs);

      const { filteredPageMenu, filteredGlobalMenu } = filterMenuByConverted(
        convertedMenu,
        pageInteractionMenu,
        globalControlMenu,
      );

      commit('setMenu', filteredPageMenu);
      commit('setGlobalMenu', filteredGlobalMenu);

      console.log('Converted Menu:', convertedMenu);
    } catch (error) {
      console.error('Error fetching remote control functions:', error);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
