import { AuthNode } from '@/auth/types';
import { http } from '@/utils/http/axios/index';
/**
 * @description 获取权限树
 */
export function getAllAuthTree() {
  return http.request(
    {
      method: 'GET',
      url: '/auth/sysauth/list/all',
    },
    {
      isShowMessage: false,
      isShowErrorMessage: false,
    }
  );
}

/**
 * @description 获取自己的权限
 */
export function getAuths() {
  return http.request(
    {
      method: 'GET',
      url: '/auth/menu/nav',
    },
    {
      isShowMessage: false,
      isShowErrorMessage: false,
    }
  );
}

/**
 * @description 创建权限
 */
export function createAuth(authNode) {
  return http.request({
    method: 'POST',
    url: '/auth/sysauth/create',
    params: authNode,
  });
}

/**
 * @description 更新
 */
export function updateAuth(authNode: AuthNode) {
  return http.request({
    url: '/auth/sysauth/update',
    method: 'POST',
    params: authNode,
  });
}

/**
 * @description 删除
 */
export function deleteAuth(id) {
  return http.request({
    url: `/auth/sysauth/remove/${id}`,
    method: 'DELETE',
  });
}
