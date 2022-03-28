import { h } from 'vue';
import { NIcon } from 'naive-ui';
import * as icons from '@vicons/antd';

//前端路由图标映射表
export function renderViconsIcon(icon: string) {
  return h(NIcon, null, { default: () => h(icons[icon]) });
}

export function getViconsIcon(icon: string) {
  return () => h(NIcon, null, { default: () => h(icons[icon]) });
}
