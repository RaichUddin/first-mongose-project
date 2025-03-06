/* eslint-disable prettier/prettier */
import mongoose, { startSession } from 'mongoose';
import { StudentModel } from '../student.model';
import AppError from '../../errors/appError';
import { UserModel } from '../user/user.model';
import { TStudent } from './student.interface';
import QueryBuilder from '../../Builder/QueryBuilder';
import { studentSearchFields } from './student.const';

const getStudentsFromDb = async (query: Record<string, unknown>) => {
  // const queryObj = { ...query };
  // let searchTerm = '';
  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }

  // const searchQuery = StudentModel.find({
  //   $or: ['email', 'name.firstName', 'presentAddress'].map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // });

  // const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  // excludeFields.forEach((el) => delete queryObj[el]);

  // const filterQuery = searchQuery
  //   .find(queryObj)
  //   .populate('admissionSemester')
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: {
  //       path: 'academicfaculty',
  //     },
  //   });
  // let sort = '-createdAt';

  // if (query.sort) {
  //   sort = query.sort as string;
  // }

  // const sortQuery = filterQuery.sort(sort);

  // let limit = 1;
  // let page = 1;
  // let skip = 0;

  // if (query.limit) {
  //   limit = Number(query.limit);
  // }
  // if (query.page) {
  //   page = Number(query.page);
  //   skip = (page - 1) * limit;
  // }

  // const paginateQuery = sortQuery.skip(skip);

  // const limitQuery = paginateQuery.limit(limit);

  // let fields = '-__v';
  // if (query.fields) {
  //   fields = (query.fields as string).split(',').join(' ');
  // }

  // const fieldQuery = await limitQuery.select(fields);

  // return fieldQuery;

  const studentQuery = new QueryBuilder(
    StudentModel.find()
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicfaculty',
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
        path: 'academicfaculty',
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
