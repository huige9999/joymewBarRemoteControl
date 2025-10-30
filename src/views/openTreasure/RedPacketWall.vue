<!--
  * @description: 「红包墙」游戏控制组件
  * @author: Ruan Jiazhen
  * @date: 2024-01-09
-->
<template>
  <div class="hbwallMod">
    <div
      class="step"
      v-if="hbwallStep === 0"
    >
      <div class="funcMenus publicVCenter">
        <funcButton
          @clickEvent="chooseType('hbq_588')"
          bWidth="50vw"
        >
          开启五福临门(588元)
        </funcButton>
        <funcButton
          @clickEvent="chooseType('hbq_888')"
          bWidth="50vw"
        >
          开启才高八斗(888元)
        </funcButton>
        <funcButton
          @clickEvent="chooseType('hbq_1288')"
          bWidth="50vw"
        >
          开启恭喜发财(1288元)
        </funcButton>
        <funcButton
          @clickEvent="chooseType('hbq_1588')"
          bWidth="50vw"
        >
          开启大吉大利(1588元)
        </funcButton>
        <funcButton
          @clickEvent="chooseType('hbq_1888')"
          bWidth="50vw"
        >
          开启一诺千金(1888元)
        </funcButton>
        <funcButton @clickEvent="toHome">回到首页</funcButton>
      </div>
      <div class="commonMenus publicHCenter">
        <funcButton
          bWidth="24vw"
          bHeight="10.67vw"
          bFontSize="3.47vw"
          @clickEvent="toggleAudio"
        >
          音乐 开/关
        </funcButton>
        <funcButton
          bWidth="24vw"
          bHeight="10.67vw"
          bFontSize="3.47vw"
          @clickEvent="toggleDanmu"
        >
          弹幕 开/关
        </funcButton>
        <funcButton
          bWidth="24vw"
          bHeight="10.67vw"
          bFontSize="3.47vw"
          @clickEvent="toggleMsgwall"
        >
          祝福榜 开/关
        </funcButton>
        <funcButton
          bWidth="24vw"
          bHeight="10.67vw"
          bFontSize="3.47vw"
          @clickEvent="toggleQrcode"
        >
          二维码 开/关
        </funcButton>
      </div>
    </div>
    <div
      class="step"
      v-if="hbwallStep === 1"
    >
      <div class="funcMenus publicVCenter">
        <funcButton @clickEvent="startGame">开始游戏</funcButton>
        <funcButton @clickEvent="toHome">回到首页</funcButton>
      </div>
      <div class="commonMenus publicHCenter">
        <funcButton
          bWidth="24vw"
          bHeight="10.67vw"
          bFontSize="3.47vw"
          @clickEvent="toggleAudio"
        >
          音乐 开/关
        </funcButton>
        <funcButton
          bWidth="24vw"
          bHeight="10.67vw"
          bFontSize="3.47vw"
          @clickEvent="toggleDanmu"
        >
          弹幕 开/关
        </funcButton>
        <funcButton
          bWidth="24vw"
          bHeight="10.67vw"
          bFontSize="3.47vw"
          @clickEvent="toggleMsgwall"
        >
          祝福榜 开/关
        </funcButton>
        <funcButton
          bWidth="24vw"
          bHeight="10.67vw"
          bFontSize="3.47vw"
          @clickEvent="toggleQrcode"
        >
          二维码 开/关
        </funcButton>
      </div>
    </div>
    <div
      class="step"
      v-if="hbwallStep === 2"
    >
      <div class="hbList publicVCenter">
        <div
          class="hbItem publicHvCenter"
          :class="{ boxOutline: activeHb === item, buyed: openedHb.indexOf(index) > -1 }"
          @click="selectHb(item, index)"
          v-for="(item, index) in hbList"
          :key="item"
        >
          <div class="num">{{ item }}</div>
          <!-- <img src="@/assets/image/hbF.png" /> -->
        </div>
      </div>
      <div class="btnGroup">
        <van-button
          round
          block
          type="info"
          @click="openBox"
        >
          确认开红包
        </van-button>
        <van-button
          round
          block
          type="default"
          @click="openBoxAll"
        >
          一键开红包
        </van-button>
      </div>
      <div class="funcMenus publicVCenter">
        <funcButton @clickEvent="endGame">结束游戏</funcButton>
      </div>
    </div>
    <div
      class="step"
      v-if="hbwallStep === 3"
    >
      <div class="funcMenus publicVCenter">
        <funcButton @clickEvent="reStartGame">再玩一次</funcButton>
        <funcButton @clickEvent="toHome">回到首页</funcButton>
      </div>
      <div class="commonMenus publicHCenter">
        <funcButton
          bWidth="24vw"
          bHeight="10.67vw"
          bFontSize="3.47vw"
          @clickEvent="toggleAudio"
        >
          音乐 开/关
        </funcButton>
        <funcButton
          bWidth="24vw"
          bHeight="10.67vw"
          bFontSize="3.47vw"
          @clickEvent="toggleDanmu"
        >
          弹幕 开/关
        </funcButton>
        <funcButton
          bWidth="24vw"
          bHeight="10.67vw"
          bFontSize="3.47vw"
          @clickEvent="toggleMsgwall"
        >
          祝福榜 开/关
        </funcButton>
        <funcButton
          bWidth="24vw"
          bHeight="10.67vw"
          bFontSize="3.47vw"
          @clickEvent="toggleQrcode"
        >
          二维码 开/关
        </funcButton>
      </div>
    </div>
  </div>
