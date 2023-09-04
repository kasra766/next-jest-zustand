import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createSelectors } from "./createSelectors";
import { extractor } from "./extractor";

const initialState = {
  isLogin: false,
  user_information: {
    fname: "",
    lname: "",
    email: "",
    phone: "",
    user_name: "",
    password: "",
  },
};

export type UserSignup = typeof initialState.user_information;

interface Actions {
  login: () => void;
  logout: () => void;
  signup: (info: Partial<UserSignup>) => void;
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
        state.user_information = initialState.user_information;
      }),
    signup: info =>
      set(state => {
        state.user_information = { ...state.user_information, ...info };
      }),
  })),
);

const useAuthSelector = createSelectors(useAuthSlice);
export function useAuth() {
  const values = useAuthSelector.use;
  const result = extractor(values);

  return result;
}
