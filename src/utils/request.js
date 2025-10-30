import store from '@/store/index';
import axios from 'axios';

const NEED_TOKEN_URL = ['hmGiftController/editMusicStatus', 'hmGiftController/getMusicList'];

const service = axios.create({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 60000,
  transformRequest: [
    (data) => {
      if (!data) {
        return data;
      }
      return Object.keys(data)
        .map((key) => `${key}=${data[key]}`)
        .join('&');
    },
  ],
});

service.interceptors.request.use((config) => {
  const requiresToken = NEED_TOKEN_URL.some((url) => config.url.includes(url));
  if (requiresToken && store.state.token) {
    config.headers.token = store.state.token;
  }
  return config;
});

service.interceptors.response.use(
  (result) => result.data,
  (error) => Promise.reject(error),
);

export default service;