</template>
<script>
import sendInstrunction from '@/api/sendCode';
import { CODE } from '@/assets/constant/index';
import funcButton from '@/components/funcButton.vue';
import { mapState } from 'vuex';

export default {
  name: 'RedPacketWall',
  computed: {
    ...mapState({
      currentMenuId: (state) => state.currentMenuId,
      hbwallStep: (state) => state.hbwallStep,
      openedHb: (state) => state.openedHb, // 已经购买的红包索引列表
    }),
  },
  data() {
    return {
      hbList: [],
      activeHb: -1, // 当前被选中红包的编号
      activeIndex: -1, // 当前被选中红包的索引
    };
  },
  components: {
    funcButton,
  },
  created() {
    this.initHbList();
  },
  beforeDestroy() {
    this.$store.commit('clearOpenedHb');
  },
  mounted() {},
  methods: {
    initHbList() {
      for (let i = 0; i < 28; i += 1) {
        if (i < 3) {
          this.hbList.push(`${i + 1}`);
        } else if (i >= 3 && i < 12) {
          this.hbList.push(`${i + 2}`);
        } else if (i >= 12 && i < 21) {
          this.hbList.push(`${i + 3}`);
        } else {
          this.hbList.push(`${i + 4}`);
        }
      }
    },
    selectHb(num, index) {
      this.activeHb = num;
      this.activeIndex = index;
    },
    async openBox() {
      if (this.activeHb === -1) {
        this.$toast('请选择一个红包!');
        return;
      }
      if (this.openedHb.indexOf(this.activeIndex) > -1) {
        this.$toast('红包已经开启!');
        return;
      }
      this.activeIndex = this.activeIndex === 0 ? '0' : this.activeIndex;
      await sendInstrunction({
        code: CODE.HBWALLCHOOSEHB,
        param: this.activeIndex,
      });
    },
    async openBoxAll() {
      await sendInstrunction({
        code: CODE.HBWALLBREAKALL,
      });
    },
    async chooseType(type) {
      await sendInstrunction({
        code: CODE.HBWALLCHOOSETYPE,
        param: type,
      });
    },
    async startGame() {
      await sendInstrunction({
        code: CODE.HBWALLSTARTGAME,
      });
    },
    async endGame() {
      await sendInstrunction({
        code: CODE.HBWALLENDGAME,
      });
    },
    async reStartGame() {
      await sendInstrunction({
        code: CODE.HBWALLREPLAY,
      });
    },
    async toHome() {
      await sendInstrunction({
        code: CODE.HOME,
      });
    },
    async toggleQrcode() {
      await sendInstrunction({
        code: CODE.QRCODE,
      });
    },
    async toggleAudio() {
      await sendInstrunction({
        code: CODE.AUDIO,
      });
    },
    async toggleDanmu() {
      await sendInstrunction({
        code: CODE.DANMU,
      });
    },
    async toggleMsgwall() {
      await sendInstrunction({
        code: CODE.MSGWALL,
      });
    },
  },
};
</script>
<style lang="less" scoped>
.hbwallMod {
  width: 100%;
  height: 100%;
  position: relative;
  .funcMenus {
    position: relative;
    width: 100%;
    flex-direction: column;
  }
  .commonMenus {
    position: relative;
    width: 100%;
    flex-wrap: wrap;
  }
  .hbList {
    width: 100%;
    position: relative;
    flex-wrap: wrap;
    padding: 0 8vw;
    z-index: 1;
    .hbItem {
      display: flex;
      width: 12vw;
      height: 17vw;
      position: relative;
      flex-direction: column;
      .num {
        color: #ffffff;
        font-size: 32px;
        position: absolute;
        bottom: 6vw;
      }
      img {
        width: 82%;
      }
      &.boxOutline {
        box-shadow: 0px 0px 10px 0px rgba(0, 93, 106, 0.41);
        border-radius: 4px;
        border: 1px solid #ffffff;
      }
      &.buyed {
         filter: gray(1);
      }
    }
  }
  .btnGroup::v-deep {
    margin: 6vw auto;
    width: 32vw;
    .van-button {
      height: 8vw;
      margin-bottom: 4vw;
      &.van-button--normal {
        font-size: 3.2vw;
      }
    }
  }
}
</style>
