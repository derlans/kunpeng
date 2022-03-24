export function dfs<T>(
  nodes: T[],
  value: any,
  key = 'key',
  childrenKey = 'children'
): T | undefined {
  for (const node of nodes) {
    if (node[key] === value) {
      return node;
    }
    if (node[childrenKey] && node[childrenKey].length) {
      const result = dfs(node[childrenKey], value, key, childrenKey);
      if (result) {
        return result as T;
      }
    }
  }
}

export function searchParentNode<T>(
  nodes: T[],
  value: any,
  key = 'key',
  childrenKey = 'children',
  parentNode: T | undefined = undefined
): T | undefined {
  for (const node of nodes) {
    if (node[key] === value) {
      return parentNode;
    }
    parentNode = node;
    if (node[childrenKey] && node[childrenKey].length) {
      const result = searchParentNode(
        node[childrenKey] as T[],
        value,
        key,
        childrenKey,
        parentNode
      );
      if (result) {
        return result as T;
      }
    }
  }
}
