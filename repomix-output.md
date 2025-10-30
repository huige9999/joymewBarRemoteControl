# Directory Structure
```
src/store/index.js
src/utils/websocket/v2/mainHelper.js
src/views/v2/modules/hby/index.vue
```

# Files

## File: src/views/v2/modules/hby/index.vue
```vue
<template>
  <div class="sign-wrap">
    <PageTitleWrap :pageTitle="pageTitle" />
    <div
      v-if="hbyStep === 0"
      class="config-set-container"
    >
      <div class="form-box">
        <div class="input-item">
          <span class="label">红包金额:</span>
          <input
            type="number"
            v-model.number="redPacketMoney"
            class="input-field"
          />
          <span class="unit">元</span>
        </div>
        <div
          class="input-item"
          v-if="selectedLeafMenu.id !== 'nationalRedEnvelopeRain'"
        >
          <span class="label">红包个数:</span>
          <input
            type="number"
            v-model.number="redPacketNum"
            class="input-field"
          />
          <span class="unit">个</span>
        </div>
      </div>
      <FuncButton
        @click="confirmConfig"
        class="config-button"
      >
        确认
      </FuncButton>
      <FuncButton
        @click="cancelConfig"
        class="config-button cancel-button"
      >
        取消
      </FuncButton>
    </div>
    <div
      v-else
      class="func-button-container"
    >
      <FuncButton
        @click="gameControl('start')"
        class="func-button"
      >
        开始游戏
      </FuncButton>
      <FuncButton
        @click="gameControl('end')"
        class="func-button"
      >
        结束游戏
      </FuncButton>
      <FuncButton
        @click="gameControl('replay')"
        class="func-button"
      >
        再玩一次
      </FuncButton>
      <FuncButton
        @click="gameControl('exposeOrShowNext')"
        class="func-button"
        v-if="selectedLeafMenu.id === 'shoutRedEnvelope'"
      >
        开始/下一个/结束
      </FuncButton>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PageTitleWrap from '@/views/v2/components/PageTitle.vue';
import FuncButton from '@/views/v2/components/FuncButton.vue';
import keyboardDetectionMixin from '@/mixins/keyboardDetection';

export default {
  name: 'pageWithTitle',
  mixins: [keyboardDetectionMixin],
  data() {
    return {
      redPacketMoney: '',
      redPacketNum: '',
    };
  },
  components: {
    PageTitleWrap,
    FuncButton,
  },
  computed: {
    // 从 store 的 menu 模块映射 selectedLeafMenu 状态
    ...mapState('menu', ['selectedLeafMenu']),
    ...mapState(['hbyStep']), // 映射 hbyStep
    pageTitle() {
      return this.selectedLeafMenu.name ? this.selectedLeafMenu.name : '';
    },
  },
  methods: {
    async gameControl(action) {
      this.$toast.loading({
        message: '加载中...',
        duration: 0, // 持续显示
      });
      await this.$store.dispatch('instructions/sendInstruction', {
        type: 'game_control',
        action,
      });
      this.$toast.clear();
    },
    async confirmConfig() {
      // 发送指令到服务器
      this.$toast.loading({
        message: '加载中...',
        duration: 0, // 持续显示
      });
      await this.$store.dispatch('instructions/sendInstruction', {
        type: 'game_control',
        action: 'configSet',
        param: {
          money: this.redPacketMoney,
          num: this.redPacketNum,
        },
      });
      this.$toast.clear();
    },
    cancelConfig() {
      this.$toast.loading({
        message: '加载中...',
        duration: 0, // 持续显示
      });
      this.$store
        .dispatch('instructions/sendInstruction', {
          type: 'router_jump',
          action: '/',
        })
        .then(() => {
          this.$toast.clear();
          this.$store.commit('menu/setSelectedLeafMenu', null);
        });
    },
  },
};
</script>

<style scoped>
.sign-wrap {
  height: 100%;
}

.func-button-container {
  display: flex;
  justify-content: center;
  margin-top: 39px;
  justify-content: center;
  margin-top: 5.2vw;
  flex-direction: column;
  align-items: center;
  row-gap: 4vw;
}

.config-set-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 35px;
}

.form-box {
  width: 687px;
  height: 203px;
  background: linear-gradient(180deg, #ffffff 0%, #c1daff 100%);
  box-shadow: inset 0px 7 19px 0px rgba(255, 255, 255, 0.3);
  border-radius: 19px 19px 19px 19px;
  border: 2px solid #ffffff;
  margin-bottom: 49px;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  width: 595px;
  height: 97px;
}

.input-item:first-child {
  border-bottom: 1px solid #fff;
}

.label {
  font-size: 30px;
  color: #000;
  margin-right: 10px;
  width: 164px;
}

.input-field {
  outline: none;
  border: none;
  font-size: 16px;
  width: 150px;
  background: transparent;
  color: #ff80a0;
  font-size: 30px;
}

.unit {
  margin-left: 5px;
  font-size: 16px;
  color: #666;
  color: #3e80f8;
  font-size: 30px;
}

.config-set-container .config-button {
  margin-top: 20px;
  width: 463px;
  height: 73px;
  background: #ffffff;
  border-radius: 38px 38px 38px 38px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.config-set-container .config-button.cancel-button {
  background: transparent;
  border: 2px solid #ffffff;
  color: #ffffff;
}
</style>
```

