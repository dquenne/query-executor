import { assertEquals } from "../testDeps.ts";

import { fakeMovieTable, fakeMovieTuples } from "../mocks/fakeTables.ts";
import { SimpleIterator } from "../mocks/SimpleIterator.ts";
import { Count } from "../../src/nodes/Count.ts";
import { EOF } from "../../src/nodes/QueryIterator.ts";

Deno.test("Count - basic", function () {
  const input = new SimpleIterator(fakeMovieTuples);
  const it = new Count({}, [input]);
  it.init();

  assertEquals(it.next(), [String(fakeMovieTable.data.length)]);
  assertEquals(it.next(), EOF);
});
