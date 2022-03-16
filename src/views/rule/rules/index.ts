import { SelectOption } from '@/components/Form/index';
export const Level = {
  TRACE: 'primary',
  DEBUG: 'success',
  INFO: 'info',
  WARN: 'warning',
  ERROR: 'error',
};
export const actionOpations: SelectOption[] = [
  {
    label: '是',
    value: 1,
    meta: {},
  },
  {
    label: '否',
    value: 0,
    meta: {},
  },
];

export interface rule {
  [key: string]: number | string | undefined;
  id: number;
  ruleName: string;
  description?: string;
  createTime: string | number;
  updateTime: string | number;
  operator: string;
  priority: number;
  isDeleted: number;
  version: number;
  code: string;
}

export enum RuleFormMode {
  CREATE_NEW_RULE = 'CREATE_NEW_RULE',
  UPDATE_RULE = 'UPDATE_RULE',
  LOOK_RULE = 'UPDATE_RULE',
}
export const DEFAUTT_JAVA_CODE = `package lhk.life.kunpeng.core;


import lhk.life.kunpeng.entity.BaseRule;
import org.jeasy.rules.annotation.Action;
import org.jeasy.rules.annotation.Condition; 
import org.jeasy.rules.annotation.Fact;
import org.jeasy.rules.annotation.Rule;`;
// interface InternalRowData {
//   // [key: string]: unknown;
//   key: unknown;
// }
// interface Foo {
//   a: string;
//   render?: (rowDate: InternalRowData) => string;
// }
// type Bar = {
//   [P in keyof Foo]?: Foo[P];
//   a:number
// };
// interface row {
//   a: string;
// }
// const bar: Bar = {
//   id: 1,
//   render: () => {
//     return '1';
//   },
// };
// console.log(bar);
