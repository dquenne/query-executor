import { BaseIterator } from "./Iterator.ts";

export const EOF = undefined;
export type EOF = undefined;

export type TupleValue = string;

export type Tuple = TupleValue[];

export abstract class QueryIterator implements BaseIterator<Tuple, EOF> {
  constructor(public inputs: QueryIterator[]) {}

  init() {
    this.inputs.forEach((input) => input.init());
  }

  abstract next(): Tuple | EOF;

  close() {
    this.inputs.forEach((input) => input.close());
  }

  isDone(value: Tuple | EOF): value is EOF {
    return value === EOF;
  }
}
