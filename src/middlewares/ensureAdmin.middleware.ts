import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";

export const ensureAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const admin: boolean = res.locals.admin;

  if (!admin) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};
