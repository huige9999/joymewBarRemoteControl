// 获取链接中的参数
export const getQueryString = (name) => {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
  if (window.location.href.indexOf('?') === -1) {
    return '';
  }
  const result = window.location.href.split('?')[1].match(reg);
  return result ? decodeURIComponent(result[2]) : null;
};

// 获取随机值  min<= num < max
export const getRandom = (min, max) => Math.floor(Math.random() * (max - min)) + min;

// 定时器任务
// 参数：(毫秒)time,(任务)task
export const timeoutTask = (task, time) => {
  const tmpTimeout = setTimeout(() => {
    task();
    clearTimeout(tmpTimeout);
  }, time);
};
// 生成随机字符串
export const generateRandomStr = (len) => {
  len = len || 32;
  const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz';
  const maxPos = chars.length;
  let tmpStr = '';
  for (let i = 0; i < len; i += 1) {
    tmpStr += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return tmpStr;
};
// 生成随机Id
export const generateRandomId = () => generateRandomStr(6) + new Date().getTime();
// 解析url参数
export const getQuery = (url, name) => {
  const index = url.indexOf('?');
  if (index !== -1) {
    const queryStrArr = url.substr(index + 1).split('&');
    for (let i = 0; i < queryStrArr.length; i++) {
      const itemArr = queryStrArr[i].split('=');
      if (itemArr[0] === name) {
        return itemArr[1];
      }
    }
  }
  return null;
};

/**
 * @param {import("../types/index").CustomRouteConfig[]} routes 路由配置
 * @returns {menuItem[]} 菜单
 */
export const generateMenuFromRouteMain = (routes) => {
  const routeMain = routes?.find((route) => route.name === 'main');
  const menus = routeMain?.children.map((menu) => ({
    ...menu.meta,
    subMenus: (menu?.children || []).map((subMenu) => ({
      ...subMenu.meta,
      name: subMenu.meta.title,
      routeName: subMenu.name,
    })),
  }));
  return menus;
};

/**
 * 获取链接中的hash
 */
export const getHash = () => {
  const url = window.location.href;
  const { hash } = new URL(url);
  const path = hash.split('?')[0];
  return path.replace(/^#\//, '');
};

// 获取当前时间
export const getCurrentDate = () => {
  return new Date(+new Date() + 8 * 3600 * 1000)
    .toJSON()
    .substr(0, 19)
    .replace('T', ' ');
};

// 工具函数：排除目标属性
/**
 * 返回排除指定属性之外的对象
 * @param {Object} obj 目标对象
 * @param {string} excludeKey 要排除的属性名
 * @returns {Object} 新对象
 */
export const excludeProperty = (obj, excludeKey) => {
  if (!obj || typeof obj !== 'object') return {};
  const { [excludeKey]: _, ...rest } = obj;
  return rest;
};
