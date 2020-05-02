export function keyByColumns(
  keys: string[],
  values: string[]
): { [key: string]: string };

export function keyByColumns(
  keys: string[],
  values: string[] | undefined
): { [key: string]: string } | undefined;

export function keyByColumns(keys: string[], values: string[] | undefined) {
  if (!values) {
    return undefined;
  }
  return keys.reduce(
    (keyedObject, key, index) => ({
      ...keyedObject,
      [key]: values[index],
    }),
    {} as { [key: string]: string }
  );
}

/**
 *
 * @param columns subset of keys from input
 * @param input object from which to select some or all values
 */
export function select<T, SelectedColumn extends keyof T>(
  columns: SelectedColumn[],
  input: T
): Pick<T, SelectedColumn> {
  return columns.reduce(
    (accum, column) => ({
      ...accum,
      [column]: input[column],
    }),
    {} as { [key in SelectedColumn]: any }
  );
}

/**
 *
 * @param indices indices to use from input
 * @param input array from which to select some or all values
 * @returns a subset of the original array's values, in order
 */
export function selectIndices<T>(
  indices: number[] | Set<number>,
  input: Array<T>
) {
  if (Array.isArray(indices))
    return input.filter((val, index) => indices.includes(index));
  return input.filter((val, index) => indices.has(index));
}

/**
 * `Object.keys` except with a better type anotation
 */
export function smartKeys<T>(obj: T) {
  return Object.keys(obj) as Array<keyof T>;
}
