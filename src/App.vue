<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import getLateInstruction from '@/api/getLateInstruction';
import sendInstrunction from '@/api/sendCode';
import { CONTROL_CODE } from '@/assets/constant/index';
import { getHash, getQueryString } from '@/utils/index';
import { globalHandleMessage, handleActionMessage } from '@/utils/websocket/handleMessage';
import { initH5Ws, initWs } from '@/utils/websocket/v2/index';
import { mapActions } from 'vuex';
import { screenMessenger } from './modules/screenMessenger';

export default {
  name: 'app',
  created() {
    const storedVersion = localStorage.getItem('version');
    if (storedVersion) {
      if (storedVersion === 'old') {
        // 路由守卫会处理重定向，这里只管初始化
        this.initOld();
      } else { // storedVersion === 'new'
        // 路由守卫会处理重定向，这里只管初始化
        this.initNew();
      }
    } else {
      // 首次访问或无记录，根据当前 hash 判断
      const hash = getHash();
      if (hash === 'controllerV2') {
        this.initOld(); // controllerV2 走旧版
      } else {
        this.initNew(); // controller 走新版
      }
    }
  },
  methods: {
    ...mapActions(['getRoutesAndSetMenu']),
    /**
     * 旧版遥控器初始化逻辑
     */
    initOld() {
      console.log('旧版初始化啦!');
      this.initLiveId();
      this.getRoutesAndSetMenu().then(() => {
        this.getLateInstrunction();
      });
      if (this.isNoparamAccess) {
        return;
      }
      screenMessenger.connect({
        url: `${process.env.VUE_APP_CHAT_API}haimiao?splid=${this.$store.state.liveId}&kind=remoteControl`,
      });
      screenMessenger.on(globalHandleMessage);
    },
    async initNew() {
      console.log('新版初始化啦!');
      this.initLiveId();
      if (this.isNoparamAccess) {
        // 如果缺少必要参数，则返回
        return;
      }
      await this.getRoutesAndSetMenu();
      // 建立h5的ws链接(用于获取聊天消息)
      initH5Ws();
      // 建立主ws链接
      initWs();
    },
    initLiveId() {
      const liveId = getQueryString('liveid');
      const liveIdStorage = sessionStorage.getItem('liveId');
      const token = getQueryString('token');
      const tokenStorage = sessionStorage.getItem('token') || localStorage.getItem('token');
      if (liveId) {
        sessionStorage.setItem('liveId', liveId);
        this.$store.commit('initLiveId', liveId);
      } else if (liveIdStorage) {
        this.$store.commit('initLiveId', liveIdStorage);
      } else {
        this.isNoparamAccess = true;
        this.$toast.fail('缺少活动id!');
      }
      let actualToken = ''; // 定义一个变量来存储最终的有效token
      if (token && token !== 'null' && token !== 'undefined') {
        // 明确排除 'null' 'undefined' 字符串
        sessionStorage.setItem('token', token);
        actualToken = token;
      } else if (tokenStorage && tokenStorage !== 'null' && tokenStorage !== 'undefined') {
        // 同样排除
        actualToken = tokenStorage;
      }

      // 无论来源如何，最终赋值给 store
      if (actualToken) {
        // 只有当实际token非空时才提交
        this.$store.commit('initToken', actualToken);
      } else {
        // 如果最终 actualToken 仍然是空的，则表示 token 缺失或无效
        console.error('Error: Token is missing or invalid after parsing. Cannot establish WebSocket connection.');
        this.$toast.fail('缺少或认证信息无效！');
        this.isNoparamAccess = true; // 阻止后续WS连接
      }
      this.$store.dispatch('initTokenH5');
    },
    getLateInstrunction() {
      getLateInstruction()
        .then((res) => {
          console.log(res);
          handleActionMessage(res.data.info);
          // 特殊场景下的处理
          // this.specialHandleMessage(res.data.info);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    specialHandleMessage(message) {
      // 如果最近一条指令包含抽奖列表信息，则需要刷新页面
      // 目的：保证遥控器的激活奖项和大屏保持一致
      if (message.includes('prizeName') && message.includes('5034')) {
        sendInstrunction({
          code: CONTROL_CODE.OTHERS,
          param: { type: 'refresh' },
        });
      }
    },
  },
};
</script>
