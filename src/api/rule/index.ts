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
/**
 *
 * @description 获取规则集列表
 */
export function getRuleCollection(params: ruleCollection) {
  return http.request({
    url: '/kunpeng/path/name/list',
    method: 'GET',
    params,
  });
}
/**
 * @description 移除规则集
 */
export function removeRuleCollection(ruleId: number) {
  return http.request({
    url: `/kunpeng/path/name/remove/${ruleId}`,
    method: 'POST',
  });
}

/**
 *
 * @description 创建规则集
 */
export function createRuleCollection(params) {
  return http.request({
    url: '/kunpeng/path/name/create',
    method: 'POST',
    params,
  });
}
