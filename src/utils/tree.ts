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
    if (node[childrenKey] && node[childrenKey].length) {
      const result = searchParentNode(node[childrenKey] as T[], value, key, childrenKey, node);
      if (result) {
        return result as T;
      }
    }
  }
}

export function searchParentNodes<T>(
  nodes: T[],
  values: any[],
  key = 'key',
  childrenKey = 'children',
  parentNode: T | undefined = undefined
): T[] {
  const parentNodes: T[] = [];
  for (const node of nodes) {
    if (parentNode && values.includes(node[key]) && !parentNodes.includes(parentNode)) {
      parentNodes.push(parentNode);
    }
    if (node[childrenKey] && node[childrenKey].length) {
      const result = searchParentNodes(node[childrenKey] as T[], values, key, childrenKey, node);
      parentNodes.push(...result);
    }
  }
  return parentNodes;
}
