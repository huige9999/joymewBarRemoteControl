import { getChatMessage } from '@/api/indexV2';
import { bus } from '@/utils/websocket/v2/index';
import { mapChatList, formatChatFromWSH5 } from './helper';

const MAX_CHAT_HISTORY = 30;

const state = {
  chatList: [], // 聊天记录(包括发送礼物记录、聊天记录)
};

const mutations = {
  initChatList(state, chatList) {
    // 只保留最新的 MAX_CHAT_HISTORY 条
    state.chatList = chatList.slice(-MAX_CHAT_HISTORY);
  },
  addChatList(state, newChat) {
    // 只处理单条消息
    state.chatList = [...state.chatList, newChat].slice(-MAX_CHAT_HISTORY);
  },
};

const actions = {
  async getChatList(ctx) {
    try {
      // 1. 获取聊天原始数据
      const res = await getChatMessage();
      // 2. 获取全局的 giftListAll
      const { giftListAll } = ctx.rootState.gift;
      // 3. 调用 mapChatList，传 giftListAll
      const mappedList = mapChatList(res.data.chat_list, giftListAll);
      // 4. 存储
      ctx.commit('initChatList', mappedList);
      // 打印聊天记录
      console.log('mappedList', mappedList);
    } catch (err) {
      console.log(err);
    }
  },
  listenChatMessage({ commit, rootState }) {
    // 避免重复监听
    bus.$off('chat-message');
    bus.$on('chat-message', (msg) => {
      commit('addChatList', formatChatFromWSH5(msg, rootState.gift.giftListAll));
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
