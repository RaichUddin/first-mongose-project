/* eslint-disable prettier/prettier */
import { TSchedule } from './OfferedCourse.interface';

export const hasTimeConflict = (
  assignSchedules: TSchedule[],
  newSchedule: TSchedule,
) => {
  for (const schedule of assignSchedules) {
    const existingStartTime = new Date(`1970-01-01T${schedule.startTime}`);
    const existingEndtTime = new Date(`1970-01-01T${schedule.endTime}`);
    const newStartTime = new Date(`1970-01-01T${newSchedule.startTime}`);
    const newendTime = new Date(`1970-01-01T${newSchedule.endTime}`);
    if (newStartTime < existingEndtTime && newendTime > existingStartTime) {
      return true;
    }
  }
  return false;
};
