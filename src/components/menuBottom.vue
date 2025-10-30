<template>
  <div class="menus">
    <div
      class="menuItem publicHvCenter"
      v-for="item in subMenus"
      :key="item.id"
      :style="{ backgroundImage: 'url(' + bg + ')' }"
      :class="{ active: item.name === name }"
      @click="onClickMenuItem(item)"
    >
      <label>{{ item.name }}</label>
    </div>
  </div>
</template>
<script>
import sendInstrunction from '@/api/sendCode';
import { CONTROL_CODE } from '@/assets/constant/index';

export default {
  name: 'menuBottom',
  props: {
    name: {
      type: String,
      default: '',
    },
    bg: {
      type: String,
      default: '',
    },
    subMenus: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    /**
     * 菜单点击事件
     * @param {*} menuId 菜单id
     * @param {*} menuItem 子菜单对象
     */
    onClickMenuItem(menuItem) {
      if (menuItem?.screenUrl) {
        sendInstrunction({
          code: CONTROL_CODE.ROUTER_JUMP,
          param: { path: menuItem?.screenUrl || '/' },
        });
        return;
      }
      if (menuItem?.toScreen) {
        sendInstrunction(menuItem?.toScreen);
        return;
      }
      if (menuItem.routeName) {
        this.$router.push({ name: menuItem?.routeName });
      }
    },
  },
};
</script>
<style lang="less" scoped>
.menus {
  width: 100%;
  padding: 40px 20px 20px 20px;
  background-color: #fff;
  border-radius: 40px 40px 0 0;

  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;
  overflow-y: scroll;

  .menuItem {
    color: #fff;
    flex-direction: column;
    padding: 20px 40px;
    margin-right: 20px;
    margin-bottom: 20px;
    border-radius: 20px;
    background-size: contain;

    &.active {
      color: #000;
    }
  }
}
@media screen and (max-height: 760px) {
  .menus {
    max-height: 650px;
  }
}
@media screen and (max-height: 700px) {
  .menus {
    max-height: 550px;
  }
}
@media screen and (max-height: 630px) {
  .menus {
    max-height: 400px;
  }
}
@media screen and (max-height: 560px) {
  .menus {
    max-height: 300px;
  }
}
@media screen and (max-height: 500px) {
  .menus {
    max-height: 180px;
  }
}
</style>
