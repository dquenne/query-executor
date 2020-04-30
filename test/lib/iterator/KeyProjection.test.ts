import { assertEquals } from "../../testDeps.ts";

import { SimpleIterator } from "../../../src/lib/iterator/SimpleIterator.ts";
import { KeyProjection } from "../../../src/lib/iterator/KeyProjection.ts";
import { drain } from "../../../src/lib/util/iteratorUtil.ts";

Deno.test("KeyProjection - basic", async function () {
  const input = SimpleIterator([
    { a: 1, b: 2 },
    { a: 3, b: 4 },
  ]);
  const it = KeyProjection(["a"], input);

  assertEquals(await drain(it), [{ a: 1 }, { a: 3 }]);
});
