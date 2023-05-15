import { Request, Response } from "express";
import {
  TCategoryRequest,
  TRealEstateCategory,
} from "../interfaces/categories.interface";
import { Category } from "../entities/categories.entity";
import { createServiceCategory } from "../services/categories/createCategories.service";
import { getServiceCategory } from "../services/categories/getCategories.service";
import { getServiceRealEstateCategory } from "../services/categories/getRealEstateCategories.service";

export const createCategoryController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categoryData: TCategoryRequest = req.body;

  const category: Category = await createServiceCategory(categoryData);

  return res.status(201).send(category);
};

export const getCategoryController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const getCategories: Category[] = await getServiceCategory();

  return res.send(getCategories);
};

export const getRealEstateCategorieController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = parseInt(req.params.id);

  const realEstate: TRealEstateCategory = await getServiceRealEstateCategory(
    id
  );

  return res.json(realEstate);
};
