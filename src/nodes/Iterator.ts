export interface Iterator<TNext, TDone> {
  init(): void;

  next(): TNext | TDone;

  isDone(value: TNext | TDone): value is TDone;

  close(): void;
}
