import { create } from "zustand";

interface State {
  count: number;
}
interface Actions {
  inc: () => void;
  dec: () => void;
}

export const useCounter = create<State & Actions>(set => ({
  count: 0,
  inc: () => set(state => ({ count: state.count + 1 })),
  dec: () => set(state => ({ count: state.count - 1 })),
}));

export const countSelector = (state: State & Actions) => state;
