import { assertEquals } from "../testDeps.ts";

import { SimpleIterator } from "../mocks/SimpleIterator.ts";
import { EOF } from "../../src/nodes/QueryIterator.ts";
import { MemorySortIterator } from "../../src/nodes/MemorySort.ts";

Deno.test("MemorySort - basic", function () {
  const input = new SimpleIterator([["3"], ["10"], ["2"]]);
  const it = new MemorySortIterator(
    { comparator: (a, b) => Number(a[0]) - Number(b[0]) },
    [input]
  );
  it.init();

  assertEquals([it.next(), it.next(), it.next()], [["2"], ["3"], ["10"]]);
  assertEquals(it.next(), EOF);
});
