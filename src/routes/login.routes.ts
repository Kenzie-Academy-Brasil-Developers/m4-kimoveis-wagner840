import { Router } from "express";
import { createLoginController } from "../controllers/login.controllers";
import { ensureData } from "../middlewares/ensureData.middleware";
import { loginSchema } from "../schemas/login.schema";

export const loginRoutes: Router = Router();

loginRoutes.post("", ensureData(loginSchema), createLoginController);
