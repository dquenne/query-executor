import { QueryIterator } from "./QueryIterator.ts";
import { selectIndices } from "../lib/util/objectUtil.ts";
import { CallbackProjection } from "./CallbackProjection.ts";

/**
 * select columns from input iterator
 */
export class IndexProjection extends CallbackProjection {
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
