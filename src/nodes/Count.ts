import { forEach } from "../lib/util/iteratorUtil.ts";
import { QueryIterator, EOF } from "./QueryIterator.ts";

interface CountOptions {}

export class Count extends QueryIterator {
  private index = 0;

  constructor(private options: CountOptions, public inputs: [QueryIterator]) {
    super(inputs);
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
