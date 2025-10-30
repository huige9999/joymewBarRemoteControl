<!--
  * @description: 「争分夺秒」游戏控制组件
  * @author: Ruan Jiazhen
  * @date: 2024-01-08
-->
<template>
  <div class="kbxMod">
    <div
      class="step"
      v-if="zfdmStep === 0"
    >
      <div class="funcMenus publicVCenter">
        <button
          class="start"
          @click="chooseType(item)"
          v-for="item in zfdmList"
          :key="item.race_type"
        >
          开启{{ item.raceTime }}秒挑战{{ item.lotteryMoney }}元红包
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
      v-if="zfdmStep === 1"
    >
      <div class="funcMenus publicVCenter">
        <button @click="sendInstrunction({ code: CODE.ZFDMSTARTGAME })">开始游戏</button>
      </div>
    </div>
    <div
      class="step"
      v-if="zfdmStep === 2"
    >
      <div class="funcMenus publicVCenter">
        <button @click="sendInstrunction({ code: CODE.ZFDMENDGAME })">结束游戏</button>
      </div>
    </div>
    <div
      class="step"
      v-if="zfdmStep === 3"
    >
      <div class="funcMenus publicVCenter">
        <button @click="sendInstrunction({ code: CODE.ZFDMREPLAYGAME })">再玩一次</button>
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

export default {
  name: 'RaceAgainstTime',
  computed: {
    ...mapState({
      zfdmStep: (state) => state.zfdmStep,
      zfdmList: (state) => state.zfdmList,
    }),
  },
  data() {
    return {
      CODE,
      activeBox: -1, // 当前被选中宝箱的编号
      activeIndex: -1, // 当前被选中宝箱的索引
    };
  },
  beforeDestroy() {
    this.$store.commit('clearOpenedBox');
  },
  methods: {
    sendInstrunction,
    chooseType(zfdmItem) {
      const param = {
        type: zfdmItem.race_type,
        raceTime: zfdmItem.raceTime,
      };
      sendInstrunction({
        code: CODE.ZFDMCHOOSETYPE,
        param: JSON.stringify(param),
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

  &.start {
    width: auto;
    padding: 20px;
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
