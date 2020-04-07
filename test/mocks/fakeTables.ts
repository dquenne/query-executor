import { keyByColumns } from "../../src/lib/util/objectUtil.ts";

type hardCodedMovieTupleType = { id: string; name: string; genres: string };

export const fakeMovieTable = {
  header: ["id", "name", "genres"],
  data: [
    ["1", "Movie One", "comedy|mockumentary|documentary"],
    ["2", "Movie Two", "action"],
    ["3", "Movie Three", "comedy|dark comedy|drama"],
  ],
};

export const fakeMovieTuples = fakeMovieTable.data.map((row) =>
  keyByColumns(fakeMovieTable.header, row)
) as hardCodedMovieTupleType[];
