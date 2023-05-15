import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import { Category } from "../entities/categories.entity";
import { AppError } from "../error";

export const ensureCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const categoryId: number = parseInt(req.params.id);

  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const existId: boolean = await categoryRepository.exist({
    where: { id: categoryId },
  });

  if (!existId) {
    throw new AppError("Category not found", 404);
  }

  return next();
};
