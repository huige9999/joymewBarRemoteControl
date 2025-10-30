<template>
  <div
    class="main"
    :style="{ backgroundImage: 'url(' + menuInfo.bg + ')' }"
  >
    <!-- 顶部 -->
    <myHead
      class="head"
      :name="menuInfo.name"
    />
    <router-view class="router-view"></router-view>
    <!-- 底部菜单 -->
    <menuBottom
      class="menu-bottom"
      ref="menuBottom"
      :name="menuInfo.name"
      :bg="menuInfo.bg"
      :subMenus="menuInfo.subMenus"
    />
  </div>
</template>
<script>
import { getMenuInfoByfLevelId } from '@/assets/constant/index';
import menuBottom from '@/components/menuBottom.vue';
import myHead from '@/components/myHead.vue';
import { mapState } from 'vuex';

export default {
  name: 'myMain',
  components: {
    myHead,
    menuBottom,
  },
  data() {
    return {

    };
  },
  computed: {
    ...mapState({
      currentMenuId: (state) => state.currentMenuId,
      userRoutes: (state) => state.userRoutes,
    }),
    // XXX 后续需要重构为从路由中获取
    /** 当前菜单信息 */
    menuInfo() {
      if (this.currentMenuId) {
        return getMenuInfoByfLevelId(this.currentMenuId, this.userRoutes);
      }
      return { name: '', bg: '', subMenus: [] };
    },
  },
};
</script>
<style lang="less" scoped>
.main {
  width: 100vw;
  height: 100vh;
  position: relative;
  background-size: 100% 100%;

  display: grid;
  grid-template:
    'head ' min-content
    'router-view' 1fr
    'menu-bottom' min-content
    ~'/' 1fr;
  row-gap: 30px;

  .head {
    grid-area: head;
  }

  .router-view {
    grid-area: router-view;
    height: 100%;
    overflow: scroll;
  }

  .menu-bottom {
    grid-area: menu-bottom;
  }
}
</style>
