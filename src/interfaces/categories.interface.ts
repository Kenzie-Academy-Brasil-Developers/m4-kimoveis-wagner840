import { z } from "zod";
import {
  categoryRequestSchema,
  categorySchema,
  realEstateCategorySchema,
} from "../schemas/category.schema";

export type TCategoryResponse = z.infer<typeof categorySchema>;
export type TCategoryRequest = z.infer<typeof categoryRequestSchema>;
export type TRealEstateCategory = z.infer<typeof realEstateCategorySchema>;
