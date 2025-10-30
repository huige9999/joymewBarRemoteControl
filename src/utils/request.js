import { queryScreenStatus } from '@/modules/screenStatusJudge';
import router from '@/router/index';
import store from '@/store/index';
import axios from 'axios';

const NEED_TOKEN_URL = ['hmGiftController/listGift7', 'sendMsgController/liwuGo6', 'hmGiftController/editMusicStatus', 'hmGiftController/getMusicList', 'newPlay/mjEnterGame', 'hmGiftController/findGiftRankListAll'];

function setTokenWhenRequestNeed(config) {
  const tmpNeedTokenUrlLen = NEED_TOKEN_URL.length;
  for (let i = 0; i < tmpNeedTokenUrlLen; i += 1) {
    if (config.url.indexOf(NEED_TOKEN_URL[i]) > -1) {
      config.headers.token = store.state.tokenH5;
      break;
    }
  }
}
function queryScreenStatusWhenSendMsg(config) {
  if (config.url.includes('sendMsgController/toScreen') && router.currentRoute.fullPath === '/controllerV2') {
    queryScreenStatus();
  }
}

const service = axios.create({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 60000,
  transformRequest: [
    (data) => {
      let tResult;
      if (data) {
        const keys = Object.keys(data);
        const t = [];
        keys.forEach((item) => {
          t.push(`${item}=${data[item]}`);
        });
        tResult = t.join('&');
      } else {
        tResult = data;
      }
      return tResult;
    },
  ],
});

/* 过滤请求 */
service.interceptors.request.use((config) => {
  setTokenWhenRequestNeed(config);
  queryScreenStatusWhenSendMsg(config);
  store.commit('showGlobalLoading');
  return config;
});

/* 过滤响应 */
service.interceptors.response.use(
  (result) => {
    store.commit('hideGlobalLoading');
    return result.data;
  },
  (err) => {
    return Promise.reject(err);
  },
);

export default service;
