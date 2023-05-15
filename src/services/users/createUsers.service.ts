import { Repository } from "typeorm";
import { User } from "../../entities/users.entity";
import { TUserRequest, TUserResponse } from "../../interfaces/user.interface";
import { AppDataSource } from "../../data-source";
import { userSchemaResponse } from "../../schemas/users.schema";

export const createServiceUser = async (
  userData: TUserRequest
): Promise<TUserResponse> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User = userRepository.create(userData);

  await userRepository.save(user);

  return userSchemaResponse.parse(user);
};
