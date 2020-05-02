import { BufReader, streamMatrix } from "../../../deps.ts";

export async function* CsvScan<RowType = string[]>(
  path: string,
  converterConstructor: (columnOrder: string[]) => (csvRow: string[]) => RowType
) {
  const file = await Deno.open(path);
  const iterator = streamMatrix(new BufReader(file));
  const header = (await iterator.next()).value;
  if (!header) {
    return;
  }
  const converter = converterConstructor(header);
  for await (const row of iterator) {
    yield converter(row);
  }
}
