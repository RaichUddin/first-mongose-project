/* eslint-disable prettier/prettier */

import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartmentModel } from './academicDepartment.model';

const createAcademicDepartmentIntoDb = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartmentModel.create(payload);
  return result;
};

const getAllAcademicDepartmentsFromDb = async () => {
  const result =
    await AcademicDepartmentModel.find().populate('academicfaculty');
  return result;
};

const getSingleAcademicDepartmentFromDb = async (id: string) => {
  const result =
    await AcademicDepartmentModel.findById(id).populate('academicfaculty');
  return result;
};

const updateAcademicDepartmentIntoDb = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartmentModel.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true },
  );
  return result;
};

export const academicDepartmentServices = {
  createAcademicDepartmentIntoDb,
  getAllAcademicDepartmentsFromDb,
  getSingleAcademicDepartmentFromDb,
  updateAcademicDepartmentIntoDb,
};
