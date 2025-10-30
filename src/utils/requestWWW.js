import axios from 'axios';
import qs from 'qs';
// 转换form-data
function transformRequestData(data) {
  if (data instanceof FormData) {
    return data;
  }
  return qs.stringify(data);
}

// 创建form-urlencoded实例
const service = axios.create({
  baseURL: 'https://www.hudongmiao.com/',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  transformRequest: [transformRequestData],
  timeout: 10000,
});

// 响应拦截器
service.interceptors.response.use((result) => {
  return result.data.data;
});

export default service;
