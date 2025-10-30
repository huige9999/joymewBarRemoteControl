<template>
  <div class="hbwall-wrap">
    <PageTitleWrap :pageTitle="pageTitle" />
    <div class="step" v-if="hbwallStep === 0">
      <FuncButton v-for="item in hbwallTypeList" :key="item.type + '-' + item.text" @click="chooseType(item.type)"
        class="func-button">
        {{ item.text }}
      </FuncButton>
    </div>
    <div class="func-button-container" v-if="hbwallStep === 1">
      <FuncButton class="func-button" @click="gameControl('start')">
        开始游戏
      </FuncButton>
    </div>
    <div class="func-button-container" v-if="hbwallStep === 2">
      <div class="boxList publicVCenter">
        <div class="boxItem publicHvCenter"
          :class="{ boxOutline: activeIndex === index, buyed: openedBox.indexOf(index) > -1 }" @click="selectBox(index)"
          v-for="(item, index) in boxList" :key="item">
          <div class="num">{{ item }}</div>
        </div>
      </div>
      <div class="func-button-container">
        <FuncButton class="func-button" @click="gameControl('openBox')">
          确认开红包
        </FuncButton>
        <FuncButton class="func-button" @click="gameControl('openBoxAll')">
          一键开红包
        </FuncButton>
      </div>
      <div class="func-button-container">
        <FuncButton @click="gameControl('end')">结束游戏</FuncButton>
      </div>
    </div>
    <div class="func-button-container" v-if="hbwallStep === 3">
      <FuncButton @click="gameControl('replay')">再玩一次</FuncButton>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PageTitleWrap from '@/views/v2/components/PageTitle.vue';
import FuncButton from '@/views/v2/components/FuncButton.vue';

export default {
  name: 'HbWall',
  components: {
    PageTitleWrap,
    FuncButton,
  },
  data() {
    return {
      // boxList、activeIndex、openedBox 保留，去除hbwallTypeList
      boxList: [],
      activeIndex: -1,
      openedBox: [],
    };
  },
  computed: {
    ...mapState('menu', ['selectedLeafMenu']),
    ...mapState(['hbwallStep']),
    ...mapState('game', ['hbwallTypeList']),
    pageTitle() {
      return this.selectedLeafMenu?.name || '';
    },
  },
  created() {
    this.initBoxList();
  },
  methods: {
    initBoxList() {
      // Generate 28 red envelope numbers
      for (let i = 0; i < 28; i += 1) {
        if (i < 3) {
          this.boxList.push(`${i + 1}`);
        } else if (i >= 3 && i < 12) {
          this.boxList.push(`${i + 2}`);
        } else if (i >= 12 && i < 21) {
          this.boxList.push(`${i + 3}`);
        } else {
          this.boxList.push(`${i + 4}`);
        }
      }
    },
    selectBox(index) {
      this.activeIndex = index;
    },
    setHbwallStep(step) {
      this.$store.commit('setHbwallStep', step);
    },
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
    async gameControl(action) {
      if (action === 'openBox') {
        if (this.activeIndex === -1) {
          this.$toast('请选择一个红包!');
          return;
        }
        if (this.openedBox.indexOf(this.activeIndex) > -1) {
          this.$toast('红包已经开启!');
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
.hbwall-wrap {
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
  display: flex;
  flex-wrap: wrap;
  column-gap: 2px;
  row-gap: 5px;
  justify-content: center;
}

.boxItem {
  width: 18vw;
  height: 18vw;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.boxItem.boxOutline {
  border: 5px solid #FFD700;
  background-color: #F0F8FF;
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
