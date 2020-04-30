/**
 * could be called 'Map'
 */
export async function* CallbackProjection<In, Out>(
  callback: (val: In) => Out,
  input: Iterable<In> | AsyncIterable<In>
) {
  for await (const row of input) {
    yield callback(row);
  }
}
