import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";
import { TGetUsersResponse } from "../../interfaces/user.interface";
import { getUserSchemaResponse } from "../../schemas/users.schema";

export const getServiceUsers = async (): Promise<TGetUsersResponse> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const users: User[] = await userRepository.find();

  return getUserSchemaResponse.parse(users);
};
