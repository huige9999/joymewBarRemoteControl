<template>
  <div class="kbx-wrap">
    <PageTitleWrap :pageTitle="pageTitle" />
    <div class="step" v-if="kbxStep === 0">
      <FuncButton v-for="item in kbxTypeList" :key="item.type + '-' + item.text" @click="chooseType(item.type)"
        class="func-button">
        {{ item.text }}
      </FuncButton>
    </div>
    <!-- 步骤1：开始游戏按钮 -->
    <div class="func-button-container" v-if="kbxStep === 1">
      <FuncButton class="func-button" @click="gameControl('start')">
        开始游戏
      </FuncButton>
    </div>
    <!-- 步骤2：开宝箱流程 -->
    <div class="func-button-container" v-if="kbxStep === 2">
      <div class="boxList publicVCenter">
        <div class="boxItem publicHvCenter" :class="{
          boxOutline: activeIndex === index,
          buyed: openedBox.indexOf(index) > -1
        }" @click="selectBox(index)" v-for="(item, index) in boxList" :key="item">
          <div class="num">{{ item }}</div>
        </div>
      </div>
      <div class="func-button-container">
        <FuncButton class="func-button" @click="gameControl('openBox')">
          确认开宝箱
        </FuncButton>
        <FuncButton class="func-button" @click="gameControl('openBoxAll')">
          一键开宝箱
        </FuncButton>
      </div>
      <div class="func-button-container">
        <FuncButton @click="gameControl('end')">结束游戏</FuncButton>
      </div>
    </div>
    <!-- 步骤3：再玩一次 -->
    <div class="func-button-container" v-if="kbxStep === 3">
      <FuncButton @click="gameControl('replay')">再玩一次</FuncButton>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PageTitleWrap from '@/views/v2/components/PageTitle.vue';
import FuncButton from '@/views/v2/components/FuncButton.vue';

export default {
  name: 'kbx',
  components: {
    PageTitleWrap,
    FuncButton,
  },
  data() {
    return {
      boxList: [],
      activeIndex: -1,
      openedBox: [],
    };
  },
  computed: {
    ...mapState({
      kbxStep: (state) => state.kbxStep,
      ...mapState('menu', ['selectedLeafMenu']),
    }),
    ...mapState('game', ['kbxTypeList']),
    pageTitle() {
      return this.selectedLeafMenu && this.selectedLeafMenu.name
        ? this.selectedLeafMenu.name
        : '';
    },
  },
  created() {
    this.initBoxList();
  },
  methods: {
    async chooseType(type) {
      this.$toast.loading({
        message: '加载中...',
        duration: 0,
      });
      await this.$store.dispatch('instructions/sendInstruction', {
        type: 'game_control',
        action: 'chooseType',
        param: type,
      });
      this.$toast.clear();
    },
    initBoxList() {
      // 生成18个宝箱编号，和OpenTreasureBox.vue一致
      for (let i = 0; i < 18; i += 1) {
        if (i < 3) {
          this.boxList.push(`0${i + 1}`);
        } else if (i >= 3 && i < 8) {
          this.boxList.push(`0${i + 2}`);
        } else if (i >= 8 && i < 12) {
          this.boxList.push(`${i + 2}`);
        } else if (i >= 12 && i < 18) {
          this.boxList.push(`${i + 3}`);
        }
      }
    },
    selectBox(index) {
      this.activeIndex = index;
    },
    async gameControl(action) {
      if (action === 'openBox') {
        if (this.activeIndex === -1) {
          this.$toast('请选择一个宝箱!');
          return;
        }
        if (this.openedBox.indexOf(this.activeIndex) > -1) {
          this.$toast('宝箱已经开启!');
          return;
        }
        console.log(this.activeIndex);
        await this.$store.dispatch('instructions/sendInstruction', {
          type: 'game_control',
          action: 'openBox',
          param: this.activeIndex,
        });
        this.openedBox.push(this.activeIndex);
      } else if (action === 'openBoxAll') {
        await this.$store.dispatch('instructions/sendInstruction', {
          type: 'game_control',
          action: 'openBoxAll',
        });
      } else if (action === 'start') {
        await this.$store.dispatch('instructions/sendInstruction', {
          type: 'game_control',
          action: 'start',
        });
      } else if (action === 'end') {
        await this.$store.dispatch('instructions/sendInstruction', {
          type: 'game_control',
          action: 'end',
        });
      } else if (action === 'replay') {
        await this.$store.dispatch('instructions/sendInstruction', {
          type: 'game_control',
          action: 'replay',
        });
      }
    },
  },
};
</script>

<style scoped>
.kbx-wrap {
  height: 100%;
}

.func-button-container {
  display: flex;
  justify-content: center;
  margin-top: 5.2vw;
  flex-direction: column;
  align-items: center;
  row-gap: 4vw;
}

.boxList {
  width: 100%;
  position: relative;
  flex-wrap: wrap;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  column-gap: 2px;
  row-gap: 5px;
  justify-content: center;
}

.boxItem {
  display: flex;
  width: 18vw;
  height: 18vw;
  position: relative;
  flex-direction: column;
  background-color: #fff;
  border-radius: 10px;
}

.boxItem .num {
  color: #333;
  font-size: 32px;
}

.boxItem.boxOutline {
  border: 5px solid #FFD700;
  background-color: #F0F8FF;
}
.boxItem.boxOutline > .num {
  color: #000000;
  text-shadow: 0 0 2px rgba(255,215,0,0.3);
}
.boxItem.buyed {
  background-color: #E6E6E6;
  border: 1px solid #CCCCCC;
}
.boxItem.buyed > .num {
  color: #999999;
}
.step {
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
