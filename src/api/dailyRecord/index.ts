import { http } from '@/utils/http/axios';
interface dailyRecordQuery {
  page: number;
  size: number;
  fromDateTime?: number;
  toDateTime?: number;
  message?: string;
  level?: string;
}
/**
 * @description 获取日志列表
 */
export function getDailyRecordList(params: dailyRecordQuery) {
  return http.request({
    url: '/kafka/kafka/query/auth-service',
    method: 'GET',
    params,
  });
}

/**
 * 
 * @description 获取服务列表
 */
export function getServiceNames(){
  return http.request({
    url:'/kafka/service/name/list',
    method:'GET'
  })
}