import { QueryIterator } from "./QueryIterator.ts";
import { AggregateIterator } from "./Aggregate.ts";

interface AverageOptions {
  indexToAverage: number;
}

export class AverageIterator extends AggregateIterator<{
  count: number;
  sum: number;
}> {
  indexToAverage: number;
  constructor(options: AverageOptions, public inputs: [QueryIterator]) {
    super(
      {
        initialState: { count: 0, sum: 0 },
        callback: (val, prev) => ({
          count: prev.count + 1,
          sum: prev.sum + Number(val[this.indexToAverage]),
        }),
        final: (state) => [String(state.sum / state.count)],
      },
      inputs
    );
    this.indexToAverage = options.indexToAverage;
  }
}
