import { z } from "zod";
import { addressRequestSchema } from "./address.schema";

export const categorySchema = z.object({
  id: z.number(),
  name: z.string().max(45),
});

export const categoryRequestSchema = categorySchema.omit({
  id: true,
});

export const realStateCategorySchema = z.object({
  id: z.number(),
  size: z.number(),
  value: z.number(),
  sold: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const realEstateSchema2 = z.object({
  id: z.number(),
  size: z.number(),
  value: z.number(),
  sold: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const realEstateCategorySchema = categorySchema.extend({
  realEstate: realEstateSchema2.array(),
});
