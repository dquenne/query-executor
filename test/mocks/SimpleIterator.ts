import { QueryIterator, GenericTuple } from "../../src/nodes/QueryIterator.ts";

export class SimpleIterator<
  TupleType extends GenericTuple
> extends QueryIterator<TupleType> {
  index = 0;
  constructor(private data: TupleType[]) {
    super([]);
  }

  next() {
    const val = this.data[this.index];
    this.index += 1;
    return val;
  }
}
