import { QueryIterator, Tuple } from "../../src/nodes/QueryIterator.ts";

export class SimpleIterator extends QueryIterator {
  index = 0;
  constructor(private data: Tuple[]) {
    super([]);
  }

  next() {
    return this.data[this.index++];
  }
}
