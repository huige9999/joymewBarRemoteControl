<!--
  * @description: 「签到簿」控制组件
  * @author: Ruan Jiazhen
  * @date: 2024-01-08
-->
<template>
  <div class="container">
    <div class="funcMenus publicVCenter">
      <button
        @click="sendInstrunction({ code: CODE.HOME })"
        class="to-home"
      >
        回到首页
      </button>
    </div>
    <div class="commonMenus publicHCenter">
      <button @click="sendInstrunction({ code: CODE.AUDIO })">音乐 开/关</button>
      <button @click="sendInstrunction({ code: CODE.DANMU })">弹幕 开/关</button>
      <button @click="sendInstrunction({ code: CODE.MSGWALL })">祝福榜 开/关</button>
      <button @click="sendInstrunction({ code: CODE.QRCODE })">二维码 开/关</button>
    </div>
  </div>
</template>
<script>
import { CODE } from '@/assets/constant/index';
import sendInstrunction from '@/api/sendCode';

export default {
  name: 'SignBook',
  data() {
    return {
      CODE,
    };
  },
  methods: {
    sendInstrunction,
  },
};
</script>
<style lang="less" scoped>
.container {
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

  button {
    width: 24vw;
    height: 10.67vw;
    font-size: 3.47vw;

    &.to-home {
      width: 32vw;
      font-size: 4.27vw;
    }

    margin-bottom: 30px;
    border-radius: 28px;
    color: #fff;
    border: 2px solid #fff;
    background-color: rgba(0, 0, 0, 0);
    transition: all 0.2s linear;

    &:active {
      background-color: rgba(255, 255, 255, 0.6);
    }
  }
}
</style>
