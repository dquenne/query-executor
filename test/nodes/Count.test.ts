import { assertEquals } from "../testDeps.ts";

import { fakeMovieTable, fakeMovieTuples } from "../mocks/fakeTables.ts";
import { SimpleIterator } from "../mocks/SimpleIterator.ts";
import { CountIterator } from "../../src/nodes/Count.ts";
import { EOF } from "../../src/nodes/QueryIterator.ts";

Deno.test("Count - basic", function () {
  const input = new SimpleIterator(fakeMovieTuples);
  const it = new CountIterator({}, [input]);
  it.init();

  assertEquals(it.next(), [String(fakeMovieTable.data.length)]);
  assertEquals(it.next(), EOF);
});

Deno.test("Count - column specified - column without null", function () {
  const input = new SimpleIterator([["abc", "xyz"], ["abd"]]);
  const it = new CountIterator({ index: 0 }, [input]);
  it.init();

  assertEquals(it.next(), ["2"]);
  assertEquals(it.next(), EOF);
});

Deno.test("Count - column specified - column with null", function () {
  const input = new SimpleIterator([["abc", "xyz"], ["abd"]]);
  const it = new CountIterator({ index: 1 }, [input]);
  it.init();

  assertEquals(it.next(), ["1"]);
  assertEquals(it.next(), EOF);
});
