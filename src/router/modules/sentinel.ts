import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';

const IFrame = () => import('@/views/iframe/index.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/sentinel',
    name: 'Sentinel',
    redirect: '/sentinel/sentinel',
    component: Layout,
    meta: {
      title: '流控中心',
      permissions: 'sentinel',
    },
    children: [
      {
        path: 'sentinel',
        name: 'frame-sentinel',
        meta: {
          title: '流控中心',
          frameSrc: 'http://lhk.life/sentinel/',
          permissions: 'sentinel-sentinel',
        },
        component: IFrame,
      },
    ],
  },
];

export default routes;
