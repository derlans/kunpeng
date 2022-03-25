import { http } from '@/utils/http/axios';

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
