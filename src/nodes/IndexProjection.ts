import { QueryIterator } from "./QueryIterator.ts";
import { selectIndices } from "../lib/util/objectUtil.ts";
import { CallbackProjectionIterator } from "./CallbackProjection.ts";

/**
 * select columns from input iterator
 */
export class IndexProjectionIterator extends CallbackProjectionIterator {
  constructor(
    options: { indices: number[] | Set<number> },
    inputs: [QueryIterator]
  ) {
    super(
      { callback: (input) => selectIndices(options.indices, input) },
      inputs
    );
  }
}
