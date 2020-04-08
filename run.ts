import { FileScan } from "./src/nodes/FileScan.ts";
import { Count } from "./src/nodes/Count.ts";
import { Select, Comparator } from "./src/nodes/Select.ts";

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

const fs = new FileScan({ filename: tableFilename });

fs.init();

console.log("first three", [fs.next(), fs.next(), fs.next()]);

const count = new Count({
  inputs: [new FileScan({ filename: tableFilename })],
});

count.init();

console.log("total count", count.next(), count.next());

const count2 = new Count({
  inputs: [
    new Select(
      [new FileScan({ filename: tableFilename })],
      (val) => Number(val[0]) < 5000
    ),
  ],
});

count2.init();

console.log("how many with id < 5000", count2.next(), count2.next());
