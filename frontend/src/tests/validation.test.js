import {
  contactSchema,
  forgotPasswordSchema,
  signInSchema,
  signUpSchema,
} from "@/utils/validation";

describe("validation schemas", () => {
  it("accepts valid sign-in data", () => {
    const result = signInSchema.parse({
      email: "traveler@example.com",
      password: "secret123",
    });

    expect(result.email).toBe("traveler@example.com");
  });

  it("rejects invalid sign-in data", () => {
    const result = signInSchema.safeParse({
      email: "invalid-email",
      password: "123",
    });

    expect(result.success).toBe(false);
    expect(result.error.flatten().fieldErrors.email).toContain("Enter a valid email");
    expect(result.error.flatten().fieldErrors.password).toContain(
      "Password must be at least 6 characters",
    );
  });

  it("requires a full name for sign-up", () => {
    const result = signUpSchema.safeParse({
      name: "A",
      email: "traveler@example.com",
      password: "secret123",
    });

    expect(result.success).toBe(false);
    expect(result.error.flatten().fieldErrors.name).toContain("Enter your full name");
  });

  it("validates forgot-password emails", () => {
    const result = forgotPasswordSchema.safeParse({
      email: "missing-at-symbol",
    });

    expect(result.success).toBe(false);
    expect(result.error.flatten().fieldErrors.email).toContain("Enter a valid email");
  });

  it("requires a longer contact message", () => {
    const result = contactSchema.safeParse({
      name: "Trip Tailor",
      email: "support@example.com",
      message: "Too short",
    });

    expect(result.success).toBe(false);
    expect(result.error.flatten().fieldErrors.message).toContain("Write a longer message");
  });
});
