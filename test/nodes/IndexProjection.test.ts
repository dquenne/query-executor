import { assertEquals } from "../testDeps.ts";

import { fakeMovieTuples } from "../mocks/fakeTables.ts";
import { SimpleIterator } from "../mocks/SimpleIterator.ts";
import { IndexProjectionIterator } from "../../src/nodes/IndexProjection.ts";

Deno.test("IndexProjection - basic", function () {
  const input = new SimpleIterator(fakeMovieTuples);
  const it = new IndexProjectionIterator({ indices: [0, 2] }, [input]);
  it.init();

  assertEquals(it.next(), [fakeMovieTuples[0][0], fakeMovieTuples[0][2]]);
});
