import { QueryIterator, EOF, GenericTuple } from "./QueryIterator.ts";
import { select } from "../lib/util/objectUtil.ts";

export class Project<
  InputTuple extends GenericTuple,
  SelectedColumn extends string & keyof InputTuple
> extends QueryIterator<Pick<InputTuple, SelectedColumn>> {
  inputs: [QueryIterator<InputTuple>];
  columns: SelectedColumn[];

  constructor(options: {
    columns: SelectedColumn[];
    input: QueryIterator<InputTuple>;
  }) {
    super([options.input]);
    this.inputs = [options.input];
    this.columns = options.columns;
  }

  next() {
    const nextInput = this.inputs[0].next();
    if (!nextInput) {
      return EOF;
    }
    return select(this.columns, nextInput);
  }
}
