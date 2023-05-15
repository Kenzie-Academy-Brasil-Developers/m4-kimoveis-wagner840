import { Router } from "express";
import {
  createRealEstateController,
  getRealEstateController,
} from "../controllers/realEstate.controllers";
import { ensureData } from "../middlewares/ensureData.middleware";
import { realEstateRequestSchema } from "../schemas/realEstate.schema";
import { ensureToken } from "../middlewares/ensureToken.middleware";
import { ensureAdmin } from "../middlewares/ensureAdmin.middleware";
import { ensureAddress } from "../middlewares/ensureAddress.midleware";

export const realEstateRoutes: Router = Router();

realEstateRoutes.post(
  "",
  ensureData(realEstateRequestSchema),
  ensureToken,
  ensureAdmin,
  ensureAddress,
  createRealEstateController
);

realEstateRoutes.get("", getRealEstateController);
