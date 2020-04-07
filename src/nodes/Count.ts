import { each } from "../lib/util/iteratorUtil.ts";
import { QueryIterator, EOF } from "./QueryIterator.ts";

interface Options {
  inputs: [QueryIterator<any>];
}

type CountTuple = { count: number };

export class Count extends QueryIterator<CountTuple> {
  inputs: QueryIterator<any>[];
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
    each(this.inputs[0], () => count++);
    this.index++;
    return { count };
  }
}
