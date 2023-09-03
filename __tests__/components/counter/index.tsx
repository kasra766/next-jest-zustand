import { fireEvent, render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import { Counter } from "@/components/counter";

describe("testing counter", () => {
  it("test counts value", () => {
    render(<Counter />);
    const count = screen.getByRole("count_value");
    expect(count).toHaveTextContent("0");
    const incBtn = screen.getByTestId("inc");
    fireEvent.click(incBtn);
    expect(count).toHaveTextContent("1");

    const decBtn = screen.getByTestId("dec");
    fireEvent.click(decBtn);
    expect(count).toHaveTextContent("0");
  });
});

describe("snap shot of counter", () => {
  it("snap shot", () => {
    const component = renderer.create(<Counter />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
