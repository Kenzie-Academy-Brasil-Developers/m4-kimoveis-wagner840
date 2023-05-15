import { z } from "zod";
import {
  realEstateRequestSchema,
  realEstateSchema,
} from "../schemas/realEstate.schema";

export type TRealEstate = z.infer<typeof realEstateSchema>;

export type TRealEstateRequest = z.infer<typeof realEstateRequestSchema>;
