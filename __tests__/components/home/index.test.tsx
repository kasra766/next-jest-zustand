import {
  act,
  cleanup,
  fireEvent,
  render,
  renderHook,
  screen,
} from "@testing-library/react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import { Home } from "@/components/home";
import { useAuthSlice } from "@/store/useAuth";

const originalStore = useAuthSlice.getState();
beforeEach(() => {
  useAuthSlice.setState(originalStore);
});
afterEach(cleanup);
describe("testing home page", () => {
  it("test header", () => {
    render(<Home />);
    const header = screen.getByRole("contentinfo");
    expect(header).toHaveTextContent("welcome dear");
    const { result } = renderHook(() => useAuthSlice());
    act(() => {
      result.current.signup({ user_name: "kasra" });
    });

    expect(header).toHaveTextContent("welcome dear kasra");
  });
  it("test button", () => {
    render(<Home />);
    const logoutBtn = screen.getByRole("button");
    const { result } = renderHook(() => useAuthSlice());
    act(() => {
      result.current.signup({ user_name: "kasra" });
      result.current.login();
    });
    fireEvent.click(logoutBtn);
    expect(result.current.isLogin).toBeFalsy();
    expect(result.current.user_information.user_name).toBe("");
  });
});

describe("home page snap shot", () => {
  const component = renderer.create(<Home />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
