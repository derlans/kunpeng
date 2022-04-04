import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { DesktopOutline } from '@vicons/ionicons5';
import { renderIcon } from '@/utils/index';

const IFrame = () => import('@/views/iframe/index.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/frame',
    name: 'Frame',
    redirect: '/frame/docs',
    component: Layout,
    meta: {
      title: '接口管理',
      sort: 8,
      icon: renderIcon(DesktopOutline),
    },
    children: [
      {
        path: 'docs',
        name: 'frame-docs',
        meta: {
          title: '接口文档',
          frameSrc: 'http://lhk.life/auth/doc.html#/home',
        },
        component: IFrame,
      },
      {
        path: 'Elastic',
        name: 'frame-Elastic',
        meta: {
          title: '接口控制',
          frameSrc: 'http://124.70.101.198:5601/login',
        },
        component: IFrame,
      },
      {
        path: 'nacos',
        name: 'frame-nacos',
        meta: {
          title: 'nacos',
          frameSrc: 'http://lhk.life/nacos/',
        },
        component: IFrame,
      },
      {
        path: 'sentinel',
        name: 'frame-sentinel',
        meta: {
          title: '流控中心',
          frameSrc: 'lhk.life/sentinel',
        },
        component: IFrame,
      },
    ],
  },
];

export default routes;
