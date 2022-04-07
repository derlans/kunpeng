import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';

const IFrame = () => import('@/views/iframe/index.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/jenkins',
    name: 'Jenkins',
    redirect: '/jenkins/jenkins',
    component: Layout,
    meta: {
      title: '流水线部署',
      permissions: 'jenkins',
    },
    children: [
      {
        path: 'jenkins',
        name: 'frame-jenkins',
        meta: {
          title: '流水线部署',
          frameSrc: 'http://124.70.101.198:8810/',
          permissions: 'jenkins:jenkins',
        },
        component: IFrame,
      },
    ],
  },
];

export default routes;
