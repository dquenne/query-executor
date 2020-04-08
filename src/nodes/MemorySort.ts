import { drain } from "../lib/util/iteratorUtil.ts";

import { QueryIterator, Tuple, IQueryIterator } from "./QueryIterator.ts";

export class MemorySort extends QueryIterator {
  index = 0;
  comparator: (a: Tuple, b: Tuple) => number;
  sorted: Tuple[] | undefined;

  constructor(
    options: {
      comparator: (a: Tuple, b: Tuple) => number;
    },
    public inputs: [IQueryIterator]
  ) {
    super(inputs);
    this.comparator = options.comparator;
  }

  next() {
    if (!this.sorted) {
      const wholeTable = drain(this.inputs[0]);
      this.sorted = wholeTable.sort(this.comparator);
    }
    const val = this.sorted[this.index];
    this.index++;
    return val;
  }
}
