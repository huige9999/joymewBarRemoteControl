<template>
  <div class="global-control-menu" :class="{ 'is-open': isOpen }">
    <div
      class="menu-item"
      v-for="item in menuList"
      :key="item.id"
      @click="handleMenuItemClick(item)"
    >
      <div class="icon-placeholder">
        <img :src="item.icon" :alt="item.name" class="menu-icon" />
      </div>
      <div class="item-text">{{ item.name }}</div>
    </div>

    <van-popup v-model="giftPopupVisible" position="bottom" class="vanPopup">
      <gift />
    </van-popup>

    <van-popup
      v-model="multiMediaPopupVisible"
      position="bottom"
      class="vanPopup"
    >
      <multiMedia :navIdProp="multiMediaNavId" />
    </van-popup>
  </div>
</template>

<script>
import gift from '@/components/gift.vue';
import multiMedia from '@/views/v2/components/multiMedia.vue';
import { mapState } from 'vuex';

export default {
  name: 'GlobalControlMenu',
  components: {
    gift,
    multiMedia,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapState('menu', ['globalMenu']),
    menuList() {
      return this.globalMenu;
    },
  },
  data() {
    return {
      giftPopupVisible: false,
      multiMediaPopupVisible: false,
      multiMediaNavId: 1,
    };
  },
  methods: {
    async handleMenuItemClick(item) {
      if (item.id === 'freeGift') {
        this.giftPopupVisible = true;
        this.$store.dispatch('initGiftList');
      } else if (item.id === 'videoPlay') {
        this.sendInstruction('router_jump', '/videoPlayer', null);
        this.showMultiMediaPopup(1);
      } else if (item.id === 'photoFix') {
        this.sendInstruction('router_jump', '/fixedScreen', null);
        this.showMultiMediaPopup(2);
      } else if (item.id === 'curtainCall') {
        this.sendInstruction('router_jump', '/closing', null);
      } else if (item.id === 'wishRank') {
        this.sendInstruction('router_jump', '/sendGift', null);
      } else if (item.id === 'refresh') {
        await this.sendInstruction('global_control', item.id, null);
        this.$toast('已刷新');
      } else {
        this.sendInstruction('global_control', item.id, null);
      }
    },
    showMultiMediaPopup(e) {
      this.multiMediaNavId = e;
      this.multiMediaPopupVisible = true;
    },
    async sendInstruction(type, action, param) {
      this.$toast.loading({
        message: '加载中...',
        duration: 0, // 持续显示
      });
      await this.$store.dispatch('instructions/sendInstruction', {
        type,
        action,
        param,
      });
      this.$toast.clear();
    },
  },
  watch: {
    multiMediaPopupVisible(newVal, oldVal) {
      if (oldVal === true && newVal === false) {
        this.sendInstruction('router_jump', '/', null);
      }
    },
  },
};
</script>

<style scoped>
.global-control-menu {
  display: grid;
  grid-template-columns: repeat(6, 76px);
  grid-template-rows: repeat(2, 1fr);
  gap: 24px 32px;
  width: 100%;
  justify-content: center;
  padding-bottom: 32px;
}

.menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 76px;
  cursor: pointer;
}

.icon-placeholder {
  width: 76px;
  height: 76px;
  background: #5998ff;
  box-shadow: inset 0 7px 19px 0 #79b4ff;
  border-radius: 50%;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.icon-placeholder:hover {
  transform: scale(1.05);
}

.menu-icon {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.item-text {
  font-size: 22px;
  color: #000;
  font-weight: bold;
  text-align: center;
  white-space: nowrap;
}

.global-control-menu::after {
  content: "";
  display: block;
  width: 653px;
  height: 1px;
  background: #cccccc;
  margin: 0 auto;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  transition: opacity 0.3s;
  opacity: 1;
}

.global-control-menu:not(.is-open)::after {
  opacity: 0;
  pointer-events: none;
}

.van-popup {
  background-color: unset;
}
</style>
