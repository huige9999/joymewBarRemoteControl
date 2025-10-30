<template>
  <div class="mahjong-wrap">
    <PageTitleWrap :pageTitle="pageTitle" />
    <div class="func-button-container">
      <FuncButton
        @click="gameControl('controlHupaiNum', option.value)"
        class="func-button"
        :class="{ active: qsNum === option.value }"
        v-for="option in qsNumOptions"
        :key="option.value"
      >
        {{ option.label }}
      </FuncButton>
    </div>
    <div class="func-button-container">
      <FuncButton @click="handleHupaiOrContinue()" class="func-button"
        >胡牌/继续</FuncButton
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
import { getFromScreen, setFromScreen, getQuestioner } from '@/utils/multipleScreenResolve';

export default {
  data() {
    return {
      qsNum: 0,
      qsNumOptions: [
        { label: '1张', value: 1 },
        { label: '2张', value: 2 },
        { label: '3张', value: 3 },
        { label: '4张', value: 4 },
        { label: '5张', value: 5 },
        { label: '6张', value: 6 },
      ],
      showMahjongAnswer: true,
      questioner: getQuestioner(),
    };
  },
  methods: {
    async initMahjongPage() {
      // 如果来自于大屏主动控制的跳转则不发送题目
      if (getFromScreen()) {
        setFromScreen(false);
        return;
      }
      this.sendNextQuestion();
    },
    async gameControl(action, param) {
      this.$toast.loading({
        message: '加载中...',
        duration: 0, // 持续显示
      });
      const payload = {
        type: 'game_control',
        action,
      };
      if (param !== undefined) {
        payload.param = param;
      }
      await this.$store.dispatch('instructions/sendInstruction', payload);
      this.$toast.clear();
      if (action === 'controlHupaiNum') {
        this.qsNum = param;
      }
    },
    async handleHupaiOrContinue() {
      /**
       * 如果由遥控器控制，大屏此时不可以主动翻牌
       * 那么一开始是答案未揭晓，答案揭晓……如此循环往复
       */
      if (this.showMahjongAnswer) {
        /**
         * 如果揭晓答案
         */
        await this.gameControl('expose');

        this.showMahjongAnswer = false;
        return;
      }
      this.showMahjongAnswer = true;

      // 否则，就发送下一道题目的内容
      await this.sendNextQuestion();
    },
    /**
     * 发送下一道题目的内容
     */
    async sendNextQuestion() {
      const question = this.qsNum !== 0
        ? this.questioner.next(this.qsNum)
        : this.questioner.next();
      if (question) {
        let answerStr = '';
        question.answerList
          .map((i) => i.value)
          .forEach((number) => {
            if (number < 10) {
              answerStr += `${number}万`;
            } else if (number < 20) {
              answerStr += `${number - 10}筒`;
            } else {
              answerStr += `${number - 20}条`;
            }
          });
        // 将遥控器自己生成的题目的答案回显到页面上去
        this.$store.commit('updateCurrentMiniGameAnswer', answerStr);
        await this.gameControl(
          'sendQuestion',
          question ? JSON.stringify(question) : '',
        );
      } else {
        await this.gameControl('sendQuestion', '');
      }
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
    ...mapState('game', ['triggerInitMahjongPage']),
    pageTitle() {
      return this.selectedLeafMenu.name ? this.selectedLeafMenu.name : '';
    },
  },
  watch: {
    triggerInitMahjongPage(newVal) {
      if (newVal) {
        this.initMahjongPage();
        this.$store.commit('game/SET_TRIGGER_INIT_MAHJONG_PAGE', false);
      }
    },
    selectedLeafMenu(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$store.commit('updateCurrentMiniGameAnswer', '');
      }
    },
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
