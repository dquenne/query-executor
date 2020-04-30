import { assertEquals } from "../../testDeps.ts";

import { SimpleIterator } from "../../../src/lib/iterator/SimpleIterator.ts";
import { Average } from "../../../src/lib/iterator/Average.ts";

Deno.test("Average - basic", async function () {
  const input = SimpleIterator([1, 2, 3, 100]);
  const it = Average(input);

  assertEquals((await it.next()).value, 26.5);
  assertEquals((await it.next()).done, true);
});
