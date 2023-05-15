import { Router } from "express";
import {
  createCategoryController,
  getCategoryController,
  getRealEstateCategorieController,
} from "../controllers/categories.controller";
import { ensureData } from "../middlewares/ensureData.middleware";
import { categoryRequestSchema } from "../schemas/category.schema";
import { ensureToken } from "../middlewares/ensureToken.middleware";
import { ensureAdmin } from "../middlewares/ensureAdmin.middleware";
import { ensureCategory } from "../middlewares/ensureCategory.middleware";

export const categoriesRoutes: Router = Router();

categoriesRoutes.post(
  "",
  ensureData(categoryRequestSchema),
  ensureToken,
  ensureAdmin,
  createCategoryController
);

categoriesRoutes.get("", getCategoryController);

categoriesRoutes.get(
  "/:id/realEstate",
  ensureCategory,
  getRealEstateCategorieController
);
