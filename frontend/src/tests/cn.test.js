import { cn } from "@/utils/cn";

describe("cn", () => {
  it("merges conditional and conflicting class names", () => {
    expect(cn("px-2", false && "hidden", "px-4", ["text-sm"])).toBe("px-4 text-sm");
  });
});
