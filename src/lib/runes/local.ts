import { writable } from "svelte/store";

type LocalState = {
  value: number;
};

export const local = writable<LocalState>({ value: 0 } as LocalState);
