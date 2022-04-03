import { http } from '@/utils/http/axios';
import { rule } from '@/views/rule/rules/index';
//获取规则列表
export function getRuleList() {
  return http.request<rule[]>({
    url: '/kunpeng/rule/list',
    method: 'GET',
  });
}
// 删除规则
export function deleteRule(id: string) {
  return http.request({
    url: `/kunpeng/rule/remove/${id}`,
    method: 'DELETE',
  });
}
// 更新 新增规则集
export function updateRule(rule: rule) {
  return http.request({
    url: '/kunpeng/rule/update',
    method: 'POST',
    params: rule,
  });
}
//获取某一规则下的列表
export function getCollectionRules(id: string) {
  return http.request<rule[]>({
    url: `/kunpeng/path/name/query/${id}`,
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
export async function getRuleCollection(params: ruleCollection) {
  const res = await http.request({
    url: '/kunpeng/path/name/list',
    method: 'GET',
    params,
  });
  const { records } = res;
  const rules = await Promise.all(records.map((item) => getCollectionRules(item.id)));
  records.forEach((element, index) => {
    element.rules = rules[index];
  });
  return res;
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
/**
 *
 * @description 更新规则集描述
 */
export function updateRuleCollectionDes(params) {
  return http.request({
    url: '/kunpeng/path/name/update',
    method: 'POST',
    params,
  });
}

/**
 *
 * @description 给规则集添加添加规则
 */
export function createRuleCollectionRule(params) {
  return http.request({
    url: '/kunpeng/path/create',
    method: 'POST',
    params,
  });
}
/**
 *
 * @description 更新规则集下的规则状态
 */
export function updateRuleCollectionRule(params) {
  return http.request({
    url: '/kunpeng/path/update/bind',
    method: 'POST',
    params,
  });
}

/**
 *
 * @description 删除规则集下的规则状态
 */
export function deleteRuleCollectionRule(id) {
  return http.request({
    url: `/kunpeng/path/remove/${id}`,
    method: 'DELETE',
  });
}

export function refresh() {
  return http.request({
    url: '/kunpeng/config/refresh',
  });
}
