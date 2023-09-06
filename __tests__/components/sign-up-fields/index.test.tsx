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

import { SignUpFields } from "@/app/(auth)/sign-up/components/fields";

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

describe("testing sign up page", () => {
  const consoleSpy = jest.spyOn(console, "log").mockImplementation();
  beforeAll(() => server.listen());
  afterEach(() => {
    server.restoreHandlers();
    consoleSpy.mockClear();
    cleanup();
  });

  afterAll(() => server.close());

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

  describe("testing fields", () => {
    it("testing submit form for status 200", async () => {
      render(<SignUpFields />);

      fireEvent.change(screen.getByLabelText("Name"), {
        target: {
          value: "kasra",
        },
      });
      fireEvent.change(screen.getByLabelText("Last Name"), {
        target: {
          value: "mohammadpour",
        },
      });
      fireEvent.change(screen.getByLabelText("Phone"), {
        target: {
          value: "09189202822",
        },
      });
      fireEvent.change(screen.getByLabelText("User Name"), {
        target: {
          value: "kasra",
        },
      });
      fireEvent.change(screen.getByLabelText("Email"), {
        target: {
          value: "kasra@gmail.com",
        },
      });
      fireEvent.change(screen.getByLabelText("Password"), {
        target: {
          value: "kasraK@1",
        },
      });

      fireEvent.submit(screen.getByRole("button"));

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith("success");
      });
    });

    it("testing submit form for status 400", async () => {
      render(<SignUpFields />);

      fireEvent.change(screen.getByLabelText("Name"), {
        target: {
          value: "kasra",
        },
      });
      fireEvent.change(screen.getByLabelText("Last Name"), {
        target: {
          value: "mohammadpour",
        },
      });
      fireEvent.change(screen.getByLabelText("Phone"), {
        target: {
          value: "09189202822",
        },
      });
      fireEvent.change(screen.getByLabelText("User Name"), {
        target: {
          value: "amir",
        },
      });
      fireEvent.change(screen.getByLabelText("Email"), {
        target: {
          value: "kasra@gmail.com",
        },
      });
      fireEvent.change(screen.getByLabelText("Password"), {
        target: {
          value: "kasraK@1",
        },
      });

      fireEvent.submit(screen.getByRole("button"));

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith(
          "submit form err: something is wrong: 400",
        );
      });
    });
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
