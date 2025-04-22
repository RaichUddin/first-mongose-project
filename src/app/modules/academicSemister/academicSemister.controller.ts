/* eslint-disable prettier/prettier */

import catchAsync from '../../utilits/catchAsync';
import sendResponse from '../../utilits/sendResponse';
import { academicSemesterServices } from './academicSemister.service';
import httpStatus from 'http-status';

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
  const result = await academicSemesterServices.getAllAcademicSemestersFromDB(
    req.query,
  );

  res.status(200).json({
    SUCCESS: true,
    message: 'Get All Academic Semester successfully',
    data: result,
  });
});
const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;

  const result =
    await academicSemesterServices.getSingleAcademicSemesterFromDB(semesterId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is retrieved succesfully',
    data: result,
  });
});

const updateAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result = await academicSemesterServices.updateAcademicSemesterIntoDB(
    semesterId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is retrieved succesfully',
    data: result,
  });
});

export const academicSemisterController = {
  createAcademicSemister,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateAcademicSemester,
};
