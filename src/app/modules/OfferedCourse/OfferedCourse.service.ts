/* eslint-disable prettier/prettier */
import QueryBuilder from '../../Builder/QueryBuilder';
import AppError from '../../errors/appError';
import { AcademicDepartmentModel } from '../academicDepartment/academicDepartment.model';
import { AcademicFacultyModel } from '../academicFaculty/academicFaculty.model';
import { Course } from '../course/course.model';
import { Faculty } from '../faculty/faculty.model';
import { SemesterRegistrationModel } from '../semesterRegistration/semesterRegistration.model';
import { StudentModel } from '../student.model';
import { hasTimeConflict } from './Offered.Utilis';
import { TOfferedCourse } from './OfferedCourse.interface';
import { OfferedCourseModel } from './OfferedCourse.model';
import httpStatus from 'http-status';

const createOfferedCourseIntoDb = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicDepartment,
    course,
    section,
    faculty,
    academicFaculty,
    days,
    startTime,
    endTime,
  } = payload;

  const isSemesterRegistrationExits =
    await SemesterRegistrationModel.findById(semesterRegistration);

  if (!isSemesterRegistrationExits) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Semester registration not found !',
    );
  }
  const academicSemester = isSemesterRegistrationExits.academicSemester;
  const isAcademicDepartmentExists =
    await AcademicDepartmentModel.findById(academicDepartment);

  if (!isAcademicDepartmentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'academic Department not Found !');
  }

  const isAcademicFacultyExists =
    await AcademicFacultyModel.findById(academicFaculty);

  if (!isAcademicFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Faculty not Found !');
  }
  const isCourseExists = await Course.findById(course);

  if (!isCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not Found !');
  }
  const isFacultyExists = await Faculty.findById(faculty);

  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not Found!');
  }

  const isDepartmentBelongToFaculty = await AcademicDepartmentModel.findOne({
    _id: academicDepartment,
    academicFaculty, // <-- FIX: correct field name and value
  });

  if (!isDepartmentBelongToFaculty) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `This department does not belong to the selected faculty!`,
    );
  }

  const isSameSection = await OfferedCourseModel.findOne({
    semesterRegistration,
    course,
    section,
  });
  if (isSameSection) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Offered course with same section is exists',
    );
  }

  const assignSchedules = await OfferedCourseModel.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };
  if (hasTimeConflict(assignSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This Faculty is not available is that time please choose another time or date',
    );
  }
  const result = await OfferedCourseModel.create({
    ...payload,
    academicSemester,
  });
  return result;
};

