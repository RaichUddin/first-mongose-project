/* eslint-disable prettier/prettier */
import mongoose from 'mongoose';
import { StudentModel } from '../student.model';
import AppError from '../../errors/appError';
import { UserModel } from '../user/user.model';
import { TStudent } from './student.interface';
import QueryBuilder from '../../Builder/QueryBuilder';
import { studentSearchFields } from './student.const';

const getStudentsFromDb = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(
    StudentModel.find()
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(studentSearchFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
  return result;
};

const getSingleStudentsFromDb = async (id: string) => {
  const result = await StudentModel.findById(id)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const updateStudentsFromDb = async (
  id: string,
  payload: { student: Partial<TStudent> }, // Adjust the payload structure
) => {
  const { student } = payload; // Destructure the `student` object from the payload
  const { name, guardian, localGuardian, ...remainingUpdateData } = student;

  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingUpdateData,
  };

  // Flatten nested fields (name, guardian, etc.)
  if (name) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }
  if (guardian) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdateData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdateData[`localGuardian.${key}`] = value;
    }
  }

  // Ensure the `updated` field is controlled by the backend
  modifiedUpdateData.updated = new Date().toISOString(); // Set to current timestamp

  const result = await StudentModel.findByIdAndUpdate(
    id, // Match by `id` field
    { $set: modifiedUpdateData }, // Use `$set` to update fields
    { new: true, runValidators: true }, // Return the updated document and run validators
  );

  return result;
};

const deleteStudentsFromDb = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const result = await StudentModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );
    if (!result) {
      throw new AppError(404, 'deleted student not successfully');
    }

    const userId = result.user;

    const deletedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(404, 'deleted user not successfully');
    }
    await session.commitTransaction();
    await session.endSession();
    return { student: result, user: deletedUser };
  } catch (err) {
    await session.abortTransaction();
    throw err; // Rethrow the error
  } finally {
    await session.endSession(); // Ensure session is always ended
  }
};

export const studentService = {
  getStudentsFromDb,
  getSingleStudentsFromDb,
  deleteStudentsFromDb,
  updateStudentsFromDb,
};
