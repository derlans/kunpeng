import { http } from '@/utils/http/axios';
export function getSensitiveWords() {
  return http.request({
    url: '/kunpeng/dfa/specialWords/query',
    method: 'GET',
  });
}

export function updateSensitiveWords(params: string[]) {
  return http.request({
    url: '/kunpeng/dfa/update',
    method: 'POST',
    params,
  });
}

export function matchSensitiveWords(content: string, checkAll = true) {
  return http.request({
    url: '/kunpeng/dfa/query',
    method: 'GET',
    data: {
      content,
      checkAll,
    },
  });
}

export function filterSensitiveWords(content: string, type = 1) {
  return http.request({
    url: '/kunpeng/dfa/filter',
    method: 'GET',
    data: {
      content,
      type,
    },
  });
}
