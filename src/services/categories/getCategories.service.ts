import { Repository } from "typeorm";
import { Category } from "../../entities";
import { AppDataSource } from "../../data-source";

export const getServiceCategory = async (): Promise<Category[]> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const category: Category[] = await categoryRepository.find();

  return category;
};
