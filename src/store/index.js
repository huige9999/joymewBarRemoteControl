import { getGiftList, getTokenH5, reqGetRouterList } from '@/api/index';
import router, { ORIGINAL_ROUTES } from '@/router';
import { searchRouteNameByMenuId } from '@/router/helper';
import { generateRandomId } from '@/utils/index';
import Vue from 'vue';
import Vuex from 'vuex';
import chat from './modules/chat/index';
import game from './modules/game';
import gift from './modules/gift/index';
import instructions from './modules/instructions/index';
import live from './modules/live';
import menu from './modules/menu/index';

Vue.use(Vuex);

const state = {
  liveId: '',
  token: '',
  currentMenuId: '',
  hbyStep: 0, // 0:设置金额 1:游戏控制
  kbxStep: 0, // 0:选择宝箱类型 1: 游戏等待 2: 游戏中 3: 游戏结束
  hbwallStep: 0, // 0:选择红包墙类型 1: 游戏等待 2: 游戏中 3: 游戏结束
  openedBox: [],
  openedHb: [],
  lotteryType: '3d', // 3d: 3d抽奖 sheet:名单抽奖 screen: 巨幕抽奖 earth：地球抽奖 picture：图片抽奖 card: 卡牌抽奖
  isSheetLotteryNoUpload: false, // 名单抽奖是否上传名单
  currentMiniGameAnswer: '', // 当前小游戏答案
  isScreenStatus: 1, // 大屏状态 0:关闭 1:未知 2:开启
  guessHbStatus: 0, // 0：等待新人充值 1: 游戏进行中
  zfdmList: [], // 争分夺秒类型列表
  zfdmStep: 0, // 0：选择争分夺秒类型 1：游戏中 2：游戏结束
  szfStep: 0, // 0: 选择送祝福时间 1: 游戏中 2: 游戏结束
  personStopBtnVisible: false, // 3d抽奖手动停止按钮的出现与否
  lottyerInAni: false, // 抽奖是否在动画过程中
  sheetLotteryStatus: '0',
  sheetChoosePeople: 0,
  screenLotteryStatus: '0',
  earthLotteryStatus: '0',
  danmuLotteryStatus: '0',
  pictureLotteryStatus: '0',
  cardLotteryStatus: '0',
  giftTitleList: [], // 礼物标题列表
  giftList: [],
  giftListAll: [],
  tokenH5: '',
  mediaList: [], // 视频播放/定屏列表
  cardAnswer: [],
  chooseSongVisible: false, // 是否显示点歌模块
  giveMarkVersion: 'new', // 评分版本 new:新版 old: 旧版
  currentSongId: '', // 当前播放的歌曲id
  userRoutes: [], // 用户路由
  globalLoadingFlag: null, // 全局loading控制
  playPictureVisible: true, // 控制画面定格是否可见 默认是可见的 自定链接配置的情况下，可见性由配置决定
  playVideoVisible: true, // 播放视频是否可见
  playGiftVisible: true, // 免费发礼物是否可见
  lotteryPrizeInfo: {
    list: [],
    activeIndex: 0,
  }, // 抽奖信息(抽奖奖项列表,当前正在抽哪个奖)
  playpokerData: {},
  // 音乐播放器数据
  musicPlayerData: null,
};
const mutations = {
  initLiveId(state, data) {
    state.liveId = data;
  },
  initToken(state, data) {
    state.token = data;
  },
  setCurrentSongId(state, data) {
    state.currentSongId = data || '';
  },
  setCurrentMenuId(state, data) {
    // TODO 暂时这样处理，后续全部组件都改为路由控制后，再删除currentMenuId相关代码
    if (data === state.currentMenuId) return;
    state.currentMenuId = data;
    const firstLevelMenu = state.userRoutes?.find((item) => item.name === 'main')?.children || [];
    const targetRouteName = searchRouteNameByMenuId(firstLevelMenu, data);
    if (targetRouteName) {
      router.push({ name: targetRouteName });
    }
  },
  setHbyStep(state, data) {
    state.hbyStep = data;
  },
  setKbxStep(state, data) {
    state.kbxStep = data;
  },
  setZfdmStep(state, data) {
    state.zfdmStep = data;
  },
  setSzfStep(state, data) {
    state.szfStep = data;
  },
  updateOpenedBox(state, data) {
    if (data === 'all') {
      for (let i = 0; i < 18; i += 1) {
        state.openedBox.push(i);
      }
    }
    if (state.openedBox.indexOf(data) === -1) {
      state.openedBox.push(data);
    }
  },
  clearOpenedBox(state) {
    state.openedBox = [];
  },
  setHbwallStep(state, data) {
    state.hbwallStep = data;
  },
  updateOpenedHb(state, data) {
    if (data === 'all') {
      for (let i = 0; i < 28; i += 1) {
        state.openedHb.push(i);
      }
    }
    if (state.openedHb.indexOf(data) === -1) {
      state.openedHb.push(data);
    }
  },
  clearOpenedHb(state) {
    state.openedHb = [];
  },
  setLotteryType(state, data) {
    state.lotteryType = data;
  },
  updateIsSheetLotteryNoUpload(state, data) {
    state.isSheetLotteryNoUpload = data;
  },
  updateCurrentMiniGameAnswer(state, data) {
    let tmpTarget;
    if (data.includes(':')) {
      const tmpDataArr = data.split(':');
      tmpTarget = `<div>${tmpDataArr[0]}</div><div style="color:#fff;line-height: 1.2;margin-top: 10px">提示：${tmpDataArr[1]}</div>`;
    } else {
      tmpTarget = data;
    }

    state.currentMiniGameAnswer = tmpTarget;
  },
  updateCardAnswer(state, data) {
    state.cardAnswer = data;
  },
  updateGuessHbStatus(state, data) {
    state.guessHbStatus = data;
  },
  setZfdmList(state, data) {
    state.zfdmList = data;
    console.log('zfdmList赋值', state.zfdmList);
  },
  updatePersonStopBtnVisible(state, data) {
    state.personStopBtnVisible = data;
  },
  updateLottyerInAni(state, data) {
    state.lottyerInAni = data;
  },
  updateSheetLotteryStatus(state, data) {
    state.sheetLotteryStatus = data;
  },
  updateSheetChoosePeople(state, data) {
    if (data === 'reset') {
      state.sheetChoosePeople = `reset${generateRandomId()}`;
    } else {
      state.sheetChoosePeople = data;
    }
  },
  updateScreenLotteryStatus(state, data) {
    state.screenLotteryStatus = data;
  },
  updateDanmuLotteryStatus(state, data) {
    state.danmuLotteryStatus = data;
  },
  updateEarthLotteryStatus(state, data) {
    state.earthLotteryStatus = data;
  },
  updatecardLotteryStatus(state, data) {
    state.cardLotteryStatus = data;
  },
  updatePictureLotteryStatus(state, data) {
    state.pictureLotteryStatus = data;
  },
  setTokenH5(state, data) {
    state.tokenH5 = data;
  },
  setChooseSongVisible(state, data) {
    state.chooseSongVisible = data;
  },
  setGiftList(state, data) {
    console.log(data);
    const NAVMAP = {
      list1: '经典',
      list5: '华丽',
      list666: '特效',
      list6: '嘉年华',
    };
    // data.giftTitleList<-> {list1: '',list5: '',...}
    const keyArr = Object.keys(data.giftTitleList);
    // 嘉年华礼物调整到第二个位置
    const tmpIndexList6 = keyArr.indexOf('list6');
    const valIndex1 = keyArr[1];
    let tempVal;
    if (tmpIndexList6 > -1 && valIndex1) {
      tempVal = keyArr[tmpIndexList6];
      keyArr[tmpIndexList6] = valIndex1;
      keyArr[1] = tempVal;
    }
    const tmpTitle = [];
    const tmpList = [];
    let tmpListAll = [];
    keyArr.forEach((keyItem) => {
      tmpTitle.push({
        id: keyItem,
        name: NAVMAP[keyItem],
      });
      tmpList.push(data.giftListObj[keyItem]);
      tmpListAll = tmpListAll.concat(data.giftListObj[keyItem]);
    });
    console.log('去掉特效');
    const tmpEnterEffectIndex = tmpTitle.findIndex((item) => item.id === 'list666');
    tmpTitle.splice(tmpEnterEffectIndex, 1);
    tmpList.splice(tmpEnterEffectIndex, 1);
    state.giftTitleList = tmpTitle;
    state.giftList = tmpList;
    state.giftListAll = tmpListAll;
    console.log('1111111111111111111');
    console.log('标题列表:', state.giftTitleList);
    console.log('礼物列表:', state.giftList);
    console.log('所有礼物列表:', state.giftListAll);
    console.log('1111111111111111111');
  },
  setMediaList(state, data) {
    console.log(data);
    state.mediaList.splice(0);
    state.mediaList = data.filter((item) => item.videoPath || item.imagePath);
  },
  setGiveMarkVersion(state, data) {
    state.giveMarkVersion = data;
  },
  setUserRoutes(state, data) {
    state.userRoutes = data;
  },
  showGlobalLoading(state) {
    state.globalLoadingFlag = Vue.prototype.$toast.loading({
      message: '请求中...',
      forbidClick: true,
      overlay: true,
      duration: 0,
    });
  },
  hideGlobalLoading(state) {
    state.globalLoadingFlag.clear();
  },
  /**
   * 控制顶部功能菜单的显示与否
   * 即决定playPictureVisible、playVideoVisible、playGiftVisible的值
   * 不传对应的值或者对应的值无效时，就不显示对应功能菜单
   * @param {{playPicture: string, playVideo: string, playGift: string}} data
   */
  setTopFuncIconVisible(state, data) {
    if (!data.playPicture) {
      state.playPictureVisible = false;
    }
    if (!data.playVideo) {
      state.playVideoVisible = false;
    }
    if (!data.playGift) {
      state.playGiftVisible = false;
    }
  },
  /**
   * 暂时不使用该方法，后续有需要再优化
   * 设置抽奖奖项信息
   * data:{list: [{prizeName,其他参数}], activeIndex}
   */
  setLotteryPrizeInfo(state, data) {
    try {
      const dataObj = JSON.parse(data);
      state.lotteryPrizeInfo = {
        list: dataObj.list.map((item) => item.prizeName),
        activeIndex: dataObj.activeIndex,
      };
    } catch {
      console.log('抽奖奖项信息设置失败');
    }
  },
  /**
   * 设置扑克残局新的对局数据
   * @param {Object} data
   */
  setNewPokerData(state, data) {
    if (typeof data === 'object' && Object.keys(data).length === 0) state.playpokerData = {};
    else if (data.playpokerState !== 0) {
      state.playpokerData = {};
    } else {
      state.playpokerData = data;
    }
  },
  setPokerProducable(state) {
    state.playpokerData.producable = false;
  },
  setSwitchedPokerCardsStatus(state, data) {
    Vue.set(state.playpokerData.playerCardsStatus, data, !state.playpokerData.playerCardsStatus[data]);
  },
  setDraggedPokerCardsStatus(state, data) {
    const index = data;
    Vue.$set(state.playpokerData.playerCardsDraggingStatus, index, true);
  },
  setDragEndPokerCardsStatus(state) {
    state.playpokerData.playerCardsDraggingStatus.forEach((item, index) => {
      if (item) {
        Vue.$set(state.playpokerData.playerCardsStatus, index, !state.playpokerData.playerCardsStatus[index]);
      }
      Vue.$set(state.playpokerData.playerCardsDraggingStatus, index, false);
    });
  },
  setDragMiddlePokerCardsStatus(state, data) {
    const index = data;
    state.playpokerData.playerCardsDraggingStatus.forEach((item, i) => {
      if (i !== index) Vue.$set(state.playpokerData.playerCardsDraggingStatus, i, false);
    });
  },
  setPokerCardsMutipleDraggingStatus(state, data) {
    const { start, end, status } = data;
    for (let i = start; i <= end; i++) {
      Vue.$set(state.playpokerData.playerCardsDraggingStatus, i, status);
    }
  },
  setPokerCardsStatusReset() {
    // state.playpokerData.playerCardsStatus.forEach((item, index) => {
    //   Vue.$set(state.playpokerData.playerCardsStatus, index, false);
    //   Vue.$set(state.playpokerData.playerCardsDraggingStatus, index, false);
    // });
  },
  setMusicPlayerData(state, data) {
    state.musicPlayerData = data;
  },
};
const actions = {
  initTokenH5(ctx) {
    getTokenH5()
      .then((res) => {
        console.log(res);
        ctx.commit('setTokenH5', res.token);
        ctx.commit('setChooseSongVisible', res.is_open_music === '1');
      })
      .catch((err) => {
        console.log(err);
      });
  },
  initGiftList(ctx) {
    if (ctx.state.giftListAll.length > 0) {
      return;
    }
    getGiftList()
      .then((res) => {
        console.log('礼物列表:', res);
        ctx.commit('setGiftList', {
          giftTitleList: res.data.title,
          giftListObj: res.data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async getRoutesAndSetMenu(ctx, data) {
    try {
      const res = await reqGetRouterList(data);
      if (!res?.isHasVal) {
        router.addRoutes(ORIGINAL_ROUTES);

        ctx.commit('setUserRoutes', ORIGINAL_ROUTES);
        return;
      }

      const routeNameList = JSON.parse(res?.data).remoteControlFuncs;
      const routes = ORIGINAL_ROUTES.map((route) => {
        if (route.name === 'main') {
          const mainChildren = route.children
            .map((child) => {
              if (child.meta.isIgnoreAuth) {
                return child;
              }
              const childChildren = child.children.filter((item) => routeNameList.some((name) => name === item.name));
              return {
                ...child,
                children: childChildren,
              };
            })
            .filter((item) => item.children.length > 0);
          console.log(mainChildren);
          return {
            ...route,
            children: mainChildren,
          };
        }
        return route;
      });
      router.addRoutes(routes);
      ctx.commit('setUserRoutes', routes);
      // 设置顶部功能菜单的显示与否
      const targetData = {
        playPicture: null,
        playVideo: null,
        playGift: null,
      };
      routeNameList.forEach((name) => {
        if (name === 'playPicture') {
          targetData.playPicture = '1';
        } else if (name === 'playVideo') {
          targetData.playVideo = '1';
        } else if (name === 'playGift') {
          targetData.playGift = '1';
        }
      });
      ctx.commit('setTopFuncIconVisible', targetData);
    } catch (e) {
      // Toast.fail(e.message);
      router.addRoutes(ORIGINAL_ROUTES);
      ctx.commit('setUserRoutes', ORIGINAL_ROUTES);
    }
  },
};
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    menu,
    chat,
    gift,
    instructions,
    live,
    game,
  },
});

export default store;
