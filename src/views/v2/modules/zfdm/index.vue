<template>
  <div class="sign-wrap">
    <PageTitleWrap :pageTitle="pageTitle" />
    <div class="func-button-container">
      <FuncButton
        @click="chooseType(item)"
        class="func-button"
        v-for="item in zfdmList"
        :key="item.race_type"
      >
        开启{{ item.raceTime }}秒挑战{{ item.lotteryMoney }}元红包
      </FuncButton>
    </div>
    <div class="func-button-container">
      <FuncButton @click="gameControl('start')" class="func-button">开始游戏</FuncButton>
      <FuncButton @click="gameControl('end')" class="func-button">结束游戏</FuncButton>
      <FuncButton @click="gameControl('replay')" class="func-button">再玩一次</FuncButton>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PageTitleWrap from '@/views/v2/components/PageTitle.vue';
import FuncButton from '@/views/v2/components/FuncButton.vue';

export default {
  name: 'zfdm',
  components: {
    PageTitleWrap,
    FuncButton,
  },
  computed: {
    ...mapState({
      zfdmList: (state) => state.zfdmList,
      ...mapState('menu', ['selectedLeafMenu']),
    }),
    pageTitle() {
      return this.selectedLeafMenu && this.selectedLeafMenu.name ? this.selectedLeafMenu.name : '';
    },
  },
  methods: {
    async gameControl(action) {
      this.$toast.loading({
        message: '加载中...',
        duration: 0,
      });
      await this.$store.dispatch('instructions/sendInstruction', {
        type: 'game_control',
        action,
      });
      this.$toast.clear();
    },
    async chooseType(type) {
      this.$toast.loading({
        message: '加载中...',
        duration: 0,
      });
      await this.$store.dispatch('instructions/sendInstruction', {
        type: 'game_control',
        action: 'chooseType',
        param: JSON.stringify(type),
      });
      this.$toast.clear();
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
  justify-content: center;
  margin-top: 5.2vw;
  flex-direction: column;
  align-items: center;
  row-gap: 4vw;
}
</style>
