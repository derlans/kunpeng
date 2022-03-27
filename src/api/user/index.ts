import { http } from '@/utils/http/axios';
import { User } from '@/views/user/index';

export function getUserList({ size, current, username = '' }) {
  return http.request({
    url: '/auth/user/list',
    method: 'GET',
    params: {
      size,
      current,
      username,
    },
  });
}
/**
 *
 *  @description 授予用户角色
 */
export function setUserRoles(userid: User['id'], sysRoles: string[]) {
  return http.request({
    url: `/auth/user/bind/${userid}`,
    method: 'POST',
    params: sysRoles,
  });
}
