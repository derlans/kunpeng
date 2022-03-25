// import { renderArray } from '@/render/array';
import { renderDateTime } from '@/render/date';
import { useRoleStore } from '@/store/modules/role';
import { DataTableColumns, NAvatar, NSelect } from 'naive-ui';
import { h } from 'vue';
const roleStore = useRoleStore();
export type dataTime = string | number | Date;
export interface User {
  id: string;
  createTime: dataTime;
  updateTime: dataTime;
  username: string;
  password?: string;
  avatar: string;
  email: string;
  city: string;
  birthday?: dataTime;
  lastLogin: dataTime;
  role?: string;
  phone: string;
  sysRoles: string[];
}
export function createColumns(): DataTableColumns<User> {
  return [
    {
      key: 'id',
      title: 'id',
    },
    {
      key: 'username',
      title: '用户名',
      align: 'center',
    },
    {
      key: 'avatar',
      title: '头像',
      align: 'center',
      render(rowData) {
        return h(NAvatar, {
          size: 'medium',
          src: rowData.avatar,
          round: true,
        });
      },
    },
    {
      key: 'sysRoles',
      title: '角色',
      align: 'center',
      render(rowData) {
        return h(NSelect, {
          value: rowData.sysRoles,
          options: rowData.sysRoles.map((roleid) => ({
            value: roleid,
            label: roleStore.getRoleMap[roleid].rolename,
          })),
        });
        // return renderArray(rowData.sysRoles.map((roleid) => roleStore.getRoleMap[roleid].rolename));
      },
    },
    {
      key: 'email',
      title: '邮箱',
      align: 'center',
    },
    {
      key: 'city',
      title: '城市',
      align: 'center',
    },
    {
      key: 'phone',
      title: '电话',
      align: 'center',
    },
    {
      key: 'birthday',
      title: '生日',
      align: 'center',
      render(rowData) {
        if (rowData.birthday) return renderDateTime(rowData.birthday);
      },
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
