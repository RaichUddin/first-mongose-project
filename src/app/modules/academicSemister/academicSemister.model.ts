/* eslint-disable prettier/prettier */

import { model, Schema } from 'mongoose';
import { TAcademicSemester } from './academicsemister.interface';
import { academicName, months, semisterCode } from './academic.constant';

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: { type: String, enum: academicName, required: true },
    code: { type: String, enum: semisterCode, required: true },
    year: { type: String, required: true },
    startMonth: { type: String, enum: months },
    endMonth: { type: String, enum: months },
  },
  {
    timestamps: true,
  },
);

academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicSemisterModel.findOne({
    year: this.year,
    name: this.name,
  });
  if (isSemesterExists) {
    throw new Error('Semester is already exists');
  }
  next();
});

export const AcademicSemisterModel = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
