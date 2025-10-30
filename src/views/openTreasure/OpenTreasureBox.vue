<!--
  * @description: 「开宝箱」游戏控制组件
  * @author: Ruan Jiazhen
  * @date: 2024-01-09
-->
<template>
  <div class="kbxMod">
    <div class="step" v-if="kbxStep === 0">
      <div class="funcMenus publicVCenter">
        <funcButton @clickEvent="chooseType('kbx_888')" bWidth="50vw">
          开启钻石宝箱(888元)
        </funcButton>
        <funcButton @clickEvent="chooseType('kbx_588')" bWidth="50vw">
          开启铂金宝箱(588元)
        </funcButton>
        <funcButton @clickEvent="chooseType('kbx_388')" bWidth="50vw">
          开启金宝箱(388元)
        </funcButton>
        <funcButton @clickEvent="chooseType('kbx_288')" bWidth="50vw">
          开启银宝箱(288元)
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
    <div class="step" v-if="kbxStep === 1">
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
    <div class="step" v-if="kbxStep === 2">
      <div class="boxList publicVCenter">
        <div
          class="boxItem publicHvCenter"
          :class="{
            boxOutline: activeBox === item,
            buyed: openedBox.indexOf(index) > -1,
          }"
          @click="selectBox(item, index)"
          v-for="(item, index) in boxList"
          :key="item"
        >
          <div class="num">{{ item }}</div>
          <!-- <img src="@/assets/image/box.png" /> -->
        </div>
      </div>
      <div class="btnGroup">
        <van-button round block type="info" @click="openBox">
          确认开宝箱
        </van-button>
        <van-button round block type="default" @click="openBoxAll">
          一键开宝箱
        </van-button>
      </div>
      <div class="funcMenus publicVCenter">
        <funcButton @clickEvent="endGame">结束游戏</funcButton>
      </div>
    </div>
    <div class="step" v-if="kbxStep === 3">
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
import { mapState } from 'vuex';
import funcButton from '@/components/funcButton.vue';
import { CODE } from '@/assets/constant/index';
import sendInstrunction from '@/api/sendCode';

export default {
  name: 'OpenTreasureBox',
  computed: {
    ...mapState({
      currentMenuId: (state) => state.currentMenuId,
      kbxStep: (state) => state.kbxStep,
      openedBox: (state) => state.openedBox, // 已经购买的宝箱索引列表
    }),
  },
  data() {
    return {
      boxList: [],
      activeBox: -1, // 当前被选中宝箱的编号
      activeIndex: -1, // 当前被选中宝箱的索引
    };
  },
  components: {
    funcButton,
  },
  created() {
    this.initBoxList();
  },
  beforeDestroy() {
    this.$store.commit('clearOpenedBox');
  },
  mounted() {},
  methods: {
    initBoxList() {
      for (let i = 0; i < 18; i += 1) {
        if (i < 3) {
          this.boxList.push(`0${i + 1}`);
        } else if (i >= 3 && i < 8) {
          this.boxList.push(`0${i + 2}`);
        } else if (i >= 8 && i < 12) {
          this.boxList.push(`${i + 2}`);
        } else if (i >= 12 && i < 18) {
          this.boxList.push(`${i + 3}`);
        }
      }
    },
    selectBox(num, index) {
      this.activeBox = num;
      this.activeIndex = index;
    },
    async openBox() {
      if (this.activeBox === -1) {
        this.$toast('请选择一个宝箱!');
        return;
      }
      if (this.openedBox.indexOf(this.activeIndex) > -1) {
        this.$toast('宝箱已经开启!');
        return;
      }
      console.log(this.activeIndex);
      this.activeIndex = this.activeIndex === 0 ? '0' : this.activeIndex;
      await sendInstrunction({
        code: CODE.KBXCHOOSEBOX,
        param: this.activeIndex,
      });
    },
    async openBoxAll() {
      await sendInstrunction({
        code: CODE.KBXBREAKALL,
      });
    },
    async chooseType(type) {
      await sendInstrunction({
        code: CODE.KBXCHOOSETYPE,
        param: type,
      });
    },
    async startGame() {
      await sendInstrunction({
        code: CODE.KBXSTARTGAME,
      });
    },
    async endGame() {
      await sendInstrunction({
        code: CODE.KBXENDGAME,
      });
    },
    async reStartGame() {
      await sendInstrunction({
        code: CODE.KBXREPLAY,
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
.kbxMod {
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
  .boxList {
    width: 100%;
    position: relative;
    flex-wrap: wrap;
    padding: 0 5vw;
    z-index: 1;
    .boxItem {
      display: flex;
      width: 18vw;
      height: 18vw;
      position: relative;
      flex-direction: column;
      .num {
        color: #ffffff;
        font-size: 32px;
        position: absolute;
        left: 6vw;
        bottom: 0;
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
