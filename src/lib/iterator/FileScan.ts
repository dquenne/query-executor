import { FileTable, Serializer, Deserializer } from "../../../deps.ts";

export async function* FileScan<RowType>(
  path: string,
  deserialize: Deserializer<RowType>,
  serialize: Serializer<RowType>,
  pageSize = 4096
) {
  const table = await FileTable.fromPath(
    path,
    pageSize,
    deserialize,
    serialize
  );
  for await (const row of table.readAllRows()) {
    yield row;
  }
}
