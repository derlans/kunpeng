import { http } from '@/utils/http/axios';

/**
 *
 * @description 获取某一个用户的封禁类型
 */
export function getBlackList(userid: string) {
  return http.request({
    url: `/kunpeng/kunpeng/batch/get/${userid}`,
    method: 'GET',
  });
}

/**
 *
 * @description 封禁用户
 */
export function setBlackType(userid: string, type: number, value: boolean) {
  return http.request({
    url: `/kunpeng/kunpeng/set/${userid}?type=${type}&value=${value}`,
    method: 'POST',
  });
}
