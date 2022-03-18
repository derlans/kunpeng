import { SelectOption } from '@/components/Form/index';
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
  id: string;
  ruleName: string;
  description?: string;
  createTime: string | number;
  updateTime: string | number;
  operator: string;
  priority: number;
  isDeleted: number;
  version: number;
  code: string;
  off: number;
}
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
