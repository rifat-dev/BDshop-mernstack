import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderHook } from "@testing-library/react-hooks";

import Login from "./Login";

describe("Login Component test", () => {
  test("Email input should be render", () => {
    render(<Login />);
    renderHook(() => Login());

    let emailInpute = screen.getByRole("textbox", {
      name: /email address/i,
    });
    expect(emailInpute).toBeInTheDocument();
  });
});
