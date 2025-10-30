<!--
  * @Description: 「转盘抽奖」游戏控制组件
  * @Author: Ruan Jiazhen
  * @Date: 2023-12-13
-->
<template>
  <div>
    <div class="container">
      <button
        class="btn"
        @click="start"
      >
        开始抽奖
      </button>
      <button
        class="btn"
        @click="closeResult"
      >
        关闭中奖结果
      </button>
      <!-- 清空抽奖记录 -->
      <button
        class="btn"
        @click="clearLotteryRecord"
      >
        清空抽奖记录
      </button>
    </div>
  </div>
</template>

<script>
import sendInstrunction from '@/api/sendCode';
import { CONTROL_CODE } from '@/assets/constant';

export default {
  name: 'wheelLottery',
  methods: {
    async start() {
      try {
        await this.$dialog.confirm({
          title: '提示',
          message: '是否开始抽奖？',
        });
      } catch (err) {
        if (err === 'cancel') return;
        console.error(err);
      }
      sendInstrunction({
        code: CONTROL_CODE.GAME_CONTROL,
        param: { type: 'WheelLotteryStart' },
      });
    },
    closeResult() {
      sendInstrunction({
        code: CONTROL_CODE.GAME_CONTROL,
        param: { type: 'WheelLotteryCloseResult' },
      });
    },
    async clearLotteryRecord() {
      try {
        await this.$dialog.confirm({
          title: '提示',
          message: '是否清空抽奖记录？',
        });
      } catch (err) {
        if (err === 'cancel') return;
        console.error(err);
      }
      sendInstrunction({
        code: CONTROL_CODE.GAME_CONTROL,
        param: { type: 'WheelLotteryClearRecord' },
      });
    },
  },
};
</script>

<style scoped lang="less">
.container {

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 40px;

  .btn {
    width: 32vw;
    height: 10.67vw;

    border-radius: 28px;
    background-color: transparent;
    color: #fff;
    border: 2px solid #fff;
    transition: all 0.2s linear;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 3.47vw;
    &:active {
      background-color: rgba(255, 255, 255, 0.6);
    }
  }
}
</style>
