import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";
import { TUserRequest } from "../interfaces/user.interface";

export const ensureData =
  (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    const dataValidated: TUserRequest = schema.parse(req.body);

    req.body = dataValidated;

    return next();
  };
