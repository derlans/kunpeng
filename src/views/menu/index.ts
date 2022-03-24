import { NTag } from 'naive-ui';
import { h } from 'vue';
const typeMap = {
  0: {
    tagType: 'success',
    lable: '目录',
  },
  1: {
    tagType: 'warning',
    lable: '菜单',
  },
  2: {
    tagType: 'info',
    lable: '操作',
  },
};
export function renderTag(type) {
  return h(NTag, { type: typeMap[type].tagType }, typeMap[type].lable);
}
