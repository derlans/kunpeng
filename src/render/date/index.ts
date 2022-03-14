import { h, VNode } from 'vue';
import { isDate } from '@/utils/is';
import { formatToDateTime, formatToDate } from '@/utils/dateUtil';

export function renderDate(date: Date | string | number): VNode {
  return isDate(date)
    ? h('span', null, formatToDate(date))
    : h('span', null, formatToDate(new Date(date)));
}

export function renderDateTime(date: Date | string | number): VNode {
  return isDate(date)
    ? h('span', null, formatToDateTime(date))
    : h('span', null, formatToDateTime(new Date(date)));
}
