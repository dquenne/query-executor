export { readFileStr } from "https://deno.land/std@v0.39.0/fs/mod.ts";
export { parse as parseCsv } from "https://deno.land/std@v0.39.0/encoding/csv.ts";

export {
  ITable,
  FileTable,
  IRowPointer,
  RowPointer,
  Serializer,
  Deserializer,
} from "https://raw.githubusercontent.com/dquenne/block-files/98528e5b4afdfc5d822555499bf7f7ea2490b055/src/index.ts";

export { BufReader } from "https://raw.githubusercontent.com/dquenne/deno/std/csv-stream-matrix/0.39.0/std/io/bufio.ts";
export { streamMatrix } from "https://raw.githubusercontent.com/dquenne/deno/std/csv-stream-matrix/0.39.0/std/encoding/csv.ts";
