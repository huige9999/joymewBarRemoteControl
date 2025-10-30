<template>
  <div class="mahjong-wrap">
    <PageTitleWrap :pageTitle="pageTitle" />
    <div class="func-button-container">
      <FuncButton @click="gameControl('start')" class="func-button"
        >开始</FuncButton
      >
       <FuncButton @click="gameControl('expose')" class="func-button"
        >揭晓答案</FuncButton
      >
             <FuncButton @click="next" class="func-button"
        >下一题</FuncButton
      >
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
import { GuessColorQuestioner } from '@/utils/multipleScreenResolve';

export default {
  name: 'GuessTextColor',
  data() {
    return {
      cwzys: {
        timer: false,
      },
    };
  },
  computed: {
    ...mapState(['currentMiniGameAnswer']),
    ...mapState('menu', ['selectedLeafMenu']),
    pageTitle() {
      return this.selectedLeafMenu.name ? this.selectedLeafMenu.name : '';
    },
  },
  methods: {
    async gameControl(action) {
      this.$toast.loading({
        message: '加载中...',
        duration: 0,
      });
      const payload = {
        type: 'game_control',
        action,
      };
      await this.$store.dispatch('instructions/sendInstruction', payload);
      this.$toast.clear();
      if (action === 'start') {
        await this.next();
      }
    },
    async next() {
      if (this.cwzys.timer) {
        return;
      }
      this.cwzys.timer = true;
      setTimeout(() => {
        this.cwzys.timer = false;
      }, 10000);
      const question = GuessColorQuestioner.getQuestion();
      const answer = question.map(({ color }) => GuessColorQuestioner.qToA(color)).toString();
      this.$store.commit('updateCurrentMiniGameAnswer', answer);
      const payload = {
        type: 'game_control',
        action: 'sendQuestion',
        param: JSON.stringify(question),
      };
      await this.$store.dispatch('instructions/sendInstruction', payload);
    },
  },
  components: {
    PageTitleWrap,
    FuncButton,
  },
};
</script>

<style scoped>
.mahjong-wrap {
  height: 100%;
}

.func-button-container {
  display: flex;
  justify-content: center;
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
.func-button.active {
  font-weight: bold;
  color: black;
  border: 2px solid black;
}
</style>
