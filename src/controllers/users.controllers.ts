import { Request, Response } from "express";
import {
  TUserRequest,
  TUserResponse,
  TuserUpdateRequest,
} from "../interfaces/user.interface";
import { TGetUsersResponse } from "../interfaces/user.interface";
import { User } from "../entities/users.entity";
import { createServiceUser } from "../services/users/createUsers.service";
import { getServiceUsers } from "../services/users/getUser.service";
import { updateServiceUser } from "../services/users/updateUser.service";
import { deleteServiceUser } from "../services/users/deleteUser.service";

export const createUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data: TUserRequest = req.body;

  const user = await createServiceUser(data);

  return res.status(201).send(user);
};

export const getUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users: TGetUsersResponse = await getServiceUsers();

  return res.status(200).send(users);
};

export const updateUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user: TuserUpdateRequest = req.body;
  const paramsId = parseInt(req.params.id);

  const updatedUser: TUserResponse = await updateServiceUser(user, paramsId);

  return res.send(updatedUser);
};

export const deleteUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user: User = res.locals.user;

  await deleteServiceUser(user);

  return res.status(204).send();
};
