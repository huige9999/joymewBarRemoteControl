<template>
  <div class="v2-container">
    <OrderSong />
  </div>
</template>

<script>
import OrderSong from './modules/orderSong/index.vue';

export default {
  name: 'V2',
  components: {
    OrderSong,
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
