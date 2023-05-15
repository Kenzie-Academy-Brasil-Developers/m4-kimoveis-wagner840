import { z } from "zod";
import { addressRequestSchema } from "./address.schema";
import { categorySchema } from "./category.schema";

export const realEstateSchema = z.object({
  category: categorySchema,
  id: z.number(),
  sold: z.boolean().default(false),
  value: z.union([z.string(), z.number()]),
  size: z.number().positive(),
  address: addressRequestSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const realEstateRequestSchema = realEstateSchema
  .omit({
    category: true,
    id: true,
    sold: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    categoryId: z.number().optional(),
  });
