import { QueryIterator, EOF } from "./QueryIterator.ts";
import { selectIndices } from "../lib/util/objectUtil.ts";

export class Project extends QueryIterator {
  constructor(public inputs: [QueryIterator], private indices: number[]) {
    super(inputs);
  }

  next() {
    const nextInput = this.inputs[0].next();
    if (!nextInput) {
      return EOF;
    }
    return selectIndices(this.indices, nextInput);
  }
}
