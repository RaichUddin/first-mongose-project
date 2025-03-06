/* eslint-disable prettier/prettier */

import catchAsync from '../../utilits/catchAsync';
import { academicDepartmentServices } from './academicDepartment.service';

const createAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await academicDepartmentServices.createAcademicDepartmentIntoDb(req.body);
  res.status(200).json({
    SUCCESS: true,
    message: 'Academic Department is created successfully',
    data: result,
  });
});
const getAllAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await academicDepartmentServices.getAllAcademicDepartmentsFromDb();

  res.status(200).json({
    SUCCESS: true,
    message: 'Get All Academic Department successfully',
    data: result,
  });
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result =
    await academicDepartmentServices.getSingleAcademicDepartmentFromDb(
      departmentId,
    );

  res.status(200).json({
    SUCCESS: true,
    message: 'Get Single Academic Department successfully',
    data: result,
  });
});
const updatedAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result =
    await academicDepartmentServices.updateAcademicDepartmentIntoDb(
      departmentId,
      req.body,
    );

  res.status(200).json({
    SUCCESS: true,
    message: 'Updated Academic Department successfully',
    data: result,
  });
});

export const academicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updatedAcademicDepartment,
};
