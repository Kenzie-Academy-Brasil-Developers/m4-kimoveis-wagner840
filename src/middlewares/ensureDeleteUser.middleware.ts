import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { User } from "../entities/users.entity";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";

export const ensureDeleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const id: number = parseInt(req.params.id);

  const foundUser: User | null = await userRepository.findOneBy({ id: id });

  if (foundUser?.deletedAt) {
    throw new AppError("User not found", 404);
  }

  res.locals.user = foundUser;

  return next();
};