const updateOfferedCourseIntoDb = async (
  id: string,
  payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>,
) => {
  const { faculty, days, startTime, endTime } = payload;
  const isOfferedCourseExists = await OfferedCourseModel.findById(id);

  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered Course isnot Found !');
  }
  const isFacultyExists = await Faculty.findById(faculty);

  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty is not Found !');
  }

  const semesterRegistration = isOfferedCourseExists.semesterRegistration;

  const semesterRegistrationStatus =
    await SemesterRegistrationModel.findById(semesterRegistration);
  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not update at offered Course as it ${semesterRegistrationStatus?.status} !`,
    );
  }
  const assignSchedules = await OfferedCourseModel.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };
  if (hasTimeConflict(assignSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This Faculty is not available is that time please choose another time or date',
    );
  }
  const result = await OfferedCourseModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};
const getAllOfferedCoursesFromDB = async (query: Record<string, unknown>) => {
  const offeredCourseQuery = new QueryBuilder(OfferedCourseModel.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await offeredCourseQuery.modelQuery;
  const meta = await offeredCourseQuery.countTotal();
  return {
    meta,
    result,
  };
};
// const getMyOfferedCoursesFromDB = async (userId: string) => {
//   const student = await StudentModel.findOne({ id: userId });
//   if (!student) {
//     throw new AppError(httpStatus.NOT_FOUND, 'Student not found !');
//   }
//   const currentOngoingSemester = await SemesterRegistrationModel.findOne({
//     status: 'ONGOING',
//   });
//   if (!currentOngoingSemester) {
//     throw new AppError(
//       httpStatus.NOT_FOUND,
//       'There is no ongoing semester registration!',
//     );
//   }

//   const result = await OfferedCourseModel.aggregate([
//     {
//       $match: {
//         semesterRegistration: currentOngoingSemester?._id,
//         academicFaculty: student.academicFaculty,
//         academicDepartment: student.academicDepartment,
//       },
//     },
//     {
//       $lookup: {
//         from: 'courses',
//         localField: 'course',
//         foreignField: '_id',
//         as: 'course',
//       },
//     },
//     {
//       $unwind: '$course',
//     },
//     {
//       $lookup: {
//         from: 'enrolledcourses',
//         let: {
//           offeredCourseId: '$_id',
//           currentOngoingSemester: currentOngoingSemester?._id,
//           currentStudent: student._id,
//         },
//         pipeline: [
//           {
//             $match: {
//               $expr: {
//                 $and: [
//                   {
//                     $eq: ['offeredCourse', '$$offeredCourseId'],
//                   },
//                   {
//                     $eq: ['semesterRegistration', '$$currentOngoingSemester'],
//                   },
//                   {
//                     $eq: ['student', '$$currentStudent'],
//                   },
//                   {
//                     $eq: ['isEnrolled', true],
//                   },
//                 ],
//               },
//             },
//           },
//         ],
//         as: 'enrolledCourses',
//       },
//     },
//     {
//       $addFields: {
//         isAlreadyEnrolled: {
//           $in: [
//             'course._id',
//             {
//               $map: {
//                 input: '$enrolledCourses',
//                 as: 'enroll',
//                 in: '$$enroll.course',
//               },
//             },
//           ],
//         },
//       },
//     },
//     {
//       $match: {
//         isAlreadyEnrolled: false,
//       },
//     },
//   ]);
//   return result;
// };

const getMyOfferedCoursesFromDB = async (
  userId: string,
  query: Record<string, unknown>,
) => {
  //pagination setup

  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit;

  const student = await StudentModel.findOne({ id: userId });
  // find the student
  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is noty found');
  }

  //find current ongoing semester
  const currentOngoingRegistrationSemester =
    await SemesterRegistrationModel.findOne({
      status: 'ONGOING',
    });

  if (!currentOngoingRegistrationSemester) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'There is no ongoing semester registration!',
    );
  }

  const aggregationQuery = [
    {
      $match: {
        semesterRegistration: currentOngoingRegistrationSemester?._id,
        academicFaculty: student.academicFaculty,
        academicDepartment: student.academicDepartment,
      },
    },
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'course',
      },
    },
    {
      $unwind: '$course',
    },
    {
      $lookup: {
        from: 'enrolledcourses',
        let: {
          currentOngoingRegistrationSemester:
            currentOngoingRegistrationSemester._id,
          currentStudent: student._id,
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: [
                      '$semesterRegistration',
                      '$$currentOngoingRegistrationSemester',
                    ],
                  },
                  {
                    $eq: ['$student', '$$currentStudent'],
                  },
                  {
                    $eq: ['$isEnrolled', true],
                  },
                ],
              },
            },
          },
        ],
        as: 'enrolledCourses',
      },
    },
    {
      $lookup: {
        from: 'enrolledcourses',
        let: {
          currentStudent: student._id,
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ['$student', '$$currentStudent'],
                  },
                  {
                    $eq: ['$isCompleted', true],
                  },
                ],
              },
            },
          },
        ],
        as: 'completedCourses',
      },
    },
    {
      $addFields: {
        completedCourseIds: {
          $map: {
            input: '$completedCourses',
            as: 'completed',
            in: '$$completed.course',
          },
        },
      },
    },
    {
      $addFields: {
        isPreRequisitesFulFilled: {
          $or: [
            { $eq: ['$course.preRequisiteCourses', []] },
            {
              $setIsSubset: [
                '$course.preRequisiteCourses.course',
                '$completedCourseIds',
              ],
            },
          ],
        },

        isAlreadyEnrolled: {
          $in: [
            '$course._id',
            {
              $map: {
                input: '$enrolledCourses',
                as: 'enroll',
                in: '$$enroll.course',
              },
            },
          ],
        },
      },
    },
    {
      $match: {
        isAlreadyEnrolled: false,
        isPreRequisitesFulFilled: true,
      },
    },
  ];

  const paginationQuery = [
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
  ];

  const result = await OfferedCourseModel.aggregate([
    ...aggregationQuery,
    ...paginationQuery,
  ]);

  const total = (await OfferedCourseModel.aggregate(aggregationQuery)).length;

  const totalPage = Math.ceil(result.length / limit);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    result,
  };
};

const getSingleOfferedCourseFromDB = async (id: string) => {
  const offeredCourse = await OfferedCourseModel.findById(id);

  if (!offeredCourse) {
    throw new AppError(404, 'Offered Course not found');
  }

  return offeredCourse;
};

export const OfferedCourseSevices = {
  createOfferedCourseIntoDb,
  getAllOfferedCoursesFromDB,
  updateOfferedCourseIntoDb,
  getSingleOfferedCourseFromDB,
  getMyOfferedCoursesFromDB,
};
