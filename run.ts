import { FileScanIterator } from "./src/nodes/FileScan.ts";
import { CountIterator } from "./src/nodes/Count.ts";
import { SelectionIterator } from "./src/nodes/Selection.ts";
import { MemorySortIterator } from "./src/nodes/MemorySort.ts";

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

const fs = new FileScanIterator({ filename: tableFilename });

fs.init();

console.log("first three", [fs.next(), fs.next(), fs.next()]);

const countIterator = new CountIterator({}, [
  new FileScanIterator({ filename: tableFilename }),
]);

countIterator.init();

console.log("total count", countIterator.next(), countIterator.next());

const countIterator2 = new CountIterator({}, [
  new SelectionIterator({ predicate: (val) => Number(val[0]) < 5000 }, [
    new FileScanIterator({ filename: tableFilename }),
  ]),
]);

countIterator2.init();

console.log(
  "how many with id < 5000",
  countIterator2.next(),
  countIterator2.next()
);

const descendingComparator = (index: number) => (a: string[], b: string[]) =>
  Number(b[index]) - Number(a[index]);

const memSortIt = new MemorySortIterator(
  { comparator: descendingComparator(0) },
  [
    new SelectionIterator({ predicate: (val) => val[1].length < 15 }, [
      new FileScanIterator({ filename: tableFilename }),
    ]),
  ]
);

memSortIt.init();

console.log(
  "sorted backwards",
  memSortIt.next(),
  memSortIt.next(),
  memSortIt.next(),
  memSortIt.next()
);
