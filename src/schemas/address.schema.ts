import { z } from "zod";

export const adressSchema = z.object({
  id: z.number(),
  street: z.string().max(45),
  zipCode: z.string().max(8),
  number: z.string().max(7).optional().nullish(),
  city: z.string().max(20),
  state: z.string().max(2),
});

export const addressRequestSchema = adressSchema.omit({
  id: true,
});
