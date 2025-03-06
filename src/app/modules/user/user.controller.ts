/* eslint-disable prettier/prettier */

import { userService } from './user.service';
import catchAsync from '../../utilits/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  const result = await userService.createStudentIntoDb(password, studentData);

  res.status(200).json({
    SUCCESS: true,
    message: 'Student created successfully',
    data: result,
  });
});

export const UserController = {
  createStudent,
};
