<template>
  <div class="v2-container">
    <Menu v-if="currentModule === 'menu'" @enter-order-song="handleEnterOrderSong" />
    <OrderSong v-else @back-to-menu="handleBackToMenu" />
  </div>
</template>

<script>
import OrderSong from './modules/orderSong/index.vue';
import Menu from './modules/menu/index.vue';

export default {
  name: 'V2',
  components: {
    OrderSong,
    Menu,
  },
  data() {
    return {
      currentModule: 'menu',
    };
  },
  methods: {
    async handleEnterOrderSong() {
      try {
        await this.$store.dispatch('instructions/sendInstruction', {
          type: 'router_jump',
          action: 'orderSong',
        });
      } catch (error) {
        console.error('Failed to send order song navigation instruction:', error);
        if (this.$toast && this.$toast.fail) {
          this.$toast.fail('通知大屏跳转失败');
        }
      }
      this.currentModule = 'orderSong';
    },
    async handleBackToMenu() {
      try {
        await this.$store.dispatch('instructions/sendInstruction', {
          type: 'router_jump',
          action: 'home',
        });
      } catch (error) {
        console.error('Failed to send back to home instruction:', error);
        if (this.$toast && this.$toast.fail) {
          this.$toast.fail('通知大屏返回失败');
        }
      }
      this.currentModule = 'menu';
    },
  },
};
</script>

<style lang="less" scoped>
.v2-container {
  width: 100vw;
  height: 100vh;
  position: relative;
  background: linear-gradient(180deg, #4b7cfb 0%, #79b4ff 100%);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
</style>
