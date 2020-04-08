import { Iterator } from "../../nodes/Iterator.ts";

export function forEach<TNext, TDone>(
  it: Iterator<TNext, TDone>,
  callback: (val: TNext) => void
): void {
  let next = it.next();
  while (!it.isDone(next)) {
    callback(next);
    next = it.next();
  }
}

export function nextUntil<TNext, TDone>(
  it: Iterator<TNext, TDone>,
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
