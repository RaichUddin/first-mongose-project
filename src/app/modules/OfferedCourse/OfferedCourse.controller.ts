/* eslint-disable prettier/prettier */
import { Request, Response } from 'express';
import catchAsync from '../../utilits/catchAsync';
import sendResponse from '../../utilits/sendResponse';
import { OfferedCourseSevices } from './OfferedCourse.service';
import httpStatus from 'http-status';

const createOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseSevices.createOfferedCourseIntoDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course is created succesfully',
    data: result,
  });
});
const updateOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OfferedCourseSevices.updateOfferedCourseIntoDb(
    id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course is updated  succesfully',
    data: result,
  });
});
const getSingleOfferedCourses = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await OfferedCourseSevices.getSingleOfferedCourseFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'OfferedCourse fetched successfully',
      data: result,
    });
  },
);

const getAllOfferedCourses = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseSevices.getAllOfferedCoursesFromDB(
    req.query,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OfferedCourses retrieved successfully !',
    data: result,
  });
});
const getMyOfferedCourses = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const result = await OfferedCourseSevices.getMyOfferedCoursesFromDB(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My OfferedCourses retrieved successfully !',
    data: result,
  });
});

export const OfferedCourseController = {
  createOfferedCourse,
  updateOfferedCourse,
  getAllOfferedCourses,
  getSingleOfferedCourses,
  getMyOfferedCourses,
};
