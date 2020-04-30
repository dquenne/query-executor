import { BaseIterator } from "../../nodes/Iterator.ts";

export async function drain<T>(input: Iterable<T> | AsyncIterable<T>) {
  const out = [];
  for await (const row of input) {
    out.push(row);
  }
  return out;
}

export function nextUntil<TNext, TDone>(
  it: BaseIterator<TNext, TDone>,
  predicate: (val: TNext) => boolean | undefined
) {
  let next = it.next();
  while (!it.isDone(next) && !predicate(next)) {
    next = it.next();
  }
  return next;
}

export function isInitialized<T>(val: T | undefined): val is T {
  return val !== undefined;
}

export class NotInitializedException extends Error {
  constructor() {
    super();
    this.message = "Query iterator not initialized";
  }
}
