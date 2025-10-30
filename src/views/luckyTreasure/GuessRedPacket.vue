<!--
  * @description: 「猜红包」游戏控制组件
  * @author: Ruan Jiazhen
  * @date: 2024-01-08
-->
<template>
  <div class="xydbMod">
    <!-- 猜红包等待新人充值 -->
    <div
      class="funcMenus publicVCenter"
      v-show="guessHbStatus === 0"
    >
      <div class="guessHbModBox">
        <div class="modeTypes">
          <div
            class="modeTypeItem"
            v-for="(item, index) in ['模式一', '模式二', '模式三']"
            :key="index"
            :class="{ active: index === activeIndex }"
            @click="chooseModType(index)"
          >
            {{ item }}
          </div>
        </div>
        <!-- 模式一——扫码充值 -->
        <div
          class="qrcodeBox"
          v-if="activeIndex === 0"
        >
          <div class="title">猜红包</div>
          <img
            :src="guessHbQrcodeUrl"
            class="qrcodeImg"
          />
          <div class="tip">让新人扫描这个二维码，充值开启</div>
          <div class="status">状态: {{ hasGuessHbActive ? '已开启' : '未开启' }}</div>
        </div>
        <!-- 模式二——取红包口袋金额 -->
        <div
          class="hbkdBox"
          v-if="activeIndex === 1"
        >
          <div class="iptWrap">
            <div class="label">填写竞猜数字</div>
            <input
              class="numIpt"
              v-model="moneyIpt"
            />
          </div>
          <div class="smallTip">小提示：可输入两位小数</div>
          <div
            class="confirmBtn"
            @click="confirmMoney"
          >
            确定
          </div>
          <div class="otherTip">请不要把竞猜数字告诉他人</div>
        </div>
        <!-- 模式三——现金 -->
        <div
          class="hbkdBox"
          v-if="activeIndex === 2"
        >
          <div class="remainMoney">竞猜现金红包</div>
          <div class="iptWrap">
            <div class="label">填写竞猜数字</div>
            <input
              class="numIpt"
              v-model="moneyIpt2"
            />
          </div>
          <div class="smallTip">小提示：可输入两位小数</div>
          <div
            class="confirmBtn"
            @click="confirmMoney2"
          >
            确定
          </div>
          <div class="otherTip">请不要把竞猜数字告诉他人</div>
        </div>
        <!-- 各种模式玩法介绍 -->
        <div
          class="playTip"
          :class="{ multiLine: activeIndex === 2 }"
        >
          {{ currentTipText }}
        </div>
      </div>
      <button @click="sendInstrunction({ code: CODE.GUESSHB_STARTGAME })">开始游戏</button>
    </div>
    <!-- 猜红包游戏进行 -->
    <div
      class="funcMenus publicVCenter"
      v-show="guessHbStatus === 1"
    >
      <div class="tip2">新人放了一枚红包，请开始游戏</div>
      <button @click="sendInstrunction({ code: CODE.GUESSHB_NEXT })">揭晓/下一轮</button>
      <button @click="sendInstrunction({ code: CODE.GUESSHB_END })">结束游戏</button>
    </div>
    <div
      class="commonMenus publicHCenter"
      v-show="guessHbStatus === 1"
    >
      <button @click="sendInstrunction({ code: CODE.AUDIO })">音乐 开/关</button>
      <button @click="sendInstrunction({ code: CODE.DANMU })">弹幕 开/关</button>
      <button @click="sendInstrunction({ code: CODE.MSGWALL })">祝福榜 开/关</button>
      <button @click="sendInstrunction({ code: CODE.QRCODE })">二维码 开/关</button>
    </div>
  </div>
</template>
<script>
import { generateGuessHbQrcode, getGuessHbStatus, setGuessHbMod } from '@/api/index';
import sendInstrunction from '@/api/sendCode';
import { CODE } from '@/assets/constant/index';
import { mapMutations, mapState } from 'vuex';

