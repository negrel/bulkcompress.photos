import { batch } from "@preact/signals";

// deno-lint-ignore no-explicit-any
export function trigger(...signals: { value: any }[]) {
  batch(() => {
    for (const s of signals) {
      const old = s.value;
      s.value = null;
      s.value = old;
    }
  });
}
