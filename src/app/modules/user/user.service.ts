/* eslint-disable prettier/prettier */
import mongoose from 'mongoose';
import config from '../../config';

import { AcademicSemisterModel } from '../academicSemister/academicSemister.model';
import { StudentModel } from '../student.model';
import { TStudent } from '../student/student.interface';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import { generateStudentId } from './user.utilitis';
import AppError from '../../errors/appError';

const createStudentIntoDb = async (password: string, payload: TStudent) => {
  // Validate required fields
  if (!payload.admissionSemester) {
    throw new Error('Admission semester is required');
  }

  // Fetch admission semester
  const admissionSemester = await AcademicSemisterModel.findById(
    payload.admissionSemester,
  );
  if (!admissionSemester) {
    throw new Error('Admission semester not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // Generate student ID
    const studentId = await generateStudentId(admissionSemester);

    // Prepare user data
    const userData: Partial<TUser> = {
      id: studentId, // Include the generated student ID
      password: password || (config.defaultPassword as string),
      role: 'student',
    };

    // Create user
    const newUser = await UserModel.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(404, 'Failed to create user');
    }

    // Prepare student data
    payload.id = newUser[0].id; // Use the generated student ID
    payload.user = newUser[0]._id; // Link the student to the user

    // Create student
    const newStudent = await StudentModel.create([payload], { session });
    if (!newStudent.length) {
      throw new Error('Failed to create student');
    }
    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const userService = {
  createStudentIntoDb,
};
