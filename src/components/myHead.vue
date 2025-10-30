<template>
  <div class="header publicVCenter">
    <button class="switch-version-btn" @click="switchToV2">切换新版</button>
    <div class="qrcode-box">
      <img src="@/assets/image/scanQRCode.png" @click="openQrcode" class="scanQRCode" />
    </div>
    <div class="title">{{ name }}</div>
    <div class="right-button_group publicVCenter">
      <span class="refresh" @click="clickRefresh">
        刷新
      </span>
      <img src="@/assets/image/toHome.png" @click="toHome" class="toHome" />
    </div>

  </div>
</template>
<script>
import sendInstrunction from '@/api/sendCode';
import { CODE, CONTROL_CODE } from '@/assets/constant/index';

export default {
  name: 'myHeader',
  props: {
    name: {
      type: String,
      default: '',
    },
  },
  methods: {
    async toHome() {
      await sendInstrunction({
        code: CODE.HOME,
      });
      this.$router.replace({
        path: '/controller',
      });
    },
    async openQrcode() {
      await sendInstrunction({
        code: CODE.QRCODE,
      });
    },
    async clickRefresh() {
      this.$dialog
        .confirm({
          title: '提示',
          message: '是否刷新大屏？',
        })
        .then(() => {
          sendInstrunction({
            code: CONTROL_CODE.OTHERS,
            param: { type: 'refresh' },
          });
        })
        .catch(() => { });
    },
    switchToV2() {
      localStorage.setItem('version', 'new');
      window.location.hash = '#/controller';
      // 切换到新版时，存储版本信息
      window.location.reload();
    },
  },
};
</script>
<style lang="less" scoped>
.header {
  width: 100%;
  padding: 50px 30px;
  padding-bottom: 0;
  display: flex;
  justify-content: space-between;
  z-index: 1;

  .switch-version-btn {
    background: rgba(255, 255, 255, 1);
    color: #333;
    border: none;
    border-radius: 16px;
    padding: 6px 16px;
    font-size: 18px;
    z-index: 10;
    margin-right: 10px;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  .qrcode-box {
    flex: 1;
  }

  .scanQRCode {
    width: 68px;
    height: 68px;
  }

  .title {
    font-size: 32px;
    font-weight: 400;
    color: #ffffff;
    flex: 1;
    text-align: center;
  }

  .right-button_group {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }

  .refresh {
    font-size: 32px;
    font-weight: 400;
    color: #ffffff;
    margin-right: 20px;
  }

  .toHome {
    width: 68px;
    height: 68px;
  }
}
</style>
