import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { User } from "../entities/users.entity";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";

export const ensureUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id: number = parseInt(req.params.id);

  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const existId: boolean = await userRepository.exist({ where: { id: id } });

  if (!existId) {
    throw new AppError("User not found", 404);
  }

  return next();
};