let tmpInterval = null;
export default {
  name: 'GuessRedPacket',
  data() {
    return {
      CODE,
      guessHbQrcodeUrl: '',
      activeIndex: 0,
      hasGuessHbActive: false,
      moneyIpt: '',
      moneyIpt2: '',
    };
  },
  computed: {
    ...mapState({
      guessHbStatus: (state) => state.guessHbStatus,
    }),
    currentTipText() {
      const currentTipTextList = [
        '模式一玩法：请让新人扫码充值红包金额',
        '模式二玩法：输入的竞猜金额将从红包口袋扣除',
        '模式三玩法：请在现场准备现金，然后发给猜中的 来宾。系统不会给猜中的来宾发送红包。',
      ];
      return currentTipTextList[this.activeIndex];
    },
  },
  mounted() {
    this.getGuessHbQrcode();
  },
  beforeDestroy() {
    this.updateGuessHbStatus(0);
    this.endLoop();
  },
  methods: {
    ...mapMutations(['updateGuessHbStatus']),
    sendInstrunction,
    chooseModType(index) {
      this.activeIndex = index;
      if (this.activeIndex === 0) {
        this.loopGetGuessHbStatus();
      } else {
        this.endLoop();
      }
    },
    loopGetGuessHbStatus() {
      if (tmpInterval) return;
      tmpInterval = setInterval(() => {
        getGuessHbStatus()
          .then((res) => {
            console.log(res);
            if (res.chbInfo.pay_status === '200') {
              this.hasGuessHbActive = false;
            } else {
              this.hasGuessHbActive = true;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }, 2000);
    },
    endLoop() {
      if (tmpInterval) {
        clearInterval(tmpInterval);
        tmpInterval = null;
      }
    },
    getGuessHbQrcode() {
      const logStyle = 'background: #39C5BB; padding: 2px 4px; border-radius: 2px;';
      console.log('%c getGuessHbQrcode', logStyle, this.guessHbStatus);
      if (this.guessHbStatus === 0) {
        generateGuessHbQrcode()
          .then((res) => {
            console.log(res);
            this.guessHbQrcodeUrl = res.end_url;
            this.loopGetGuessHbStatus();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    validateIpt(numStr) {
      const reg = /^\d+(?=\.{0,1}\d+$|$)/;
      let flag = true;
      // 验证数字
      if (!reg.test(numStr)) {
        this.$toast('请输入正确的数字!');
        flag = false;
        return flag;
      }
      // 验证小数不超过两位,整数不超过4位
      if (numStr.indexOf('.') > -1) {
        if (numStr.split('.')[1].length > 2) {
          this.$toast('小数不能超过两位!');
          flag = false;
          return flag;
        } if (numStr.split('.')[0].length > 4) {
          this.$toast('整数不能超过四位!');
          flag = false;
          return flag;
        }
      } else if (numStr.length > 4) {
        this.$toast('整数不能超过四位!');
        flag = false;
        return flag;
      }
      return flag;
    },
    // 补零
    fillZero(numStr) {
      let resultStr = numStr;
      // .2 2.
      if (numStr.indexOf('.') > -1) {
        const tempNumArr = numStr.split('.');
        if (tempNumArr[0] === '') {
          resultStr = `0.${tempNumArr[1]}`;
        } else if (tempNumArr[1] === '') {
          resultStr = `${tempNumArr[1]}.0`;
        }
      }
      return resultStr;
    },
    // 去零
    removeZero(numStr) {
      let resultNumStr = numStr;
      // 05 005 5.0 5.10
      // 050
      if (numStr.indexOf('.') === -1) {
        // 整数
        const tempArr = numStr.split('');
        const tempLen = tempArr.length;
        let tempIndex = -1;
        // 遍历数组找到第一个非0数字的位置索引
        for (let i = 0; i < tempLen; i += 1) {
          if (tempArr[i] !== '0') {
            tempIndex = i;
            break;
          }
        }
        if (tempIndex > -1) {
          // 第一个非0数字前面的0全部清空
          for (let j = 0; j < tempIndex; j += 1) {
            tempArr[j] = '';
          }
          resultNumStr = tempArr.join('');
        } else {
          resultNumStr = '0';
        }
      } else {
        // 小数
        const interStr = numStr.split('.')[0];
        const decimalStr = numStr.split('.')[1];
        let interArr = interStr.split('');
        let decimalArr = decimalStr.split('');
        // 处理整数部分
        const tempLen = interArr.length;
        let tempIndex = -1;
        // 遍历数组找到第一个非0数字的位置索引
        for (let i = 0; i < tempLen; i += 1) {
          if (interArr[i] !== '0') {
            tempIndex = i;
            break;
          }
        }
        if (tempIndex > -1) {
          // 第一个非0数字前面的0全部清空
          for (let j = 0; j < tempIndex; j += 1) {
            if (interArr[j] === 0) {
              interArr[j] = '';
            }
          }
        } else {
          interArr = ['0'];
        }

        // 处理小数 .01 .10 .0 .1 .00
        const tempLen2 = decimalArr.length;
        let tempIndex2 = -1;
        // 遍历数组找到第一个非0数字的位置索引
        for (let i = 0; i < tempLen; i += 1) {
          if (decimalArr[i] !== '0') {
            tempIndex2 = i;
            break;
          }
        }
        if (tempIndex2 > -1) {
          // 第一个非0数字后面的0全部清空
          for (let i = tempIndex2 + 1; i < tempLen2; i += 1) {
            if (decimalArr[i] === 0) {
              decimalArr[i] = '';
            }
          }
        } else {
          decimalArr = ['0'];
        }

        resultNumStr = `${interArr.join('')}.${decimalArr.join('')}`;
      }
      return resultNumStr;
    },
    confirmMoney() {
      let tmpMoney = this.moneyIpt;
      if (!this.validateIpt(tmpMoney)) {
        return;
      }
      // 补零
      tmpMoney = this.fillZero(tmpMoney);
      // 去零
      tmpMoney = this.removeZero(tmpMoney);
      // 化整
      tmpMoney = parseFloat(tmpMoney);
      this.moneyIpt = tmpMoney.toString();
      setGuessHbMod({
        type: this.activeIndex === 1 ? '2' : '1',
        guessMoney: this.moneyIpt,
      })
        .then((res) => {
          console.log(res);
          if (res && res.code === '200') {
            this.$toast('开启成功!开始猜红包游戏吧!');
          } else if (res && res.code === '201') {
            this.$toast('红包口袋余额不足!');
          } else if (res && res.code === '202') {
            this.$toast('已经充值或者设置过了，不能重复操作');
          } else {
            this.$toast('开启失败!');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    confirmMoney2() {
      let tmpMoney = this.moneyIpt2;
      if (!this.validateIpt(tmpMoney)) {
        return;
      }
      // 补零
      tmpMoney = this.fillZero(tmpMoney);
      // 去零
      tmpMoney = this.removeZero(tmpMoney);
      // 化整
      tmpMoney = parseFloat(tmpMoney);
      this.moneyIpt2 = tmpMoney.toString();
      setGuessHbMod({
        type: this.activeIndex === 1 ? '2' : '1',
        guessMoney: this.moneyIpt2,
      })
        .then((res) => {
          console.log(res);
          if (res && res.code === '200') {
            this.$toast('开启成功!开始猜红包游戏吧!');
          } else if (res && res.code === '201') {
            this.$toast('红包口袋余额不足!');
          } else if (res && res.code === '202') {
            this.$toast('已经充值或者设置过了，不能重复操作');
          } else {
            this.$toast('开启失败!');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style lang="less" scoped>
.xydbMod {
  width: 100%;
  height: 100%;
  position: relative;
  .funcMenus {
    position: relative;
    width: 100%;
    flex-direction: column;
    .guessHbModBox {
      width: 100vw;
      margin-bottom: 20px;
      .modeTypes {
        display: flex;
        width: 100%;
        justify-content: space-around;
        margin-bottom: 50px;
        .modeTypeItem {
          width: 160px;
          height: 56px;
          background: #ab8b6e;
          border-radius: 8px;
          font-size: 24px;
          font-weight: 500;
          color: #ffffff;
          text-align: center;
          line-height: 56px;
          &.active {
            background: linear-gradient(139deg, #ffd33a 0%, #ff3d3d 100%);
          }
        }
      }
      .qrcodeBox {
        width: 440px;
        padding-bottom: 20px;
        background: #ffffff;
        border-radius: 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 auto;
        margin-top: 48px;
        .title {
          font-size: 32px;
          font-weight: 500;
          color: #333333;
          padding-top: 18px;
        }
        .qrcodeImg {
          width: 332px;
          height: 334px;
          margin-top: 18px;
        }
        .tip {
          margin-top: 16px;
          font-size: 24px;
          font-weight: 400;
          color: #333333;
        }
        .status {
          font-size: 24px;
          color: #6b9ba5;
          text-align: center;
          margin-top: 28px;
        }
      }
      .hbkdBox {
        width: 440px;
        height: 576px;
        background-image: url('https://static.hudongmiao.com/joymewAssistant/guessHbRecharge/guessHbPayBg2.png');
        background-size: 100% 100%;
        position: relative;
        margin: 0 auto;
        margin-top: 48px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 32px;
        .remainMoney {
          font-size: 28px;
          font-weight: 500;
          color: #ffffff;
          display: flex;
          align-items: center;
        }
        .iptWrap {
          width: 392px;
          height: 72px;
          background: #ffffff;
          position: relative;
          margin-top: 26px;
          padding-left: 200px;
          padding-right: 16px;
          overflow: hidden;
          .label {
            font-size: 24px;
            font-weight: 400;
            color: #ff0000;
            position: absolute;
            height: 100%;
            padding-left: 16px;
            left: 0;
            display: flex;
            align-items: center;
          }
          .numIpt {
            position: absolute;
            width: 50%;
            height: 100%;
            outline: none;
            border: none;
            color: #ff0000;
            right: 0;
            top: 0;
            padding-right: 16px;
            text-align: right;
            font-size: 24px;
          }
        }
        .smallTip {
          font-size: 24px;
          font-weight: 400;
          color: #ffffff;
          margin-top: 102px;
        }
        .confirmBtn {
          width: 160px;
          height: 56px;
          background: #edf1f6;
          border-radius: 46px;
          text-align: center;
          line-height: 56px;
          font-size: 24px;
          font-weight: 500;
          color: #6b9ba5;
          margin-top: 100px;
        }
        .otherTip {
          font-size: 24px;
          font-weight: 400;
          color: #ffffff;
          margin-top: 40px;
        }
      }
      .playTip {
        font-size: 28px;
        font-weight: 500;
        color: #333333;
        margin-top: 20px;
        padding: 0 60px;
        line-height: 45px;
        text-align: center;
        &.multiLine {
          text-align: left;
        }
      }
    }
    .tip2 {
      font-size: 32px;
      color: #fff;
      margin-bottom: 40px;
    }
  }
  .commonMenus {
    position: relative;
    width: 100%;
    flex-wrap: wrap;
  }
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
</style>
