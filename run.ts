import { CsvScan } from "./src/lib/iterator/CsvScan.ts";
import { Count } from "./src/lib/iterator/Count.ts";
import { Selection } from "./src/lib/iterator/Selection.ts";
import { MemorySort } from "./src/lib/iterator/MemorySort.ts";
import { head } from "./src/lib/util/iteratorUtil.ts";

async function wrapWithTime(callback: () => void | Promise<void>) {
  const start = new Date();
  await callback();
  console.log(`(${(new Date().getTime() - start.getTime()) / 1000}s)`);
}

const tableFilename = Deno.args[0];

function usage() {
  console.log(
    "example usage:\n\n  deno --allow-read run.ts ../ml-20m/movies.csv\n"
  );
}

if (!tableFilename) {
  console.log("Error: table filename not specified.");
  usage();
  Deno.exit(1);
}

await wrapWithTime(async () => {
  const fs = CsvScan(tableFilename);

  console.log("first three:", await head(fs, 3));
});

await wrapWithTime(async () => {
  const countIterator = Count(CsvScan(tableFilename));

  console.log("total count:", await head(countIterator, 1));
});

await wrapWithTime(async () => {
  const countIterator2 = Count(
    Selection((val) => Number(val["movieId"]) < 5000, CsvScan(tableFilename))
  );

  console.log("how many with id < 5000:", await head(countIterator2, 1));
});

await wrapWithTime(async () => {
  const descendingComparator = (key: string) => (
    a: Record<string, any>,
    b: Record<string, any>
  ) => Number(b[key]) - Number(a[key]);

  const memSortIt = MemorySort(
    descendingComparator("movieId"),
    Selection((val) => val["title"].length < 15, CsvScan(tableFilename))
  );

  console.log("sorted backwards", await head(memSortIt, 5));
});
