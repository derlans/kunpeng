import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';

const IFrame = () => import('@/views/iframe/index.vue');

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
        name: 'frame-Elastic',
        meta: {
          title: '接口控制',
          frameSrc: 'http://124.70.101.198:5601/login',
          permissions: 'frame-Elastic',
        },
        component: IFrame,
      },
    ],
  },
];

export default routes;
