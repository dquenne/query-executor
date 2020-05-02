import { assertEquals } from "../../testDeps.ts";
import {
  buildSchema,
  Column,
} from "../../../src/lib/schema/SchemaConstructor.ts";
import { select } from "../../../src/lib/util/objectUtil.ts";

Deno.test("serializer and deserializer are complements", async function () {
  const exampleSchema = buildSchema(
    {
      movieId: Column.Number,
      name: Column.String,
      genres: Column.String,
    },
    ["movieId", "name", "genres"]
  );

  const input = { movieId: 1, name: "foo", genres: "bar" };

  assertEquals(
    input,
    exampleSchema.deserializer(exampleSchema.serializer(input))
  );
});

Deno.test("getCsvConverter", async function () {
  const exampleSchema = buildSchema(
    {
      movieId: Column.Number,
      name: Column.String,
      genres: Column.String,
    },
    ["movieId", "name", "genres"]
  );

  const input = { movieId: 1, name: "foo", genres: "bar" };

  const csv = [
    ["movieId", "name", "genres"],
    ["1", "foo", "bar"],
  ];

  assertEquals(input, exampleSchema.getCsvConverter(csv[0])(csv[1]));
});

Deno.test("getCsvConverter for csv with subset of columns", async function () {
  const exampleSchema = buildSchema(
    {
      movieId: Column.Number,
      name: Column.String,
      genres: Column.String,
    },
    ["movieId", "name", "genres"]
  );

  const input = { movieId: 1, name: "foo", genres: "bar" };

  const csv = [
    ["movieId", "name"],
    ["1", "foo"],
  ];

  assertEquals(
    select(["movieId", "name"], input),
    exampleSchema.getCsvConverter(csv[0])(csv[1])
  );
});
