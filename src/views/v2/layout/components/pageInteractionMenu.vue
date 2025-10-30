<template>
  <div class="page-menu">
    <div class="main-sub-menu_wrap" :class="{ 'has-sub-menu': subMenuItemsToDisplay.length > 0 }">
      <!-- 主菜单 (一级菜单) -->
      <div class="main-menu">
        <template v-for="item in menu">
          <span :key="item.id" :class="['main-menu-item', { active: activeMainId === item.id }]"
            @click="selectMainMenuItem(item)">
            {{ item.name }}
            <span v-if="hasThirdMenu(item)" class="arrow">
              <i class="iconfont icon-arrow-down"></i>
            </span>
          </span>
        </template>
      </div>

      <!-- 二级菜单 (横向列表) -->
      <div class="sub-menu" v-if="subMenuItemsToDisplay.length > 0">
        <span v-for="item in subMenuItemsToDisplay" :key="item.id"
          :class="['sub-menu-item', { active: activeSubId === item.id }]" @click="selectSubMenuItem(item)">
          {{ item.name }}
        </span>
      </div>
    </div>
    <!-- 三级菜单 (网格) -->
    <div class="third-menu" v-if="thirdMenuItemsToDisplay.length > 0">
      <span v-for="item in thirdMenuItemsToDisplay" :key="item.id"
        :class="['third-menu-item', { active: activeThirdId === item.id }]" @click="selectThirdMenuItem(item)">
        {{ item.name }}
      </span>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { excludeProperty } from '@/utils/index';

export default {
  name: 'PageInteractionMenu',
  data() {
    return {
      activeMainId: null,
      activeSubId: null,
      activeThirdId: null,
    };
  },
  computed: {
    ...mapState('menu', ['menu', 'selectedLeafMenu']),
    activeMainItem() {
      if (!this.activeMainId || !this.menu) return null;
      return this.menu.find((item) => item.id === this.activeMainId);
    },
    // 判断当前一级菜单的 children 是否还有 children
    mainSelectionLeadsToIntermediateSubMenu() {
      if (!this.activeMainItem || !this.activeMainItem.children || this.activeMainItem.children.length === 0) {
        return false;
      }
      // 只要有一个 child 有 children 就认为需要二级菜单
      return this.activeMainItem.children.some((child) => child.children && child.children.length > 0);
    },
    subMenuItemsToDisplay() {
      if (this.activeMainItem && this.mainSelectionLeadsToIntermediateSubMenu) {
        return this.activeMainItem.children || [];
      }
      return [];
    },
    activeSubItem() {
      if (!this.activeSubId || this.subMenuItemsToDisplay.length === 0) return null;
      return this.subMenuItemsToDisplay.find((item) => item.id === this.activeSubId);
    },
    thirdMenuItemsToDisplay() {
      if (this.activeMainItem) {
        if (this.mainSelectionLeadsToIntermediateSubMenu) {
          if (this.activeSubItem && this.activeSubItem.children) {
            return this.activeSubItem.children;
          }
          return [];
        }
        if (this.activeMainItem.children) {
          return this.activeMainItem.children;
        }
      }
      return [];
    },
  },
  watch: {
    menu: {
      immediate: true,
      handler(newMenu) {
        if (newMenu && newMenu.length > 0) {
          if (!this.activeMainId || !newMenu.some((item) => item.id === this.activeMainId)) {
            this.selectMainMenuItem(newMenu[0]);
          }
        } else {
          this.activeMainId = null;
          this.activeSubId = null;
          this.activeThirdId = null;
        }
      },
    },
    activeMainId() {
      this.activeSubId = null;
      this.activeThirdId = null;
      if (this.activeMainItem) {
        if (this.mainSelectionLeadsToIntermediateSubMenu) {
          // 有二级菜单，只选中第一个二级菜单
          if (this.subMenuItemsToDisplay.length > 0) {
            this.activeSubId = this.subMenuItemsToDisplay[0].id;
          }
          // 不选中三级菜单
        } else {
          // 没有二级菜单，不选中三级菜单
        }
      }
    },
    activeSubId() {
      this.activeThirdId = null;
      // 不自动选中三级菜单
    },
    selectedLeafMenu(newVal) {
      if (!newVal) {
        // 只清空二级、三级菜单选中，主菜单保持默认（比如第一个）
        this.activeSubId = null;
        this.activeThirdId = null;
      }
    },
  },
  methods: {
    ...mapMutations('menu', ['setSelectedLeafMenu']),
    isLeafInChildren(children, leafId) {
      if (!children) return false;
      return children.some((child) => {
        if (child.id === leafId) return true;
        if (child.children && this.isLeafInChildren(child.children, leafId)) return true;
        return false;
      });
    },
    selectMainMenuItem(item) {
      this.activeMainId = item.id;
      this.checkAndSetLeafMenu(item);
      // 检查store中的selectedLeafMenu是否在当前主菜单的子树下
      if (
        this.selectedLeafMenu
        && this.selectedLeafMenu.id
        && this.isLeafInChildren(item.children, this.selectedLeafMenu.id)
      ) {
        this.setSelectedItemId(this.selectedLeafMenu.id);
      }
    },
    selectSubMenuItem(item) {
      this.activeSubId = item.id;
      this.checkAndSetLeafMenu(item);
      // 检查store中的selectedLeafMenu是否在当前二级菜单的子树下
      if (
        this.selectedLeafMenu
        && this.selectedLeafMenu.id
        && this.isLeafInChildren(item.children, this.selectedLeafMenu.id)
      ) {
        this.setSelectedItemId(this.selectedLeafMenu.id);
      }
    },
    async selectThirdMenuItem(item) {
      // 调用sendInstruction发送路由跳转指令
      this.$toast.loading({
        message: '加载中...',
        duration: 0, // 持续显示
      });
      const paramObj = {
        type: 'router_jump',
        action: item.meta.path,
      };
      // 使用excludeProperty工具函数，排除path属性，组装param
      const param = excludeProperty(item.meta, 'path');
      if (Object.keys(param).length > 0) {
        paramObj.param = param;
      }

      await this.$store.dispatch('instructions/sendInstruction', paramObj);
      this.$toast.clear();
      this.activeThirdId = item.id;
      this.setSelectedLeafMenu(item);
    },
    checkAndSetLeafMenu(item) {
      if (!item.children || item.children.length === 0) {
        this.activeThirdId = null;
        this.setSelectedLeafMenu(item);
      }
    },
    setSelectedItemId(id) {
      let itemToSelect = null;
      let parentItem = null;
      let grandParentItem = null;
      const find = (items, currentGrandParent, currentParent) => {
        items.forEach((item) => {
          if (item.id === id) {
            itemToSelect = item;
            parentItem = currentParent;
            grandParentItem = currentGrandParent;
          }
          if (item.children) {
            find(item.children, currentParent || item, item);
          }
        });
      };
      find(this.menu, null, null);
      if (itemToSelect) {
        if (grandParentItem) {
          this.activeMainId = grandParentItem.id;
          this.$nextTick(() => {
            this.activeSubId = parentItem.id;
            this.$nextTick(() => {
              this.activeThirdId = itemToSelect.id;
            });
          });
        } else if (parentItem) {
          this.activeMainId = parentItem.id;
          this.$nextTick(() => {
            if (this.mainSelectionLeadsToIntermediateSubMenu) {
              this.activeSubId = itemToSelect.id;
            } else {
              this.activeSubId = null;
              this.activeThirdId = itemToSelect.id;
            }
          });
        } else {
          this.activeMainId = itemToSelect.id;
        }
      } else {
        this.activeMainId = null;
        this.activeSubId = null;
        this.activeThirdId = null;
      }
    },
    hasThirdMenu(item) {
      if (!item.children) return false;
      return item.children.some((child) => child.children && child.children.length > 0);
    },
  },
};
</script>

