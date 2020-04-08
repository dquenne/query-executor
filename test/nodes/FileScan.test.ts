import { assertEquals } from "../testDeps.ts";

import { FileScan } from "../../src/nodes/FileScan.ts";
import { fakeMovieTable } from "../mocks/fakeTables.ts";

Deno.test("FileScan - basic", function () {
  const fsIterator = new FileScan({
    filename: "stuff",
    dependencies: {
      readFileFunc: () => fakeMovieTable,
    },
  });
  fsIterator.init();

  assertEquals(fsIterator.next(), fakeMovieTable.data[0]);
});
