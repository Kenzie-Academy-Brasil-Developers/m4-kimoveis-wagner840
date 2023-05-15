import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";
import {
  TUserResponse,
  TuserUpdateRequest,
} from "../../interfaces/user.interface";
import { userSchemaResponse } from "../../schemas/users.schema";

export const updateServiceUser = async (
  user: TuserUpdateRequest,
  paramsId: number
): Promise<TUserResponse> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const OldUser: User | null = await userRepository.findOneBy({ id: paramsId });

  const newUser: User = userRepository.create({ ...OldUser, ...user });

  await userRepository.save(newUser);

  const userUpdated: TUserResponse = userSchemaResponse.parse(newUser);

  return userUpdated;
};
