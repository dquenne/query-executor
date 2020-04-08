import { readCsv } from "../lib/fileSystem/csv.ts";
import {
  isInitialized,
  NotInitializedException,
} from "../lib/util/iteratorUtil.ts";

import { QueryIterator } from "./QueryIterator.ts";

type readTable = (filename: string) => { header: string[]; data: string[][] };

interface FileScanOptions {
  filename: string;
  dependencies?: { readFileFunc?: readTable };
}

export class FileScan extends QueryIterator {
  filename: string;
  private columns?: string[];
  private rows?: string[][];
  private rowIndex = 0;
  readTable: readTable;

  constructor(options: FileScanOptions, public inputs: [] = []) {
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
    if (!isInitialized(this.columns) || !isInitialized(this.rows)) {
      throw new NotInitializedException();
    }
    return this.rows[this.rowIndex++];
  }

  close() {
    this.rows = undefined;
  }
}
