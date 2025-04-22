/* eslint-disable prettier/prettier */
import mongoose, { Schema } from 'mongoose';

import { TSemesterRegistration } from './semesterRegistration.interface';

const SemesterRegistrationSchema = new mongoose.Schema<TSemesterRegistration>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
      unique: true,
      required: true,
    },
    status: {
      type: String,
      enum: ['UPCOMING', 'ONGOING', 'ENDED'],
      default: 'UPCOMING',
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    minCredit: {
      type: Number,
      default: 3,
    },
    maxCredit: {
      type: Number,
      default: 15,
    },
  },
  {
    timestamps: true,
  },
);

// Create and export the Mongoose model
export const SemesterRegistrationModel = mongoose.model<TSemesterRegistration>(
  'SemesterRegistrations',
  SemesterRegistrationSchema,
);
