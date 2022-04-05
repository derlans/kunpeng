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
        name: 'frame-docs',
        meta: {
          title: '接口文档',
          frameSrc: 'http://124.70.101.198:8090/doc.html#/home',
          permissions: 'frame-docs',
        },
        component: IFrame,
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
