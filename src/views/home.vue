<template>
  <div class="home">
    <myHead name="首页" />
    <div class="menus">
      <div
        class="menuItem publicHvCenter"
        v-for="item in menu"
        :key="item.id"
        @click="onClickMenuItem(item)"
      >
        <img :src="item.icon" />
        <label>{{ item.name }}</label>
      </div>
      <div
        class="menuItem publicHvCenter"
        v-if="chooseSongVisible"
        @click="openOrderSong"
      >
        <img src="@/assets/image/chooseSongIcon.png" />
        <label>驻场音乐</label>
      </div>
      <div class="slogan">嗨喵悦动,让互动更精彩</div>
      <div
        class="sendGiftEntry publicHCenter"
        @click="showSendGiftPopup"
        v-if="playGiftVisible"
      >
        免费礼物
      </div>
      <div
        class="fixedScreenEntry"
        @click="showMultiMediaPopup(2)"
        v-if="playPictureVisible"
      ></div>
      <div
        class="videoPlayEntry"
        @click="showMultiMediaPopup(1)"
        v-if="playVideoVisible"
      ></div>
    </div>
    <van-popup
      v-model="popupVisible"
      position="bottom"
      class="vanPopup"
    >
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
import sendInstrunction from '@/api/sendCode';
import { CODE, CONTROL_CODE } from '@/assets/constant/index';
import gift from '@/components/gift.vue';
import multiMedia from '@/components/multiMedia.vue';
import myHead from '@/components/myHead.vue';
import { generateMenuFromRouteMain } from '@/utils/index';
import { mapState } from 'vuex';

export default {
  name: 'home',
  data() {
    return {
      popupVisible: false,
      multiMediaPopupVisible: false,
      multiMediaNavId: 1,
    };
  },
  computed: {
    ...mapState(['chooseSongVisible', 'userRoutes', 'playPictureVisible', 'playVideoVisible', 'playGiftVisible']),
    menu() {
      return generateMenuFromRouteMain(this.userRoutes);
    },
  },
  components: {
    myHead,
    gift,
    multiMedia,
  },
  methods: {
    onClickMenuItem(menuItem) {
      // if (menuItem.id === '6' && getScreenStatus() === 'multiple') {
      //   this.$toast.fail('抽奖不能开启多个大屏!');
      //   return;
      // }
      if (menuItem.id === '8') {
        const firstMenuRouteName = menuItem?.subMenus?.[0]?.routeName;
        if (firstMenuRouteName) {
          this.$router.push({
            name: firstMenuRouteName,
          });
        }
        return;
      }

      const findToScreenMsgInChildren = (toScreenChildrenId, subMenus) => {
        if (!toScreenChildrenId || !subMenus) return undefined;
        return subMenus.find((item) => item.id === toScreenChildrenId)?.toScreen;
      };

      const toScreenMsg = findToScreenMsgInChildren(menuItem?.toScreenChildrenId, menuItem?.subMenus)
        || menuItem?.toScreen
        || menuItem?.subMenus?.[0]?.toScreen
        || menuItem?.subMenus?.[0]?.screenUrl;
      if (typeof toScreenMsg === 'object' && toScreenMsg !== null) {
        sendInstrunction(toScreenMsg);
      } else if (typeof toScreenMsg === 'string') {
        sendInstrunction({
          code: CONTROL_CODE.ROUTER_JUMP,
          param: { path: toScreenMsg },
        });
      }
    },
    showSendGiftPopup() {
      this.popupVisible = true;
      this.$store.dispatch('initGiftList');
    },
    showMultiMediaPopup(e) {
      this.multiMediaNavId = e;
      this.multiMediaPopupVisible = true;
      const tmpCode = e === 1 ? CODE.VIDEOPLAYOPEN : CODE.FIXEDSCREENOPEN;
      sendInstrunction({
        code: tmpCode,
      });
    },
    async openOrderSong() {
      await sendInstrunction({
        code: CODE.ORDERSONG,
      });
    },
  },
};
</script>
<style lang="less" scoped>
.home {
  width: 100vw;
  height: 100vh;
  position: relative;
  background-image: url('../assets/image/home.png');
  background-size: 100% 100%;
  .menus {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 40px;
    background-color: #fff;
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
    gap: 20px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    .slogan {
      position: absolute;
      left: 0;
      top: -80px;
      width: 100%;
      text-align: center;
      font-size: 20px;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.6);
    }
    .sendGiftEntry {
      width: 96px;
      height: 96px;
      position: absolute;
      left: 32px;
      top: -150px;
      background-size: 100% 100%;
      background-image: url('../assets/image/sendGiftIconNew.png');
      padding-top: 58px;
      font-size: 16px;
      font-weight: 400;
      color: #ffffff;
    }
    .fixedScreenEntry {
      width: 96px;
      height: 96px;
      position: absolute;
      right: 32px;
      top: -278px;
      background-image: url('../assets/image/fixedScreenIcon.png');
      background-size: 100% 100%;
    }
    .videoPlayEntry {
      width: 96px;
      height: 96px;
      position: absolute;
      right: 32px;
      top: -150px;
      background-image: url('../assets/image/videoPlayIcon.png');
      background-size: 100% 100%;
    }
    .menuItem {
      flex-direction: column;
      width: 200px;
      height: 200px;
      border-radius: 20px;
      font-size: 32px;
      font-weight: 400;
      color: #777988;
      img {
        width: 100px;
        margin-bottom: 16px;
      }
      label {
        font-size: 32px;
        font-weight: 400;
      }
      &:nth-child(3n) {
        margin-right: 0;
      }
    }
  }
  .vanPopup {
    background-color: unset;
  }
}
</style>
