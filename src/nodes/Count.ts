import { QueryIterator } from "./QueryIterator.ts";
import { AggregateIterator } from "./Aggregate.ts";

interface CountOptions {}

export class CountIterator extends AggregateIterator<{ count: number }> {
  constructor(options: CountOptions, public inputs: [QueryIterator]) {
    super(
      {
        initialState: { count: 0 },
        callback: (val, prev) => ({ count: prev.count + 1 }),
        final: (state) => [String(state.count)],
      },
      inputs
    );
  }
}
