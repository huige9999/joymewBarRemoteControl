<template>
  <div class="sign-wrap">
    <PageTitleWrap :pageTitle="pageTitle" />
    <div class="func-button-container">
      <FuncButton @click="voteControl('clearPrev')" class="func-button">清空上一轮</FuncButton>
      <FuncButton @click="voteControl('savePrev')" class="func-button">保留上一轮</FuncButton>
      <FuncButton @click="voteControl('end')" class="func-button">结束投票</FuncButton>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PageTitleWrap from '@/views/v2/components/PageTitle.vue';
import FuncButton from '@/views/v2/components/FuncButton.vue';

export default {
  methods: {
    async voteControl(action) {
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
  name: 'Vote',
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
  flex-direction: column;
  align-items: center;
  row-gap: 4vw;
}
</style>
