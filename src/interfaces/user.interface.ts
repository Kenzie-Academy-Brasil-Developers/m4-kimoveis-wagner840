import { z } from "zod";
import {
  getUserSchemaResponse,
  userSchemaRequest,
  userSchemaResponse,
  usersSchema,
} from "../schemas/users.schema";
import { DeepPartial } from "typeorm";

export type TUser = z.infer<typeof usersSchema>;
export type TUserRequest = z.infer<typeof userSchemaRequest>;
export type TUserResponse = z.infer<typeof userSchemaResponse>;
export type TGetUsersResponse = z.infer<typeof getUserSchemaResponse>;
export type TuserUpdateRequest = DeepPartial<TUserRequest>;
