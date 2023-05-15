import { z } from "zod";
import { addressRequestSchema } from "../schemas/address.schema";

export type TAddressRequest = z.infer<typeof addressRequestSchema>;
