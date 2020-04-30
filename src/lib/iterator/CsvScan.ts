import { readFileStr, parseCsv } from "../../../deps.ts";

export async function* CsvScan(path: string) {
  const file = await readFileStr(path);
  const parsed = (await parseCsv(file, { header: true })) as Record<
    string,
    string
  >[];
  for (const row of parsed) {
    yield row;
  }
}
