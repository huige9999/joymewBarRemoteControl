<template>
    <div class="sign-wrap">
        <PageTitleWrap :pageTitle="pageTitle" />
        <div class="func-button-container">
            <div class="btn-group">
                <div class="label">抽奖控制：</div>
                <div class="value-wrap">
                    <FuncButton @click="lotteryControl('startLottery')" class="func-button">开始抽奖</FuncButton>
                    <FuncButton @click="lotteryControl('replay')" class="func-button">再玩一次</FuncButton>
                </div>
            </div>
        </div>
        <div
        class="card_box"
      >
        <div
          v-for="(item, index) in cardAnswer"
          :key="index"
          @click="getCardanswer(index)"
        >
          {{ item.text }}
        </div>
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import PageTitleWrap from '@/views/v2/components/PageTitle.vue';
import FuncButton from '@/views/v2/components/FuncButton.vue';

export default {
  data() {
    return {
      pickNum: 1,
    };
  },
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
    async getCardanswer(index) {
      this.$toast.loading({
        message: '加载中...',
        duration: 0, // 持续显示
      });
      await this.$store.dispatch('instructions/sendInstruction', {
        type: 'game_control',
        action: 'getAnswer',
        param: String(index),
      });
      this.$toast.clear();
    },
  },
  components: {
    PageTitleWrap,
    FuncButton,
  },
  computed: {
    ...mapState('menu', ['selectedLeafMenu']),
    ...mapState({
      cardAnswer: (state) => state.cardAnswer,
    }),
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

.card_box {
      padding-left: 2vw;
      padding-right: 2vw;
      gap: 2vw;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: 10vw;
      grid-auto-rows: 10vw;

      div {
        background-color: #fff;
        border-radius: 4vw;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

</style>
