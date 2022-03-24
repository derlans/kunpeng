import { http } from '@/utils/http/axios/index';
export function getAllAuthTree() {
  return http.request({
    method: 'GET',
    url: '/auth/sysauth/list/all',
  });
}
