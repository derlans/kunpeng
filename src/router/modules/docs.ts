import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/external',
    name: 'http://kunpeng-docs.derlan.top/',
    component: Layout,
    meta: {
      title: '项目文档',
      permissions: 'docs',
    },
  },
];

export default routes;
