export interface AuthNode {
  readonly type: AuthNodeType;
  readonly id?: number;
  readonly name: string;
  readonly perms: string;
  readonly createTime?: string | number;
  readonly updateTime?: string | number;
  readonly icon?: string;
  readonly path?: string;
  parentId?: number;
  orderId?: number;
  component?: string;
  meta?: object;
  children?: AuthNode[];
}
export type AuthNodeType = 0 | 1 | 2;
// 目录
export interface CatalogueAuthNode extends AuthNode {
  type: 0;
  children?: CatalogueAuthNode[] | MenuAuthNode[];
  meta: {
    title?: string;
  };
}
// 菜单
export interface MenuAuthNode extends AuthNode {
  type: 1;
  children: OperationAuthNode[];
  meta: {
    title?: string;
  };
}
// 操作
export interface OperationAuthNode extends AuthNode {
  type: 2;
  meta: {
    title?: string;
  };
}

export type AuthNodeTree = (CatalogueAuthNode | MenuAuthNode)[];
