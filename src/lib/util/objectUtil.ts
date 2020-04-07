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
