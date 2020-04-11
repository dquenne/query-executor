import { nextUntil } from "../lib/util/iteratorUtil.ts";

import { QueryIterator, Tuple } from "./QueryIterator.ts";

export class SelectionIterator extends QueryIterator {
  predicate: (val: Tuple) => boolean;

  constructor(
    options: { predicate: (val: Tuple) => boolean },
    public inputs: [QueryIterator]
  ) {
    super(inputs);
    this.predicate = options.predicate;
  }

  next() {
    return nextUntil(this.inputs[0], (val: Tuple) => this.predicate(val));
  }
}
