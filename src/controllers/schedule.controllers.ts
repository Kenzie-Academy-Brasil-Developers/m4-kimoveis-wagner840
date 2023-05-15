import { Request, Response } from "express";
import {
  IResponseSchedule,
  TScheduleRequest,
} from "../interfaces/schedule.interface";

import { Schedule } from "../entities/schedules.entity";
import { createServiceSchedule } from "../services/schedule/createSchedule.service";
import { getServiceSchedule } from "../services/schedule/getSchedule.service";

export const createScheduleController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = res.locals.userID;
  const scheduleData: TScheduleRequest = req.body;

  const schedule: IResponseSchedule = await createServiceSchedule(
    scheduleData,
    id
  );

  return res.status(201).send(schedule);
};

export const getScheduleController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const realEstateId: number = parseInt(req.params.id);

  const schedule: Schedule = await getServiceSchedule(realEstateId);

  return res.send(schedule);
};
