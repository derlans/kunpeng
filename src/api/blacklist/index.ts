import { http } from '@/utils/http/axios';
import { BlackType } from '@/views/blackList';

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

export function getBlackTypes() {
  return http.request({
    url: '/kunpeng/type/list',
    method: 'GET',
  });
}

export function deleteBlackTypes(id: string) {
  return http.request({
    url: `/kunpeng/type/remove/${id}`,
    method: 'DELETE',
  });
}

export function updateBlackTypes(blackList: BlackType) {
  return http.request({
    url: '/kunpeng/type/update',
    method: 'POST',
    params: blackList,
  });
}

export function createBlackTypes(blackList: BlackType) {
  return http.request({
    url: '/kunpeng/type/create',
    method: 'POST',
    params: blackList,
  });
}
