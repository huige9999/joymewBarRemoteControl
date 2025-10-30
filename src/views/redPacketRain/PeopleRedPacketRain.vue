<!--
  * @description: 「全民红包雨」游戏控制组件
  * @author: Ruan Jiazhen
  * @date: 2024-01-08
-->
<template>
  <div class="hbyMod">
    <div
      class="moneySet"
      v-show="hbyStep === 0"
    >
      <van-form @submit="onSubmit">
        <van-field
          v-model="hbVal"
          name="hbVal"
          label="红包金额："
          placeholder="红包金额"
          :rules="[{ required: true, message: '请输入红包金额' }]"
        />
        <van-field
          v-model="hbNum"
          name="hbNum"
          label="红包个数："
          placeholder="红包个数"
          :rules="[{ required: true, message: '请输入红包个数' }]"
          v-if="currentMenuId !== '2-3'"
        />
        <div style="margin: 6vw">
          <van-button
            round
            block
            type="info"
            native-type="submit"
          >
            确认
          </van-button>
          <van-button
            round
            block
            type="default"
            @click="cancelInput"
          >
            取消
          </van-button>
        </div>
      </van-form>
    </div>
    <div
      class="funcMenus publicVCenter"
      v-show="hbyStep === 1"
    >
      <button @click="sendInstrunction({ code: CODE.HBYSTARTGAME })">开始游戏</button>
      <button @click="sendInstrunction({ code: CODE.HBYENDGAME })">结束游戏</button>
      <button @click="sendInstrunction({ code: CODE.HBYREPLAY })">再玩一次</button>
      <button @click="sendInstrunction({ code: CODE.HOME })">回到首页</button>
    </div>
    <div
      class="commonMenus publicHCenter"
      v-show="hbyStep === 1"
    >
      <button @click="sendInstrunction({ code: CODE.AUDIO })">音乐 开/关</button>
      <button @click="sendInstrunction({ code: CODE.DANMU })">弹幕 开/关</button>
      <button @click="sendInstrunction({ code: CODE.MSGWALL })">祝福榜 开/关</button>
      <button @click="sendInstrunction({ code: CODE.QRCODE })">二维码 开/关</button>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { CODE } from '@/assets/constant/index';
import sendInstrunction from '@/api/sendCode';

export default {
  name: 'PeopleRedPacketRain',
  computed: {
    ...mapState({
      currentMenuId: (state) => state.currentMenuId,
      hbyStep: (state) => state.hbyStep,
    }),
  },
  data() {
    return {
      CODE,
      hbVal: '',
      hbNum: '',
    };
  },
  methods: {
    sendInstrunction,
    onSubmit(values) {
      console.log(values);
      sendInstrunction({
        code: CODE.HBYSET,
        param: JSON.stringify(values),
      });
    },
    async cancelInput() {
      await sendInstrunction({
        code: CODE.HOME,
      });
      this.hbVal = '';
      this.hbNum = '';
    },
  },
};
</script>
<style lang="less" scoped>
.hbyMod {
  width: 100%;
  height: 100%;
  position: relative;
  .moneySet::v-deep {
    position: relative;
    width: 90%;
    margin: 0 auto;
    .van-form {
      .van-cell {
        font-size: 3.8vw;
        line-height: 10vw;
        .van-field__error-message {
          font-size: 3vw;
        }
      }
      .van-button {
        height: 10vw;
        margin-bottom: 4vw;
        &.van-button--normal {
          font-size: 3.8vw;
        }
      }
    }
  }
  .funcMenus {
    position: relative;
    width: 100%;
    flex-direction: column;

    button {
      width: 32vw;
      height: 10.67vw;
      font-size: 4.27vw;

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
  .commonMenus {
    position: relative;
    width: 100%;
    flex-wrap: wrap;

    button {
      width: 24vw;
      height: 10.67vw;
      font-size: 3.47vw;

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
}
</style>
