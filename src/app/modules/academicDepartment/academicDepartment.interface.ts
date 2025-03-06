/* eslint-disable prettier/prettier */

import { Types } from 'mongoose';
export type TAcademicDepartment = {
  name: string;
  academicfaculty: Types.ObjectId;
};
