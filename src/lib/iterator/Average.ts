import { Aggregate } from "./Aggregate.ts";

export function Average(input: Iterable<number> | AsyncIterable<number>) {
  return Aggregate(
    (prev, next, index) => ({
      count: prev.count + 1,
      total: prev.total + next,
    }),
    (final: { count: number; total: number }) => ({
      average: final.total / final.count,
    }),
    { count: 0, total: 0 },
    input
  );
}
