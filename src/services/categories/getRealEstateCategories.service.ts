import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category, RealEstate } from "../../entities";
import { TRealEstateCategory } from "../../interfaces/categories.interface";
import { realEstateCategorySchema } from "../../schemas/category.schema";
import { TRealEstate } from "../../interfaces/realEstate.interface";

export const getServiceRealEstateCategory = async (
  id: number
): Promise<TRealEstateCategory> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const realEstateCategory: Category | null = await categoryRepository.findOne({
    where: { id: id },
    relations: { realEstate: true },
  });

  const returnRealEstateCategory: TRealEstateCategory =
    realEstateCategorySchema.parse(realEstateCategory);

  return returnRealEstateCategory;
};
