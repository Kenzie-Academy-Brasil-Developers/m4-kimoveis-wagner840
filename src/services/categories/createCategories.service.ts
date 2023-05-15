import { Repository } from "typeorm";
import { Category } from "../../entities";
import { TCategoryRequest } from "../../interfaces/categories.interface";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../error";

export const createServiceCategory = async (
  categoryData: TCategoryRequest
): Promise<Category> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const category: boolean = await categoryRepository.exist({
    where: { name: categoryData.name },
  });

  if (category) {
    throw new AppError("Category already exists", 409);
  }

  const newCategoryData: Category = await categoryRepository.save(categoryData);

  return newCategoryData;
};
