import { forEach } from "../lib/util/iteratorUtil.ts";
import { QueryIterator, EOF } from "./QueryIterator.ts";

interface Options {
  inputs: [QueryIterator];
}

export class Count extends QueryIterator {
  inputs: QueryIterator[];
  private index = 0;

  constructor(options: Options) {
    super(options.inputs);
    this.inputs = options.inputs;
  }

  next() {
    if (this.index >= 1) {
      return EOF;
    }
    let count = 0;
    forEach(this.inputs[0], () => count++);
    this.index++;
    return [String(count)];
  }
}
