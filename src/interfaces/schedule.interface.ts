import { z } from "zod";
import {
  scheduleSchema,
  scheduleSchemaRequest,
} from "../schemas/schedule.schema";

export type TSchedule = z.infer<typeof scheduleSchema>;
export type TScheduleRequest = z.infer<typeof scheduleSchemaRequest>;
export interface IResponseSchedule {
  message: string;
}
