import { http } from '@/utils/http/axios';
import { rule } from '@/views/rule/rules/index';
//获取日志列表
export function getRuleList() {
  return http.request<rule[]>({
    url: '/kunpeng/rule/list',
    method: 'GET',
  });
}
interface ruleCollection {
  page: number;
  size: number;
  name: string;
  pathName: string;
}
export function getRuleCollection(params: ruleCollection) {
  return http.request({
    url: '/kunpeng/path/name/list',
    method: 'GET',
    params,
  });
}
