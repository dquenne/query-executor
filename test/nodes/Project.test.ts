import { assertEquals } from "../testDeps.ts";

import { fakeMovieTuples } from "../mocks/fakeTables.ts";
import { SimpleIterator } from "../mocks/SimpleIterator.ts";
import { Project } from "../../src/nodes/Project.ts";

Deno.test("Project - basic", function () {
  const input = new SimpleIterator(fakeMovieTuples);
  const it = new Project({
    columns: ["id"],
    input: input,
  });
  it.init();

  assertEquals(it.next(), { id: fakeMovieTuples[0].id });
});