<style scoped>
.page-menu {
  position: relative;
}

.main-sub-menu_wrap {
  margin-bottom: 22px;
}
.main-sub-menu_wrap.has-sub-menu {
  width: 653px;
  height: 144px;
  border-radius: 30px;
  border: 2px solid #5998FF;
}

.main-menu {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 11px;
  height: 71px;
  background: #5998FF;
  border-radius: 22px 22px 22px 22px;
}

.main-menu .main-menu-item:not(:last-child)::after {
  content: '';
  display: block;
  width: 1px;
  height: 26px;
  background: rgba(255, 255, 255, 0.5);
  position: absolute;
  right: 0;
}

.main-menu-item {
  color: #fff;
  font-weight: 500;
  width: 153px;
  height: 47px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  font-weight: bold;
  position: relative;
}

.main-menu-item.active {
  background: #FFFFFF;
  border-radius: 11px 11px 11px 11px;
  color: #5998FF;
}

.arrow {
  font-size: 12px;
  margin-left: 4px;
  transition: transform 0.2s;
}

.main-menu-item.active .arrow {
  transform: rotate(-90deg);
}

.sub-menu {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.sub-menu-item {
  font-size: 24px;
  color: #3E80F8;
  font-weight: 500;
  width: 153px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  line-height: 50px;
}

.sub-menu-item.active::after {
  content: '';
  display: block;
  width: 97px;
  height: 7px;
  background: #5998FF;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.third-menu {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px 16px;
  justify-content: center;
}

.third-menu-item {
  width: 149px;
  height: 56px;
  border-radius: 187px;
  border: 1px solid #CCCCCC;
  background: #fff;
  color: #4D4E50;
  font-size: 21px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.third-menu-item.active {
  background: #5998FF;
  color: #fff;
  border: none;
}
</style>
