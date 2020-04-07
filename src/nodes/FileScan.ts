import { readCsv } from "../lib/fileSystem/csv.ts";
import { keyByColumns } from "../lib/util/objectUtil.ts";

import { QueryIterator, NotInitializeException } from "./QueryIterator.ts";

type readTable = (filename: string) => { header: string[]; data: string[][] };

interface FileScanOptions {
  filename: string;
  dependencies?: { readFileFunc?: readTable };
}

export class FileScan extends QueryIterator<any> {
  filename: string;
  private columns?: string[];
  private rows?: string[][];
  private rowIndex = 0;
  readTable: readTable;

  constructor(options: FileScanOptions) {
    super([]);
    this.filename = options.filename;
    this.readTable = options.dependencies?.readFileFunc || readCsv;
  }

  init() {
    const { header, data } = this.readTable(this.filename);
    this.columns = header;
    this.rows = data;
  }

  next() {
    if (!this.columns || !this.rows) {
      throw new NotInitializeException();
    }
    return keyByColumns(this.columns, this.rows[this.rowIndex++]);
  }

  close() {
    this.rows = undefined;
  }
}
