import { assertEquals } from "../testDeps.ts";

import { SimpleIterator } from "../mocks/SimpleIterator.ts";
import { Average } from "../../src/nodes/Average.ts";
import { EOF } from "../../src/nodes/QueryIterator.ts";

Deno.test("Average - basic", function () {
  const input = new SimpleIterator([["1"], ["2"], ["3"]]);
  const it = new Average({ indexToAverage: 0 }, [input]);
  it.init();

  assertEquals(it.next(), ["2"]);
  assertEquals(it.next(), EOF);
});
