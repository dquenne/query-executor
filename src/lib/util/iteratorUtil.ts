import { BaseIterator } from "../../nodes/Iterator.ts";

export function forEach<TNext, TDone>(
  it: BaseIterator<TNext, TDone>,
  callback: (val: TNext) => void
): void {
  let next = it.next();
  while (!it.isDone(next)) {
    callback(next);
    next = it.next();
  }
}

export function drain<TNext, TDone>(it: BaseIterator<TNext, TDone>) {
  const res = <TNext[]>[];
  forEach(it, (val) => res.push(val));
  return res;
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
