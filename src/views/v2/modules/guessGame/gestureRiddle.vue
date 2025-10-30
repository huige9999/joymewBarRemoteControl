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
export default {
  name: 'gestureRiddle',
  data() {
    return {
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
  computed: {
    categoryList() {
      return this.$store.state.game.categoryList;
    },
  },
  methods: {
    async start() {
      await this.gameControl('GestureRiddleStart');
    },
    selectCategory(category) {
      if (this.$toast && this.$toast.loading) {
        this.$toast.loading({
          message: '加载中...',
          duration: 0,
        });
      }
      this.$store.dispatch('instructions/sendInstruction', {
        type: 'game_control',
        action: 'GestureRiddleSelectCategory',
        param: category,
      }).finally(() => {
        if (this.$toast && this.$toast.clear) {
          this.$toast.clear();
        }
      });
    },
    async gameControl(action) {
      if (this.$toast && this.$toast.loading) {
        this.$toast.loading({
          message: '加载中...',
          duration: 0,
        });
      }
      await this.$store.dispatch('instructions/sendInstruction', {
        type: 'game_control',
        action,
      });
      if (this.$toast && this.$toast.clear) {
        this.$toast.clear();
      }
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
      await this.gameControl(type);
    },
  },
};
</script>

<style scoped lang="less">
.container {
  width: 100vw;

  padding: 40px 10px 0 10px;

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
