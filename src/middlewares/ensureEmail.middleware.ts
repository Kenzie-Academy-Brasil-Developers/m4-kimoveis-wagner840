import { NextFunction, Request, Response } from "express";
import { TUserRequest } from "../interfaces/user.interface";
import { Repository } from "typeorm";
import { User } from "../entities/users.entity";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";

export const ensureEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const user: TUserRequest = req.body;

  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  console.log(user.email);

  if (!user.email) {
    next();
  }

  const emailFound = await userRepository.findOneBy({ email: user.email });

  console.log(emailFound);

  if (emailFound) {
    throw new AppError("Email already exists", 409);
  }

  return next();
};
