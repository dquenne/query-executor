import { Aggregate } from "./Aggregate.ts";

export function Average(input: Iterable<number> | AsyncIterable<number>) {
  return Aggregate(
    (prev, next, index) => (prev * index + next) / (index + 1),
    0,
    input
  );
}
