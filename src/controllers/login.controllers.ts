import { Request, Response } from "express";
import { TLogin } from "../interfaces/login.interface";
import { createServiceLogin } from "../services/login/login.service";

export const createLoginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const loginData: TLogin = req.body;

  const token: string = await createServiceLogin(loginData);

  return res.send({ token });
};