## File: src/store/index.js
```javascript
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
```

## File: src/utils/websocket/v2/mainHelper.js
```javascript
import store from '@/store';
import * as multipleScreen from '@/utils/multipleScreenResolve';

const REPLYCODE = {
  ON_CARD_ANSWER: '5080',
  ON_HBYSET: '5007',
  ON_HBY: '5009',
  ON_CLICKHBSET: '5010',
  ON_SHOUTHBSET: '5093',
  ON_ALLHBYSET: '5091',
  ON_MINIGAMEANS: '5052',
  ON_QSDS: '5050',
  ON_ZFDMCHOOSE: '5066',
  ON_KBXCHOOSE: '5022',
  ON_KBXWAIT: '5024',
  ON_KBX: '5025',
  ON_KBXRANK: '5026',
  ON_KBXOPENED: '5027',
  ON_HBWALLCHOOSE: '5028', // 新增红包墙类型选择
  ON_HBWALLWAIT: '5030', // 红包墙等待页面
  ON_HBWALL: '5031', // 红包墙游戏页面
  ON_HBWALLRANK: '5032', // 红包墙排行榜
  ON_NEXTSONG: '5090',
  ON_VIDEOPLAY: '5074', // 视频播放页面
  ON_FIXEDSCREEN: '5075', // 定屏播放页面
  OTHERS: 'others',
  ON_XIEMUFAIL: '5059', // 谢幕打开失败
};

const HBY_SET_CODES = [
  REPLYCODE.ON_HBYSET,
  REPLYCODE.ON_CLICKHBSET,
  REPLYCODE.ON_SHOUTHBSET,
  REPLYCODE.ON_ALLHBYSET,
];

// 处理红包口袋充值消息
function handleRedkdMessage(message) {
  const miaoChiGold = message?.data?.miaoChiGold;
  if (miaoChiGold) {
    store.commit('live/SET_BALANCE', Number(miaoChiGold));
  }
}

// 处理数据传输的消息
function handleDataTransfer(miaoYkqCode) {
  if (miaoYkqCode.action === 'MusicPlayer') {
    // 音乐播放器数据传输
    store.commit('setMusicPlayerData', JSON.parse(miaoYkqCode.param));
  } else if (miaoYkqCode.action === 'moneyTreeShake') {
    store.commit('game/SET_MONEY_TREE_SHAKE_CHOOSE_MODE', miaoYkqCode.param === 'chooseMode');
  }
}

// 处理雀神大赛页面消息
function handleQsdsMessage(miaoYkqCode, store) {
  if (miaoYkqCode.param) {
    multipleScreen.setFromScreen(false);
  } else {
    multipleScreen.setFromScreen(true);
  }
  multipleScreen.setDifficulty(miaoYkqCode.param);
  store.commit('game/SET_TRIGGER_INIT_MAHJONG_PAGE', true);
}

// 处理遥控器消息
function handleYaokongqiMessage(message, bus) {
  const miaoYkqCodeRaw = message?.data?.miaoYkqCode;
  if (miaoYkqCodeRaw) {
    const miaoYkqCode = JSON.parse(miaoYkqCodeRaw);
    if (miaoYkqCode.type === 'message') {
      bus.$toast(miaoYkqCode.action);
    } else if (miaoYkqCode.type === 'dataTransfer') {
      handleDataTransfer(miaoYkqCode);
    } else if (miaoYkqCode.code === REPLYCODE.ON_CARD_ANSWER) {
      store.commit('updateCardAnswer', miaoYkqCode.param);
    } else if (HBY_SET_CODES.includes(miaoYkqCode.code)) {
      store.commit('setHbyStep', 0); // 设置红包雨为设置阶段
    } else if (miaoYkqCode.code === REPLYCODE.ON_HBY) {
      store.commit('setHbyStep', 1); // 设置红包雨为游戏阶段
    } else if (miaoYkqCode.code === REPLYCODE.ON_MINIGAMEANS) {
      store.commit('updateCurrentMiniGameAnswer', miaoYkqCode.param);
    } else if (miaoYkqCode.code === REPLYCODE.ON_ZFDMCHOOSE) {
      store.commit('setZfdmList', JSON.parse(miaoYkqCode.param));
    } else if (miaoYkqCode.code === REPLYCODE.OTHERS) {
      if (miaoYkqCode.param.type === 'GestureRiddleCategoryList') {
        store.commit('game/SET_CATEGORY_LIST', miaoYkqCode.param.data);
      }
    } else if (miaoYkqCode.code === REPLYCODE.ON_QSDS) {
      handleQsdsMessage(miaoYkqCode, store);
    } else if (miaoYkqCode.code === REPLYCODE.ON_KBXCHOOSE) {
      // 处理开宝箱类型选择页面
      const kbxTypeList = JSON.parse(miaoYkqCode.param);
      store.commit('game/SET_KBX_TYPE_LIST', kbxTypeList);
      store.commit('setKbxStep', 0);
    } else if (miaoYkqCode.code === REPLYCODE.ON_KBXWAIT) {
      store.commit('setKbxStep', 1);
    } else if (miaoYkqCode.code === REPLYCODE.ON_KBX) {
      store.commit('setKbxStep', 2);
    } else if (miaoYkqCode.code === REPLYCODE.ON_KBXRANK) {
      store.commit('setKbxStep', 3);
    } else if (miaoYkqCode.code === REPLYCODE.ON_HBWALLCHOOSE) {
      const hbwallTypeList = JSON.parse(miaoYkqCode.param);
      store.commit('game/SET_HBWALL_TYPE_LIST', hbwallTypeList);
      store.commit('setHbwallStep', 0);
    } else if (miaoYkqCode.code === REPLYCODE.ON_HBWALLWAIT) {
      store.commit('setHbwallStep', 1);
    } else if (miaoYkqCode.code === REPLYCODE.ON_HBWALL) {
      store.commit('setHbwallStep', 2);
    } else if (miaoYkqCode.code === REPLYCODE.ON_HBWALLRANK) {
      store.commit('setHbwallStep', 3);
    } else if (miaoYkqCode.code === REPLYCODE.ON_NEXTSONG) {
      store.commit('setCurrentSongId', miaoYkqCode.param);
    } else if (
      miaoYkqCode.code === REPLYCODE.ON_VIDEOPLAY
      || miaoYkqCode.code === REPLYCODE.ON_FIXEDSCREEN
    ) {
      store.commit('setMediaList', JSON.parse(miaoYkqCode.param));
    } else if (miaoYkqCode.code === REPLYCODE.ON_XIEMUFAIL) {
      bus.$toast('后台未设置谢幕信息!');
    }
  }
}

// handleRemoteControlMessage 事件名规则：必须以 remote- 开头
// 主ws消息处理
const handleRemoteControlMessage = (message, bus) => {
  // 远控消息处理逻辑
  console.log('handleRemoteControlMessage', message);
  try {
    if (message.type === 'redkd') {
      handleRedkdMessage(message);
    } else if (message.type === 'yaokongqi') {
      handleYaokongqiMessage(message, bus);
    }
  } catch (e) {
    console.error('解析miaoYkqCode失败', e);
  }
};
export default handleRemoteControlMessage;
```
