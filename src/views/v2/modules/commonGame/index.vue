<template>
    <div class="sign-wrap">
      <PageTitleWrap :pageTitle="pageTitle" />
      <div class="func-button-horizontal" v-if="selectedLeafMenu.id === 'moneyTreeShake' && moneyTreeShakeChooseMode">
        <FuncButton @click="chooseMode('normal')" class="func-button">普通模式</FuncButton>
        <FuncButton @click="chooseMode('redPacket')" class="func-button">红包模式</FuncButton>
      </div>
      <div class="func-button-container">
        <FuncButton @click="gameControl('start')" class="func-button">开始游戏</FuncButton>
        <FuncButton @click="gameControl('end')" class="func-button">结束游戏</FuncButton>
        <FuncButton @click="gameControl('replay')" class="func-button">再玩一次</FuncButton>
      </div>
    </div>
  </template>

<script>
import FuncButton from '@/views/v2/components/FuncButton.vue';
import PageTitleWrap from '@/views/v2/components/PageTitle.vue';
import { mapState } from 'vuex';

export default {
  methods: {
    async gameControl(action) {
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
    async chooseMode(param) {
      this.$toast.loading({
        message: '加载中...',
        duration: 0, // 持续显示
      });
      await this.$store.dispatch('instructions/sendInstruction', {
        type: 'game_control',
        action: 'chooseMode',
        param,
      });
      this.$toast.clear();
    },
  },
  name: 'pageWithTitle',
  components: {
    PageTitleWrap,
    FuncButton,
  },
  computed: {
    // 从 store 的 menu 模块映射 selectedLeafMenu 状态
    ...mapState('menu', ['selectedLeafMenu']),
    ...mapState('game', ['moneyTreeShakeChooseMode']),
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
  .func-button-horizontal {
    display: flex;
    justify-content: center;
    column-gap: 40px;
    margin-top: 20px;
  }
  .func-button-container {
    display: flex;
    justify-content: center;
    margin-top: 5.2vw;
    flex-direction: column;
    align-items: center;
    row-gap: 4vw;
  }
  </style>
