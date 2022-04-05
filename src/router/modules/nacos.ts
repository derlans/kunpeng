import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';

const IFrame = () => import('@/views/iframe/index.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/nacos',
    name: 'Nacos',
    redirect: '/nacos/nacos',
    component: Layout,
    meta: {
      title: '服务中心',
      permissions: 'nacos',
    },
    children: [
      {
        path: 'nacos',
        name: 'frame-nacos',
        meta: {
          title: '服务中心',
          frameSrc: 'http://lhk.life/nacos/',
          permissions: 'nacos-nacos',
        },
        component: IFrame,
      },
    ],
  },
];

export default routes;
