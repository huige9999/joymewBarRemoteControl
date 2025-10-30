<template>
  <div class="v2-top">
    <!-- 切换新版/旧版按钮 -->
    <button class="switch-version-btn" @click="switchVersion">{{ switchBtnText }}</button>
    <!-- 动态组件将在这里渲染 -->
    <component :is="currentComponent" v-if="currentComponent" />
  </div>
</template>

<script>
import CommonGame from '@/views/v2/modules/commonGame/index.vue';
import GiveMark from '@/views/v2/modules/giveMark/index.vue';
import GestureRiddle from '@/views/v2/modules/guessGame/gestureRiddle.vue';
import GuessGame from '@/views/v2/modules/guessGame/index.vue';
import GuessTextColor from '@/views/v2/modules/guessTextColor/index.vue';
import HbWall from '@/views/v2/modules/hbWall/index.vue';
import Hby from '@/views/v2/modules/hby/index.vue';
import Home from '@/views/v2/modules/home/index.vue';
import Kbx from '@/views/v2/modules/kbx/index.vue';
import CardLottery from '@/views/v2/modules/lottery/card/index.vue';
import PictureLottery from '@/views/v2/modules/lottery/picture/index.vue';
import SheetLottery from '@/views/v2/modules/lottery/sheet/index.vue';
import SignLottery from '@/views/v2/modules/lottery/sign/index.vue';
import WheelLottery from '@/views/v2/modules/lottery/wheel/index.vue';
import OrderSong from '@/views/v2/modules/orderSong/index.vue';
import QaGame from '@/views/v2/modules/qaGame/index.vue';
import QaMahjong from '@/views/v2/modules/qaMahjong/index.vue';
import SendBless from '@/views/v2/modules/sendBless/index.vue';
import Sign from '@/views/v2/modules/sign/index.vue';
import SignWeddingBook from '@/views/v2/modules/sign/signWeddingBook.vue';
import Vote from '@/views/v2/modules/vote/index.vue';
import Zfdm from '@/views/v2/modules/zfdm/index.vue';
import { mapState } from 'vuex';

export default {
  name: 'V2Top',
  components: {
    Home,
    Sign,
    CommonGame,
    QaGame,
    Vote,
    GiveMark,
    SignLottery,
    SheetLottery,
    WheelLottery,
    CardLottery,
    PictureLottery,
    Hby,
    GuessGame,
    GestureRiddle,
    QaMahjong,
    GuessTextColor,
    Zfdm,
    Kbx,
    HbWall,
    SignWeddingBook,
    OrderSong,
    SendBless,
  },
  computed: {
    ...mapState('menu', ['selectedLeafMenu']),
    currentComponent() {
      // 根据 selectedLeafMenu 动态渲染组件
      return this.selectedLeafMenu ? this.selectedLeafMenu.component : 'Home';
    },
    switchBtnText() {
      // 根据当前hash显示按钮文案
      return window.location.hash.includes('controllerV2') ? '切换新版' : '切换旧版';
    },
  },
  methods: {
    switchVersion() {
      console.log('switchVersion', window.location.hash);
      if (window.location.hash.includes('controllerV2')) {
        window.location.hash = '#/controller';
        // 切换到新版时，存储版本信息
        localStorage.setItem('version', 'new');
      } else {
        window.location.hash = '#/controllerV2';
        // 切换到旧版时，存储版本信息
        localStorage.setItem('version', 'old');
      }
      window.location.reload();
    },
  },
};
</script>

<style scoped>
.v2-top {
  flex: 1;
  overflow-y: auto;
  position: relative;
}

.switch-version-btn {
  background: rgba(255, 255, 255, 1);
  color: #333;
  border: none;
  border-radius: 16px;
  padding: 6px 16px;
  font-size: 18px;
  z-index: 10;
  margin-right: 10px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

.switch-version-btn:hover {
  background: rgba(255, 255, 255, 0.8);
}
</style>
