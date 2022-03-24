import { renderDateTime } from '@/render/date';
import { DataTableColumns } from 'naive-ui';
export interface Role {
  id: string;
  createTime: string | number;
  updateTime: string | number;
  rolename: string;
  code: string;
  description?: string;
  createUser: number;
  updateUser: number;
  authIds: string[];
}
export function createColumns(): DataTableColumns<Role> {
  return [
    {
      key: 'id',
      title: 'id',
    },
    {
      key: 'rolename',
      title: '角色名',
      align: 'center',
    },
    {
      key: 'code',
      title: '编码',
      align: 'center',
    },
    {
      key: 'description',
      title: '描述',
      align: 'center',
    },
    {
      key: 'createUser',
      title: '创建人',
      align: 'center',
    },
    {
      key: 'updateUser',
      title: '更新人',
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
