import "@testing-library/jest-dom";
import "isomorphic-fetch";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import renderer from "react-test-renderer";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { LoginFields } from "@/app/(auth)/login/components/fields";

const handlers = [
  rest.post("/api/signup-form", async (req, res, ctx) => {
    const { user_name } = await req.json();

    if (user_name === "amir") {
      return res(ctx.status(400), ctx.json({ message: "this user is ban" }));
    }
    return res(ctx.status(200), ctx.json({ message: "welcome" }));
  }),
];

const server = setupServer(...handlers);

describe("test login page", () => {
  const consoleSpy = jest.spyOn(console, "log").mockImplementation();
  beforeAll(() => server.listen());
  afterEach(() => {
    server.restoreHandlers();
    consoleSpy.mockClear();
    cleanup();
  });

  afterAll(() => server.close());
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

  describe("testing fields", () => {
    it("testing submit for status 200", async () => {
      render(<LoginFields />);
      fireEvent.change(screen.getByLabelText("User Name"), {
        target: {
          value: "kasra",
        },
      });

      fireEvent.change(screen.getByLabelText("Password"), {
        target: {
          value: "kasraK@1",
        },
      });

      fireEvent.submit(screen.getByTestId("submit-btn"));
      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith("success");
      });
    });

    it("testing submit for status 400", async () => {
      render(<LoginFields />);
      fireEvent.change(screen.getByLabelText("User Name"), {
        target: {
          value: "amir",
        },
      });

      fireEvent.change(screen.getByLabelText("Password"), {
        target: {
          value: "kasraK@1",
        },
      });

      fireEvent.submit(screen.getByTestId("submit-btn"));

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith(
          "submit form err: something is wrong: 400",
        );
      });
    });
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
