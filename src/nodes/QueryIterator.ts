import { Iterator } from "./Iterator.ts";

export const EOF = undefined;
export type EOF = undefined;

export type TupleValue = string;

export type Tuple = TupleValue[];

export abstract class QueryIterator extends Iterator<Tuple, EOF> {
  constructor(public inputs: QueryIterator[]) {
    super();
  }

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

export class NotInitializeException extends Error {
  constructor() {
    super();
    this.message = "Query iterator not initialized";
  }
}
