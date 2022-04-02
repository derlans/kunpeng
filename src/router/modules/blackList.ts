import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';

/**
 * @param name 路由名称, 必须设置,且不能重名
 * @param meta 路由元信息（路由附带扩展信息）
 * @param redirect 重定向地址, 访问这个路由时,自定进行重定向
 * @param meta.disabled 禁用整个菜单
 * @param meta.title 菜单名称
 * @param meta.icon 菜单图标
 * @param meta.keepAlive 缓存该路由
 * @param meta.sort 排序越小越排前
 *
 * */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/blackList',
    name: 'BlackList',
    redirect: '/blackList/list',
    component: Layout,
    meta: {
      title: '黑名单',
      permissions: 'blackList',
    },
    children: [
      {
        path: 'list',
        name: 'BlackList-List',
        meta: {
          title: '黑名单',
          permissions: 'blackList:list',
        },
        component: () => import('@/views/blackList/index.vue'),
      },
      {
        path: 'user/:userid',
        name: 'BlackList-User',
        props: true,
        meta: {
          title: '用户黑名单',
          permissions: 'blackList:user',
          hidden: false,
        },
        component: () => import('@/views/blackList/userBlack.vue'),
      },
    ],
  },
];

export default routes;
