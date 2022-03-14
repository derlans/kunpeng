import { h, VNode } from 'vue';
import { isDate } from '@/utils/is';
import { formatToDateTime, formatToDate } from '@/utils/dateUtil';

export function renderDate(date: Date | string | number): VNode {
  return isDate(date) ? h('span', formatToDate(date)) : h('span', formatToDate(new Date(date)));
}

export function renderDateTime(date: Date | string | number): VNode {
  return isDate(date)
    ? h('span', formatToDateTime(date))
    : h('span', formatToDateTime(new Date(date)));
}
