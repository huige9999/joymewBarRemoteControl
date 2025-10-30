import { getGiftList, getSignRankList } from '@/api/indexV2';
import { generateRandomId } from '@/utils/index';
import { computeGiftListAll } from './helper';

const state = {
  giftListAll: [],
  giftSenderRankList: [],
  // 礼物播放相关状态
  giftQueue: [],
  currentGiftEffect: {
    id: '',
    path: '', // svga 文件路径
    userName: '',
    headImg: '',
  },
};

const mutations = {
  setGiftListAll(state, list) {
    state.giftListAll = list;
  },
  setGiftSenderRankList(state, list) {
    state.giftSenderRankList = list;
  },
  // 添加礼物到队列
  addToGiftQueue: (state, data) => {
    // 如果当前没有礼物在播放，直接设置为当前礼物
    if (!state.currentGiftEffect.id) {
      state.currentGiftEffect = {
        ...data, // 传入处理好的礼物数据
        id: generateRandomId(),
      };
    } else {
      // 否则，加入等待队列
      state.giftQueue.push(data);
    }
  },
  // 从队列中移除一个礼物（当一个礼物播放完成时调用）
  removeFromGiftQueue: (state) => {
    const list = state.giftQueue;
    // 如果队列为空，清空当前礼物
    if (list.length === 0) {
      state.currentGiftEffect = {
        id: '',
        path: '',
        userName: '',
        headImg: '',
      };
    } else {
      // 否则，取出队列中的下一个礼物进行播放
      const nextGift = list.shift();
      state.giftQueue = list; // 更新队列
      state.currentGiftEffect = {
        ...nextGift,
        id: generateRandomId(),
      };
    }
  },
};

const actions = {
  async fetchGiftListAll({ commit }) {
    const res = await getGiftList();
    const list = computeGiftListAll(res.data);
    commit('setGiftListAll', list);
    return list;
  },
  async fetchGiftSenderRankList({ commit }) {
    const res = await getSignRankList();
    const getTypeLabel = (type) => {
      if (!type) {
        return '';
      }
      return type.startsWith('1') ? '男方' : '女方';
    };
    const list = res.data?.list1.map((item) => ({
      ...item,
      positionName: getTypeLabel(item.position),
    })) || [];
    commit('setGiftSenderRankList', list);
    return list;
  },
  // 监听礼物消息的 Action
  listenGiftMessage({ commit, rootState }) {
    const { bus } = require('@/utils/websocket/v2/index'); // 延迟引入避免循环依赖
    // 监听 chat-message 事件，处理礼物消息
    bus.$on('chat-message', (msg) => {
      // 确保是礼物消息
      if (msg.miaoLwId) {
        // 从 giftListAll 中查找完整的礼物信息
        const giftInfo = rootState.gift.giftListAll.find(
          (item) => item.giftconst === msg.miaoLwId,
        );

        if (giftInfo) {
          // 提交到队列
          commit('addToGiftQueue', {
            path: giftInfo.coupontype,
            giftName: giftInfo.giftname,
            userName: msg.miaoName,
            headImg: msg.miaoHeadUrl,
          });
        }
      }
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
