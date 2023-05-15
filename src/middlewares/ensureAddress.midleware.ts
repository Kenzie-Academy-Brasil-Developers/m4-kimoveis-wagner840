import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Address } from "../entities/adresses.entity";
import { AppError } from "../error";
import { TAddressRequest } from "../interfaces/address.interface";

export const ensureAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const data: TAddressRequest = req.body.address;
  const addressRepository = AppDataSource.getRepository(Address);

  if (!data.number) {
    data.number = "";
  }

  const foundAddress: Address | null = await addressRepository.findOneBy({
    street: data.street,
    number: data.number || "",
    city: data.city,
    state: data.state,
    zipCode: data.zipCode,
  });

  if (foundAddress) {
    throw new AppError("Address already exists", 409);
  }
  return next();
};
