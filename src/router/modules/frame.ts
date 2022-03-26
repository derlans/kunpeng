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
        path: 'naive',
        name: 'frame-naive',
        meta: {
          title: '接口控制',
          frameSrc: 'http://124.70.101.198:5601/login',
        },
        component: IFrame,
      },
    ],
  },
];

export default routes;
