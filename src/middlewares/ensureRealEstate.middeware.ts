import { NextFunction, Request, Response } from "express";
import { RealEstate } from "../entities/realEstate.entity";
import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import { AppError } from "../error";

export const ensureRealEstate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const realEstateId: number = parseInt(req.body.realEstateId);

  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const existId: boolean = await realEstateRepository.exist({
    where: { id: realEstateId },
  });

  if (!existId) {
    throw new AppError("RealEstate not found", 404);
  }

  return next();
};
