import { Repository } from "typeorm";
import { User } from "../../entities/users.entity";
import { AppDataSource } from "../../data-source";

export const deleteServiceUser = async (user: User): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  await userRepository.softRemove(user);

  return;
};
