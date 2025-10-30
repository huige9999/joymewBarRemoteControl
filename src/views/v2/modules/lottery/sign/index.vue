<template>
    <div class="sign-wrap">
        <PageTitleWrap :pageTitle="pageTitle" />
        <div class="func-button-container">
            <div class="btn-group">
                <div class="label">奖项切换：</div>
                <div class="value-wrap">
                    <FuncButton @click="lotteryControl('prevPrize')" class="func-button">上一个奖项</FuncButton>
                    <FuncButton @click="lotteryControl('nextPrize')" class="func-button">下一个奖项</FuncButton>
                </div>
            </div>
            <div class="btn-group">
                <div class="label">抽奖控制：</div>
                <div class="value-wrap">
                    一次抽取: <input type="number" class="pickInput" v-model="pickNum" @change="onPickNumChange" />
                </div>
                <div class="value-wrap">
                    <FuncButton @click="lotteryControl('startOrStopLottery')" class="func-button">开始/停止抽奖</FuncButton>
                </div>
                <div class="value-wrap">
                    <FuncButton @click="lotteryControl('reset')" class="func-button">重置抽奖</FuncButton>
                    <FuncButton @click="lotteryControl('openOrCloseManualStopLottery')" class="func-button" v-if="selectedLeafMenu.id === '3dDraw'">开启/关闭手动停止抽奖</FuncButton>
                    <FuncButton @click="lotteryControl('closeResult')" class="func-button" v-if="selectedLeafMenu.id !== '3dDraw'">关闭中奖结果</FuncButton>
                </div>
            </div>
            <!-- 3D抽奖和地球抽奖没有弹出形式的中奖名单 -->
            <div class="btn-group" v-if="selectedLeafMenu.id !== '3dDraw' && selectedLeafMenu.id !== 'earthDraw'">
                <div class="label">中奖名单：</div>
                <div class="value-wrap">
                    <FuncButton @click="lotteryControl('openOrCloseSheet')" class="func-button">打开/关闭中奖名单</FuncButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FuncButton from '@/views/v2/components/FuncButton.vue';
import PageTitleWrap from '@/views/v2/components/PageTitle.vue';
import { mapState } from 'vuex';
import keyboardDetectionMixin from '@/mixins/keyboardDetection';

export default {
  data() {
    return {
      pickNum: 1,
    };
  },
  mixins: [keyboardDetectionMixin],
  methods: {
    async lotteryControl(action) {
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
    async onPickNumChange() {
      await this.$store.dispatch('instructions/sendInstruction', {
        type: 'game_control',
        action: 'setLotteryNum',
        param: this.pickNum,
      });
    },
  },
  components: {
    PageTitleWrap,
    FuncButton,
  },
  computed: {
    ...mapState('menu', ['selectedLeafMenu']),
    pageTitle() {
      return this.selectedLeafMenu.name ? this.selectedLeafMenu.name : '';
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
    flex-direction: column;
    align-items: center;
    row-gap: 4vw;
}
.btn-group {
    width: 80%;
    margin-bottom: 20px;
    color: #fff;
    .label {
        margin-bottom: 10px;
        color: #000;
    }
    .value-wrap {
        display: flex;
        justify-content: center;
        column-gap: 20px;
        color: #000;
    }
    .value-wrap:not(:last-child) {
        margin-bottom: 20px;
    }
}
</style>
