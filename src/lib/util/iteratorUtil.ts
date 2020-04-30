export async function drain<T>(input: Iterable<T> | AsyncIterable<T>) {
  const out = [];
  for await (const row of input) {
    out.push(row);
  }
  return out;
}
