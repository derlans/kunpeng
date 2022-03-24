import { CatalogueAuthNode, MenuAuthNode } from '../types';
export const dailyRecord: CatalogueAuthNode | MenuAuthNode = {
  name: '日志',
  icon: 'CrownOutlined',
  type: 0,
  perms: 'dailyRecord',
  meta: {},
  children: [
    {
      type: 1,
      perms: 'dailyRecord:table',
      name: '日志列表',
      meta: {},
      children: [
        {
          perms: 'dailyRecord:table:look',
          type: 2,
          name: '查看',
          meta: {},
        },
      ],
    },
  ],
};
