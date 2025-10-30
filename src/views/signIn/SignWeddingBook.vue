<!--
  * 「签婚书」模块
  * @author: Ruan Jiazhen
  * @date: 2024-04-19  15:45:01
-->
<template>
  <div class="container">
    <div class="funcMenus publicVCenter">
      <button
        class="main"
        @click="sendInstrunction({ code: CONTROL_CODE.GAME_CONTROL, param: { type: SING_WEDDING_BOOK_CONTROL_TYPE.SHOW_BRIDEGROOM_NAME } })"
      >
        新郎签名
      </button>
      <button
        class="main"
        @click="sendInstrunction({ code: CONTROL_CODE.GAME_CONTROL, param: { type: SING_WEDDING_BOOK_CONTROL_TYPE.SHOW_BRIDE_NAME } })"
      >
        新娘签名
      </button>
      <button
        class="main"
        @click="onClickClearSign"
      >
        清空签名
      </button>
      <button
        class="main"
        @click="sendInstrunction({ code: CODE.HOME })"
      >
        回到首页
      </button>
    </div>
    <div class="commonMenus publicHCenter">
      <button @click="sendInstrunction({ code: CODE.AUDIO })">音乐 开/关</button>
      <button @click="sendInstrunction({ code: CODE.DANMU })">弹幕 开/关</button>
      <button @click="sendInstrunction({ code: CODE.MSGWALL })">祝福榜 开/关</button>
      <button @click="sendInstrunction({ code: CODE.QRCODE })">二维码 开/关</button>
    </div>
  </div>
</template>

<script>
import sendInstrunction from '@/api/sendCode';
import { CODE, CONTROL_CODE } from '@/assets/constant/index';

export default {
  name: 'SignWeddingBook',
  data() {
    return {
      CODE,
      CONTROL_CODE,
      SING_WEDDING_BOOK_CONTROL_TYPE: {
        // 显示新郎姓名
        SHOW_BRIDEGROOM_NAME: 'show_bridegroom_name',
        // 显示新娘姓名
        SHOW_BRIDE_NAME: 'show_bride_name',
        // 清空签名
        CLEAR_SIGN: 'clear_sign',
      },
    };
  },
  methods: {
    sendInstrunction,
    // 模态框确认
    async onClickClearSign() {
      try {
        await this.$dialog.confirm({
          title: '确认清空签名？',
        });
        sendInstrunction({
          code: CONTROL_CODE.GAME_CONTROL,
          param: {
            type: this.SING_WEDDING_BOOK_CONTROL_TYPE.CLEAR_SIGN,
          },
        });
      } catch (e) {
        if (e === 'cancel') return;
        console.error(e);
      }
    },
  },
};
</script>

<style scoped lang="less">
.container {
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

  button {
    width: 24vw;
    height: 10.67vw;
    font-size: 3.47vw;

    &.to-home {
      width: 32vw;
      font-size: 4.27vw;
    }

    margin-bottom: 30px;
    border-radius: 28px;
    color: #fff;
    border: 2px solid #fff;
    background-color: rgba(0, 0, 0, 0);
    transition: all 0.2s linear;

    &:active {
      background-color: rgba(255, 255, 255, 0.6);
    }
  }
}
</style>
