import { assertEquals } from "../testDeps.ts";
import { List } from "../../src/lib/List.ts";

Deno.test("List.fromArray()", () => {
  const array = [1, 2, 3, 4, 5, 6, 7];

  let list = List.fromArray(array);

  let output = [];

  while (list) {
    output.push(list.value);
    list = list.next;
  }
  assertEquals(output, array);
});
