import { QueryIterator, EOF } from "./QueryIterator.ts";
import { selectIndices } from "../lib/util/objectUtil.ts";

export class Project extends QueryIterator {
  indices: number[];
  constructor(options: { indices: number[] }, public inputs: [QueryIterator]) {
    super(inputs);
    this.indices = options.indices;
  }

  next() {
    const nextInput = this.inputs[0].next();
    if (!nextInput) {
      return EOF;
    }
    return selectIndices(this.indices, nextInput);
  }
}
