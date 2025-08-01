import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignIn from "@/views/SignIn/SignIn";
import { useRouter } from "next/navigation";

jest.mock("@/assets/logo.svg", () => "svg-mock");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

global.fetch = jest.fn();

describe("SignIn Page", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it("should handle successful sign-in", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<SignIn />);

    const usernameInput = screen.getByPlaceholderText("Enter your username");
    const passwordInput = screen.getByPlaceholderText("Enter your password");
    const signInButton = screen.getByRole("button", { name: /sign in/i });

    expect(signInButton).toBeDisabled();

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(signInButton).toBeEnabled();

    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/");
    });
  });

  it("should handle failed sign-in and show an error message", async () => {
    const errorMessage = "Invalid credentials";
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: false, errorMessage }),
    });

    render(<SignIn />);

    const usernameInput = screen.getByPlaceholderText("Enter your username");
    const passwordInput = screen.getByPlaceholderText("Enter your password");
    const signInButton = screen.getByRole("button", { name: /sign in/i });

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });

    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    expect(mockPush).not.toHaveBeenCalled();
  });

  it("should open the forgot password modal", () => {
    render(<SignIn />);

    const forgotPasswordButton = screen.getByText(/forgot password\?/i);
    fireEvent.click(forgotPasswordButton);

    expect(
      screen.getByRole("heading", { name: /forgot password\?/i })
    ).toBeInTheDocument();
  });
});
