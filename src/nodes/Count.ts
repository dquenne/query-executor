import { QueryIterator, Tuple } from "./QueryIterator.ts";
import { AggregateIterator } from "./Aggregate.ts";

interface CountOptions {
  index?: number;
}

type CountState = { count: number };

export class CountIterator extends AggregateIterator<CountState> {
  constructor(options: CountOptions, public inputs: [QueryIterator]) {
    super(
      {
        initialState: { count: 0 },
        callback: CountIterator.createCallback(options.index),
        final: (state) => [String(state.count)],
      },
      inputs
    );
  }

  static createCallback(
    countIndex?: number
  ): (val: Tuple, prev: CountState) => CountState {
    if (countIndex) {
      return (val, prev) => {
        if (val[countIndex] !== undefined && val[countIndex] !== null) {
          return { count: prev.count + 1 };
        } else {
          return prev;
        }
      };
    }
    return (val, prev) => ({ count: prev.count + 1 });
  }
}
