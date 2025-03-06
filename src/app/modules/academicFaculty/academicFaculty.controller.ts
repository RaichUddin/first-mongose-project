/* eslint-disable prettier/prettier */

import catchAsync from '../../utilits/catchAsync';
import { academicFacultyServices } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await academicFacultyServices.createAcademicFacultyIntoDb(
    req.body,
  );
  res.status(200).json({
    SUCCESS: true,
    message: 'Academic Faculty is created successfully',
    data: result,
  });
});
const getAllAcademicFaculty = catchAsync(async (req, res) => {
  const result = await academicFacultyServices.getAllAcademicFacultiesFromDb();

  res.status(200).json({
    SUCCESS: true,
    message: 'Get All Academic Faculty successfully',
    data: result,
  });
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result =
    await academicFacultyServices.getSingleAcademicFacltyFromDb(facultyId);

  res.status(200).json({
    SUCCESS: true,
    message: 'Get Single Academic Faculty successfully',
    data: result,
  });
});
const updatedAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await academicFacultyServices.updateAcademicFacultyIntoDb(
    facultyId,
    req.body,
  );

  res.status(200).json({
    SUCCESS: true,
    message: 'Updated Academic Faculty successfully',
    data: result,
  });
});

export const academicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updatedAcademicFaculty,
};
