export class List<T> {
  constructor(public value: T, public next?: List<T>) {}

  static fromArray<T>(input: Array<T>) {
    let current: List<T> | undefined = undefined;
    let prev: List<T> | undefined = undefined;
    for (let index = input.length - 1; index >= 0; index--) {
      prev = current;
      current = new List(input[index], prev);
    }
    return current;
  }
}
