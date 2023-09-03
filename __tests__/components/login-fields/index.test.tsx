import { cleanup, render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import { LoginFields } from "@/app/(auth)/login/components/fields";

afterEach(cleanup);

describe("test login page", () => {
  it("check for header", () => {
    render(<LoginFields />);
    const header = screen.getByRole("header");
    expect(header).toHaveTextContent("Login");
  });
  it("check for submit button", () => {
    render(<LoginFields />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "submit");
  });
  it("check inputs label", () => {
    render(<LoginFields />);
    const input = screen.getByLabelText("User Name");
    expect(input).toHaveFocus();
  });
});

describe("snap shot of login page", () => {
  it("snap shot", () => {
    const component = renderer.create(<LoginFields />);

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    renderer.act(() => {
      tree?.props.onSubmit();
    });

    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
