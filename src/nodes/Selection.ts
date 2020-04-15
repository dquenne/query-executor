import { nextUntil } from "../lib/util/iteratorUtil.ts";

import { QueryIterator, Tuple } from "./QueryIterator.ts";

export type PredicateType = (val: Tuple) => boolean;

export class SelectionIterator extends QueryIterator {
  predicate: PredicateType;

  constructor(
    options: { predicate: PredicateType },
    public inputs: [QueryIterator]
  ) {
    super(inputs);
    this.predicate = options.predicate;
  }

  next() {
    return nextUntil(this.inputs[0], (val: Tuple) => this.predicate(val));
  }
}
