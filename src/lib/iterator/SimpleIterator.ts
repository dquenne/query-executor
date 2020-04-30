export function* SimpleIterator<T>(input: Iterable<T>) {
  for (const val of input) {
    yield val;
  }
}

export async function* SimpleAsyncIterator<T>(input: AsyncIterable<T>) {
  for await (const val of input) {
    yield val;
  }
}
