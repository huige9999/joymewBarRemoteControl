<template>
  <div class="effect-area">
    <!-- SVGA 动画容器 -->
    <div ref="svgaContainer" class="svga-container" />
  </div>
</template>
<script>
import { mapState } from 'vuex';
import SVGA from 'svgaplayerweb';

export default {
  name: 'EffectPlayer',
  data() {
    return {
      player: null,
      parser: null,
    };
  },
  computed: {
    // 监听 gift 模块的 currentGiftEffect
    ...mapState({
      currentGiftEffect: (state) => state.gift.currentGiftEffect,
    }),
  },
  watch: {
    // 当 currentGiftEffect 变化时，触发播放
    currentGiftEffect(newGift) {
      if (newGift && newGift.id && newGift.path) {
        this.playSvga(newGift.path);
      }
    },
  },
  created() {
    // 初始化 svga parser
    this.parser = new SVGA.Parser();
  },
  methods: {
    playSvga(path) {
      // 如果已经有播放器实例，先清理
      if (this.player) {
        this.player.stopAnimation(true); // stop and clear
      }

      // 创建新的播放器实例
      this.player = new SVGA.Player(this.$refs.svgaContainer);
      this.player.loops = 1; // 播放一次

      // 监听播放完成事件
      this.player.onFinished(() => {
        // 动画播放完成后，通知 Vuex 移除当前礼物，以便播放下一个
        this.$store.commit('gift/removeFromGiftQueue');
        this.player.clear();
        this.player = null;
      });

      // 解析并播放动画
      this.parser.load(path, (videoItem) => {
        if (this.player) {
          this.player.setVideoItem(videoItem);
          this.player.startAnimation();
        }
      }, (error) => {
        console.error('SVGA load error:', error);
        // 如果加载失败，也应该从队列中移除，避免阻塞
        this.$store.commit('gift/removeFromGiftQueue');
      });
    },
  },
};
</script>
<style lang="less" scoped>
// 样式从 joymewH5 的 effectArea.vue 迁移过来
.effect-area {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  pointer-events: none; // 不阻挡下层元素的点击事件
  z-index: 999; // 确保在顶层
  overflow: hidden;

  .svga-container {
    position: absolute;
    width: 100%;
    height: 100%;
  }
}
</style>
