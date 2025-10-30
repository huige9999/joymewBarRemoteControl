<!--
  * @description: 「划一划」游戏通用组件
  * @author: Ruan Jiazhen
  * @date: 2024-01-09
-->
<template>
  <div class="hyhMod">
    <div class="funcMenus publicVCenter">
      <funcButton @clickEvent="startGame">开始游戏</funcButton>
      <funcButton @clickEvent="endGame">结束游戏</funcButton>
      <funcButton @clickEvent="reStartGame">再玩一次</funcButton>
      <funcButton @clickEvent="toHome">回到首页</funcButton>
    </div>
    <div class="commonMenus publicHCenter">
      <funcButton
        bWidth="24vw"
        bHeight="10.67vw"
        bFontSize="3.47vw"
        @clickEvent="toggleAudio"
      >
        音乐 开/关
      </funcButton>
      <funcButton
        bWidth="24vw"
        bHeight="10.67vw"
        bFontSize="3.47vw"
        @clickEvent="toggleDanmu"
      >
        弹幕 开/关
      </funcButton>
      <funcButton
        bWidth="24vw"
        bHeight="10.67vw"
        bFontSize="3.47vw"
        @clickEvent="toggleMsgwall"
      >
        祝福榜 开/关
      </funcButton>
      <funcButton
        bWidth="24vw"
        bHeight="10.67vw"
        bFontSize="3.47vw"
        @clickEvent="toggleQrcode"
      >
        二维码 开/关
      </funcButton>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import funcButton from '@/components/funcButton.vue';
import { CODE } from '@/assets/constant/index';
import sendInstrunction from '@/api/sendCode';

export default {
  name: 'SwipeCommon',
  computed: {
    ...mapState({
      currentMenuId: (state) => state.currentMenuId,
    }),
  },
  data() {
    return {};
  },
  components: {
    funcButton,
  },
  created() {},
  mounted() {},
  methods: {
    async startGame() {
      await sendInstrunction({
        code: CODE.HYHSTARTGAME,
      });
    },
    async endGame() {
      await sendInstrunction({
        code: CODE.HYHENDGAME,
      });
    },
    async reStartGame() {
      await sendInstrunction({
        code: CODE.HYHREPLAY,
      });
    },
    async toHome() {
      await sendInstrunction({
        code: CODE.HOME,
      });
    },
    async toggleQrcode() {
      await sendInstrunction({
        code: CODE.QRCODE,
      });
    },
    async toggleAudio() {
      await sendInstrunction({
        code: CODE.AUDIO,
      });
    },
    async toggleDanmu() {
      await sendInstrunction({
        code: CODE.DANMU,
      });
    },
    async toggleMsgwall() {
      await sendInstrunction({
        code: CODE.MSGWALL,
      });
    },
  },
};
</script>
<style lang="less" scoped>
.hyhMod {
  width: 100%;
  height: 100%;
  position: relative;
  .funcMenus {
    position: relative;
    width: 100%;
    flex-direction: column;
  }
  .commonMenus {
    position: relative;
    width: 100%;
    flex-wrap: wrap;
  }
}
</style>
