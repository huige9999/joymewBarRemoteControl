const state = {
  categoryList: ['生活', '食品', '物品', '人物', '电影', '成语'],
  triggerInitMahjongPage: false, // 新增状态，控制initMahjongPage调用
  kbxTypeList: [], // 新增开宝箱类型列表
  hbwallTypeList: [], // 新增红包墙类型列表
  moneyTreeShakeChooseMode: false, // 摇钱树选择模式
};

const mutations = {
  SET_CATEGORY_LIST(state, categoryList) {
    state.categoryList = categoryList;
  },
  SET_TRIGGER_INIT_MAHJONG_PAGE(state, value) {
    state.triggerInitMahjongPage = value;
  },
  SET_KBX_TYPE_LIST(state, kbxTypeList) {
    state.kbxTypeList = kbxTypeList;
  },
  SET_HBWALL_TYPE_LIST(state, hbwallTypeList) {
    state.hbwallTypeList = hbwallTypeList;
  },
  SET_MONEY_TREE_SHAKE_CHOOSE_MODE(state, value) {
    state.moneyTreeShakeChooseMode = value;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};
