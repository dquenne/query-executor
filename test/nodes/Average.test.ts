import { assertEquals } from "../testDeps.ts";

import { SimpleIterator } from "../mocks/SimpleIterator.ts";
import { AverageIterator } from "../../src/nodes/Average.ts";
import { EOF } from "../../src/nodes/QueryIterator.ts";

Deno.test("Average - basic", function () {
  const input = new SimpleIterator([["1"], ["2"], ["3"]]);
  const it = new AverageIterator({ indexToAverage: 0 }, [input]);
  it.init();

  assertEquals(it.next(), ["2"]);
  assertEquals(it.next(), EOF);
});
