<template>
  <div class="menu-wrap">
    <PageTitleWrap pageTitle="功能菜单" />
    <div class="menu-content">
      <button class="menu-item" @click="handleEnterOrderSong">点歌</button>
    </div>
  </div>
</template>

<script>
import PageTitleWrap from '@/views/v2/components/PageTitle.vue';

export default {
  name: 'MenuModule',
  components: {
    PageTitleWrap,
  },
  methods: {
    handleEnterOrderSong() {
      this.$emit('enter-order-song');
    },
  },
};
</script>

<style scoped>
.menu-wrap {
  width: 100%;
  padding: 0 32px;
  box-sizing: border-box;
}

.menu-content {
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.menu-item {
  width: 70vw;
  max-width: 500px;
  height: 120px;
  border-radius: 24px;
  background: #fff;
  border: none;
  color: #3e80f8;
  font-size: 36px;
  font-weight: 600;
  letter-spacing: 4px;
  box-shadow: 0 10px 30px rgba(255, 140, 73, 0.4);
  cursor: pointer;
  transition: transform 0.1s ease;
}

.menu-item:active {
  transform: scale(0.98);
}
</style>
