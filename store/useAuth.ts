import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createSelectors } from "./createSelectors";
import { extractor } from "./extractor";

const initialState = {
  isLogin: false,
  userSignup: {
    fname: "",
    lname: "",
    email: "",
    phone: "",
    user_name: "",
    password: "",
  },
};

export type UserSignup = typeof initialState.userSignup;

interface Actions {
  login: () => void;
  logout: () => void;
  signup: (info: UserSignup) => void;
}

export const useAuthSlice = create(
  immer<typeof initialState & Actions>(set => ({
    ...initialState,
    login: () =>
      set(state => {
        state.isLogin = true;
      }),
    logout: () =>
      set(state => {
        state.isLogin = false;
      }),
    signup: info =>
      set(state => {
        state.userSignup = info;
      }),
  })),
);

const useAuthSelector = createSelectors(useAuthSlice);
export function useAuth() {
  const values = useAuthSelector.use;
  const result = extractor(values);

  return result;
}
