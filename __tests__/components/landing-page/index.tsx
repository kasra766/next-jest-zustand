import { cleanup, render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import { LandingPage } from "@/components/landing-page";

afterEach(cleanup);
describe("landing page test", () => {
  it("testing headers ", () => {
    render(<LandingPage />);

    const header = screen.getByRole("heading");

    const bodyText = screen.getByRole("contentinfo");

    expect(header).toBeInTheDocument();
    expect(bodyText).toBeInTheDocument();
  });

  it("testing buttons", () => {
    render(<LandingPage />);

    const btns = screen.getAllByRole("button");

    expect(btns[0]).toHaveTextContent("Login");
    expect(btns[1]).toHaveTextContent("Sign up");
  });
});

describe("landing page snap shot", () => {
  it("snap shot", () => {
    const component = renderer.create(<LandingPage />);
    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
