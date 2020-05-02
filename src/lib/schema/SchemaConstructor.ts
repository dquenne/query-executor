import { ISchemaHandler } from "./ISchemaHandler.ts";
import { smartKeys } from "../util/objectUtil.ts";

export enum Column {
  Number = "number",
  String = "string",
}

/**
 * For all translation functions, `undefined` means no function is applied and
 * is equivalent to specifying `(a) => a`
 */
export interface Translator<
  ColName extends Column,
  ParsedType = any,
  JsonType = any
> {
  columnName: ColName;
  fromCsv?: (input: string) => ParsedType;
  fromJson?: (input: JsonType) => ParsedType;
  toJson?: (input: ParsedType) => JsonType;
}

export const translators = {
  [Column.Number]: {
    columnName: Column.Number as Column.Number,
    fromCsv: Number,
    fromJson: undefined,
    toJson: undefined,
  },
  [Column.String]: {
    columnName: Column.String as Column.String,
    fromCsv: undefined,
    fromJson: undefined,
    toJson: undefined,
  },
};

// just to enforce type of translators
const typeChecker: { [Col in Column]: Translator<Col> } = translators;

function getTranslators<ColumnName extends string>(
  columns: Record<ColumnName, Column>
) {
  return smartKeys(columns).reduce(
    (prev, curr) => ({
      ...prev,
      [curr]: translators[columns[curr]],
    }),
    {} as { [Col in ColumnName]: Translator<typeof columns[ColumnName]> }
  );
}

export function buildSchema<
  ColumnName extends string,
  RowType extends Record<ColumnName, any>
>(
  columns: Record<ColumnName, Column>,
  storedColumnOrder: ColumnName[]
): ISchemaHandler<RowType, true> {
  const textEncoder = new TextEncoder();
  const textDecoder = new TextDecoder();
  const translators = getTranslators(columns);

  return {
    serializer: (row) => {
      const arrayified = storedColumnOrder.map((col) => row[col]);
      return textEncoder.encode(JSON.stringify(arrayified));
    },

    deserializer: (buf) => {
      const rawArray = JSON.parse(textDecoder.decode(buf.buffer));
      return storedColumnOrder.reduce((obj, colName, index) => {
        const translator = translators[colName].fromJson;
        return {
          ...obj,
          [colName]: translator ? translator(rawArray[index]) : rawArray[index],
        };
      }, {} as RowType);
    },

    getCsvConverter(columnOrder: string[]) {
      const typedColOrder = columnOrder as ColumnName[];
      const csvTranslators = typedColOrder.map(
        (columnName) => translators[columnName].fromCsv
      );
      return (row) =>
        typedColOrder.reduce((prev, columnName, index) => {
          const cellTranslator = csvTranslators[index];
          return {
            ...prev,
            [columnName]: cellTranslator
              ? cellTranslator(row[index])
              : row[index],
          };
        }, {} as RowType);
    },
  };
}
