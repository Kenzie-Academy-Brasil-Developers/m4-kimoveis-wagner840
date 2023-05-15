import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities/realEstate.entity";
import { AppError } from "../../error";

export const getServiceSchedule = async (
  realEstateId: number
): Promise<any> => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const realEstateFounder: boolean = await realEstateRepository.exist({
    where: { id: realEstateId },
  });

  if (!realEstateFounder) {
    throw new AppError("RealEstate not found", 404);
  }
  const realEstate: RealEstate | null = await realEstateRepository
    .createQueryBuilder("realEstate")
    .innerJoinAndSelect("realEstate.schedule", "schedule")
    .innerJoinAndSelect("schedule.user", "user")
    .innerJoinAndSelect("realEstate.address", "address")
    .innerJoinAndSelect("realEstate.category", "category")
    .where("realEstate.id = :realEstateId", { realEstateId: realEstateId })
    .getOne();

  return realEstate;
};
