<template>
  <div class="sign-wrap">
    <PageTitleWrap :pageTitle="pageTitle" />
    <div
      v-if="hbyStep === 0"
      class="config-set-container"
    >
      <div class="form-box">
        <div class="input-item">
          <span class="label">红包金额:</span>
          <input
            type="number"
            v-model.number="redPacketMoney"
            class="input-field"
          />
          <span class="unit">元</span>
        </div>
        <div
          class="input-item"
          v-if="selectedLeafMenu.id !== 'nationalRedEnvelopeRain'"
        >
          <span class="label">红包个数:</span>
          <input
            type="number"
            v-model.number="redPacketNum"
            class="input-field"
          />
          <span class="unit">个</span>
        </div>
      </div>
      <FuncButton
        @click="confirmConfig"
        class="config-button"
      >
        确认
      </FuncButton>
      <FuncButton
        @click="cancelConfig"
        class="config-button cancel-button"
      >
        取消
      </FuncButton>
    </div>
    <div
      v-else
      class="func-button-container"
    >
      <FuncButton
        @click="gameControl('start')"
        class="func-button"
      >
        开始游戏
      </FuncButton>
      <FuncButton
        @click="gameControl('end')"
        class="func-button"
      >
        结束游戏
      </FuncButton>
      <FuncButton
        @click="gameControl('replay')"
        class="func-button"
      >
        再玩一次
      </FuncButton>
      <FuncButton
        @click="gameControl('exposeOrShowNext')"
        class="func-button"
        v-if="selectedLeafMenu.id === 'shoutRedEnvelope'"
      >
        开始/下一个/结束
      </FuncButton>
      <FuncButton
        @click="goBackToConfig"
        class="func-button cancel-button"
      >
        返回
      </FuncButton>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PageTitleWrap from '@/views/v2/components/PageTitle.vue';
import FuncButton from '@/views/v2/components/FuncButton.vue';
import keyboardDetectionMixin from '@/mixins/keyboardDetection';

export default {
  name: 'pageWithTitle',
  mixins: [keyboardDetectionMixin],
  data() {
    return {
      hbyStep: 0,
      redPacketMoney: null,
      redPacketNum: null,
    };
  },
  components: {
    PageTitleWrap,
    FuncButton,
  },
  computed: {
    // 从 store 的 menu 模块映射 selectedLeafMenu 状态
    ...mapState('menu', ['selectedLeafMenu']),
    pageTitle() {
      return this.selectedLeafMenu.name ? this.selectedLeafMenu.name : '';
    },
  },
  methods: {
    async gameControl(action) {
      this.$toast.loading({
        message: '加载中...',
        duration: 0, // 持续显示
      });
      await this.$store.dispatch('instructions/sendInstruction', {
        type: 'game_control',
        action,
      });
      this.$toast.clear();
    },
    async confirmConfig() {
      // 发送指令到服务器
      this.$toast.loading({
        message: '加载中...',
        duration: 0, // 持续显示
      });
      await this.$store.dispatch('instructions/sendInstruction', {
        type: 'game_control',
        action: 'configSet',
        param: {
          money: this.redPacketMoney,
          num: this.redPacketNum,
        },
      });
      this.hbyStep = 1;
      this.$toast.clear();
    },
    cancelConfig() {
      this.$toast.loading({
        message: '加载中...',
        duration: 0, // 持续显示
      });
      this.$store
        .dispatch('instructions/sendInstruction', {
          type: 'router_jump',
          action: '/',
        })
        .then(() => {
          this.$toast.clear();
          this.$store.commit('menu/setSelectedLeafMenu', null);
        });
    },
    goBackToConfig() {
      this.hbyStep = 0;
    },
  },
};
</script>

<style scoped>
.sign-wrap {
  height: 100%;
}

.func-button-container {
  display: flex;
  justify-content: center;
  margin-top: 39px;
  justify-content: center;
  margin-top: 5.2vw;
  flex-direction: column;
  align-items: center;
  row-gap: 4vw;
}

.config-set-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 35px;
}

.form-box {
  width: 687px;
  height: 203px;
  background: linear-gradient(180deg, #ffffff 0%, #c1daff 100%);
  box-shadow: inset 0px 7 19px 0px rgba(255, 255, 255, 0.3);
  border-radius: 19px 19px 19px 19px;
  border: 2px solid #ffffff;
  margin-bottom: 49px;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  width: 595px;
  height: 97px;
}

.input-item:first-child {
  border-bottom: 1px solid #fff;
}

.label {
  font-size: 30px;
  color: #000;
  margin-right: 10px;
  width: 164px;
}

.input-field {
  outline: none;
  border: none;
  font-size: 16px;
  width: 150px;
  background: transparent;
  color: #ff80a0;
  font-size: 30px;
}

.unit {
  margin-left: 5px;
  font-size: 16px;
  color: #666;
  color: #3e80f8;
  font-size: 30px;
}

.config-set-container .config-button {
  margin-top: 20px;
  width: 463px;
  height: 73px;
  background: #ffffff;
  border-radius: 38px 38px 38px 38px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.config-set-container .config-button.cancel-button {
  background: transparent;
  border: 2px solid #ffffff;
  color: #ffffff;
}
</style>
