export { readFileStr } from "https://deno.land/std@v0.39.0/fs/mod.ts";
export { parse as parseCsv } from "https://deno.land/std@v0.39.0/encoding/csv.ts";

export {
  ITable,
  FileTable,
  IRowPointer,
  RowPointer,
  Serializer,
  Deserializer,
} from "https://raw.githubusercontent.com/dquenne/block-files/d96bec64fb729d9c6ef2013f9c3e2cad0ecfaf08/src/index.ts";

export { BufReader } from "https://raw.githubusercontent.com/dquenne/deno/std/csv-stream-matrix/0.39.0/std/io/bufio.ts";
export { streamMatrix } from "https://raw.githubusercontent.com/dquenne/deno/std/csv-stream-matrix/0.39.0/std/encoding/csv.ts";
