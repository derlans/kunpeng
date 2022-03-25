import { h } from 'vue';

export function renderArray(arr: (string | number)[], join = ' ') {
  return h('span', null, arr.join(join));
}
