/* eslint-disable prettier/prettier */

import catchAsync from '../../utilits/catchAsync';
import { academicSemesterServices } from './academicSemister.service';

const createAcademicSemister = catchAsync(async (req, res) => {
  const result = await academicSemesterServices.createAcademicSemesterIntoDb(
    req.body,
  );
  res.status(200).json({
    SUCCESS: true,
    message: 'Academic Semester is created successfully',
    data: result,
  });
});
const getAllAcademicSemester = catchAsync(async (req, res) => {
  const result =
    await academicSemesterServices.getStudentAcademicSemesterFromDb();

  res.status(200).json({
    SUCCESS: true,
    message: 'Get All Academic Semester successfully',
    data: result,
  });
});

export const academicSemisterController = {
  createAcademicSemister,
  getAllAcademicSemester,
};
