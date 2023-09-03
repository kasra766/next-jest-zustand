import { fireEvent, render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import { SignUpFields } from "@/app/(auth)/sign-up/components/fields";

describe("testing sign up page", () => {
  it("testing header", () => {
    render(<SignUpFields />);
    const header = screen.getByRole("heading");
    expect(header).toHaveTextContent("Sign Up");
  });
  it("testing fname field", () => {
    render(<SignUpFields />);
    const input = screen.getByLabelText("Name");
    expect(input).toHaveFocus();
  });
});

describe("snap shot of sign up form", () => {
  it("snap shot", () => {
    const component = renderer.create(<SignUpFields />);
    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();

    renderer.act(() => {
      tree?.props.onSubmit();
    });

    tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
