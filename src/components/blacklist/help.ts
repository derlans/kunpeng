export const MAX_LENGTH = 62;
/**
 * @description:将十进制大数转化为二进制用数组表示
 */
export function transformTypes(value: string): number[] {
  const types = BigInt(value)
    .toString(2)
    .split('')
    .map((i) => parseInt(i))
    .reverse();
  return types.length < MAX_LENGTH
    ? (types.push(...Array(MAX_LENGTH - types.length).fill(0)), types)
    : types;
}
