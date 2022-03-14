import { h, VNode } from 'vue';
import { renderDateTime } from '@/render/date/index';
import { NDataTable } from 'naive-ui';
import { rule } from './index';
import { BasicColumn } from '@/components/Table/index';
interface ruleColumn extends BasicColumn {
  render?: (row: rule) => VNode;
}

export const rulecolumns: ruleColumn[] = [
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

export const columns = [
  {
    type: 'expand',
    renderExpand: (rowData) => {
      return h(NDataTable, { data: rowData.data, columns: rulecolumns });
    },
    expandable: (rowData) => rowData.data?.length,
  },
  {
    title: '路径',
    key: 'pathName',
  },
  {
    title: '名字',
    key: 'name',
  },
  {
    title: '描述',
    key: 'description',
  },
];
