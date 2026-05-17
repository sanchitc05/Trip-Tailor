import {
  expenseSchema,
  hotelSchema,
  itinerarySchema,
  parseArray,
  recommendationSchema,
  routeSchema,
  tripSchema,
} from "@/utils/apiSchemas";

describe("api schemas", () => {
  it("parses trip arrays", () => {
    const result = parseArray(tripSchema, [
      { id: "trip-1", title: "Kerala Escape", date: "2026-06-20", budget: 25000 },
    ]);

    expect(result).toEqual([
      { id: "trip-1", title: "Kerala Escape", date: "2026-06-20", budget: 25000 },
    ]);
  });

  it("rejects malformed recommendations", () => {
    expect(() =>
      recommendationSchema.parse({
        title: "Beach route",
        saved: "yes",
      }),
    ).toThrow();
  });

  it("accepts route data without comfort", () => {
    const result = routeSchema.parse({
      mode: "train",
      time: "12h",
      cost: 3200,
      emissions: 18,
    });

    expect(result.comfort).toBeUndefined();
  });

  it("parses expense items", () => {
    const result = expenseSchema.parse({
      name: "Food",
      value: 4200,
    });

    expect(result.value).toBe(4200);
  });

  it("parses hotels with ratings", () => {
    const result = hotelSchema.parse({
      id: 12,
      name: "Hill View Resort",
      price: 5600,
      rating: 4.5,
    });

    expect(result.name).toBe("Hill View Resort");
  });

  it("parses itinerary summaries and optional days", () => {
    const result = itinerarySchema.parse({
      summary: "A relaxed mountain itinerary",
      days: [{ day: 1, title: "Arrival" }],
    });

    expect(result.summary).toBe("A relaxed mountain itinerary");
    expect(result.days).toHaveLength(1);
  });
});
