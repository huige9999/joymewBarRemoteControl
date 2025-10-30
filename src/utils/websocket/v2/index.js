import store from '@/store';
import Vue from 'vue';
import WebsocketHeartbeatJs from 'websocket-heartbeat-js';
import handleMessage from './chatHelper';
import handleRemoteControlMessage from './mainHelper';

const getWSH5Url = () => `wss://ct.hudongmiao.com/haimiao?miaoId=${store.state.token}&splid=${store.state.liveId}&kind=2`;
let wsInstance = null;
let mainWsInstance = null;
const bus = new Vue();

/**
 * 初始化H5 WebSocket连接
 * @param {string} url WebSocket连接地址
 * @param {function} onReconnect 重连回调函数
 */
export const initH5Ws = ({ url = getWSH5Url(), onReconnect = () => {} } = {}) => {
  if (wsInstance) {
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    wsInstance = new WebsocketHeartbeatJs({
      url,
      pingTimeout: 120000,
      pingMsg: 'snhb',
      repeatLimit: 3,
    });

    wsInstance.onreconnect = () => {
      onReconnect();
    };

    wsInstance.onclose = () => {
      console.log('WebSocket connection closed');
    };

    wsInstance.onmessage = (e) => {
      if (e.data === 'hb') return;
      try {
        const message = JSON.parse(e.data);
        handleMessage(message, bus);
        // 使用事件总线发送消息
        // bus.$emit('websocket-message', message);
      } catch (error) {
        console.error('WebSocket message parse error:', error);
      }
    };

    wsInstance.onopen = () => {
      resolve();
    };

    wsInstance.onerror = (error) => {
      reject(error);
    };
  });
};

// 新增 getWSUrl 方法，参照 App.vue 中 initOld 的 url 生成规则
export const getWSUrl = () => {
  const liveId = sessionStorage.getItem('liveId');
  return `${process.env.VUE_APP_CHAT_API}haimiao?splid=${liveId}&kind=remoteControl`;
};

// 新增 initWs 方法，结构与 initH5Ws 基本一致，默认 url 使用 getWSUrl
export const initWs = ({ url = getWSUrl(), onReconnect = () => {} } = {}) => {
  if (mainWsInstance) {
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    mainWsInstance = new WebsocketHeartbeatJs({
      url,
      pingTimeout: 120000,
      pingMsg: 'snhb',
      repeatLimit: 3,
    });

    mainWsInstance.onreconnect = () => {
      onReconnect();
    };

    mainWsInstance.onclose = () => {
      console.log('WebSocket connection closed');
    };

    mainWsInstance.onmessage = (e) => {
      if (e.data === 'hb') return;
      try {
        const message = JSON.parse(e.data);
        // 这里调用 handleRemoteControlMessage，bus 由外部共用
        handleRemoteControlMessage(message, bus);
      } catch (error) {
        console.error('WebSocket message parse error:', error);
      }
    };

    mainWsInstance.onopen = () => {
      resolve();
    };

    mainWsInstance.onerror = (error) => {
      reject(error);
    };
  });
};

// 导出事件总线以便组件使用
export { bus };
