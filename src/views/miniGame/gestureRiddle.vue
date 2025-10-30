<!--
  * @Description: 「你划我猜」游戏遥控器
  * @Author: Ruan Jiazhen
  * @Date: 2023-12-22
-->
<template>
  <div>
    <div class="container">
      <button
        class="btn start"
        @click="start"
      >
        开始游戏
      </button>
      <div class="category-list">
        <button
          class="category-item"
          v-for="(item, index) in categoryList"
          :key="index"
          @click="selectCategory(item)"
        >
          {{ item }}
        </button>
      </div>
      <button
        v-for="(item, index) in btnList"
        :key="index"
        :class="`btn ${item.class}`"
        @click="clickBtn(item.type)"
      >
        {{ item.name }}
      </button>
    </div>
  </div>
</template>

<script>
import sendInstrunction from '@/api/sendCode';
import { CONTROL_CODE } from '@/assets/constant';
import { extractMessage, screenMessenger } from '@/modules/screenMessenger';

export default {
  name: 'gestureRiddle',
  data() {
    return {
      categoryList: ['生活', '食品', '物品', '人物', '电影', '成语'],
      btnList: [
        { name: '换一题', class: 'change-question', type: 'GestureRiddleChangeQuestion' },
        { name: '正确', class: 'answer-right', type: 'GestureRiddleAnswerRight' },
        { name: '提前结束', class: 'end-game', type: 'GestureRiddleEndGame' },
        { name: '再玩一次', class: 'play-again', type: 'GestureRiddlePlayAgain' },
        { name: '游戏成绩', class: 'score', type: 'GestureRiddleScore' },
        { name: '清空游戏成绩', class: 'clear-score', type: 'GestureRiddleClearScore' },
      ],
    };
  },
  mounted() {
    setTimeout(() => {
      this.sendCategoryListRequest();
    }, 1000);
    screenMessenger.on(this.handleMessage);
  },
  beforeDestroy() {
    screenMessenger.off(this.handleMessage);
  },
  methods: {
    sendCategoryListRequest() {
      sendInstrunction({
        code: CONTROL_CODE.GAME_CONTROL,
        param: { type: 'GestureRiddleCategoryList' },
      });
    },
    handleMessage(msg) {
      const { param } = extractMessage(msg);
      if (param.type === 'GestureRiddleCategoryList') {
        this.categoryList = param.data;
      }
    },
    async start() {
      sendInstrunction({
        code: CONTROL_CODE.GAME_CONTROL,
        param: { type: 'GestureRiddleStart' },
      });
    },
    selectCategory(category) {
      sendInstrunction({
        code: CONTROL_CODE.GAME_CONTROL,
        param: { type: 'GestureRiddleSelectCategory', category },
      });
    },
    async clickBtn(type) {
      switch (type) {
        case 'GestureRiddleEndGame':
          try {
            await this.$dialog.confirm({
              title: '提示',
              message: '是否提前结束游戏？',
            });
          } catch (err) {
            if (err === 'cancel') return;
            console.error(err);
          }
          break;
        case 'GestureRiddleClearScore':
          try {
            await this.$dialog.confirm({
              title: '提示',
              message: '是否清空游戏成绩？',
            });
          } catch (err) {
            if (err === 'cancel') return;
            console.error(err);
          }
          break;
        default:
          break;
      }
      sendInstrunction({
        code: CONTROL_CODE.GAME_CONTROL,
        param: { type },
      });
    },
  },
};
</script>

<style scoped lang="less">
.container {
  width: 100vw;

  padding: 0 10px;

  display: grid;
  grid-template-areas:
    'start start start'
    'category-list category-list category-list'
    'change-question answer-right end-game'
    'play-again score clear-score';
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, min-content);
  place-items: center;
  grid-gap: 20px;

  .btn {
    width: 30vw;
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

  .category-list {
    grid-area: category-list;

    border: 2px solid #fff;
    border-radius: 28px;

    padding: 10px;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, min-content);
    place-items: center;
    grid-gap: 10px;

    .category-item {
      width: 30vw;
      height: 10.67vw;

      border-radius: 28px;
      color: #fff;
      border: 2px solid #fff;
      transition: all 0.2s linear;

      display: flex;
      justify-content: center;
      align-items: center;

      font-size: 3.47vw;

      &:nth-child(1) {
        background-color: #ffa231;
      }

      &:nth-child(2) {
        background-color: #3289ff;
      }

      &:nth-child(3) {
        background-color: #e365c9;
      }

      &:nth-child(4) {
        background-color: #26beef;
      }

      &:nth-child(5) {
        background-color: #002b9a;
      }

      &:nth-child(6) {
        background-color: #9565e3;
      }

      &:active {
        background-color: rgba(255, 255, 255, 0.6);
      }
    }
  }

  .start {
    grid-area: start;
  }

  .change-question {
    grid-area: change-question;
  }

  .answer-right {
    grid-area: answer-right;
  }

  .end-game {
    grid-area: end-game;
  }

  .play-again {
    grid-area: play-again;
  }

  .score {
    grid-area: score;
  }

  .clear-score {
    grid-area: clear-score;
  }
}
</style>
