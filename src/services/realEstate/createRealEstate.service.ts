import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address, Category, RealEstate } from "../../entities";
import { TRealEstateRequest } from "../../interfaces/realEstate.interface";
import { AppError } from "../../error";

export const createServiceRealEstate = async (
  realEstateData: TRealEstateRequest
): Promise<RealEstate> => {
  const { address, categoryId, ...newRealEstateData } = realEstateData;

  const addressRepository: Repository<Address> =
    AppDataSource.getRepository(Address);
  const categoriesRepo: Repository<Category> =
    AppDataSource.getRepository(Category);

  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const findCategory: Category | null = await categoriesRepo.findOneBy({
    id: categoryId!,
  });

  if (categoryId && !findCategory) {
    throw new AppError("Category not found", 404);
  }

  const newAddress: Address = addressRepository.create(address);

  await addressRepository.save(newAddress);

  const newRealEstate: RealEstate = realEstateRepository.create({
    ...newRealEstateData,
    address: newAddress,
    category: findCategory!,
  });

  const realEstate: RealEstate = await realEstateRepository.save(newRealEstate);
  return realEstate;
};
