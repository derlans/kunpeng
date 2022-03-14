import { SelectOption } from '@/components/Form/index';
export const Level = {
  TRACE: 'primary',
  DEBUG: 'success',
  INFO: 'info',
  WARN: 'warning',
  ERROR: 'error',
};
export const levelOpations: SelectOption[] = [
  {
    label: 'TRACE',
    value: 'TRACE',
    meta: {
      tagType: 'primary',
    },
  },
  {
    label: 'DEBUG',
    value: 'DEBUG',
    meta: {
      tagType: 'success',
    },
  },
  {
    label: 'INFO',
    value: 'INFO',
    meta: {
      tagType: 'info',
    },
  },
  {
    label: 'WARN',
    value: 'WARN',
    meta: {
      tagType: 'warning',
    },
  },
  {
    label: 'ERROR',
    value: 'ERROR',
    meta: {
      tagType: 'error',
    },
  },
];
export interface sourceAsMap {
  date: string;
  file: string;
  method: string;
  level: string;
  line: number;
  thread: string;
  message: string;
  class: string;
}

export interface dailyRecord {
  [key: string]: string | number | sourceAsMap;
  index: string;
  type: string;
  id: string;
  _score: number;
  sourceAsMap: sourceAsMap;
}
