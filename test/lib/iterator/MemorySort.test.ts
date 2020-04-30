import { assertEquals } from "../../testDeps.ts";

import { SimpleIterator } from "../../../src/lib/iterator/SimpleIterator.ts";
import { MemorySort } from "../../../src/lib/iterator/MemorySort.ts";
import { drain } from "../../../src/lib/util/iteratorUtil.ts";

Deno.test("MemorySort - basic", async function () {
  const input = SimpleIterator([[3], [10], [2]]);
  const it = MemorySort((a, b) => a[0] - b[0], input);

  assertEquals(await drain(it), [[2], [3], [10]]);
});
