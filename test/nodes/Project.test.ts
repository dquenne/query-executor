import { assertEquals } from "../testDeps.ts";

import { fakeMovieTuples } from "../mocks/fakeTables.ts";
import { SimpleIterator } from "../mocks/SimpleIterator.ts";
import { Project } from "../../src/nodes/Project.ts";

Deno.test("Project - basic", function () {
  const input = new SimpleIterator(fakeMovieTuples);
  const it = new Project([input], [0, 2]);
  it.init();

  assertEquals(it.next(), [fakeMovieTuples[0][0], fakeMovieTuples[0][2]]);
});
