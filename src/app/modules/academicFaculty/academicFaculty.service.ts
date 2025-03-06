/* eslint-disable prettier/prettier */

import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFacultyModel } from './academicFaculty.model';

const createAcademicFacultyIntoDb = async (payload: TAcademicFaculty) => {
  const result = await AcademicFacultyModel.create(payload);
  return result;
};

const getAllAcademicFacultiesFromDb = async () => {
  const result = await AcademicFacultyModel.find();
  return result;
};

const getSingleAcademicFacltyFromDb = async (id: string) => {
  const result = await AcademicFacultyModel.findById(id);
  return result;
};

const updateAcademicFacultyIntoDb = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFacultyModel.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true },
  );
  return result;
};

export const academicFacultyServices = {
  createAcademicFacultyIntoDb,
  getAllAcademicFacultiesFromDb,
  getSingleAcademicFacltyFromDb,
  updateAcademicFacultyIntoDb,
};
