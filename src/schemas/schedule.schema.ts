import { z } from "zod";
import { usersSchema } from "./users.schema";
import { realEstateSchema } from "./realEstate.schema";

export const scheduleSchema = z.object({
  id: z.number(),
  date: z.string(),
  hour: z.string(),
  realEstateId: z.number(),
  user: usersSchema,
  realEstate: realEstateSchema,
});

export const scheduleSchemaRequest = scheduleSchema.omit({
  id: true,
  user: true,
  realEstate: true,
});
