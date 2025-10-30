<!--
  * @description: 「送祝福」游戏控制组件
  * @author: Ruan Jiazhen
  * @date: 2024-01-08
-->
<template>
  <div class="kbxMod">
    <div
      class="step"
      v-if="szfStep === 0"
    >
      <div class="funcMenus publicVCenter">
        <button
          class="second"
          @click="chooseType(item)"
          v-for="item in timeList"
          :key="item.id"
        >
          {{ item.name }}秒
        </button>
        <button @click="sendInstrunction({ code: CODE.HOME })">回到首页</button>
      </div>
      <div class="commonMenus publicHCenter">
        <button @click="sendInstrunction({ code: CODE.AUDIO })">音乐 开/关</button>
        <button @click="sendInstrunction({ code: CODE.DANMU })">弹幕 开/关</button>
        <button @click="sendInstrunction({ code: CODE.MSGWALL })">祝福榜 开/关</button>
        <button @click="sendInstrunction({ code: CODE.QRCODE })">二维码 开/关</button>
      </div>
    </div>
    <div
      class="step"
      v-if="szfStep === 1"
    >
      <div class="funcMenus publicVCenter">
        <button @click="sendInstrunction({ code: CODE.SZFENDGAME })">结束游戏</button>
      </div>
    </div>
    <div
      class="step"
      v-if="szfStep === 2"
    >
      <div class="funcMenus publicVCenter">
        <button @click="sendInstrunction({ code: CODE.SZFREPLAYGAME })">再玩一次</button>
        <button @click="sendInstrunction({ code: CODE.HOME })">回到首页</button>
      </div>
      <div class="commonMenus publicHCenter">
        <button @click="sendInstrunction({ code: CODE.AUDIO })">音乐 开/关</button>
        <button @click="sendInstrunction({ code: CODE.DANMU })">弹幕 开/关</button>
        <button @click="sendInstrunction({ code: CODE.MSGWALL })">祝福榜 开/关</button>
        <button @click="sendInstrunction({ code: CODE.QRCODE })">二维码 开/关</button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { CODE } from '@/assets/constant/index';
import sendInstrunction from '@/api/sendCode';

const TIMES = [
  {
    id: 0,
    name: '120',
  },
  {
    id: 1,
    name: '150',
  },
  {
    id: 2,
    name: '180',
  },
];

export default {
  name: 'sendBlessing',
  computed: {
    ...mapState({
      currentMenuId: (state) => state.currentMenuId,
      szfStep: (state) => state.szfStep,
    }),
  },
  data() {
    return {
      timeList: TIMES,
      CODE,
    };
  },
  beforeDestroy() {
    this.$store.commit('clearOpenedBox');
  },
  methods: {
    sendInstrunction,
    chooseType(pObj) {
      const tParam = {
        time: pObj.name,
      };
      sendInstrunction({
        code: CODE.SZFCHOOSETIME,
        param: JSON.stringify(tParam),
      });
    },
  },
};
</script>

<style lang="less" scoped>
.kbxMod {
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
  .btnGroup::v-deep {
    margin: 6vw auto;
    width: 32vw;
    .van-button {
      height: 8vw;
      margin-bottom: 4vw;
      &.van-button--normal {
        font-size: 3.2vw;
      }
    }
  }
}

button {
  width: 24vw;
  height: 10.67vw;
  font-size: 3.47vw;

  &.second {
    width: 50vw;
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
</style>
