import { assertEquals } from "../testDeps.ts";

import { FileScanIterator } from "../../src/nodes/FileScan.ts";
import { fakeMovieTable } from "../mocks/fakeTables.ts";

Deno.test("FileScan - basic", function () {
  const fsIterator = new FileScanIterator({
    filename: "stuff",
    dependencies: {
      readFileFunc: () => fakeMovieTable,
    },
  });
  fsIterator.init();

  assertEquals(fsIterator.next(), fakeMovieTable.data[0]);
});
