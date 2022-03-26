import { http } from '@/utils/http/axios/index';
/**
 * @description 获取权限树
 */
export function getAllAuthTree() {
  return http.request({
    method: 'GET',
    url: '/auth/sysauth/list/all',
  });
}

/**
 * @description 获取自己的权限
 */
export function getAuths() {
  return http.request({
    method: 'GET',
    url: '/auth/menu/nav',
  });
}
