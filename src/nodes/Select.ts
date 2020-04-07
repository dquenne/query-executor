import { nextUntil } from "../lib/util/iteratorUtil.ts";

import { QueryIterator, EOF, GenericTuple } from "./QueryIterator.ts";

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

export class Select<
  InputTuple extends GenericTuple,
  SelectedColumn extends string & keyof InputTuple
> extends QueryIterator<Pick<InputTuple, SelectedColumn>> {
  inputs: [QueryIterator<InputTuple>];
  private predicate: (val: InputTuple) => boolean;

  constructor(options: {
    whereClause: WhereClause<InputTuple>;
    input: QueryIterator<InputTuple>;
  }) {
    super([options.input]);
    this.inputs = [options.input];
    this.predicate = this.getPredicate(options.whereClause);
  }

  next() {
    return nextUntil(this.inputs[0], (val) => this.predicate(val));
  }

  private getPredicate(clause: WhereClause<InputTuple>) {
    switch (clause.operation) {
      case Comparator.Equals:
        return (val: InputTuple) => val[clause.left] === clause.right;
      case Comparator.LessThan:
        return (val: InputTuple) => val[clause.left] < clause.right;
      case Comparator.GreaterThan:
        return (val: InputTuple) => val[clause.left] > clause.right;
    }
  }
}
