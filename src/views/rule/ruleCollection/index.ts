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
  id: number;
  rule_name: string;
  description?: string;
  create_time: string | number;
  update_time: string | number;
  operator: string;
  priority: number;
  is_deleted: number;
  version: number;
  code: string;
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
