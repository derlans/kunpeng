import { http } from '@/utils/http/axios';
interface dailyRecordQuery {
  page: number;
  size: number;
  fromDateTime?: number;
  toDateTime?: number;
  message?: string;
  level?: string;
  index?: string;
}
/**
 * @description 获取日志列表
 */
export function getDailyRecordList(params: dailyRecordQuery, index) {
  return http.request({
    url: '/kafka/kafka/query/' + index,
    method: 'GET',
    params,
  });
}

/**
 *
 * @description 获取服务列表
 */
export function getServiceNames() {
  return http.request({
    url: '/kafka/service/name/list',
    method: 'GET',
  });
}
