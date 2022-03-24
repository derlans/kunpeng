import { http } from '@/utils/http/axios/index';
import { Role } from '@/views/role';
/**
 * @description 获取角色列表
 */
export function getRoles() {
  return http.request<Role[]>({
    method: 'GET',
    url: '/auth/user/role/query/role',
  });
}

/**
 * @description 删除角色
 */
export function deleteRole(id) {
  return http.request({
    method: 'DELETE',
    url: `/auth/sys/role/auth/remove/${id}`,
  });
}

/**
 * @description 更新角色
 */
export function updateRole(role: Role) {
  return http.request({
    method: 'POST',
    url: `/auth/sys/role/auth/role/update/`,
    data: role,
  });
}

/**
 * @description 更新角色
 */
export function authRole(id: Role['id'], authIds: Role['authIds']) {
  return http.request({
    method: 'POST',
    url: `/auth/sys/role/auth/perm/${id}`,
    data: authIds,
  });
}
