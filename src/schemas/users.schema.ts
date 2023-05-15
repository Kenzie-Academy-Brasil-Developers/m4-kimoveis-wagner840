import { z } from "zod";

export const usersSchema = z.object({
  id: z.number(),
  name: z.string().max(45),
  email: z.string().email().max(45),
  admin: z.boolean().optional().default(false),
  password: z.string().max(120),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullish(),
});

export const userSchemaRequest = usersSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export const userSchemaResponse = usersSchema.omit({
  password: true,
});
export const getUserSchemaResponse = userSchemaResponse.array();

export const patchUserSchemaResponse = userSchemaRequest
  .partial()
  .omit({ admin: true });
