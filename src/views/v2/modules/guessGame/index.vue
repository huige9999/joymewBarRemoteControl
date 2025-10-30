<template>
  <div class="sign-wrap">
    <PageTitleWrap :pageTitle="pageTitle" />
    <div class="func-button-container">
      <FuncButton @click="gameControl('prev')" class="func-button">上一题</FuncButton>
      <FuncButton @click="gameControl('next')" class="func-button">下一题</FuncButton>
      <FuncButton @click="gameControl('tip')" class="func-button" v-if="tipButtonGameIds.includes(selectedLeafMenu.id)">提示</FuncButton>
      <FuncButton @click="gameControl('start')" class="func-button" v-if="!startButtonGameIds.includes(selectedLeafMenu.id)">开始游戏</FuncButton>
      <FuncButton @click="gameControl('exposeAnswer')" class="func-button">揭晓答案</FuncButton>
    </div>
    <div class="answer-wrap">
      <label>答案：</label>
      <div v-html="currentMiniGameAnswer"></div>
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
      tipButtonGameIds: ['guessStar', 'funnyGuessStar', 'guessBrand'],
      startButtonGameIds: ['happyGuessIdioms', 'funnyGuessStar', 'poetryQuiz'],
    };
  },
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
  },
  name: 'pageWithTitle',
  components: {
    PageTitleWrap,
    FuncButton,
  },
  computed: {
  // 从 store 的 menu 模块映射 selectedLeafMenu 状态
    ...mapState('menu', ['selectedLeafMenu']),
    ...mapState(['currentMiniGameAnswer']),
    pageTitle() {
      return this.selectedLeafMenu.name ? this.selectedLeafMenu.name : '';
    },
  },
  watch: {
    selectedLeafMenu(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$store.commit('updateCurrentMiniGameAnswer', '');
      }
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
  margin-top: 39px;
  justify-content: center;
  margin-top: 5.2vw;
  flex-wrap: wrap;
  align-items: center;
  row-gap: 4vw;
  column-gap: 4vw;
  padding: 0 4vw;
}
.answer-wrap {
  position: relative;
  font-weight: 600;
  font-size: 4.8vw;
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0 4vw;
}
.answer-wrap label {
  font-size: 3.8vw;
  color: #000;
  font-weight: 400;
  margin-right: 12px;
}
</style>
