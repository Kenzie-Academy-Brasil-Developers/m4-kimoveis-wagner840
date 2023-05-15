import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import { AppDataSource } from "../data-source";
import { Schedule } from "../entities/schedules.entity";
import { Repository } from "typeorm";

export const ensureSchedule = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { date, hour, realEstateId } = req.body;
  const id: number = res.locals.userID;

  const getHour: number = parseInt(hour);

  const dateNow: Date = new Date(date);

  const day: number = dateNow.getDay();

  if (getHour < 8 || getHour > 18) {
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
  }

  if (day > 4) {
    throw new AppError("Invalid date, work days are monday to friday", 400);
  }

  const scheduleRepository: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);

  const schedule: Schedule | null = await scheduleRepository
    .createQueryBuilder("schedule")
    .innerJoinAndSelect("schedule.user", "user")
    .innerJoinAndSelect("schedule.realEstate", "realEstate")
    .where("schedule.date = :date", { date: date })
    .andWhere("schedule.hour = :hour", { hour: hour })
    .andWhere("schedule.realEstate.id = realEstateId", {
      realEstateId: parseInt(realEstateId),
    })
    .getOne();

  if (schedule && schedule.user.id == id) {
    throw new AppError(
      "User schedule to this real estate at this date and time already exists",
      409
    );
  }
  if (schedule) {
    throw new AppError(
      "Schedule to this real estate at this date and time already exists",
      409
    );
  }

  return next();
};
