import { assertEquals } from "../../testDeps.ts";

import { SimpleIterator } from "../../../src/lib/iterator/SimpleIterator.ts";
import { Count } from "../../../src/lib/iterator/Count.ts";

import { fakeMovieTable, fakeMovieTuples } from "../../mocks/fakeTables.ts";

Deno.test("Count - basic", async function () {
  const input = SimpleIterator(fakeMovieTuples);
  const it = Count(input);

  assertEquals((await it.next()).value, fakeMovieTable.data.length);
  assertEquals((await it.next()).done, true);
});

Deno.test("Count - column specified - column without null", async function () {
  const input = SimpleIterator([{ col1: "a", col2: "b" }, { col1: "stuff" }]);
  const it = Count("col1", input);

  assertEquals((await it.next()).value, 2);
  assertEquals((await it.next()).done, true);
});

Deno.test("Count - column specified - column with null", async function () {
  const input = SimpleIterator([
    { col1: "a", col2: "b" },
    { col1: "stuff", col2: null },
  ]);
  const it = Count("col2", input);

  assertEquals((await it.next()).value, 1);
  assertEquals((await it.next()).done, true);
});
