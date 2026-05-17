import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PlannerPage from "@/pages/PlannerPage";

const { getRecommendation } = vi.hoisted(() => ({
  getRecommendation: vi.fn(),
}));

vi.mock("@/components/TripMap", () => ({
  default: ({ destination }) => <div data-testid="trip-map">Map for {destination}</div>,
}));

vi.mock("@/services/tripService", () => ({
  tripService: {
    getRecommendation,
  },
}));

function renderPlanner() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <PlannerPage />
    </QueryClientProvider>,
  );
}

describe("PlannerPage", () => {
  beforeEach(() => {
    getRecommendation.mockReset();
    getRecommendation.mockResolvedValue({
      destination: "Kerala",
      duration: 5,
      itinerary: [],
      estimated_cost: 40000,
      tips: [],
      map_waypoints: [],
      cost_breakdown: {
        accommodation: 14000,
        transportation: 10000,
        food: 8000,
        activities: 6000,
        miscellaneous: 2000,
        total: 40000,
      },
    });
  });

  it("keeps the next action disabled until each step is valid", async () => {
    const user = userEvent.setup();
    renderPlanner();

    const nextButton = screen.getByRole("button", { name: /next/i });
    expect(nextButton).toBeDisabled();

    await user.type(
      screen.getByPlaceholderText("Destination (e.g., Kerala, Ladakh)"),
      "Kerala",
    );
    expect(nextButton).toBeEnabled();

    await user.click(nextButton);

    const startDate = screen.getByLabelText("Start Date");
    const endDate = screen.getByLabelText("End Date");

    fireEvent.change(startDate, { target: { value: "2026-06-10" } });
    fireEvent.change(endDate, { target: { value: "2026-06-09" } });

    expect(screen.getByRole("button", { name: /next/i })).toBeDisabled();

    fireEvent.change(endDate, { target: { value: "2026-06-12" } });

    expect(screen.getByRole("button", { name: /next/i })).toBeEnabled();
  });

  it("submits a normalized recommendation payload after a valid review flow", async () => {
    const user = userEvent.setup();
    renderPlanner();

    await user.type(
      screen.getByPlaceholderText("Destination (e.g., Kerala, Ladakh)"),
      "Kerala",
    );
    await user.click(screen.getByRole("button", { name: /next/i }));

    fireEvent.change(screen.getByLabelText("Start Date"), {
      target: { value: "2026-06-10" },
    });
    fireEvent.change(screen.getByLabelText("End Date"), {
      target: { value: "2026-06-14" },
    });
    await user.click(screen.getByRole("button", { name: /next/i }));

    await user.type(screen.getByPlaceholderText("Budget in INR"), "40000");
    await user.type(screen.getByPlaceholderText("Duration (days)"), "5");
    await user.click(screen.getByRole("button", { name: /next/i }));

    await user.clear(screen.getByPlaceholderText("Group size"));
    await user.type(screen.getByPlaceholderText("Group size"), "3");
    await user.type(
      screen.getByPlaceholderText(
        "Interests (optional, comma-separated: beaches, hiking, food, culture)",
      ),
      "beaches, food, culture",
    );
    await user.click(screen.getByRole("button", { name: /next/i }));
    await user.click(screen.getByRole("button", { name: /get ai recommendation/i }));

    await waitFor(() => {
      expect(getRecommendation).toHaveBeenCalledWith({
        destination: "Kerala",
        budget: 40000,
        duration: 5,
        travel_style: "adventure",
        group_size: 3,
        interests: ["beaches", "food", "culture"],
        start_date: "2026-06-10",
        end_date: "2026-06-14",
      });
    });
  });
});
