import { drain } from "../util/iteratorUtil.ts";

export async function* MemorySort<In>(
  compareFn: (a: In, b: In) => number,
  input: Iterable<In> | AsyncIterable<In>
) {
  const values = await drain(input);

  for (const out of values.sort(compareFn)) {
    yield out;
  }
}
