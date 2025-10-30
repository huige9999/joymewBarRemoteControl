<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { getQueryString } from '@/utils/index';
import { initWs } from '@/utils/websocket/v2/index';

export default {
  name: 'App',
  data() {
    return {
      isNoparamAccess: false,
    };
  },
  async created() {
    this.initLiveInfo();
    if (!this.isNoparamAccess) {
      try {
        await initWs();
      } catch (error) {
        console.error('WebSocket connection failed:', error);
        this.$toast.fail('WebSocket 连接失败');
      }
    }
  },
  methods: {
    initLiveInfo() {
      const liveId = getQueryString('liveid');
      const token = getQueryString('token');
      const storedLiveId = sessionStorage.getItem('liveId');
      const storedToken = sessionStorage.getItem('token') || localStorage.getItem('token');

      if (liveId) {
        sessionStorage.setItem('liveId', liveId);
        this.$store.commit('initLiveId', liveId);
      } else if (storedLiveId) {
        this.$store.commit('initLiveId', storedLiveId);
      } else {
        this.isNoparamAccess = true;
        this.$toast.fail('缺少活动 ID');
      }

      let effectiveToken = '';
      if (token && token !== 'null' && token !== 'undefined') {
        sessionStorage.setItem('token', token);
        effectiveToken = token;
      } else if (storedToken && storedToken !== 'null' && storedToken !== 'undefined') {
        effectiveToken = storedToken;
      }

      if (effectiveToken) {
        this.$store.commit('initToken', effectiveToken);
      } else {
        this.isNoparamAccess = true;
        this.$toast.fail('缺少认证信息');
      }
    },
  },
};
</script>
