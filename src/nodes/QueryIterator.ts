// not sure this is the best
export const EOF = undefined;
export type EOF = undefined;

export type GenericTuple = { [key: string]: any };

export abstract class QueryIterator<TupleType extends GenericTuple> {
  inputs: QueryIterator<any>[];

  constructor(inputs: QueryIterator<any>[]) {
    this.inputs = inputs;
  }
  init() {
    this.inputs.forEach((input) => input.init());
  }

  abstract next(): TupleType | EOF;

  close() {
    this.inputs.forEach((input) => input.close());
  }
}

export class NotInitializeException extends Error {
  constructor() {
    super();
    this.message = "Query iterator not initialized";
  }
}
