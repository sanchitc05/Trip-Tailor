import { z } from "zod";

export const tripSchema = z.object({
  id: z.union([z.string(), z.number()]).optional(),
  title: z.string(),
  date: z.string(),
  budget: z.number(),
});

export const recommendationSchema = z.object({
  id: z.union([z.string(), z.number()]).optional(),
  title: z.string(),
  description: z.string(),
  saved: z.boolean().optional(),
});

export const routeSchema = z.object({
  mode: z.string(),
  time: z.string(),
  cost: z.number(),
  emissions: z.number(),
  comfort: z.number().optional(),
});

export const expenseSchema = z.object({
  name: z.string(),
  value: z.number(),
});

export const hotelSchema = z.object({
  id: z.union([z.string(), z.number()]).optional(),
  name: z.string(),
  price: z.number(),
  rating: z.number(),
});

export const itinerarySchema = z.object({
  summary: z.string().optional(),
  days: z.array(z.any()).optional(),
});

export const parseArray = (schema, value) => z.array(schema).parse(value);
