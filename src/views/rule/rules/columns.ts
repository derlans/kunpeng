import { VNode } from 'vue';
import { renderDateTime } from '@/render/date/index';
import { rule } from './index';
import { BasicColumn } from '@/components/Table/index';
interface ruleColumn extends BasicColumn {
  render?: (row: rule) => VNode;
}

export const columns: ruleColumn[] = [
  {
    title: 'id',
    key: 'id',
  },
  {
    title: '规则名',
    key: 'ruleName',
  },
  {
    title: '描述',
    key: 'description',
  },
  {
    title: '创建时间',
    key: 'createTime',
    render(row) {
      return renderDateTime(new Date(row.createTime).getTime() + 1000 * 60 * 60 * 8);
    },
  },
  {
    title: '更新时间',
    key: 'updateTime',
    render(row) {
      return renderDateTime(new Date(row.updateTime).getTime() + 1000 * 60 * 60 * 8);
    },
  },
  {
    title: '操作人',
    key: 'operator',
  },
  {
    title: '规则优先级',
    key: 'priority',
  },
];
