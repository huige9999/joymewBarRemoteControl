<template>
  <div class="v2-container">
    <!-- 顶部内容 -->
    <V2Top />
    <!-- 底部菜单 - 当键盘可见时隐藏 -->
    <V2Bottom v-show="!isKeyboardVisible" />
    <!-- 全局礼物播放器 -->
    <EffectPlayer />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import EffectPlayer from '@/views/v2/modules/effectPlayer/index.vue';
import V2Top from './layout/top.vue';
import V2Bottom from './layout/bottom.vue';

export default {
  name: 'V2',
  components: {
    V2Top,
    V2Bottom,
    EffectPlayer,
  },
  computed: {
    ...mapState('menu', ['isKeyboardVisible']),
  },
  created() {
    this.init();
  },
  methods: {
    ...mapActions('menu', ['initMenu']),
    ...mapActions('chat', ['getChatList', 'listenChatMessage']),
    ...mapActions('live', ['fetchSplInfo']),
    ...mapActions('gift', ['listenGiftMessage']),
    async init() {
      this.initMenu();
      await this.fetchSplInfo();
      await this.$store.dispatch('gift/fetchGiftSenderRankList');
      await this.$store.dispatch('gift/fetchGiftListAll');
      await this.getChatList();
      this.listenChatMessage();
      this.listenGiftMessage();
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
  overflow-y: hidden;
}
</style>
