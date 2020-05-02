/**
 * Could also be called 'Reduce'
 */
export async function* Aggregate<In, ReducerOut, Out>(
  reducer: (prev: ReducerOut, next: In, index: number) => ReducerOut,
  final: (end: ReducerOut) => Out,
  start: ReducerOut,
  input: Iterable<In> | AsyncIterable<In>
) {
  let val = start;
  let i = 0;
  for await (const row of input) {
    val = reducer(val, row, i);
    i++;
  }
  yield final(val);
}
