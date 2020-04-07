import { readFileStrSync } from "../../../deps.ts";

/**
 * super sloppy csv file reader that gets the job done
 * @param filename
 */
export function readCsv(
  filename: string
): {
  header: string[];
  data: string[][];
} {
  const rawFile = readFileStrSync(filename);

  const [header, ...data] = rawFile
    .split("\r\n")
    .map((line) => line.split(","));

  return {
    header,
    data,
  };
}
