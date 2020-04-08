import { nextUntil } from "../lib/util/iteratorUtil.ts";

import { QueryIterator, Tuple } from "./QueryIterator.ts";

export enum Comparator {
  Equals = "equals",
  LessThan = "<",
  GreaterThan = ">",
}

// TODO: more flexible (e.g. support col1 = col2)
export type WhereClause<T> = {
  left: keyof T;
  operation: Comparator;
  right: string | number;
};

export class Select extends QueryIterator {
  constructor(
    public inputs: [QueryIterator],
    public predicate: (val: Tuple) => boolean
  ) {
    super(inputs);
  }

  next() {
    return nextUntil(this.inputs[0], (val: Tuple) => this.predicate(val));
  }
}
