// 类型定义
import { RouteConfig } from 'vue-router';

type Meta = {
  id?: string;
  name?: string;
  /** 菜单图标 */
  icon?: string;
  /** 菜单背景 */
  bg?: string;
  // XXX 后续换成routeName，以防止大屏路由结构变化导致无法正常响应
  /** 大屏路由地址 */
  screenUrl?: string;
  /** 父级菜单id */
  parentId?: string;
  /** 菜单标题 */
  title?: string;
  /** 是否忽略权限 */
  isIgnoreAuth?: boolean;
  keepAlive?: boolean;
  /** 需要toScreen数据时，优先根据该字段去children中获取 */
  toScreenChildrenId: string;
  /** 点击菜单时发送给大屏的数据，后续逐步使用screenUrl代替 */
  toScreen?: {
    code: string;
    param?: string;
  };
  /** 是否显示内定抽奖测试 */
  isShowArrangedLotteryTest?: boolean;
};

type CustomRouteConfig = Omit<RouteConfig, 'meta' | 'children'> & {
  meta: Meta;
  children?: CustomRouteConfig[];
};
