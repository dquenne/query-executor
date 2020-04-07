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

  assertEquals(fsIterator.next(), {
    id: fakeMovieTable.data[0][0],
    name: fakeMovieTable.data[0][1],
    genres: fakeMovieTable.data[0][2],
  });
});
