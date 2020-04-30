export async function drain<T>(input: Iterable<T> | AsyncIterable<T>) {
  const out = [];
  for await (const row of input) {
    out.push(row);
  }
  return out;
}

export async function head<T>(
  input: Iterable<T> | AsyncIterable<T>,
  howMany = 10
) {
  let i = 0;
  const out = [];
  for await (const row of input) {
    if (i >= howMany) {
      break;
    }
    out.push(row);
    i++;
  }
  return out;
}
