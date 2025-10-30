/**
 * @description: 大屏沟通模块
 * @author: Ruan Jiazhen
 * @date: 2024-01-03 16:51:09
 * */
import WebsocketHeartbeatJs from 'websocket-heartbeat-js';
import sendInstrunction from '../api/sendCode';

export const screenMessenger = (() => {
  let ws = null;

  const handleMessageFnList = [];
  const handleMessageFuSet = new Set();

  // 所有函数的集合，用于防止重复注册
  /**
   * @param {object} message 消息对象
   */
  const handleMessage = (message) => {
    for (let i = 0; i < handleMessageFnList.length; i++) {
      const { fn } = handleMessageFnList[i];
      const isStop = fn(message);
      if (isStop) {
        break;
      }
    }
  };

  /**
   * @param {string} url ws地址
   */
  const connect = ({ url, onReconnect = () => {} }) => {
    return new Promise((resolve, reject) => {
      if (ws) {
        resolve();
      } else {
        ws = new WebsocketHeartbeatJs({
          url,
          pingTimeout: 120000,
          pingMsg: 'snhb',
        });

        ws.onreconnect = () => {
          onReconnect();
        };

        ws.onclose = () => {
          console.log('connect close');
        };

        ws.onmessage = (e) => {
          if (e.data === 'hb') return;
          try {
            const message = JSON?.parse(e.data);
            if (typeof message !== 'object') {
              throw new Error('message is not object');
            }
            handleMessage(message);
          } catch (error) {
            console.error('websocket onmessage error:', error);
          }
        };
        ws.onopen = () => {
          resolve();
        };
        ws.onerror = () => {
          reject();
        };
      }
    });
  };

  // TODO 发送消息，后续换成peerJS方案
  /**
   * @param {{
   * code: string,
   * param: any
   * }}
   * @returns
   */
  const send = ({ code, param }) => {
    return sendInstrunction({
      code,
      param,
    });
  };

  /**
   * @description: 监听大屏消息
   * @param {(message: object) => boolean | void } fn 监听函数，返回true则停止执行后续监听函数
   * @param {number} [weight=0]
   */
  const on = (fn, weight = 0) => {
    if (handleMessageFuSet.has(fn)) {
      console.error('[screenMessenger] 重复注册', fn);
      return;
    }
    handleMessageFuSet.add(fn);

    const hasSameWeight = handleMessageFnList.some((item) => item.weight === weight);
    if (hasSameWeight && weight !== 0) {
      console.warn('[screenMessenger] 该权重已被占用，注册的函数会在该函数之后执行', fn);
    }
    const targetIndex = handleMessageFnList.findIndex((item) => item.weight < weight);
    handleMessageFnList.splice(targetIndex === -1 ? handleMessageFnList.length : targetIndex, 0, {
      fn,
      weight,
    });
  };

  const off = (fn) => {
    const index = handleMessageFnList.findIndex((item) => item.fn === fn);
    if (index === -1) {
      console.error('[screenMessenger] 未注册该方法，无法卸载', fn);
      return;
    }

    handleMessageFuSet.delete(fn);
    handleMessageFnList.splice(index, 1);
  };

  return {
    connect,
    send,
    on,
    off,
  };
})();

// TODO 暂时提供这个提取大屏信息的方法，重构大屏端发送信息方法后删除
export const extractMessage = (message) => {
  return JSON.parse(message?.data.miaoYkqCode);
};
