import { renderDateTime } from '@/render/date';
import { DataTableColumns } from 'naive-ui';
export interface BlackList {
  id: string;
  type: number;
  name: string;
  description: string;
  createTime: string;
  updateTime: string;
}

export function createColumns(): DataTableColumns<BlackList> {
  return [
    {
      key: 'id',
      title: 'id',
    },
    {
      key: 'type',
      title: '类型',
      align: 'center',
    },
    {
      key: 'name',
      title: '名字',
      align: 'center',
    },
    {
      key: 'description',
      title: '描述',
      align: 'center',
    },
    {
      key: 'createTime',
      title: '创建时间',
      align: 'center',
      render(rowData) {
        return renderDateTime(rowData.createTime);
      },
    },
    {
      key: 'updateTime',
      title: '更新时间',
      align: 'center',
      render(rowData) {
        return renderDateTime(rowData.updateTime);
      },
    },
  ];
}

export const columns = createColumns();
