import { Repository } from "typeorm";
import { Schedule } from "../../entities/schedules.entity";
import {
  IResponseSchedule,
  TScheduleRequest,
} from "../../interfaces/schedule.interface";
import { User } from "../../entities/users.entity";
import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities/realEstate.entity";

export const createServiceSchedule = async (
  scheduleData: TScheduleRequest,
  id: number
): Promise<IResponseSchedule> => {
  const { realEstateId, ...newDataSchedule } = scheduleData;
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const scheduleRepository: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);

  const user: User | null = await userRepository.findOneBy({ id: id });

  const realEstate: RealEstate | null = await realEstateRepository.findOne({
    where: { id: realEstateId },
  });

  const newSchedule: Schedule = scheduleRepository.create({
    ...newDataSchedule,
    user: user!,
    realEstate: realEstate!,
  });

  await scheduleRepository.save(newSchedule);

  return { message: "Schedule created" };
};
