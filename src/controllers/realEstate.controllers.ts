import { Request, Response } from "express";
import { TRealEstateRequest } from "../interfaces/realEstate.interface";
import { RealEstate } from "../entities/realEstate.entity";
import { createServiceRealEstate } from "../services/realEstate/createRealEstate.service";
import { getServiceRealEstate } from "../services/realEstate/getRealEstate.service";

export const createRealEstateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const realEstateData: TRealEstateRequest = req.body;

  const realEstate = await createServiceRealEstate(realEstateData);

  return res.status(201).send(realEstate);
};

export const getRealEstateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const getRealEstate: RealEstate[] = await getServiceRealEstate();

  return res.send(getRealEstate);
};
