import { Aggregate } from "./Aggregate.ts";

// types wip - these types are a bit untenable

type KeyType = string | number | symbol;

type IterableInput<InKey extends KeyType, Val> =
  | Iterable<Record<InKey, Val>>
  | AsyncIterable<Record<InKey, Val>>;

export function Count<InKey extends KeyType, Val>(
  key: InKey | undefined,
  input: IterableInput<InKey, Val>
): AsyncGenerator<number>;

export function Count<InKey extends KeyType, Val>(
  input: IterableInput<InKey, Val>
): AsyncGenerator<number>;

export function Count<InKey extends KeyType, Val>(
  keyOrInput: InKey | undefined | IterableInput<InKey, Val>,
  input?: IterableInput<InKey, Val>
): AsyncGenerator<number> {
  if (!input || !keyOrInput) {
    return Aggregate(
      (prev) => prev + 1,
      0,
      keyOrInput as IterableInput<InKey, Val>
    );
  }
  const key = keyOrInput as InKey;
  return Aggregate((prev, row) => prev + (row[key] ? 1 : 0), 0, input);
}
