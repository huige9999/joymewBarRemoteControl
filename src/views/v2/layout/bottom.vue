<template>
    <div class="v2-bottom">
        <!-- 返回首页 -->
        <div class="back-home" v-show="selectedLeafMenu" @click="resetSelectedLeafMenu">
            <i class="iconfont icon-fanhui"></i>
            <span>返回首页</span>
        </div>
        <!-- 展开/收起按钮 -->
        <div class="toggle-btn" @click="toggleBtn">
            <!-- 移除了文字中的箭头符号 -->
            {{ isOpen ? '收起' : '展开' }}
            <!-- 添加下箭头图片，默认显示 -->
            <i class="iconfont icon-arrow-down" :class="{ 'rotate-arrow': !isOpen }"></i>
        </div>
        <!-- 全局控制菜单 -->
        <div class="global-control-menu_wrap">
            <GlobalControlMenu v-show="isOpen" :is-open="isOpen" />
        </div>
        <!-- 页面交互面菜单 -->
        <div class="page-interaction-menu_wrap">
            <PageInteractionMenu />
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import GlobalControlMenu from './components/globalControlMenu.vue';
import PageInteractionMenu from './components/pageInteractionMenu.vue';

export default {
  name: 'V2Bottom',
  components: {
    GlobalControlMenu,
    PageInteractionMenu,
  },
  data() {
    return {
      isOpen: true,
    };
  },
  computed: {
    ...mapState('menu', ['selectedLeafMenu']),
    toggleBtnText() {
      // 原来的方法内容已修改，移除了返回的箭头符号
      return this.isOpen ? '收起' : '展开';
    },
  },
  methods: {
    ...mapMutations('menu', {
      resetSelectedLeafMenu: (state) => state.setSelectedLeafMenu,
    }),
    toggleBtn() {
      this.isOpen = !this.isOpen;
    },
    async resetSelectedLeafMenu() {
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
};
</script>

<style scoped>
.v2-bottom {
    position: relative;
    background: #fff;
    border-radius: 30px 30px 0px 0px;
    padding-bottom: 10px;
}

.back-home {
    position: absolute;
    left: 19px;
    top: -35px;
    color: #fff;
    font-size: 22px;
    .icon-fanhui {
        font-size: 26px;
    }
    span {
        margin-left: 4px;
    }
}

.toggle-btn {
    width: 151px;
    height: 41px;
    background: #D4EBFE;
    font-size: 22px;
    font-weight: 500;
    color: #4D4E50;
    text-align: center;
    line-height: 41px;
    margin: 0 auto;
    border-radius: 0 0 60px 60px;
    margin-bottom: 30px;
    /* 新增flex布局样式以支持内部元素对齐 */
    display: flex;
    justify-content: center;
    align-items: center;
}

/* 新增旋转动画样式 */
.toggle-btn .icon-arrow-down {
   font-size: 16px;
   margin-left: 6px;
}
.toggle-btn .icon-arrow-down.rotate-arrow {
    transform: rotate(180deg);
    transition: transform 0.3s ease;
}

.global-control-menu_wrap {
    position: relative;
}

.page-interaction-menu_wrap {
    padding: 0 49px 108px 48px;
    margin-top: 28px;
}
</style>
