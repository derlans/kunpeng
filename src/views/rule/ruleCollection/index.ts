import { SelectOption } from '@/components/Form/index';
import { renderDateTime } from '@/render/date';
export const actionOpations: SelectOption[] = [
  {
    label: '是',
    value: 1,
    meta: {},
  },
  {
    label: '否',
    value: 0,
    meta: {},
  },
];

export interface rule {
  [key: string]: number | string | undefined;
  id: string;
  ruleName: string;
  description?: string;
  createTime: string | number;
  updateTime: string | number;
  operator: string;
  priority: number;
  isDeleted: number;
  version: number;
  code: string;
  off: number;
}
export const ruleColumns = [
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
    key: 'interceptDescription',
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
];
