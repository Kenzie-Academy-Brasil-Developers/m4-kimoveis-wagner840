import { Router } from "express";
import {
  createScheduleController,
  getScheduleController,
} from "../controllers/schedule.controllers";
import { ensureToken } from "../middlewares/ensureToken.middleware";
import { ensureData } from "../middlewares/ensureData.middleware";
import { scheduleSchemaRequest } from "../schemas/schedule.schema";
import { ensureRealEstate } from "../middlewares/ensureRealEstate.middeware";
import { ensureSchedule } from "../middlewares/ensureSchedule.midleware";
import { ensureAdmin } from "../middlewares/ensureAdmin.middleware";

export const scheduleRoutes: Router = Router();

scheduleRoutes.post(
  "",
  ensureToken,
  ensureData(scheduleSchemaRequest),
  ensureRealEstate,
  ensureSchedule,
  createScheduleController
);

scheduleRoutes.get(
  "/realEstate/:id",
  ensureToken,
  ensureAdmin,
  getScheduleController
);
