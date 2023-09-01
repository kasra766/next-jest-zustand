import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createSelectors } from "./createSelectors";
import { extractor } from "./extractor";

interface Actions {
  inc: () => void;
  dec: () => void;
}

const initialState = {
  count: 0,
};
export const useCounter = create(
  immer<typeof initialState & Actions>(set => ({
    ...initialState,
    inc: () =>
      set(state => {
        ++state.count;
      }),
    dec: () =>
      set(state => {
        --state.count;
      }),
  })),
);

export const useCounterSelector = createSelectors(useCounter);

export const useCounterStore = () => {
  const values = useCounterSelector.use;
  const result = extractor(values);

  return result;
};
