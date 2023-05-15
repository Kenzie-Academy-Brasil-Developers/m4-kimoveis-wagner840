import "reflect-metadata";
import "express-async-errors";
import express from "express";
import { handleError } from "./error";
import { userRoutes } from "./routes/users.routes";
import { realEstateRoutes } from "./routes/realEstate.routes";
import { scheduleRoutes } from "./routes/schedule.routes";
import { categoriesRoutes } from "./routes/categories.routes";
import { loginRoutes } from "./routes/login.routes";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/realEstate", realEstateRoutes);
app.use("/schedules", scheduleRoutes);
app.use("/categories", categoriesRoutes);
app.use("/login", loginRoutes);

app.use(handleError);

export default app;
