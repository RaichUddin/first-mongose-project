/* eslint-disable prettier/prettier */
import { model, Schema } from 'mongoose';
import { TAcademicFaculty } from './academicFaculty.interface';

const academicFacltySchema = new Schema<TAcademicFaculty>(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  },
);

export const AcademicFacultyModel = model<TAcademicFaculty>(
  'AcademicFaculty',
  academicFacltySchema,
);
