<!--
  * @description: 「基础功能」控制通用组件
  * @author: Ruan Jiazhen
  * @date: 2024-01-09
  TODO 后续再将不同的控制组件抽离出来
-->
<template>
  <div class="baseMod">
    <div
      class="m1"
      v-if="currentMenuId === '8-1'"
    >
      <div class="funcMenus publicVCenter">
        <funcButton @clickEvent="toggleMsgwall">祝福榜 开/关</funcButton>
      </div>
    </div>
    <div
      class="m2"
      v-if="currentMenuId === '8-2'"
    >
      <div class="funcMenus publicVCenter">
        <funcButton @clickEvent="toggleDanmu">弹幕 开/关</funcButton>
      </div>
    </div>
    <div
      class="m3 publicVCenter"
      v-if="currentMenuId === '8-3'"
    >
      <div class="funcMenus publicVCenter">
        <funcButton @clickEvent="toggleQrcode">二维码 开/关</funcButton>
      </div>
      <div class="operateItem publicVCenter">
        <label>宽:</label>
        <input
          type="number"
          @blur="handleWidthBlur"
          v-model="qWidth"
        />
        px
        <label class="tip">(默认400)</label>
      </div>
      <div class="operateItem publicVCenter">
        <label>高:</label>
        <input
          type="number"
          @blur="handleHeightBlur"
          v-model="qHeight"
        />
        px
        <label class="tip">(默认400)</label>
      </div>
      <div class="operateItem publicVCenter">
        <label>X:</label>
        <input
          type="number"
          @blur="handleXBlur"
          v-model="qX"
        />
        px
        <label class="tip">(默认1508)</label>
      </div>
      <div class="operateItem publicVCenter">
        <label>Y:</label>
        <input
          type="number"
          @blur="handleYBlur"
          v-model="qY"
        />
        px
        <label class="tip">(默认378)</label>
      </div>
    </div>
    <div
      class="m4"
      v-if="currentMenuId === '8-4'"
    >
      <div class="funcMenus publicVCenter">
        <funcButton @clickEvent="toggleAudio">音乐 开/关</funcButton>
      </div>
    </div>
    <div
      class="m5"
      v-if="currentMenuId === '8-5'"
    >
      <div class="funcMenus publicVCenter">
        <funcButton @clickEvent="openAutoPlay">自动播放 开</funcButton>
        <funcButton @clickEvent="closeAutoPlay">自动播放 关</funcButton>
      </div>
    </div>
    <div
      class="m6"
      v-if="currentMenuId === '8-6'"
    >
      <div class="funcMenus publicVCenter">
        <funcButton @clickEvent="openXiemu">谢幕 开</funcButton>
        <funcButton @clickEvent="closeXiemu">谢幕 关</funcButton>
      </div>
    </div>
  </div>
</template>
<script>
import sendInstrunction from '@/api/sendCode';
import { CODE } from '@/assets/constant/index';
import funcButton from '@/components/funcButton.vue';
import { mapState } from 'vuex';

export default {
  name: 'BasicFunctionsCommon',
  computed: {
    ...mapState({
      currentMenuId: (state) => state.currentMenuId,
    }),
  },
  data() {
    return {
      qWidth: '',
      qHeight: '',
      qX: '',
      qY: '',
    };
  },
  components: {
    funcButton,
  },
  created() {},
  mounted() {},
  methods: {
    async openXiemu() {
      await sendInstrunction({
        code: CODE.XIEMU,
      });
    },
    async closeXiemu() {
      await sendInstrunction({
        code: CODE.HOME,
      });
    },
    async openAutoPlay() {
      await sendInstrunction({
        code: CODE.AUTODISPLAY,
      });
    },
    async closeAutoPlay() {
      await sendInstrunction({
        code: CODE.AUTODISPLAYEND,
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
    async handleWidthBlur() {
      if (!this.valideInput(this.qWidth)) {
        this.$toast('宽度必须为正整数!');
        return;
      }
      await sendInstrunction({
        code: CODE.QRCODEWIDTH,
        param: this.qWidth,
      });
      this.$toast('二维码宽度设置成功!');
    },
    async handleHeightBlur() {
      if (!this.valideInput(this.qHeight)) {
        this.$toast('高度必须为正整数!');
        return;
      }
      await sendInstrunction({
        code: CODE.QRCODEHEIGHT,
        param: this.qHeight,
      });
      this.$toast('二维码高度设置成功!');
    },
    async handleXBlur() {
      if (!this.valideInput(this.qX)) {
        this.$toast('X坐标必须为正整数!');
        return;
      }
      await sendInstrunction({
        code: CODE.QRCODEX,
        param: this.qX,
      });
      this.$toast('二维码X坐标设置成功!');
    },
    async handleYBlur() {
      if (!this.valideInput(this.qY)) {
        this.$toast('Y坐标必须为正整数!');
        return;
      }
      await sendInstrunction({
        code: CODE.QRCODEY,
        param: this.qY,
      });
      this.$toast('二维码Y坐标设置成功!');
    },
    valideInput(num) {
      const reg = /(^[1-9]\d*$)/;
      let flag = true;
      if (!reg.test(num)) {
        // 不是正整数
        flag = false;
      }
      if (!num) {
        flag = false;
      }
      return flag;
    },
  },
};
</script>
<style lang="less" scoped>
.baseMod {
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
  .m3 {
    flex-direction: column;
  }
  .operateItem {
    font-size: 38px;
    color: #fff;
    position: relative;
    margin-bottom: 20px;
    input {
      width: 240px;
      height: 6vw;
      border: none;
      outline: none;
      margin: 0 2vw;
      color: #000;
      padding: 0 2vw;
    }
    .tip {
      font-size: 24px;
      margin-left: 12px;
    }
  }
}
</style>
