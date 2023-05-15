import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";

export const ensurePatchAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const admin: boolean = res.locals.admin;
  const id: number = parseInt(res.locals.userID);
  const paramsId: number = parseInt(req.params.id);

  if (!admin) {
    if (id !== paramsId) {
      throw new AppError("Insufficient permission", 403);
    }
  }

  return next();
};
