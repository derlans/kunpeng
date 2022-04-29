import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/frame',
    name: 'Frame',
    redirect: '/frame/docs',
    component: Layout,
    meta: {
      title: '接口管理',
      permissions: 'frame',
    },
    children: [
      {
        path: 'docs',
        name: 'http://kunpeng.lhk.life/auth/doc.html#/home',
        meta: {
          title: '接口文档',
          permissions: 'frame-docs',
        },
        component: Layout,
      },
      {
        path: 'Elastic',
        name: 'http://124.70.101.198:5601/login',
        meta: {
          title: '接口控制',
          permissions: 'frame-Elastic',
        },
        component: Layout,
      },
    ],
  },
];

export default routes;
