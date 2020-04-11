import { forEach } from "../lib/util/iteratorUtil.ts";
import { QueryIterator, EOF, Tuple } from "./QueryIterator.ts";
import { BaseIterator } from "./Iterator.ts";

interface AggregateOptions<State> {
  initialState: State;
  callback(value: Tuple, prevState: State): State;
  final(endState: State): Tuple;
}

export class AggregateIterator<State extends {}> extends QueryIterator {
  private index = 0;
  private initialState: State;
  private callback: (value: Tuple, prevState: State) => State;
  private final: (endState: State) => Tuple;

  constructor(
    options: AggregateOptions<State>,
    public inputs: [QueryIterator]
  ) {
    super(inputs);
    this.initialState = options.initialState;
    this.callback = options.callback;
    this.final = options.final;
  }

  next() {
    if (this.index >= 1) {
      return EOF;
    }
    let state = this.initialState;
    forEach(this.inputs[0] as BaseIterator<Tuple, EOF>, (val) => {
      state = this.callback(val, state);
    });
    this.index++;
    return this.final(state);
  }
}
