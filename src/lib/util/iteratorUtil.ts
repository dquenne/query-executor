import { QueryIterator } from "../../nodes/QueryIterator.ts";

export function each<T>(
  it: QueryIterator<T>,
  callback: (val: T) => void
): void {
  let next = it.next();
  while (next != undefined) {
    callback(next);
    next = it.next();
  }
}

export function nextUntil<T>(
  it: QueryIterator<T>,
  predicate: (val: T) => boolean
) {
  let next = it.next();
  while (next != undefined) {
    if (predicate(next)) {
      return next;
    }
    next = it.next();
  }
}
