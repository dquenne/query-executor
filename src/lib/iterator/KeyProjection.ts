import { CallbackProjection } from "./CallbackProjection.ts";

export function KeyProjection<
  InKey extends string | number | symbol,
  OutKey extends InKey,
  Val
>(
  indices: OutKey[],
  input: Iterable<Record<InKey, Val>> | AsyncIterable<Record<InKey, Val>>
) {
  return CallbackProjection((row) => pick(indices, row), input);
}

function pick<
  InKey extends string | number | symbol,
  OutKey extends InKey,
  Val
>(keys: OutKey[], obj: Record<InKey, Val>) {
  return keys.reduce(
    (prev, current) => ({ ...prev, [current]: obj[current] }),
    {} as Record<OutKey, Val>
  );
}
