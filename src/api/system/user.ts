import { http, formatDateHttp } from '@/utils/http/axios';
import { AxiosResponse } from 'axios';
import qs from 'qs';

export interface BasicResponseModel<T = any> {
  code: number;
  message: string;
  result: T;
}

export interface BasicPageParams {
  pageNumber: number;
  pageSize: number;
  total: number;
}

/**
 * @description: 获取用户信息
 */
export function getUserInfo() {
  return http.request({
    url: '/auth/auth/userInfo',
    method: 'GET',
  });
}

/**
 * @description: 用户登录
 */
export function login(data) {
  return formatDateHttp.request<AxiosResponse>(
    {
      url: '/auth/login',
      method: 'POST',
      data: qs.stringify(data),
    },
    {
      isReturnNativeResponse: true,
    }
  );
}

/**
 * @description: 用户修改密码
 */
export function changePassword(params, uid) {
  return http.request(
    {
      url: `/user/u${uid}/changepw`,
      method: 'POST',
      params,
    },
    {
      isTransformResponse: false,
    }
  );
}

/**
 * @description: 用户登出
 */
export function logout(params) {
  return http.request({
    url: '/login/logout',
    method: 'POST',
    params,
  });
}
