import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/jenkins',
    name: 'http://124.70.101.198:8810/',
    redirect: '/jenkins/jenkins',
    component: Layout,
    meta: {
      title: '流水线部署',
      permissions: 'jenkins',
    },
    children: [
      {
        path: 'jenkins',
        name: 'http://124.70.101.198:8810/',
        meta: {
          title: '流水线部署',
          permissions: 'jenkins:jenkins',
        },
        component: Layout,
      },
    ],
  },
];

export default routes;
