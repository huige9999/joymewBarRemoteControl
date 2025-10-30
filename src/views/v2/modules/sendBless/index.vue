<template>
    <div class="kbxMod">
        <PageTitleWrap :pageTitle="pageTitle" />
        <div class="func-button-container">
            <FuncButton class="func-button" @click="chooseType(item)" v-for="item in timeList" :key="item.id">
                {{ item.name }}秒
            </FuncButton>
        </div>
        <div class="func-button-container">
            <FuncButton @click="gameControl('end')" class="func-button">结束游戏</FuncButton>
            <FuncButton @click="gameControl('replay')" class="func-button">再玩一次</FuncButton>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { CODE } from '@/assets/constant/index';
import PageTitleWrap from '@/views/v2/components/PageTitle.vue';
import FuncButton from '@/views/v2/components/FuncButton.vue';

const TIMES = [
  {
    id: 0,
    name: '120',
  },
  {
    id: 1,
    name: '150',
  },
  {
    id: 2,
    name: '180',
  },
];

export default {
  name: 'sendBlessing',
  components: {
    PageTitleWrap,
    FuncButton,
  },
  computed: {
    ...mapState('menu', ['selectedLeafMenu']),
    pageTitle() {
      return this.selectedLeafMenu.name ? this.selectedLeafMenu.name : '';
    },
  },
  data() {
    return {
      timeList: TIMES,
      CODE,
    };
  },
  beforeDestroy() {
    this.$store.commit('clearOpenedBox');
  },
  methods: {
    async chooseType(pObj) {
      this.$toast.loading({
        message: '加载中...',
        duration: 0, // 持续显示
      });
      const tParam = {
        time: pObj.name,
      };
      await this.$store.dispatch('instructions/sendInstruction', {
        type: 'game_control',
        action: 'szfChooseTime',
        param: JSON.stringify(tParam),
      });
      this.$toast.clear();
    },
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
};
</script>

<style lang="less" scoped>
.kbxMod {
    width: 100%;
    height: 100%;
    position: relative;
}

.func-button-container {
    display: flex;
    justify-content: center;
    margin-top: 39px;
    justify-content: center;
    margin-top: 5.2vw;
    align-items: center;
    gap: 4vw;
  }
</style>
