export interface ISchemaHandler<
  RowType,
  HasCsvConverter extends true | false = false
> {
  serializer: (row: RowType) => Uint8Array;
  deserializer: (buffer: Uint8Array) => RowType;
  getCsvConverter: HasCsvConverter extends true
    ? (columnOrder: string[]) => (csvRow: string[]) => RowType
    : undefined;
}

/*
export interface ISchemaHandler<
  RowType,
  HasCsvConverter extends true | false | undefined = undefined
> {
  serializer: (row: RowType) => Uint8Array;
  deserializer: (buffer: Uint8Array) => RowType;
  getCsvConverter(
    columnOrder: string[]
  ): HasCsvConverter extends true
    ? (csvRow: string[]) => RowType
    : HasCsvConverter extends undefined
    ? undefined | ((csvRow: string[]) => RowType)
    : undefined;
}

*/
