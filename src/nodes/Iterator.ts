export abstract class Iterator<TNext, TDone> {
  constructor() {}

  abstract init(): void;

  abstract next(): TNext | TDone;

  abstract isDone(value: TNext | TDone): value is TDone;

  abstract close(): void;
}
