<template>
  <div class="sign-wrap">
    <PageTitleWrap :pageTitle="pageTitle" />
    <div class="func-button-container">
      <FuncButton @click="goHome" class="func-button">回到首页</FuncButton>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PageTitleWrap from '@/views/v2/components/PageTitle.vue';
import FuncButton from '@/views/v2/components/FuncButton.vue';

export default {
  methods: {
    async goHome() {
      this.$toast.loading({
        message: '加载中...',
        duration: 0, // 持续显示
      });
      await this.$store.dispatch('instructions/sendInstruction', {
        type: 'router_jump',
        action: '/',
      });
      this.$toast.clear();
      this.$store.commit('menu/setSelectedLeafMenu', null);
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
}
</style>
