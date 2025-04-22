/* eslint-disable prettier/prettier */
import AppError from '../../errors/appError';
import { AcademicSemisterModel } from '../academicSemister/academicSemister.model';
import httpStatus from 'http-status';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistrationModel } from './semesterRegistration.model';
import QueryBuilder from '../../Builder/QueryBuilder';
import { registrationStatus } from './semesterRegistration.constant';

const createSemesterRegistrationIntoDb = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;

  const anyUpcomingOrOngoingSemester = await SemesterRegistrationModel.findOne({
    $or: [
      { status: registrationStatus.UPCOMING },
      { status: registrationStatus.ONGOING },
    ],
  });
  if (anyUpcomingOrOngoingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already an ${anyUpcomingOrOngoingSemester.status} registered semester`,
    );
  }

  const isAcademicSemesterExist =
    await AcademicSemisterModel.findById(academicSemester);
  if (!isAcademicSemesterExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic semester not found');
  }

  const isSemesterReistrationExist = await SemesterRegistrationModel.findOne({
    academicSemester,
  });
  if (isSemesterReistrationExist) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This semester is already registered',
    );
  }

  const result = await SemesterRegistrationModel.create(payload);
  return result;
};

const getAllSemesterRegistrationFromDb = async (
  payload: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistrationModel.find().populate('academicSemester'),
    payload,
  )
    .search(['status', 'academicSemester'])
    .filter()
    .sort()
    .fields()
    .paginate();

  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};
const getSingleSemesterRegistrationFromDb = async (id: string) => {
  const result =
    await SemesterRegistrationModel.findById(id).populate('academicSemester');
  return result;
};
const updateSemesterRegistrationFromDb = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  const isSemesterReistrationExists =
    await SemesterRegistrationModel.findById(id);
  if (!isSemesterReistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This semester is not Found');
  }
  const currentSemesterStatus = isSemesterReistrationExists.status;
  const requestStatus = payload?.status;

  if (currentSemesterStatus === registrationStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already an ${currentSemesterStatus} `,
    );
  }

  if (
    currentSemesterStatus === registrationStatus.UPCOMING &&
    requestStatus === registrationStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not change directly from ${currentSemesterStatus} to ${requestStatus} `,
    );
  }
  if (
    currentSemesterStatus === registrationStatus.ONGOING &&
    requestStatus === registrationStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not change directly from ${currentSemesterStatus} to ${requestStatus} `,
    );
  }

  const result = await SemesterRegistrationModel.findByIdAndUpdate(
    id,
    payload,
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

export const semesterRegistrationServices = {
  createSemesterRegistrationIntoDb,
  getAllSemesterRegistrationFromDb,
  getSingleSemesterRegistrationFromDb,
  updateSemesterRegistrationFromDb,
};
