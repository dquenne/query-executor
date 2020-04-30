export async function* Selection<In>(
  callback: (val: In) => boolean,
  input: Iterable<In> | AsyncIterable<In>
) {
  for await (const row of input) {
    if (callback(row)) {
      yield row;
    }
  }
}
