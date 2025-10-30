<template>
  <div class="sign-wrap">
    <PageTitleWrap :pageTitle="pageTitle" />
    <div class="func-button-container">
      <FuncButton class="func-button" @click="gameControl('show_bridegroom_name')">新郎签名</FuncButton>
      <FuncButton class="func-button" @click="gameControl('show_bride_name')">新娘签名</FuncButton>
      <FuncButton class="func-button" @click="gameControl('clear_sign')">清空签名</FuncButton>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PageTitleWrap from '@/views/v2/components/PageTitle.vue';
import FuncButton from '@/views/v2/components/FuncButton.vue';

export default {
  name: 'SignWeddingBook',
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
  methods: {
    async gameControl(type) {
      if (type === 'clear_sign') {
        // 清空签名需要确认
        try {
          await this.$dialog.confirm({
            title: '确认清空签名？',
          });
        } catch (e) {
          if (e === 'cancel') return;
          console.error(e);
          return;
        }
      }
      this.$toast.loading({
        message: '操作中...',
        duration: 0,
      });
      await this.$store.dispatch('instructions/sendInstruction', {
        type: 'game_control',
        action: type,
      });
      this.$toast.clear();
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
  justify-content: center;
  margin-top: 5.2vw;
  flex-wrap: wrap;
  align-items: center;
  row-gap: 4vw;
  column-gap: 4vw;
  padding: 0 4vw;
}
</style>
