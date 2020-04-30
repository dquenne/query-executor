/**
 * Could also be called 'Reduce'
 */
export async function* Aggregate<In, Out>(
  reducer: (prev: Out, next: In, index: number) => Out,
  start: Out,
  input: Iterable<In> | AsyncIterable<In>
) {
  let val = start;
  let i = 0;
  for await (const row of input) {
    val = reducer(val, row, i);
    i++;
  }
  yield val;
}
