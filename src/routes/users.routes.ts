import { Router } from "express";
import {
  createUsersController,
  deleteUsersController,
  getUsersController,
  updateUsersController,
} from "../controllers/users.controllers";
import { ensureData } from "../middlewares/ensureData.middleware";
import {
  patchUserSchemaResponse,
  userSchemaRequest,
} from "../schemas/users.schema";
import { ensureEmail } from "../middlewares/ensureEmail.middleware";
import { ensureToken } from "../middlewares/ensureToken.middleware";
import { ensureAdmin } from "../middlewares/ensureAdmin.middleware";
import { ensurePatchAdmin } from "../middlewares/ensurePatchAdmin.middleware";
import { ensureUser } from "../middlewares/ensureUser.middleware";
import { ensureDeleteUser } from "../middlewares/ensureDeleteUser.middleware";

export const userRoutes: Router = Router();

userRoutes.post(
  "",
  ensureData(userSchemaRequest),
  ensureEmail,
  createUsersController
);

userRoutes.get("", ensureToken, ensureAdmin, getUsersController);

userRoutes.patch(
  "/:id",
  ensureData(patchUserSchemaResponse),
  ensureToken,
  ensureUser,
  ensurePatchAdmin,
  updateUsersController
);

userRoutes.delete(
  "/:id",
  ensureToken,
  ensureUser,
  ensureAdmin,
  ensureDeleteUser,
  deleteUsersController
);
