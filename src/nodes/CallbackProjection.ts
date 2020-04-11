import { QueryIterator, EOF, Tuple } from "./QueryIterator.ts";

/**
 * perform arbitrary callback function on each tuple from input iterator
 */
export class CallbackProjection extends QueryIterator {
  callback: (input: Tuple) => Tuple;
  constructor(
    options: { callback: (input: Tuple) => Tuple },
    public inputs: [QueryIterator]
  ) {
    super(inputs);
    this.callback = options.callback;
  }

  next() {
    const nextInput = this.inputs[0].next();
    if (!nextInput) {
      return EOF;
    }
    return this.callback(nextInput);
  }
}
