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
 * @description: 用户修改个人信息
 */
export function updateUser(params) {
  return http.request({
    url: '/auth/user/update',
    method: 'POST',
    params,
  });
}

/**
 * @description: 修改密码
 */
export function updatePassword(params) {
  return http.request({
    url: '/auth/user/update/password',
    method: 'POST',
    params,
  });
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

/**
 * @description: 注册
 */
export function register(data) {
  return http.request({
    url: '/auth/user/create',
    method: 'POST',
    data,
  });
}

/**
 * @description: 验证邮件
 */
export function sendEmail(mail) {
  return http.request(
    {
      url: '/auth/mail/send',
      method: 'POST',
      params: {
        mail,
      },
    },
    {
      joinParamsToUrl: true,
    }
  );
}
/**
 * @description: 验证邮件
 */
export function checkEmail(mail, mailCode) {
  return http.request(
    {
      url: '/auth/mail/check',
      method: 'POST',
      params: {
        mail,
        mailCode,
      },
    },
    {
      joinParamsToUrl: true,
    }
  );
}
