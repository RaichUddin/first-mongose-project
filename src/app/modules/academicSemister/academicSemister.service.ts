/* eslint-disable prettier/prettier */

import { academicSemesterNameCodeMapper } from './academic.constant';
import { TAcademicSemister } from './academicsemister.interface';
import { AcademicSemisterModel } from './academicSemister.model';

const createAcademicSemesterIntoDb = async (payload: TAcademicSemister) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalide code error missed');
  }

  const result = await AcademicSemisterModel.create(payload);
  return result;
};
const getStudentAcademicSemesterFromDb = async () => {
  const result = await AcademicSemisterModel.find();
  return result;
};

export const academicSemesterServices = {
  createAcademicSemesterIntoDb,
  getStudentAcademicSemesterFromDb,
};
