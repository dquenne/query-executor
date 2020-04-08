import { QueryIterator } from "./QueryIterator.ts";
import { Aggregate } from "./Aggregate.ts";

interface CountOptions {}

export class Count extends Aggregate<{ count: number }> {
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
