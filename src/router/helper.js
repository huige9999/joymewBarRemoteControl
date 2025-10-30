/**
 * 根据菜单id查询路由name
 */
let tmpSearchResult = null;
export function searchRouteNameByMenuId(routes, menuId) {
  for (let i = 0; i < routes.length; i++) {
    if (routes[i].meta.id === menuId) {
      return routes[i].name; // 找到值的出口
    }
    if (routes[i].children) {
      tmpSearchResult = searchRouteNameByMenuId(routes[i].children, menuId); // 递归交界处
      if (tmpSearchResult) {
        return tmpSearchResult;
      }
    }
  }
  return null; // 没找到值的出口
}

export const TMP = 1; // TODO 临时 为了解决默认只有一个导出的问题
