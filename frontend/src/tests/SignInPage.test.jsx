import { MemoryRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignInPage from "@/pages/SignInPage";

const signInMutateAsync = vi.fn();

vi.mock("@/hooks/useAuth", () => ({
  useSignIn: () => ({
    mutateAsync: signInMutateAsync,
  }),
  useSignUp: () => ({
    mutateAsync: vi.fn(),
  }),
  useForgotPassword: () => ({
    mutateAsync: vi.fn(),
  }),
}));

describe("SignInPage", () => {
  beforeEach(() => {
    signInMutateAsync.mockReset();
    signInMutateAsync.mockResolvedValue({
      user: { id: "user-1", email: "traveler@example.com" },
      accessToken: "jwt-token",
    });
  });

  it("shows validation errors before submitting invalid credentials", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <SignInPage />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("button", { name: /^sign in$/i }));

    expect(await screen.findByText("Enter a valid email")).toBeInTheDocument();
    expect(screen.getByText("Password must be at least 6 characters")).toBeInTheDocument();
    expect(signInMutateAsync).not.toHaveBeenCalled();
  });

  it("submits valid credentials", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <SignInPage />
      </MemoryRouter>,
    );

    await user.type(screen.getByPlaceholderText("Email"), "traveler@example.com");
    await user.type(screen.getByPlaceholderText("Password"), "secret123");
    await user.click(screen.getByRole("button", { name: /^sign in$/i }));

    await waitFor(() => {
      expect(signInMutateAsync).toHaveBeenCalledWith({
        email: "traveler@example.com",
        password: "secret123",
      });
    });
  });
});
