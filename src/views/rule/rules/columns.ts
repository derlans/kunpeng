import { h, VNode } from 'vue';
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
    key: 'rule_name',
  },
  {
    title: '描述',
    key: 'description',
  },
  {
    title: '创建时间',
    key: 'create_time',
    render(row) {
      return renderDateTime(row.create_time);
    },
  },
  {
    title: '更新时间',
    key: 'update_time',
    render(row) {
      return renderDateTime(row.update_time);
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
  {
    title: '是否删除',
    key: 'is_deleted',
    render(row) {
      return h('span', null, row.is_deleted ? '是' : '否');
    },
  },
  {
    title: '乐观锁',
    key: 'version',
  },
];
